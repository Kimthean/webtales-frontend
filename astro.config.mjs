import { defineConfig, passthroughImageService } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from '@astrojs/vercel/serverless';
import icon from "astro-icon";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://webtales-eight.vercel.app',
  integrations: [tailwind(), icon(), react()],
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  }),
  image: {
    service: passthroughImageService(),
    domains: ['img.9999txt.cc'],
    remotePatterns: [{
      protocol: "http",
      hostname: "img.9999txt.cc"
    }, {
      protocol: "https",
      hostname: "img.9999txt.cc"
    }]
  },
  vite: {
    ssr: {
      external: ['@11ty/eleventy-img', 'svgo']
    }
  },
  trailingSlash: 'always'
});