import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercelServerless from "@astrojs/vercel/serverless";
import icon from "astro-icon";
import react from "@astrojs/react";
import sitemap from '@astrojs/sitemap';
import preact from '@astrojs/preact';



// https://astro.build/config
export default defineConfig({
  site: "https://webtalesmtl.xyz",
  integrations: [tailwind(), icon(), react(),sitemap(),preact({ compat: true })],
  output: "server",
  adapter: vercelServerless(),
  vite: {
    ssr: {
      external: ["@11ty/eleventy-img", "svgo"],
    },
    server: {
      hmr: false
    }

  },
  trailingSlash: "always",
});
