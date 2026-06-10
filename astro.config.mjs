import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import tailwindcss from "@tailwindcss/vite";
import mdx from '@astrojs/mdx';
import { defineConfig as defineViteConfig } from 'vite';

import partytown from "@astrojs/partytown";
import svelte from "@astrojs/svelte";

export default defineConfig({
  site: "https://meme.sh/",
  output: 'static',
    image: {
        domains: ['images.unsplash.com'],
    },
  prefetch: true,
  integrations: [
    sitemap({
      customPages: [
        "https://app.meme.sh/#/",
        "https://app.meme.sh/",
      ],
    }),
    react({
            experimentalReactChildren: true,
            experimentalDisableStreaming: true,
        }),    //  Post-Build -> Compress
 
    partytown({
      // dataLayer.push as a forwarding-event.
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    // Svelte
    svelte(),
  ],
  //  Vite
  vite: {
    plugins: [
       tailwindcss(),
    ],
  },
});
