import { locations, locationStaff, users } from "@/db/schema"
import authOptions from "@/lib/auth"
import { db } from "@/lib/db"
import { put } from "@vercel/blob"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"


export const POST = async (req: Request, res: Response) => {
    try {
        const session = await getServerSession(authOptions)

        if(!session?.user || session?.user.role !== 'admin') {
            return new Response(JSON.stringify({message: "You are not authorized to perform this action!"}), {status: 401})
        }

        const formData = await req.formData();

        const name = formData.get("name") as string
        const password = formData.get("password") as string
        const role = formData.get("role") as "admin" | "staff"
        const file = formData.get("image") as  File | null
        const salary = formData.get("salary") as string
        const location = formData.get("location") as string
        const position = formData.get("position") as string

        let imageUrl: string | null = null

        if (file && name) {
            const blob = await put(name, new Blob([file!]), {
            access: "public",
            token: process.env.BLOB_READ_WRITE_TOKEN,
            addRandomSuffix: true,
            contentType: file.type
            });
            imageUrl = blob.url
        
            if(!blob.url) {
                return new Response(JSON.stringify({message: `Image upload has failed, please check file size and try again!`}), {status: 400})
            }
        }

        
        const [{insertedId}]: {
            insertedId: number
        }[] = await db.insert(users).values({
            name: name,
            password: password,
            role: role,
            image: imageUrl
        }).returning({insertedId: users.id})

        if(!insertedId) {
            return new Response(JSON.stringify({message: `Something went wrong, please try again!`}), {status: 400})
        }

        if (role === "staff" && insertedId) {
            await db.insert(locationStaff).values({
                userId: insertedId,
                locationId: Number(location),
                position,
                salary: salary
            })
        }
        

        return new Response(JSON.stringify({data: insertedId}), {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error})
    }
}

export const GET = async () => {
    try {
        const staff = await db
        .select({
            id: users.id,
            name: users.name,
            image: users.image,
            salary: locationStaff.salary,
            position: locationStaff.position,
            location: locations.name,
            adress: locations.adress
        })
        .from(users)
        .where(eq(users.role, 'staff'))
        .leftJoin(locationStaff, eq(users.id, locationStaff.userId))
        .leftJoin(locations, eq(locationStaff.locationId, locations.id));

        return new Response(JSON.stringify({data: staff}), {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error})
    }
}