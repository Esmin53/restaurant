"use client"

import DisplayMenuItems from '@/components/DisplayMenuItems'
import NewCategoryForm from '@/components/forms/NewCategoryForm'
import NewMenuItem from '@/components/forms/NewMenuItem'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { CookingPot } from 'lucide-react'
import { useEffect, useState } from 'react'

const page = () => {

    const [categories, setCategories] = useState<{
        name: string
        id: number
    }[]>([])

    const getCategories = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/dashboard/admin/category`)

            const {data}: {
                data: {
                    name: string
                    id: number
                }[]
            } = await res.json()


            setCategories(data)
            console.log("Cat", categories)
            console.log("DAta", data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

  return (
        <MaxWidthWrapper>
          <div className="w-full flex flex-col gap-2">
              <div className='w-full flex-1 flex flex-col gap-2'>
                    <div className='flex gap-2 items-center pb-2 border-b-2 border-b-offgray'>
                        <h1 className=' text-2xl font-medium'>Menu</h1>
                        <CookingPot className='w-7 h-7'/>
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <NewCategoryForm categories={categories} setCategories={setCategories}/>
                        <NewMenuItem categories={categories}/>
                    </div>
                    <DisplayMenuItems />                   
              </div>

          </div>
        </MaxWidthWrapper>
  )
}

export default page