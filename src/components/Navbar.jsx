import React from 'react'
import githubIcon from '../assets/github.svg'

const Navbar = () => {
  return (
    <nav className='bg-[#212938] w-full h-[10vh] flex items-center px-2 sm:px-10 justify-between'>
        <div className="logo text-2xl font-bold text-[#4edc82]">
          &lt;<span className='text-white'>Pass</span>OP/&gt;
        </div>
        <a href='https://github.com/Rishabh-Rai-99' target='_blank' className='flex gap-2 py-1 md:py-2 px-2 md:px-3 transition-transform duration-200 hover:scale-110 bg-[#4edc82] rounded-full items-center cursor-pointer'>
          <span className='text-lg font-semibold'>Github</span>
          <img className='w-7 h-7' src={githubIcon} alt="" />
        </a>
    </nav>
  )
}

export default Navbar