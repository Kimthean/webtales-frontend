import Credentials from "@auth/core/providers/credentials";
import Google from "@auth/core/providers/google";
import type { Session, User } from "@auth/core/types";
import { defineConfig } from "auth-astro";
import { API_URL } from "./src/constants";
import { refreshAccessToken } from "@/lib/token-manager";
import { getTokenExpirationTime } from "@/lib/jwtUtils";

const GoogleClientID = import.meta.env.GOOGLE_CLIENT_ID;
const GoogleClientSecret = import.meta.env.GOOGLE_CLIENT_SECRET;

export default defineConfig({
  debug: true,
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
          provider: "google",
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
            access_token: userData.accessToken,
            refresh_token: userData.refreshToken,
            provider: userData.user.provider,
            role: userData.user.role,
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
          user.access_token = data.accessToken;
          user.refresh_token = data.refreshToken;
          user.provider = data.user.provider;
          user.role = data.user.role;
          return true;
        } catch (error) {
          console.error("Error during Google sign in:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user && user.access_token && user.refresh_token) {
        token.access_token = user.access_token;
        token.refresh_token = user.refresh_token;
        token.expiresAt = getTokenExpirationTime(user.access_token);
        token.id = user.id;
        token.role = user.role;
        token.username = user.name;
        token.provider = user.provider;
      } else if (!token.access_token || !token.refresh_token) {
        return null;
      }

      // Check if the token is about to expire (e.g., within 5 minutes)
      const now = Date.now();
      if (
        token.expiresAt &&
        typeof token.expiresAt === "number" &&
        now > token.expiresAt - 5 * 60 * 1000
      ) {
        try {
          const refreshedTokens = await refreshAccessToken(
            token.refresh_token as string
          );
          token.access_token = refreshedTokens.accessToken;
          token.refresh_token = refreshedTokens.refreshToken;
          token.expiresAt = getTokenExpirationTime(refreshedTokens.accessToken);
        } catch (error) {
          console.error("Error refreshing access token", error);
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }

      return token;
    },
    //@ts-ignore
    async session({ session, token }) {
      if (token && token.access_token && token.refresh_token) {
        session.user = {
          ...session.user,
          access_token: token.access_token as string,
          refresh_token: token.refresh_token as string,
          expiresAt: token.expiresAt as number,
          role: token.role as string,
          provider: token.provider as string,
        };
        return session;
      }
      return null;
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
