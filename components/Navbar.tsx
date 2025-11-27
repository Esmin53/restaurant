
import { ShoppingBag } from 'lucide-react'
import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full flex items-center justify-center h-20 z-50'>
        <div className='w-full max-w-7xl flex items-center justify-between '>
        <h1 className='text-4xl font-semibold text-accent'>Logo</h1>
        <ul className='flex items-center gap-6'>
            <li className='text-xl font-medium cursor-pointer' >Home</li>
            <li className='text-xl font-medium cursor-pointer' >Locations</li>
            <li className='text-xl font-medium cursor-pointer' >Menu</li>
            <li className='text-xl font-medium cursor-pointer' >About us</li>
        </ul>
        <div>
            <ShoppingBag  className='w-7 h-7 cursor-pointer'/>
        </div>
        </div>
    </div>
  )
}

export default Navbar