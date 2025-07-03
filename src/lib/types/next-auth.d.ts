// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    accessToken?: string;
    role?: string;
    gender?: string;
    status?: string;
    typeAccount?: "credentials" | "google";
    createdAt?: string;
    username?: string;
    image?: string;
  }

  interface Session {
    user: User;
  }
}
