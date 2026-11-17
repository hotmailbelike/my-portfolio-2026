// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Absolute URLs for Open Graph images and canonical links are built from this.
  site: 'https://abdullah-omar-portfolio.netlify.app',
  trailingSlash: 'never',
  build: {
    // /work/facetflow.html instead of /work/facetflow/index.html, so links work without a trailing slash.
    format: 'file',
  },
});
