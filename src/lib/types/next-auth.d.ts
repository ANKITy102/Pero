// types/next-auth.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image: string;
      sensayUserId: string;
      is_admin: boolean;
      username: string;
    };
  }

  interface User {
    id: string;
    sensayUserId: string;
    is_admin: boolean;
    username: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    sensayUserId: string;
    is_admin: boolean;
    username: string;
    image: string;
  }
}
