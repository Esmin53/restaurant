"use client"

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import NewLocationForm from '@/components/NewLocationForm'
import { Hotel } from 'lucide-react'




const page = () => {

  return (
        <MaxWidthWrapper>
          <div className="w-full flex flex-col gap-2">
              <div className='w-full flex-1 flex flex-col gap-2'>
                    <div className='flex gap-2 items-center pb-2 border-b-2 border-b-offgray'>
                        <h1 className=' text-2xl font-medium'>Locations</h1>
                        <Hotel className='w-7 h-7'/>
                    </div>
                    <div className='flex flex-wrap gap-2 '>
                        <NewLocationForm />
                    </div>
                   
              </div>

          </div>
        </MaxWidthWrapper>
  )
}

export default page