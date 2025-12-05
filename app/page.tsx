import Combination from "@/components/Combination";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import MenuItemCarousel from "@/components/MenuItemCarousel";
import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Home() {

  const session = await getServerSession(authOptions)

  console.log("This is session", session?.user)

  return (
    <div className=" w-full">
      <MaxWidthWrapper>
        <div className="w-full mx-auto flex py-4">
          <div className="flex-1 flex items-center pl-24 relative overflow-hidden">
                <div className='flex flex-col gap-2 z-20'>
                <p className="font-medium">Slice of Italy on your doorstep.</p>
                <div>
                    <h1 className='text-[#212529] text-7xl font-bold'>Have a <br />
                    Slice of <br />
                    Pizza</h1>
                </div>
                <p className="font-medium">Or the whole thing?</p>
                <div className='flex items-center'>
                    <div className='w-44 h-12 border-2 hover:bg-accent-custom hover:text-white duration-100 border-accent-custom text-accent-custom rounded-xs flex items-center justify-center font-medium
                     cursor-pointer text-lg'>Menu</div>
                </div>
            </div>
          </div>
            <Image src='/pizza.jpg' alt="Pizza" width={600} height={600} className="object-cover h-140"/>
        </div>
        <div className="w-full flex items-center">
          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold">Lorem, ipsum dolor.</h1>
            <div className="w-4/5 border-t-2 shadow border-t-gray-300 ml-auto my-1" />
            <p className="font-medium">Lorem, ipsum dolor sit amet consectetur adipisicing.</p>
          </div>
        </div>
        <MenuItemCarousel category="pizza"/>
        <div className="w-full mx-auto flex flex-row-reverse py-4">
          <div className="flex-1 flex items-center pl-24">
                <div className='flex flex-col gap-2'>
                <p className="font-medium">Maybe you should</p>
                <div>
                    <h1 className='text-[#212529] text-7xl font-bold'>Order a <br />
                     burger </h1>
                </div>
                <p className="font-medium">Or three?</p>
                <div className='flex items-center'>
                    <div className='w-44 h-12 border-2 hover:bg-accent-custom hover:text-white duration-100 border-accent-custom text-accent-custom rounded-xs flex items-center justify-center font-medium
                     cursor-pointer text-lg'>Menu</div>
                </div>
            </div>
          </div>
            <Image src='/burger.jpg' alt="Burger" width={600} height={600} className="object-cover h-140 "/>
        </div>
          <div className="w-full flex items-center">
          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold">Lorem, ipsum dolor.</h1>
            <div className="w-4/5 border-t-2 shadow border-t-gray-300 ml-auto my-1" />
            <p className="font-medium">Lorem, ipsum dolor sit amet consectetur adipisicing.</p>
          </div>
        </div>
        <MenuItemCarousel category="burger"/>
        <div className="w-full mx-auto flex py-4">
          <div className="flex-1 flex items-center pl-24">
                <div className='flex flex-col gap-2'>
                <p className="font-medium">Order food.</p>
                <div>
                    <h1 className='text-[#212529] text-7xl font-bold'>Delivered <br />
                    in half-hour <br />
                    Or less</h1>
                </div>
                <p className="font-medium">Fresh&Warm</p>
                <div className='flex items-center'>
                    <div className='w-36 h-12 border-2 border-accent text-accent rounded-xs flex items-center justify-center font-medium
                     cursor-pointer text-lg'>Order</div>
                </div>
            </div>
          </div>
            <Image src='/delivery.jpg' alt="Pasta" width={550} height={600} className="object-cover h-160"/>
        </div>
        <div className="w-full space-y-2">
          <div className="w-full flex items-center">
          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold">Find your perfect combination</h1>
            <div className="w-4/5 border-t-2 shadow border-t-gray-300 ml-auto my-1" />
            <p className="font-medium">Find your dream pizza burger and soda team</p>
          </div>
          </div>
          <Combination />
          <div className="w-full flex items-center justify-center pb-6">
            <h1 className="text-2xl font-medium">What else is on the menu?</h1>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
