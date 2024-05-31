import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-blue-900 text-white'>
      <div className="mycontainer flex justify-between items-center
      px-4 py-5 h-14">
        <div className="logo font-bold text-white text-2xl">

          <span>Pass</span><span className='text-slate-500'>PE</span>
        </div>

      
      <ul>
        <li className='flex gap-4'>
            <a className='hover:font-bold' href="http://">Home</a>
            <a className='hover:font-bold' href="http://">About</a>
            <a className='hover:font-bold' href="http://">Contact</a>
        </li>
      </ul>
      </div>
    </nav>
  )
}

export default Navbar
