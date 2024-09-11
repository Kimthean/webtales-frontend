import { User as AuthUser } from "@auth/core/types";

declare module "@auth/core/types" {
  interface User extends AuthUser {
    role?: string;
    provider: string;
    access_token?: string;
    refresh_token?: string;
    expiresAt?: number;
  }
  interface Session extends DefaultSession {
    user: {
      id: number;
      email: string;
      name: string;
      image: string;
      username: string;
      role: string;
      provider: string;
      access_token: string;
      refresh_token: string;
      expiresAt: number;
    } & DefaultSession["user"];
  }
}
