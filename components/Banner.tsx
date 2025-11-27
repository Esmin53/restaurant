import Image from 'next/image'

const Banner = () => {
  return (
    <div className='w-full flex items-center justify-center text-white'>
        <div className='w-full max-w-7xl flex justify-between items-center py-6'>
            {/*<div className='flex flex-col gap-4'>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                <div>
                    <h1 className='text-6xl font-medium'>Order fresh &</h1>
                    <h1 className='text-6xl font-medium ml-8'>Tasty Food</h1>
                    <h1 className='text-6xl font-medium text-red-500'>Anytime</h1>
                </div>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing.</p>
                <div className='flex items-center'>
                    <div className='w-full h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-medium
                     cursor-pointer'>Menu</div>
                </div>
            </div>*/}
            <div className='w-full h-[30rem] bg-sky-300 grid grid-cols-3 gap-4'>
                <div className='h-full w-full bg-pink-500 relative rounded-lg overflow-hidden'>
                    <Image src='/img1.jpg' alt='s' fill />
                </div>
                <div className='h-full w-full bg-pink-500 relative rounded-lg overflow-hidden'>
                    <Image src='/img1.jpg' alt='s' fill />
                </div>
                <div className='h-full w-full bg-pink-500 relative rounded-lg overflow-hidden'>
                    <Image src='/img1.jpg' alt='s' fill />
                </div>

            </div>
        </div>
    </div>
  )
}

export default Banner