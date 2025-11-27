import React, { ReactNode } from 'react'

const MaxWidthWrapper = ({children}: {children: ReactNode}) => {
  return (
    <div className='w-full flex items-center justify-center'>
        <div className='w-full max-w-7xl h-12'>
            {children}
        </div>
    </div>
  )
}

export default MaxWidthWrapper