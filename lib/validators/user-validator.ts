import z from "zod"

export const UserValidator = z.object({
    name: z.string().min(3, "Name must contain atleast 3 characters").max(21, "Name can't be longer than 21 characters!"),
    password: z.string().min(6, "Password must be between 6 and 21 characters").max(21, "Password must be between 6 and 21 characters"),
    role: z.enum(["customer", "staff", "admin"]),
    position: z.string().nullable().optional(),
    salary: z.number().nullable().optional(),
    location: z.string().nullable().optional()

})

export type TUserValidator = z.infer<typeof UserValidator>