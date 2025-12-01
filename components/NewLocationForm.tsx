"use client"

import { LocationValidator, TLocationValidator } from "@/lib/validators/location-validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { LucideImage, LucideLoader2, Trash2 } from "lucide-react"
import { useRef, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import Image from "next/image"

const NewLocationForm = () => {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false)
    const [preview, setPreview] = useState<string | null >(null)

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<TLocationValidator>({
        resolver: zodResolver(LocationValidator)
    })

        const onSubmit: SubmitHandler<TLocationValidator> = async ({name, adress}) => {
            setIsLoading(true)
            try {

                if (!inputFileRef.current?.files) {
                    throw new Error("No file selected");
                }

                    const file = inputFileRef.current.files[0];

                        const formData = new FormData();
                        formData.append("file", file);
                        formData.append("name", name);
                        formData.append("adress", adress);

                        console.log("Radi", formData)

                    const res = await fetch(
                        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/dashboard/admin/locations`,
                            {
                        method: 'POST',
                        body: formData,
                        },
                    );
                    
                    const data = await res.json()

                    if (res.status === 200) {
                        toast.success("New location added")
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
        <form className='w-80 aspect-square bg-gray-200 p-2 flex flex-col gap-1 sticky top-2 h-fit border border-gray-300' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex-1 border-2 border-gray-100 border-dashed cursor-pointer relative flex items-center justify-center'>
                {preview ? <Image src={preview} alt="File preview" fill className="object-cover absolute z-30"/> : null}
                {preview ? <Trash2 className="absolute top-2 right-2 z-40 cursor-pointer text-red-500" onClick={() => {
                    setPreview(null)
                    if (inputFileRef.current && inputFileRef.current.files) {
                        inputFileRef.current.files = null
                    }
                }}/> : null}
                <input
                type="file"
                name="file"
                ref={inputFileRef}
                accept="image/jpeg, image/png, image/webp"
                required
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => {
                    if(e.target.files) {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        const url = URL.createObjectURL(file);
                        setPreview(url);
                    }
                    
                }}
                />
                <div className='absolute flex flex-col items-center justify-center'>
                    <LucideImage className="w-8 h-8"/>
                    <p className="text-sm text-gray-500">File size can not exceed 4.5mb</p>
                </div>
            </div>
            <div>
                <input type='text' className='w-full h-9 border-gray-300 border bg-gray-100 px-2' placeholder='Name' {...register("name")}/>
                {errors.name ? <p className="text-xs font-semibold text-red-500">Please provide valid name</p> : null}
            </div>
            <div>
                <input type='text' className='w-full h-9 border-gray-300 border bg-gray-100 px-2' placeholder='Adress' {...register("adress")}/>
                {errors.adress ? <p className="text-xs font-semibold text-red-500">Please provide valid adress</p> : null} 
            </div>
            <button type="submit" className='w-full h-9 text-white flex items-center justify-center font-medium bg-accent-custom cursor-pointer'>{isLoading ? <LucideLoader2 className="animate-spin" /> : "Add" }</button>
        </form>
  )
}

export default NewLocationForm