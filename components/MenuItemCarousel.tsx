"use client"

import { useEffect, useState } from 'react'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'
import Image from 'next/image'
import MenuItemCard from './MenuItemCard'

interface MenuItemsCarouselProps {
    category: string
}

const MenuItemCarousel = ({category}: MenuItemsCarouselProps) => {
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
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/menu-items?category=${category}`)

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
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        getMenuItems()
    }, [])

  return (
    <div className='w-full py-2'>
        <Carousel className='w-full'>
            <CarouselContent className='gap-4 '>
                {menuItems.map((item) => <CarouselItem className='basis-1/4 min-w-96 ' key={item.id}>
                        <MenuItemCard {...item} />
                    </CarouselItem>)}
            </CarouselContent>
        </Carousel>
    </div>
  )
}

export default MenuItemCarousel