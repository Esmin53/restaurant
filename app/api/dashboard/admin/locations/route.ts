import { locations } from "@/db/schema";
import authOptions from "@/lib/auth";
import { db } from "@/lib/db";
import { put } from "@vercel/blob";
import { eq, or } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"


export const POST = async (req: Request, res: Response) => {
    try {

        const session = await getServerSession(authOptions)

        if(!session?.user || session?.user.role !== 'admin') {
            return new Response(JSON.stringify({message: "You are not authorized to perform this action!"}), {status: 401})
        } else {
            console.log(session.user)
        }


        const formData = await req.formData();

        const file = formData.get("file") as File | null;
        const name = formData.get("name") as string;
        const adress = formData.get("adress") as string;

        const locationExists = await db.select({
            name: locations.name,
            adress: locations.adress
        }).from(locations).where(or(eq(locations.name, name), eq(locations.adress, adress)))

        if(locationExists.length > 0) {
            return new Response(JSON.stringify({message: `Location with name: ${locationExists[0].name} and adress: ${locationExists[0].adress} already exists`}), {status: 400})
        }


        if (file === null)
        return NextResponse.json({ ok: "file je null"})

         const blob = await put(name, new Blob([file!]), {
            access: "public",
            token: process.env.BLOB_READ_WRITE_TOKEN,
            addRandomSuffix: true,
            contentType: file.type
        });


        if(!blob.url) {
            return new Response(JSON.stringify({message: `Image upload has failed, please check file size and try again!`}), {status: 400})
        }

        const newLocation = await db.insert(locations).values({
            adress: adress,
            name: name,
            image: blob.url
        })

        return new Response(JSON.stringify({message: "Location added sucessfully"}), {status: 200})
    } catch (error) {
     console.log(error)   
     return NextResponse.json({ error})
    }
}