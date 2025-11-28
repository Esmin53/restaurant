import React, { ReactNode } from 'react'

const MaxWidthWrapper = ({children}: {children: ReactNode}) => {
  return (
    <div className='w-full flex items-center justify-center flex-1'>
        <div className='w-full max-w-7xl h-full'>
            {children}
        </div>
    </div>
  )
}

export default MaxWidthWrapper