import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import Google from "next-auth/providers/google";
import { connectToDB } from "@/lib/mongoose";
import User from "@/lib/models/user.model";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDB();
        const user = await User.findOne({ username: credentials.username });
        if (!user) throw new Error("No user found");
        if (
          !credentials?.password ||
          typeof credentials.password !== "string"
        ) {
          throw new Error("Invalid credentials");
        }
        const isValid = await compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");
        return user;
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async signIn({ user, account, profile }) {
      if(!user) return false;
      return true;
    },
    async session({ session, token }) {
      const customToken = token as {
        id: string;
        sensayUserId: string;
        is_admin: boolean;
        username: string;
        image: string;
      };
      session.user.id = customToken.id;
      session.user.sensayUserId = customToken.sensayUserId;
      session.user.is_admin = customToken.is_admin;
      session.user.username = customToken.username;
      session.user.image = customToken.image;
      return session;
    },
    async jwt({ token, user }) {
      await connectToDB();
      
      // `user` only exists on first login
      if (user) {
        const dbUser = await User.findOne({ email: user.email });
        if (dbUser && !dbUser.sensayUserId) {
          const profileImage =
            user.image ||
            "https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_640.png";
          const res = await fetch("https://api.sensay.io/v1/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-ORGANIZATION-SECRET": process.env.ORGANIZATION_SECRET!,
              "X-API-Version": process.env.API_VERSION!,
            },
            body: JSON.stringify({ name: user.name }),
          });

          const data = await res.json();

          dbUser.sensayUserId = data.id;
          dbUser.is_admin = false;
          dbUser.image = profileImage;
          dbUser.username = user.email!.split("@")[0] + Date.now();

          await dbUser.save();
        }

        token.id = dbUser._id.toString();
        token.sensayUserId = dbUser.sensayUserId;
        token.is_admin = dbUser.is_admin;
        token.username = dbUser.username;
        token.image = dbUser.image;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
});