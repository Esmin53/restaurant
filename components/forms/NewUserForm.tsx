import { ChevronDown, LucideLoader2, Trash2, UserPlus } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { toast } from 'sonner'
import { TUserValidator, UserValidator } from '@/lib/validators/user-validator'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import Image from 'next/image'

const NewUserForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [locations, setLocations] = useState<{
        name: string
        id: number
    }[] >([])
    const [preview, setPreview] = useState<string | null>(null)
    const inputFileRef = useRef<HTMLInputElement>(null);
    


    
        const getLocations = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/dashboard/admin/locations`, {
                    method: 'GET'
                })
    
                const {data}: {  
                    data: {
                        name: string
                        id: number
                    }[]
    
                    
                } = await response.json()
    
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

            const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: {errors}
    } = useForm<TUserValidator>({
        resolver: zodResolver(UserValidator)
    })

        const onSubmit: SubmitHandler<TUserValidator> = async ({name, password, salary, location, position, role}) => {
            setIsLoading(true)
            try {
                console.log(role)
                if (!role) {
                    toast.error("Please select role for new user");
                    return
                }

                if(role === "staff") {
                    if(!salary || !location || !position) {
                        toast.error("Please provide all the required information")
                        return
                    }
                }

                let file: File | null = null

                if(role === "staff" && !preview) {
                    toast.error("Please add users profile picture")
                    return
                }

                if(inputFileRef?.current && inputFileRef?.current?.files) {
                    file = inputFileRef?.current.files[0];
                }
                    
                        let locationId = locations.find(({name}) => name === location) || null

                        const formData = new FormData();
                        file && formData.append("image", file);
                        formData.append("name", name);
                        formData.append("password", password);
                        formData.append("role", role)
                        salary && formData.append("salary", salary.toString());
                        locationId && formData.append("location", locationId?.id.toString());
                        position && formData.append("position", position);

                    const res = await fetch(
                        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/dashboard/admin/staff`,
                            {
                        method: 'POST',
                        body: formData
                        },
                    );
                    
                    const data = await res.json()

                    if (res.status === 200) {
                        toast.success("New user added")
                        reset()
                        setPreview(null)
                        if (inputFileRef.current && inputFileRef.current.files) {
                            inputFileRef.current.files = null
                        }
                        setValue('salary', 0)
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
            <form className='w-80 bg-gray-200 p-2 flex flex-col gap-1 items-center border border-gray-300 sticky top-2 h-fit' onSubmit={handleSubmit(onSubmit)}>
                <div className='w-36 h-36 rounded-full bg-gray-100 border-4 border-gray-300 flex items-center justify-center cursor-pointer relative'>
                    <input
                    type="file"
                    name="file"
                    ref={inputFileRef}
                    accept="image/jpeg, image/png, image/webp"
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
                    {preview ? <Image src={preview} alt='Preview image' fill className='rounded-full object-cover'/> : null}
                    <UserPlus className='w-16 h-16 text-gray-300' />
                    {preview ? <Trash2 className='absolute top-0 -right-4 text-red-500' onClick={() => {
                        setPreview(null)
                        if (inputFileRef.current && inputFileRef.current.files) {
                            inputFileRef.current.files = null
                        }
                    }}/> : null}
                </div>
                <div className='w-full'>
                    <label htmlFor='name' className='text-sm font-medium'>Name</label>
                    <input type='text' placeholder='Name' className='w-full h-9 border-gray-300 border bg-gray-100 px-2' {...register("name")} />
                    {errors.name ? <p className="text-xs font-semibold text-red-500">{errors.name.message}</p> : null}
                </div>
                <div className='w-full'>
                    <label htmlFor='password' className='text-sm font-medium'>Password</label>
                    <input type='password'  placeholder='Password' className='w-full h-9 border-gray-300 border bg-gray-100 px-2' {...register("password")} />
                    {errors.password ? <p className="text-xs font-semibold text-red-500">{errors.password.message}</p> : null}
                </div>
                {<div className='w-full'>
                    <label htmlFor='salary' className='text-sm font-medium' {...register("salary")}>Salary</label>
                    <input type='number' defaultValue={0.0} min={0} step="0.01" placeholder='Salary (keep at 0 for admin)' className='w-full h-9 border-gray-300 border bg-gray-100 px-2' {...register("salary", {
                        valueAsNumber: true
                    })} />
                    {errors.salary ? <p className="text-xs font-semibold text-red-500">Please provide salary amount</p> : null}
                </div>}
                <div className='w-full h-0.5 bg-gray-400 shadow' />
                <DropdownMenu>
                    <DropdownMenuTrigger className='w-full h-10 bg-gray-100 border border-gray-300 cursor-pointer flex justify-between items-center px-2 text-gray-600'>
                        {watch('role') ? <p className='text-text-custom'>{watch('role')}</p> : "Role"}
                        <ChevronDown />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-screen max-w-76 rounded-none bg-gray-100 border border-gray-300'>
                            <DropdownMenuItem className='cursor-pointer' onClick={() => setValue('role', 'admin')}>Admin</DropdownMenuItem>
                            <DropdownMenuItem className='cursor-pointer' onClick={() => setValue('role', 'staff')}>Staff</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger className='w-full h-10 bg-gray-100 border border-gray-300 cursor-pointer flex items-center justify-between px-2 text-gray-600'>
                        {watch('location') ? <p className='text-text-custom'>{watch('location')}</p> : "Location"}
                        <ChevronDown />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-screen max-w-76 rounded-none bg-gray-100 border border-gray-300'>
                            {locations.map((item, i) => <DropdownMenuItem className='cursor-pointer' key={i} onClick={() => 
                                watch('location') === item.name ? setValue('location', null) : setValue('location', item.name)
                            }>{item.name}</DropdownMenuItem>)}
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger className='w-full h-10 bg-gray-100 border border-gray-300 cursor-pointer flex items-center px-2 text-gray-600'>
                         {watch('position') ? <p className='text-text-custom'>{watch('position')}</p> : "Position"}
                         <span className='text-sm text-gray-500'>(Keep empty if admin)</span>
                        <ChevronDown className='ml-auto'/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-screen max-w-76 rounded-none bg-gray-100 border border-gray-300'>
                            <DropdownMenuItem className='cursor-pointer' onClick={() => 
                                watch('position') === 'manager' ? setValue('position', null) : setValue('position', 'manager')
                            }>Manager</DropdownMenuItem>
                            <DropdownMenuItem className='cursor-pointer' onClick={() => 
                                watch('position') === 'cook' ? setValue('position', null) : setValue('position', 'cook')
                            }>Cook</DropdownMenuItem>
                            <DropdownMenuItem className='cursor-pointer' onClick={() => 
                                watch('position') === 'delivery' ? setValue('position', null) : setValue('position', 'delivery')
                            }>Delivery</DropdownMenuItem>
                            <DropdownMenuItem className='cursor-pointer' onClick={() => 
                                watch('position') === 'waiter' ? setValue('position', null) : setValue('position', 'waiter')
                            }>Waiter</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <button type="submit" className='w-full h-9 text-white flex items-center justify-center font-medium bg-accent-custom cursor-pointer shadow-xs my-2'>{isLoading ? <LucideLoader2 className="animate-spin" /> : "Add" }</button>

            </form>
  )
}

export default NewUserForm