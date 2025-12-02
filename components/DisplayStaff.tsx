import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const DisplayStaff = () => {

    const [staff ,setStaff] = useState<{
            id: number,
            name: string,
            image: string,
            salary: string,
            position: string,
            location: string,
            adress: string
    }[]>([])

    const getStaff = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/dashboard/admin/staff`, {
                method: 'GET'
            })

            const {data} = await res.json()

            console.log("Data: ", data)
            
            setStaff(data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getStaff()
    }, [])

  return (
        <div className='flex-1 grid grid-cols-3 gap-2 gap-y-0'>
            {staff.map((item) => <div key={item.id} className=' h-fit bg-gray-200 border border-gray-300 flex items-center flex-col p-2 gap-2'>
                <div className='w-36 h-36 rounded-full border-2 border-gray-300 relative bg-gray-100'>
                    {item?.image ? <Image src={item.image} alt='User Profile Picutre' fill className='object-cover rounded-full'/> : null}
                </div>
                <div className='flex flex-col w-full'>
                    <p className='font-medium'>{item.name}</p>
                    <div className='-space-y-1 border-y-2 border-gray-300'>
                        <p className='text-sm text-gray-500 '>{item.adress}</p>
                        <p>{item.location}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p>{item.position}</p>
                        <p>{Number(item.salary).toFixed(2)} $</p>
                    </div>
                    </div>
            </div>)}
        </div>
  )
}

export default DisplayStaff