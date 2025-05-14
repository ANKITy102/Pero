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
      await connectToDB(); // connect mongoose

      // Check if user exists
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        if (!process.env.ORGANIZATION_SECRET || !process.env.API_VERSION) {
          throw new Error("Missing required environment variables");
        }
        const profileImage =
          user.image ||
          "https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_640.png";
        // Generate sensay user before creating
        const res = await fetch("https://api.sensay.io/v1/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-ORGANIZATION-SECRET": process.env.ORGANIZATION_SECRET,
            "X-API-Version": process.env.API_VERSION,
          },
          body: JSON.stringify({
            name: user.name,
          }),
        });

        const data = await res.json();

        // Add sensayUserId manually after first creation
        await User.updateOne(
          { email: user.email },
          {
            $set: {
              sensayUserId: data.user.uuid,
              is_admin: false,
              image: profileImage,
              username: user!.email!.split('@')[0] + Date.now()
            },
          }
        );
      }

      return true;
    },
    async session({ session, user }) {
      await connectToDB();
      const dbUser = await User.findOne({ email: session.user.email });

      if (dbUser) {
        session.user.id = dbUser._id.toString();
        session.user.sensayUserId = dbUser.sensayUserId;
        session.user.is_admin = dbUser.is_admin;
        session.user.username = dbUser.username;
        session.user.image = dbUser.image
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});
