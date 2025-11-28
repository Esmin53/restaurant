import NextAuth from "next-auth"


type UserId = string
type name = string
type Role = string

declare module 'next-auth/jwt' {
  interface JWT {
    id: UserId
    name: name
    role: Role
  }
}

declare module "next-auth" {

  interface Session {
    user: {
        id: string
        name: string
        role: string
    }
  }
  interface User {
    id: string;
    name: string;
    role: string;
  }

}

export type SessionUser = {
  user:  {
    id: string;
    name: string;
    role: string;
} | undefined
}
