import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";


// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  scopedStyleStrategy: "where",
  output: "hybrid",
  vite: {
    ssr: {
      external: ['@11ty/eleventy-img', 'svgo']
    }
  }
});