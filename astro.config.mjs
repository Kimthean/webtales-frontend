import { defineConfig, passthroughImageService } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://webtales-eight.vercel.app',
  integrations: [tailwind()],
  output: "server",
  adapter: vercel(),
  image: {
    service: passthroughImageService(),
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