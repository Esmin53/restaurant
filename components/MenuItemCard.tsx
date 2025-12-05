import Image from 'next/image'
import React from 'react'

interface MenuItemCardProps {
        id: number,
        title: string,
        description: string,
        price: string,
        image: string,
        category: string
}

const MenuItemCard = ({image, title, price, category, id, description}: MenuItemCardProps) => {
  return (
    <div className='basis-1/4 h-full min-w-96 aspect-square bg-[#ebf2fa] shadow border border-gray-300 flex flex-col p-2' key={id}>
        <div className='relative h-58'>
            {image ? <Image src={image} alt='Menu item cover image' fill className='object-cover'/> : null}
        </div>
        <p className='text-lg font-medium'>{title}</p>
        <div className='flex justify-between items-center'>
            <p className='font-medium'>{price} $</p>
            <p>{category}</p>
        </div>
        <div className='w-full h-1 border-t border-gray-300 my-1' />
        <p className='text-sm text-gray-500 mb-1'>{description.length > 80 ? `${description.slice(0, 80)}...` : description}</p>
        <button className='w-full h-9 flex items-center text-white justify-center bg-accent-custom cursor-pointer mt-auto hover:bg-accent-custom/90'>Add to cart</button>
    </div>
  )
}

export default MenuItemCard