import Credentials from "@auth/core/providers/credentials";
import Google from "@auth/core/providers/google";
import type { User } from "@auth/core/types";
import { defineConfig } from "auth-astro";
import { API_URL } from "./src/constants";

const GoogleClientID = import.meta.env.GOOGLE_CLIENT_ID;
const GoogleClientSecret = import.meta.env.GOOGLE_CLIENT_SECRET;

export default defineConfig({
  // debug: true,
  providers: [
    Google({
      clientId: GoogleClientID,
      clientSecret: GoogleClientSecret,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials): Promise<User | null> => {
        try {
          const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          });

          if (!res.ok) {
            return null;
          }

          const userData = await res.json();

          return {
            id: userData.user.id,
            name: userData.user.username,
            email: userData.user.email,
            image: userData.user.profileImage,
            token: userData.token,
          } as User;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          const response = await fetch(`${API_URL}/auth/google/callback`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              code: account.id_token,
              email: user.email,
              name: user.name,
              picture: user.image,
              googleId: profile?.sub,
            }),
          });

          if (!response.ok) {
            return false;
          }

          const data = await response.json();
          user.id = data.user.id;
          (user as any).token = data.token;
          return true;
        } catch (error) {
          console.error("Error during Google sign in:", error);
          return false;
        }
      }
      return true;
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = (user as any).role;
        token.token = (user as any).token;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email || "";
        (session.user as any).role = token.role;
        (session.user as any).token = token.token;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  trustHost: true,
});
