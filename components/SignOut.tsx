"use client"

import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

const SignOut = () => {
  
    return (
    <div onClick={() => signOut()}>
        <LogOut className='w-7 h-7 cursor-pointer'/>
    </div>
  )
}

export default SignOut