import { menuItems } from "@/db/schema";
import authOptions from "@/lib/auth";
import { db } from "@/lib/db";
import { put } from "@vercel/blob";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export const POST = async (req: Request, res: Response) => {
    try {
        const session = await getServerSession(authOptions)

        if(!session?.user || session?.user.role !== 'admin') {
            return new Response(JSON.stringify({message: "You are not authorized to perform this action!"}), {status: 401})
        }

        const formData = await req.formData();

        const title = formData.get("title") as string
        const description = formData.get("description") as string
        const price = formData.get("price") as string
        const file = formData.get("image") as  File
        const category = formData.get("category") as string

        let imageUrl: string 


            const blob = await put(title, new Blob([file!]), {
            access: "public",
            token: process.env.BLOB_READ_WRITE_TOKEN,
            addRandomSuffix: true,
            contentType: file.type
            });
            imageUrl = blob.url
        
            if(!blob.url) {
                return new Response(JSON.stringify({message: `Image upload has failed, please check file size and try again!`}), {status: 400})
            }
        
            
            const newMenuItem = await db.insert(menuItems).values({
                title: title,
                description: description,
                price: price,
                categoryId: Number(category),
                image: imageUrl
            })
        

        return new Response(JSON.stringify({data: newMenuItem}), {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error})
    }
}