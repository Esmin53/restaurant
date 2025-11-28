import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "./db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

const authOptions: NextAuthOptions = {
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    providers: [
        Credentials({
            name: "Credentials",
            
            credentials: {
                name: { label: "Name", type: "Name", placeholder: "Name"},
                password: { label: "Password", type: "password"}
            },

            async authorize(credentials, req) {

                if(!credentials?.name || !credentials?.password) {
                    return null
                }

                //implement bycrypt password hashing later

                try {
                    const user = await db.select({
                        id: users.id,
                        name: users.name,
                        role: users.role,
                        password: users.password
                    }).from(users).where(eq(users.password, credentials.password))


                    if(!user[0]) {
                        return null
                    }

                    const isMatch = user[0].password === credentials.password

                    if(!isMatch) {
                        return null
                    } else {
                        return {
                            name: user[0].name,
                            id: user[0].id.toString(),
                            role: user[0].role
                        }
                    }

                } catch (error) {
                    console.log("Ne radi eror se")
                    return null
                }

            },
        })
    ],
    pages: {
        signIn: "/sign-in"
    },
        callbacks: {
        jwt: async ({ user, token}) => {
            if (user) {
                return {
                    id: user.id,
                    name: user.name,
                    role: user?.role
                } 
            }
            return token
        },
        session: async({ session, token }) => {
            if(session?.user) {
                session.user.id = token.id
                session.user.name = token.role,
                session.user.role = token.role
            }
            return Promise.resolve(session)
        },
    },
}

export default authOptions;