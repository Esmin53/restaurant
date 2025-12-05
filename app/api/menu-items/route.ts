import { categories, menuItems } from "@/db/schema"
import { db } from "@/lib/db"
import { and, eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export const GET = async (req: Request, res: Response) => {
    try {

        const { searchParams } = new URL(req.url)

        let category: string | undefined = searchParams.get("category") as string || undefined
        
        const menuItemsArray = await db.select({
            id: menuItems.id,
            title: menuItems.title,
            description: menuItems.description,
            price: menuItems.price,
            image: menuItems.image,
            category: categories.name
        }).from(menuItems).leftJoin(categories, eq(menuItems.categoryId, categories.id))
        .where(and(
            //@ts-ignore
            category && eq(categories.name, category)
        ))

        return new Response(JSON.stringify({data: menuItemsArray}), {status: 200})
    } catch (error) {
        return NextResponse.json({ error})
    }
}