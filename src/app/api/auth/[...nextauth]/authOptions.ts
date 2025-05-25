import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from '@/infrastructure/lib/prisma';
import { verifyPassword } from "@/infrastructure/lib/hash";
import { Restaurants, User } from "@prisma/client";
import { JWT } from "next-auth/jwt";
import { Session, User as NextAuthUser } from "next-auth";

type AuthType = User | Restaurants;

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        code: { label: "Code", type: "text" },
      },
      async authorize(credentials) {
        const { email, password, code } = credentials as { email: string, password: string, code?: string };

        if (code) {
          const restaurantDataResponse = await prisma.restaurants.findFirst({
            where: { access: code },
            include: { environmentReference: true, typeReference: true },
          });
          if (!restaurantDataResponse) return null;
          return restaurantDataResponse;
        }

        const found = await prisma.user.findFirst({ where: { email } });
        if (!found) return null;

        const compare = await verifyPassword(password, found.password);
        if (!compare) return null;

        return found;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/error",
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: { token: JWT & { user?: AuthType }, user?: NextAuthUser | AuthType }) {
      if (user) {
        token.user = user as AuthType;
      }
      return token;
    },
    async session({ session, token }: { session: Session, token: JWT & { user?: AuthType } }) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
};
