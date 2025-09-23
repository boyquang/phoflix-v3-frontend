import jwt from "jsonwebtoken";
import NextAuth, {
  Account,
  AuthError,
  Profile,
  Session,
  User,
} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { login, registerGoogleAccount } from "./lib/actions/auth-server.action";
import { getUserProfile } from "./lib/actions/user-server.action";
import { JWT } from "next-auth/jwt";
import { NEXTAUTH_JWT_SECRET } from "./constants/env.contant";

export class InvalidLoginError extends AuthError {
  constructor(public code: string, public details?: string) {
    super(details);
    this.code = code;
  }
}

interface IJWT {
  token: JWT;
  user?: User | null;
  account?: Account | null;
  profile?: Profile | null;
  isNewUser?: boolean | null;
}

interface ISESSION {
  session: Session;
  token: JWT;
}

type TypeAccount = "credentials" | "google";

const MAX_AGE = 24 * 60 * 60; // 24 hours

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = credentials;

          const response = await login({
            email: email as string,
            password: password as string,
            typeAccount: "credentials",
          });

          if (!response?.status) {
            throw new InvalidLoginError(response?.code, response?.message);
          }

          return response?.result;
        } catch (error) {
          throw error;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: MAX_AGE,
  },
  jwt: {
    maxAge: MAX_AGE,

    // // sử dụng HS256 để mã hóa token thay vì RS256
    // encode: async ({ token, secret, maxAge }) => {
    //   return jwt.sign(token!, NEXTAUTH_JWT_SECRET as string, {
    //     algorithm: "HS256",
    //   });
    // },

    // // giải mã token sử dụng HS256
    // decode: async ({ token, secret }) => {
    //   return jwt.verify(token!, NEXTAUTH_JWT_SECRET as string, {
    //     algorithms: ["HS256", "RS256"],
    //   }) as JWT;
    // },
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }: IJWT) {
      /**
       * TODO:
       * 1.
       *  1.1 Nếu là tài khoản credentials thì lấy accessToken từ user
       *  1.2 Nếu là tài khoản google thì lấy accessToken từ account
       *   1.2.1 Nếu là tài khoản google thì gọi api getUserProfile để kiểm tra tài khoản đã tồn tại hay chưa
       *   1.2.2 Nếu tài khoản chưa tồn tại thì gọi api registerGoogleAccount để tạo mới tài khoản
       * 2. Gọi api getUserProfile để lấy thông tin người dùng từ backend
       * 3. Gán thông tin người dùng vào token
       * 4. Trả về token
       */

      if (account?.provider === "credentials") {
        if (user?.accessToken) {
          token.accessToken = user?.accessToken;
        }
      } else if (account?.provider === "google") {
        if (account?.id_token) {
          token.accessToken = account?.id_token;
        }
      }

      if (account?.provider === "google") {
        const response = await getUserProfile({
          email: profile?.email as string,
          typeAccount: "google",
          accessToken: token.accessToken as string,
        });

        // nếu chưa có tài khoản thì đăng ký
        if (!response?.result?.user) {
          await registerGoogleAccount({
            email: profile?.email as string,
            name: profile?.name as string,
            avatar: profile?.picture,
            typeAccount: "google",
            password: null,
          });
        }

        token.typeAccount = "google";
      } else if (account?.provider === "credentials") {
        token.typeAccount = "credentials";
      }

      const response = await getUserProfile({
        email: token?.email as string,
        typeAccount: (account?.provider as TypeAccount) ?? token?.typeAccount,
        accessToken: token?.accessToken as string,
      });

      token.id = response?.result?.id;
      token.role = response?.result?.role;
      token.email = response?.result?.email;
      token.image = response?.result?.avatar;
      token.name = response?.result?.username;
      token.typeAccount = response?.result?.typeAccount;
      token.gender = response?.result?.gender;
      token.status = response?.result?.status;
      token.createdAt = response?.result?.createdAt;

      return token;
    },
    // nhận token từ jwt callback và trả về session
    async session({ session, token }: ISESSION) {
      if (!session.user) return session;

      session.user.id = (token?.id as string) || (token?.sub as string);
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.image as string;
      session.user.role = token.role as Role;
      session.user.gender = token.gender as Gender;
      session.user.status = token.status as Status;
      session.user.typeAccount = token.typeAccount as TypeAccount;
      session.user.createdAt = token.createdAt as string;
      session.user.accessToken = token.accessToken as string;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
