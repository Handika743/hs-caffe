import NextAuth from "next-auth";
import prisma from "./prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./zod";
import { compareSync } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt", maxAge: 86400 },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validateFields = LoginSchema.safeParse(credentials);

        if (!validateFields.success) {
          // Jika validasi input gagal, kembalikan null
          return null;
        }
        const { email, password } = validateFields.data;
        const user = await prisma.user.findUnique({
          where: { email },
        });

        // Jika email tidak ditemukan atau user tidak punya password, kembalikan null
        if (!user || !user.password) {
          console.log("Email tidak ditemukan saat otorisasi."); // Optional: log di server
          return null;
        }

        const passwordMatch = compareSync(password, user.password);
        // Jika password tidak cocok, kembalikan null
        if (!passwordMatch) {
          console.log("Password salah saat otorisasi."); // Optional: log di server
          return null;
        }

        // Jika email dan password benar, kembalikan objek user
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image,
        };
      },
    }),
  ],
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account?.provider === "credentials") {
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.image = user.image;
      }
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      // console.log("[JWT CALLBACK]", token);
      return token;
    },
    async session({ session, token }) {
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("id" in token) {
        session.user.id = token.id;
      }
      if ("name" in token) {
        session.user.name = token.name;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }
      if ("image" in token) {
        session.user.image = token.image;
      }

      return session;
    },
  },
});
