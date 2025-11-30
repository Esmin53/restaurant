import z from "zod"


export const LocationValidator = z.object({
    name: z.string().min(6, "Name must contain atleast 6 characters").max(21, "Your username can't be longer than 21 characters!"),
    adress: z.string().min(6, "Adress must be between 6 and 120 characters").max(120, "Your password must be between 6 and 21 characters"),
    image: z.string().optional()
})

export type TLocationValidator = z.infer<typeof LocationValidator>