import { ChartLineIcon, CookingPot, Hotel, MonitorCog, PackageOpen, UserPlus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
    <div className="h- min-h-96 border-r-2 border-r-offgray flex flex-col gap-2 pr-4">
        <div className='flex gap-2 items-center pb-2 border-b-2 border-b-offgray'>
            <h1 className=' text-2xl font-medium'>Dashboard</h1>
            <MonitorCog className='w-7 h-7'/>
        </div>
        <div className='flex gap-2 items-center cursor-pointer'>
            <ChartLineIcon  className='w-7 h-7'/>
            <p className='text-xl font-medium'>Analytics</p>
        </div>
        <Link href={'/dashboard/admin/locations'} className='flex gap-2 items-center cursor-pointer'>
            <Hotel className='w-7 h-7'/>
            <p className='text-xl font-medium'>Locations</p>
        </Link>
        <Link href={'/dashboard/admin/staff'} className='flex gap-2 items-center cursor-pointer'>
            <UserPlus className='w-7 h-7'/>
            <p className='text-xl font-medium'>Staff</p>
        </Link>
        <div className='flex gap-2 items-center cursor-pointer'>
            <CookingPot className='w-7 h-7'/>
            <p className='text-xl font-medium'>Menu</p>
        </div>
        <div className='flex gap-2 items-center cursor-pointer'>
            <PackageOpen className='w-7 h-7'/>
            <p className='text-xl font-medium'>Orders</p>
        </div>
     </div>
  )
}

export default Sidebar