// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    accessToken?: string;
    role?: Role;
    gender?: Gender;
    status?: Status;
    typeAccount?: TypeAcccount;
    createdAt?: string;
    username?: string;
    image?: string;
  }

  interface Session {
    user: User;
  }
}
