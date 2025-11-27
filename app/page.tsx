import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" w-full">
      <MaxWidthWrapper>
        <div className="w-full max-w-6xl mx-auto flex py-4">
          <div className="flex-1 flex items-center pl-24">
                <div className='flex flex-col gap-2'>
                <p className="font-medium">Slice of Italy on your doorstep.</p>
                <div>
                    <h1 className='text-[#212529] text-7xl font-bold'>Have a <br />
                    Slice of <br />
                    Pizza</h1>
                </div>
                <p className="font-medium">Or the whole thing?</p>
                <div className='flex items-center'>
                    <div className='w-36 h-12 border-2 border-accent text-accent rounded-xs flex items-center justify-center font-medium
                     cursor-pointer text-lg'>Order</div>
                </div>
            </div>
          </div>
            <Image src='/pizza.jpg' alt="Pizza" width={550} height={600} className="object-cover h-140"/>
        </div>
        <div className="w-full max-w-6xl mx-auto flex flex-row-reverse py-4">
          <div className="flex-1 flex items-center pl-24">
                <div className='flex flex-col gap-2'>
                <div>
                    <h1 className='text-[#212529] text-7xl font-bold'>Order a <br />
                     burger </h1>
                </div>
                <p className="font-medium">Or three?</p>
                <div className='flex items-center'>
                    <div className='w-36 h-12 border-2 border-accent text-accent rounded-xs flex items-center justify-center font-medium
                     cursor-pointer text-lg'>Order</div>
                </div>
            </div>
          </div>
            <Image src='/burger.jpg' alt="Burger" width={550} height={600} className="object-cover h-140 "/>
        </div>
        <div className="w-full max-w-6xl mx-auto flex py-4">
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
        <div className="w-full max-w-6xl mx-auto flex py-4 flex-row-reverse">
          <div className="flex-1 flex items-center pl-24">
                <div className='flex flex-col gap-2'>
                <div>
                    <h1 className='text-[#212529] text-7xl font-bold'>Get a <br />
                    Fresh <br />
                    Beverage</h1>
                </div>
                <div className='flex items-center'>
                    <div className='w-36 h-12 border-2 border-accent text-accent rounded-xs flex items-center justify-center font-medium
                     cursor-pointer text-lg'>Order</div>
                </div>
            </div>
          </div>
            <Image src='/cola.jpg' alt="Cola" width={550} height={600} className="object-cover h-140"/>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
