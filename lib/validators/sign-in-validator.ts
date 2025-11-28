import z from "zod"


export const SignInCredentialsValidator = z.object({
    name: z.string().min(3, "Your username must contain atleast 3 characters").max(21, "Your username can't be longer than 21 characters!"),
    password: z.string().min(6, "Your password must be between 6 and 21 characters").max(21, "Your password must be between 6 and 21 characters"),
})

export type TSignInCredentialsValidator = z.infer<typeof SignInCredentialsValidator>