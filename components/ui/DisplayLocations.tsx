import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const DisplayLocations = () => {
    const [locations, setLocations] = useState<{
        id: number
        adress: string
        name: string
        image: string
    }[] >([])


    const getLocations = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/dashboard/admin/locations`, {
                method: 'GET'
            })

            const {data} = await response.json()

            if(response.status === 200) {
                setLocations(data)
            }
            

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getLocations()
    }, [])

  return (
    <div className='flex-1 grid grid-cols-2 gap-2'>
        {locations.map(({id, adress, name, image}) => <div className='w-full h-72 bg-gray-200 border border-gray-300 flex flex-col p-2 gap-1' key={id}>
            <div className='flex-1 bg-red-200 relative'>
                {image ? <Image src={image} alt='Location cover' fill className='object-cover'/> : null}
            </div>
            <div>
                <p className='text-sm text-gray-500 font-medium'>{name}</p>
                <p>{adress}</p>
            </div>

        </div>)}

    </div>
  )
}

export default DisplayLocations