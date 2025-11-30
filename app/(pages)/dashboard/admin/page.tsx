import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'

const page = () => {
  return (
        <MaxWidthWrapper>
          <div className="w-full flex flex-col gap-2">
              <div className='w-full flex-1 min-h-96 bg-red-200'>

              </div>
          </div>
        </MaxWidthWrapper>
  )
}

export default page