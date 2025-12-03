"use client"

import { Check, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface CategoryProps {
    categories: {
        name: string
        id: number
    }[]
    setCategories: React.Dispatch<
    React.SetStateAction<{ name: string; id: number }[]>
  >;
}

const NewCategoryForm = ({categories, setCategories}: CategoryProps) => {
  
    const [category, setCategory] = useState<string >('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSubmit = async () => {
        console.log(category)
        if(category.length === 0) {
            toast.error('Please provide valid category name!')
            return
        }
        setIsLoading(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/dashboard/admin/category`, {
                method: 'POST',
                body: JSON.stringify({
                    category
                })
            })

            const data = await res.json()

            if (res.status === 401 || res.status === 400) {
                toast.error(data.message)
            } 

            if(res.status === 200) {
                setCategories(prev => [...prev, data.data])
            }
  
        } catch (error) {
            toast.error('Please provide valid category name!')
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }

    return (
    <div className='flex flex-col gap-2'>
        <h1 className='text-2xl font-medium'>Add new category</h1>
       <div className=''>
        <form className='w-120 p-2 bg-gray-200 border border-gray-300 flex items-center gap-2' onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
        }}>
            <input className='w-full h-10 bg-gray-100 border border-gray-300 px-2' placeholder='Category' onChange={(e) => setCategory(e.target.value)}/>
            <button className='h-10 aspect-square bg-accent-custom cursor-pointer text-white text-lg flex items-center justify-center' type='submit'>
                {isLoading ? <Loader2 className='animate-spin'/> : <Check />}
            </button>
        </form>
            <div className='flex gap-1'>
                <p className='text-gray-500 font-medium'>Categories: </p>
                {categories.map((item) => <p key={item.id}>{item.name},</p>)}
            </div>
       </div>
    </div>
  )
}

export default NewCategoryForm