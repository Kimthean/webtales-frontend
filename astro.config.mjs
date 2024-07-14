import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  integrations: [tailwind()],
  output: "server",
  adapter: vercel(),
  image: {
    domains: ['img.9999txt.cc'],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "img.9999txt.cc",
      },
      {
        protocol: "https",
        hostname: "img.9999txt.cc",
      }
    ],
  },
  vite: {
    ssr: {
      external: ['@11ty/eleventy-img', 'svgo']
    }
  }
});