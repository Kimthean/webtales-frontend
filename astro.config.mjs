import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from '@astrojs/vercel/serverless';


// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: "server",
  adapter: vercel(),
  image: {
    remotePatterns: [{ protocol: "http", hostname: "img.9999txt.cc" }],
      domains: ['img.9999txt.cc'],
  },
  vite: {
    ssr: {
      external: ['@11ty/eleventy-img', 'svgo']
    }
  }
});