"use client"

import NewUserForm from '@/components/forms/NewUserForm'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { UserCog } from 'lucide-react'

const page = () => {

  return (
        <MaxWidthWrapper>
          <div className="w-full flex flex-col gap-2 relative">
              <div className='w-full flex-1 flex flex-col gap-2'>
                    <div className='flex gap-2 items-center pb-2 border-b-2 border-b-offgray'>
                        <h1 className=' text-2xl font-medium'>Staff</h1>
                        <UserCog className='w-7 h-7'/>
                    </div>
                    <div className='flex flex-wrap gap-2'>
                        
                        <div className='flex-1 bg-gray-200 min-h-[300vh]'>

                        </div>
                        <NewUserForm />
                    </div>
                   
              </div>

          </div>
        </MaxWidthWrapper>
  )
}

export default page