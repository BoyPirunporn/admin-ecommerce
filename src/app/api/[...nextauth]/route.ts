import NextAuth from "next-auth"
import { authOptoins } from "./auth"

const handler = NextAuth(authOptoins)

export { handler as GET, handler as POST }