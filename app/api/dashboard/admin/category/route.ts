import { categories } from "@/db/schema"
import authOptions from "@/lib/auth"
import { db } from "@/lib/db"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"


export const POST = async (req: Request, res: Response) => {
    try {
        const session = await getServerSession(authOptions)

        if(!session?.user || session?.user.role !== 'admin') {
            return new Response(JSON.stringify({message: "You are not authorized to perform this action!"}), {status: 401})
        }

        const {category} = await req.json()

        const categoryExists = await db.select().from(categories).where(eq(categories.name, category))

        if(categoryExists.length) {
            return new Response(JSON.stringify({message: "That category already exists!"}), {status: 400})
        }

        const [newCategory] = await db.insert(categories).values({
            name: category
        }).returning({
            name: categories.name,
            id: categories.id
        })

        return new Response(JSON.stringify({data: newCategory}), {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error})
    }
}

export const GET = async () => {
    try {
        
        const categoriesArray = await db.select({
            name: categories.name,
            id: categories.id
        }).from(categories)
        
        return new Response(JSON.stringify({data: categoriesArray}), {status: 200})
    } catch (error) {
        return NextResponse.json({ error})
    }
}