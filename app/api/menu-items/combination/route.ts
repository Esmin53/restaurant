import { categories, menuItems } from "@/db/schema"
import { db } from "@/lib/db"
import { and, eq, or } from "drizzle-orm"
import { NextResponse } from "next/server"

export const GET = async (req: Request, res: Response) => {
    try {
        const { searchParams } = new URL(req.url)
        
        const menuItemsArray = await db.select({
            id: menuItems.id,
            title: menuItems.title,
            description: menuItems.description,
            price: menuItems.price,
            image: menuItems.image,
            category: categories.name
        }).from(menuItems).leftJoin(categories, eq(menuItems.categoryId, categories.id))
        .where(or(
            eq(categories.name, 'pizza'),
            eq(categories.name, 'burger'),
            eq(categories.name, 'drink'),
        ))

        return new Response(JSON.stringify({data: menuItemsArray}), {status: 200})
    } catch (error) {
        return NextResponse.json({ error})
    }
}