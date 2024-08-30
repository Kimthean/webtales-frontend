import { User as AuthUser } from "@auth/core/types";

declare module "@auth/core/types" {
  interface User extends AuthUser {
    role?: string;
    token?: string;
    provider: string;
  }
}
