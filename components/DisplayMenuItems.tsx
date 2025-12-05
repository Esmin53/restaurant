"use client"

import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const DisplayMenuItems = () => {
    const [menuItems, setMenuItems] = useState<{
        id: number,
        title: string,
        description: string,
        price: string,
        image: string,
        category: string
    }[]>([])

    const getMenuItems = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/dashboard/admin/menu-item`)

            const {data}: {
                data: {
                    id: number,
                    title: string,
                    description: string,
                    price: string,
                    image: string,
                    category: string
                }[]
            } = await res.json()

            setMenuItems(data)

            console.log("MENUITEMS: ", data)
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        getMenuItems()
    }, [])

  return (
    <div className='flex flex-col  gap-2'>
        <div className='w-full flex justify-between items-end py-2'>
            <div className='flex w-120 p-2 bg-gray-200 border border-gray-300'>
                <input type='text' className='flex-1 h-10 bg-gray-100 border border-gray-300 px-2' placeholder='Search...' />
            </div>
            <div className='flex gap-2'>
                <div className='w-36 h-12 p-2 bg-gray-200 border border-gray-300 flex items-center justify-between'>
                    <p>Category</p>
                    <ChevronDown />
                </div>
                <div className='w-36 h-12 p-2 bg-gray-200 border border-gray-300 flex items-center justify-between'>
                    <p>Order By</p>
                    <ChevronDown />
                </div>
            </div>
        </div>
        <div className='w-full grid grid-cols-3 gap-2'>
            {menuItems.map((item) => <div className='w-full aspect-square bg-gray-200 border border-gray-300 flex flex-col p-2' key={item.id}>
                    <div className='flex-1 relative'>
                        {item.image ? <Image src={item.image} alt='Menu item cover image' fill className='object-cover'/> : null}
                    </div>
                    <p className='text-lg font-medium'>{item.title}</p>
                    <div className='flex justify-between items-center'>
                        <p>{item.price} $</p>
                        <p>{item.category}</p>
                    </div>
                    <div className='w-full h-1 border-t border-gray-300 my-1' />
                    <p className='text-sm text-gray-500'>{item.description}</p>
                </div>)}
        </div>
    </div>
  )
}

export default DisplayMenuItems