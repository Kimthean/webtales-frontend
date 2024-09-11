import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercelServerless from "@astrojs/vercel/serverless";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import auth from "auth-astro";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://webtalesmtl.xyz",
  integrations: [tailwind(), icon(), sitemap(), auth(), react()],
  output: "server",
  adapter: vercelServerless(),
  vite: {
    ssr: {
      external: ["@11ty/eleventy-img", "svgo"],
    },
  },
  trailingSlash: "never",
});
