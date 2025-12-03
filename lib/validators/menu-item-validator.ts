import z from "zod"

export const MenuItemValidator = z.object({
    title: z.string().min(3, "Title must contain atleast 3 characters").max(100, "Title can't be longer than 100 characters!"),
    price: z.number().min(0.1),
    description: z.string().min(6, "Description must be between 6 and 244 characters").max(244, "Description must be between 6 and 21 characters"),
    image: z.string().optional(),
    category: z.string().min(3, "Category must contain atleast 3 characters").max(100, "Category can't be longer than 100 characters!")
})

export type TMenuItemValidator = z.infer<typeof MenuItemValidator>