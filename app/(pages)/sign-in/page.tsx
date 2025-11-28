"use client"

import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { SignInCredentialsValidator, TSignInCredentialsValidator } from "@/lib/validators/sign-in-validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

const Page = () => {

    const [isLoading, setIsLoading] = useState<boolean >(false)
    const searchParams = useSearchParams()
    const router = useRouter()
    const redirectUrl = searchParams.get("redirectUrl")

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<TSignInCredentialsValidator>({
        resolver: zodResolver(SignInCredentialsValidator)
    })

    const onSubmit: SubmitHandler<TSignInCredentialsValidator> = async ({name, password}) => {
            setIsLoading(true)
            try {
                const res = await signIn("credentials", {name, password, redirect: false})

                if (res?.ok) {
                    toast.success("Login success!")
                    router.push(`${process.env.NEXT_PUBLIC_SERVER_URL}/${redirectUrl ? redirectUrl : ""}`)
                    router.refresh()
                } else {
                    toast.error("Please check your credentials and try again!")
                }
            } catch (error) {
                toast.error("Something went wrong! Please check your network conection and try again!")
                setIsLoading(false)
            } finally {
                setIsLoading(false)
            }

    } 


  return (
    <MaxWidthWrapper>
        <div className="flex w-full items-center justify-center">
            <form className="w-96 h-96 border-2 border-offgray shadow-sm rounded-sm flex flex-col items-center justify-evenly gap-2 p-4" 
            onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col w-full justify-center items-center">
                    <p className="text-sm font-medium">Wellcome to our</p>
                    <h1 className="text-4xl font-medium text-accent">Restaurant</h1>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <div className="flex flex-col gap-1 w-full">
                        <label className="text-sm font-medium">Name</label>
                        <input type="text" placeholder="Name" className="w-full h-10 px-2 border-2 border-offgray shadow-xs" {...register("name")}/>
                        {errors.name ? <p className="text-xs font-semibold text-red-500">&quot;Please provide valid username&quot;</p> : null}
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label className="text-sm font-medium">Password</label>
                        <input type="password" placeholder="Password" className="w-full h-10 px-2 border-2 border-offgray shadow-xs" {...register("password")}/>
                        {errors.password ? <p className="text-xs font-semibold text-red-500">&quot;Please provide valid password&quot;</p> : null}
                    </div>

                    <button type="submit" className="w-full my-2 h-10 border-2 border-accent cursor-pointer text-accent text-lg font-medium hover:bg-accent hover:text-white duration-100 flex items-center justify-center">
                        {isLoading ? <Loader2 className="animate-spin"/> : "Sign in"}
                    </button>
                </div>

            </form>
        </div>
    </MaxWidthWrapper>
  )
}

export default Page