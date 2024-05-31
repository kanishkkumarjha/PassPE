import React from 'react'

const Footer = () => {
  return (
    <div className='bg-blue-900 text-white flex flex-col justify-center items-center w-full'>
      <div className='logo text-white font-bold text-2xl'>
        <span className=''>Pass</span><span className='text-slate-500'>PE</span>
      </div>

      <div className='flex justify-center items-center'>Created using <img className='w-7 mx-2' src="icons/mern.png" alt="" /></div>
    </div>
  )
}

export default Footer
