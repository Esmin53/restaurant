"use client"

import { useEffect, useState } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import MenuItemCard from "./MenuItemCard"

type Data = {
                id: number,
                title: string,
                description: string,
                price: string,
                image: string,
                category: string
            }[]

const Combination = () => {

    const [pizza, setPiza] = useState<Data>([])
    const [burger, setBurger] = useState<Data>([])
    const [drink, setDrink] = useState<Data>([])

    const getMenuItems = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/menu-items/combination`)

            const {data}: {
                data: Data
            } = await res.json()

            
            let tempPizza: Data = []
            let tempBurger: Data = []
            let tempDrink: Data = []

            data.forEach((item) => {
                if(item.category === 'pizza')
                    tempPizza.push(item)
                else if(item.category === 'burger')
                    tempBurger.push(item)
                else if(item.category === 'drink')
                    tempDrink.push(item)
            })

            setPiza([...tempPizza])
            setBurger([...tempBurger])
            setDrink([...tempDrink])
            
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        getMenuItems()
    }, [])



  return (
    <div className='w-full grid grid-cols-3 gap-4 py-4'>
        <Carousel orientation="vertical" className="w-full">
            <CarouselContent className="w-full h-110">   
                {pizza.map((item) => <CarouselItem className="basis-1/1 py-4 h-94" key={item.title}>
                    <MenuItemCard {...item} />
                </CarouselItem>)}
            </CarouselContent>
                <CarouselNext className="bottom-2 left-11/12 cursor-pointer w-10 h-10"/>
                <CarouselPrevious className="top-2 left-1/12 cursor-pointer w-10 h-10"/>
        </Carousel>
        <Carousel orientation="vertical">
            <CarouselContent className="w-full h-110">   
              {burger.map((item) => <CarouselItem className="basis-1/1 py-4 h-94" key={item.title}>
                    <MenuItemCard {...item} />
                </CarouselItem>)}
            </CarouselContent>  
            <CarouselNext className="bottom-2 left-11/12 cursor-pointer w-10 h-10"/>
            <CarouselPrevious className="top-2 left-1/12 cursor-pointer w-10 h-10"/>
        </Carousel>
        <Carousel orientation="vertical">
            <CarouselContent className="w-full h-110">   
              {drink.map((item) => <CarouselItem className="basis-1/1 py-4 h-94" key={item.title}>
                    <MenuItemCard {...item} />
                </CarouselItem>)}
            </CarouselContent> 
            <CarouselNext className="bottom-2 left-11/12 cursor-pointer w-10 h-10"/>
            <CarouselPrevious className="top-2 left-1/12 cursor-pointer w-10 h-10"/> 
        </Carousel>
    </div>
  )
}

export default Combination