import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authorizeUser } from "./services/user"
import type { Provider } from "next-auth/providers"



const providers: Provider[] = [
  Credentials({
        credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
          if (!credentials) return null
          const user = await authorizeUser({
            email: credentials.email as string,
            password: credentials.password as string
          })
          if (!user) return null
          return { ...user, id: user.id.toString() }
        }
      })
]

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) { // User is available during sign-in
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id
      return session
    },
  },
})