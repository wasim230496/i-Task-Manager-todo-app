import React from 'react'

const Navbar = ({ search, handleSearch }) => {
  return (
    <nav className='flex justify-around bg-violet-900 py-2 text-white'>
        <div className="logo">
            <span className='font-bold text-xl mx-8 cursor-pointer'>iTask</span>
        </div>
        <ul className='flex gap-4 mx-9'>
            <li className='cursor-pointer hover:font-bold transition-all '>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all '>Your Task</li>
        </ul>
        <input type="text" value={search} onChange={handleSearch} placeholder='Search todos...' className='rounded px-2 py-1 text-black bg-amber-50'/>
    </nav>
  )
}

export default Navbar