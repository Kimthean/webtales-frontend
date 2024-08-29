import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercelServerless from "@astrojs/vercel/serverless";
import icon from "astro-icon";
import sitemap from '@astrojs/sitemap';
import preact from '@astrojs/preact';

import auth from "auth-astro";

// https://astro.build/config
export default defineConfig({
  site: "https://webtalesmtl.xyz",
  integrations: [tailwind(), icon(), sitemap(), preact({
    compat: true
  }), auth()],
  output: "server",
  adapter: vercelServerless(),
  vite: {
    ssr: {
      external: ["@11ty/eleventy-img", "svgo"]
    },
    server: {
      hmr: false
    }
  },
  trailingSlash: "never"
});