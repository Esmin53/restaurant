"use client"

import { ChevronDown, Loader2, LucideImage, Trash2 } from 'lucide-react'
import { Textarea } from '../ui/textarea'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MenuItemValidator, TMenuItemValidator } from '@/lib/validators/menu-item-validator'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'

interface CategoryProps {
    categories: {
        name: string
        id: number
    }[]
}

const NewMenuItem = ({categories}: CategoryProps) => {
        
        const inputFileRef = useRef<HTMLInputElement>(null)
        const [preview, setPreview] = useState<string | null>(null)
        const [isLoading, setIsLoading] = useState<boolean>(false)

        const {
            register,
            handleSubmit,
            setValue,
            watch,
            reset,
            formState: {errors}
        } = useForm<TMenuItemValidator>({
            resolver: zodResolver(MenuItemValidator)
        })

        const onSubmit: SubmitHandler<TMenuItemValidator> = async ({title, price, description, category}) => {
            setIsLoading(true)
            try {


                let file: File | null = null

                if(inputFileRef?.current && inputFileRef?.current?.files) {
                    file = inputFileRef?.current.files[0];
                } else {
                    setIsLoading(false)
                    toast.error("Please provide valid cover image")
                    return
                }
                    
                        const categoryId = categories.find((item) => item.name === category)
                        
                        if(!categoryId) {
                            toast.error('Please provide valid category!')
                            return
                        }

                        const formData = new FormData();
                        file && formData.append("image", file);
                        formData.append("title", title);
                        formData.append("description", description);
                        formData.append("category", categoryId?.id.toString())
                        formData.append("price", price.toString());

                    const res = await fetch(
                        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/dashboard/admin/menu-item`,
                            {
                        method: 'POST',
                        body: formData
                        },
                    );
                    
                    const data = await res.json()


                    if (res.status === 200) {
                        toast.success("New menu item added")
                        reset()
                        setPreview(null)
                        if (inputFileRef.current && inputFileRef.current.files) {
                            inputFileRef.current.files = null
                        }
                    } else if (res.status === 401) {
                        toast.error(data.message || "Unauthorized!")
                    } else if (res.status === 400) {
                        toast.error(data.message || "Bad request")
                    }
                    
                    
            } catch (error) {
                toast.error("Something went wrong! Please check your network connection and try again!")
                setIsLoading(false)
            } finally {
                setIsLoading(false)
            }

    } 

  return (
    <div className='w-full h-fit space-y-1'>
    <h1 className='text-2xl font-medium'>New meal form</h1>
    <form className='w-full h-fit bg-gray-200 border border-gray-300 grid grid-cols-3 gap-2 p-2' onSubmit={handleSubmit(onSubmit)}>
        <div className='w-full h-full flex flex-col gap-2'>
            
            <div>
                <label htmlFor='title'>Title</label>
                <input className='w-full h-10 bg-gray-100 border border-gray-300 px-2' placeholder='Title' {...register('title')}></input>
            </div>
            <div>
                <label htmlFor='title'>Price</label>
                <input className='w-full h-10 bg-gray-100 border border-gray-300 px-2' placeholder='Price' {...register('price', {
                    valueAsNumber: true,
                })} />
            </div>
            <div>
                <p>Category</p>
                <DropdownMenu>
                    <DropdownMenuTrigger className='w-full h-10 bg-gray-100 border border-gray-300 cursor-pointer flex justify-between items-center px-2 text-gray-600'>
                        {watch('category') ? <p className='text-text-custom'>{watch('category')}</p> : <p>Category</p>}
                        <ChevronDown />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-screen max-w-76 rounded-none bg-gray-100 border border-gray-300'>
                            {categories.map((item) => <DropdownMenuItem className='cursor-pointer' key={item.id} onClick={() => setValue('category', item.name)}>{item.name}</DropdownMenuItem>)}
                    </DropdownMenuContent>
                </DropdownMenu>        
            </div>
        </div>
        <div className='w-full h-full flex flex-col gap-2'>
            <div className='flex-1 flex flex-col'>
                <label htmlFor='title'>Description</label>
                <Textarea className='flex-1 border border-gray-300 bg-gray-100 rounded-none' placeholder='Description...' {...register('description')}/>
            </div>
        </div>
        <div className='w-full h-full flex flex-col gap-2'>
            <div className='flex-1 min-h-56 border-4 border-dashed border-gray-100 flex flex-col items-center justify-center relative'>
                    <input
                    type="file"
                    name="file"
                    ref={inputFileRef}
                    accept="image/jpeg, image/png, image/webp"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30"
                    onChange={(e) => {
                        if(e.target.files) {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            const url = URL.createObjectURL(file);
                            setPreview(url);
                        }
                    
                    }}
                    />
                {preview ? <Image src={preview} alt='Image preview' fill className='z-30 object-cover' /> : null}
                {preview ? <Trash2 className='absolute top-0 -right-2 text-red-500 z-40 cursor-pointer' onClick={() => {
                        setPreview(null)
                        if (inputFileRef.current && inputFileRef.current.files) {
                            inputFileRef.current.files = null
                        }
                    }}/> : null}               
                <div className='absolute flex flex-col gap-1 items-center'>
                    <LucideImage className='w-12 h-12' />
                    <p className='text-sm text-gray-600'>File size can not exceed 4.5mb</p>
                </div>
            </div>
            <button className='w-full h-10 bg-accent-custom text-white cursor-pointer flex items-center justify-center'>
                {isLoading ? <Loader2 className='animate-spin'/> : "Add"}
            </button>
        </div>
    </form>
    </div>
  )
}

export default NewMenuItem