import React from 'react'
import { useState, useEffect } from 'react'
import addIcon from '../assets/addIcon.svg'
import eyeIcon from '../assets/eyeIcon.svg'
import crossEyeIcon from '../assets/crossEyeIcon.svg'
import editIcon from '../assets/editIcon.svg'
import deleteIcon from '../assets/deleteIcon.svg'
import copyIcon from '../assets/copyIcon.svg'
import { ToastContainer, toast } from 'react-toastify';


const Manager = () => {
    const [form, setForm] = useState({ websiteName: "", username: "", password: "", id: "" });
    const [data, setData] = useState(() => {
        const savedData = localStorage.getItem("passwords");
        return savedData ? JSON.parse(savedData) : [];
    });


    function handleForm(formData) {
        const websiteName = formData.get("websitename")
        const username = formData.get("username")
        const password = formData.get("password")

        if (websiteName.length < 3 || username.length < 3 || password.length < 3) {
            toast.error("All fields must be at least 3 characters long!");
            return;
        }

        if (form.id) {
            setData(prev => prev.map(item =>
                item.id === form.id ? { ...form, websiteName, username, password } : item
            ));
        } else {
            let newEntry = { websiteName, username, password, id: Date.now() };
            setData(prev => [...prev, newEntry]);
        }
        setForm({ websiteName: "", username: "", password: "", id: "" });
        
    }

    const [showPassword, setShowPassword] = useState(false);

    const handleEyeButton = () => {
        setShowPassword(prev => !prev);
    };

    const handleCopy = (textToCopy) => {
        navigator.clipboard.writeText(textToCopy)
        toast.success("Copied to clipboard!");
    }

    const handleDelete = (id) => {
        let newdata = data.filter((item) => {
            return item.id !== id;
        })
        setData(newdata)
    }
    const handleEdit = (id) => {
        let newdata = data.find((item) => item.id === id);

        if (newdata) {
            setForm({
                websiteName: newdata.websiteName,
                username: newdata.username,
                password: newdata.password,
                id: newdata.id
            });
        }
    };

    useEffect(() => {
        localStorage.setItem("passwords", JSON.stringify(data));
    }, [data]);
    


    return (

        <main className='w-full pb-10 max-h-[78vh] min-h-[78vh] bg-[#111828] [&::-webkit-scrollbar]:w-[1.5px]
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
   overflow-x-hidden'>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="header flex justify-center flex-col items-center pt-3">
                <div className="logo text-2xl md:text-4xl font-bold text-[#4edc82]">
                    &lt;<span className='text-white'>Pass</span>OP/&gt;
                </div>
                <p className="text-lg md:text-2xl text-green-400 animate-pulse duration-1000 text-center">Your Own Password Manager!</p>
            </div>
            <form action={handleForm} className='w-[95%] md:w-[60%] mx-auto my-5 text-white flex flex-col gap-8'>
                <input autoComplete='off' placeholder='Website Name Or Url' onChange={(e) => setForm({ ...form, websiteName: e.target.value })} value={form.websiteName} className='bg-[#212938] ring ring-[#20774a] outline-none p-3 rounded-full w-full' type="text" name='websitename' />
                <div className='w-full flex gap-8 flex-col md:flex-row'>
                    <input autoComplete='off' placeholder='Username' onChange={(e) => setForm({ ...form, username: e.target.value })} value={form.username} className='bg-[#212938] ring ring-[#20774a] outline-none p-3 rounded-full w-full md:w-1/2 ' type="text" name="username" />

                    <div className='bg-[#212938] relative flex ring ring-[#20774a] outline-none rounded-full w-full md:w-1/2'>
                        <input autoComplete='off' placeholder='Password' onChange={(e) => setForm({ ...form, password: e.target.value })} value={form.password} className='w-full p-3 outline-none rounded-full' type={showPassword ? "text" : "password"} name="password" />
                        <button type="button" onClick={handleEyeButton} className='mr-5  my-auto cursor-pointer'>
                            <img className='w-full h-full' src={showPassword ? crossEyeIcon : eyeIcon} alt="" />
                        </button>
                    </div>
                </div>
                <button type='submit' className='bg-[#4edc82] rounded-full mx-auto w-26 transition-transform duration-200 hover:scale-110 flex justify-center gap-1 cursor-pointer py-2'>
                    <img className='w-7 h-7' src={addIcon} alt="" />
                    <span className='text-xl text-black font-semibold'>Add</span>
                </button>
            </form>


            <div className="relative w-[95%] md:w-[60%] mx-auto overflow-x-auto  shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-black bg-green-200 rounded-lg overflow-hidden dark:text-black">
                    <thead className="text-xs text-white bg-[#212938] uppercase">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Website Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Username
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Password
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((entry) => {
                                return <tr key={entry.id} className="border-b border-zinc-500">
                                    <th scope="col" className="px-6 py-4 font-medium">
                                        <div className='flex gap-2 items-center'>
                                            <a href={entry.websiteName} target='_blank' className='underline'>{entry.websiteName}</a>
                                            <img onClick={() => handleCopy(entry.websiteName)} className='w-4 h-4 cursor-pointer' src={copyIcon} alt="" />
                                        </div>
                                    </th>
                                    <td className="px-6 py-4 font-semibold">
                                        <div className='flex gap-2 items-center'>
                                            <span>{entry.username}</span>
                                            <img onClick={() => handleCopy(entry.username)} className='w-4 h-4 cursor-pointer' src={copyIcon} alt="" />
                                        </div>

                                    </td>
                                    <td className="px-6 py-4 font-semibold ">
                                        <div className='flex gap-2 items-center'>
                                            <span>{entry.password}</span>
                                            <img onClick={() => handleCopy(entry.password)} className='w-4 h-4 cursor-pointer' src={copyIcon} alt="" />
                                        </div>

                                    </td>
                                    <td className="px-6 py-4 flex gap-5 font-semibold">
                                        <img onClick={() => handleEdit(entry.id)} className='w-5 h-5 cursor-pointer' src={editIcon} alt="" />
                                        <img onClick={() => handleDelete(entry.id)} className='w-5 h-5 cursor-pointer' src={deleteIcon} alt="" />
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>

        </main>
    )
}

export default Manager