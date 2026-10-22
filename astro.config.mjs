import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import sitemap from '@astrojs/sitemap';

// Sanity project ids are public identifiers (not secrets).
const projectId = process.env.PUBLIC_SANITY_PROJECT_ID || '6l9t2gd5';
const dataset = process.env.PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  site: 'https://readgamewrite.com',
  output: 'static',
  integrations: [
    sanity({
      projectId,
      dataset,
      apiVersion: '2025-01-01',
      // Static build: always read fresh content, never the CDN cache.
      useCdn: false,
      // Content editor lives at https://<your-site>/studio
      studioBasePath: '/studio',
    }),
    react(),
    sitemap(),
  ],
});
