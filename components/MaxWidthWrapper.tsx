import React, { ReactNode } from 'react'

const MaxWidthWrapper = ({children}: {children: ReactNode}) => {
  return (
    <div className='w-full flex justify-center flex-1'>
        <div className='w-full max-w-7xl h-full flex-1 flex flex-col'>
            {children}
        </div>
    </div>
  )
}

export default MaxWidthWrapper