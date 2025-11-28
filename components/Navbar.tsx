

import authOptions from '@/lib/auth'
import { CookingPot, MonitorCog, ShoppingBag } from 'lucide-react'
import { getServerSession } from 'next-auth'
import SignOut from './SignOut'
import Link from 'next/link'

const Navbar = async () => {

    const session = await getServerSession(authOptions)

  return (
    <div className='w-full flex items-center justify-center h-20 z-50'>
        <div className='w-full max-w-7xl flex items-center justify-between '>
        <h1 className='text-4xl font-semibold text-accent'>Logo</h1>
        <ul className='flex items-center gap-6'>
            <li className='text-xl font-medium cursor-pointer' >
                <Link href={'/'}>
                    Home
                </Link>
            </li>
            <li className='text-xl font-medium cursor-pointer' >Locations</li>
            <li className='text-xl font-medium cursor-pointer' >Menu</li>
            <li className='text-xl font-medium cursor-pointer' >About us</li>
        </ul>
        <div className='flex gap-2'>
            {!session?.user || session.user.role !== "admin" ? <ShoppingBag  className='w-7 h-7 cursor-pointer'/> : null}
            {session?.user.role === "admin" ? <Link href={'/dashboard/admin'}>
                <MonitorCog className='w-7 h-7 cursor-pointer'/>
            </Link> : null}
            {session?.user.role === "staff" ? <CookingPot className='w-7 h-7 cursor-pointer'/> : null}
            {session?.user ?  <SignOut /> : null}
        </div>
        </div>
    </div>
  )
}

export default Navbar