import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
      sensayUserId?: string;
      is_admin?: boolean;
      username?:string;
    };
  }

  interface User {
    id: string;
    sensayUserId?: string;
    is_admin?: boolean;
  }
}
