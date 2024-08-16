import { defineConfig, passthroughImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercelServerless from "@astrojs/vercel/serverless";
import icon from "astro-icon";
import react from "@astrojs/react";
import sitemap from '@astrojs/sitemap';


// https://astro.build/config
export default defineConfig({
  site: "https://webtalesmtl.xyz",
  integrations: [tailwind(), icon(), react(),sitemap()],
  output: "server",
  adapter: vercelServerless(),
  image: {
    service: passthroughImageService(),
    domains: ["img.9999txt.cc"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "img.9999txt.cc",
      },
      {
        protocol: "https",
        hostname: "img.9999txt.cc",
      },
    ],
  },
  vite: {
    ssr: {
      external: ["@11ty/eleventy-img", "svgo"],
    },
  },
  // trailingSlash: "always",
});
