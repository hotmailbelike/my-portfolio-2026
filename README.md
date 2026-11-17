# Abdullah Omar · Portfolio

Source of [abdullah-omar-portfolio.netlify.app](https://abdullah-omar-portfolio.netlify.app/): my work as a full-stack engineer, with a closer look at [Facet Flow](https://abdullah-omar-portfolio.netlify.app/work/facetflow).

Built with [Astro](https://astro.build/) as a static site: plain HTML and CSS, under 1 KB of JavaScript per page, and AVIF/WebP images generated at build time.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
npm run check    # type check
```

## Where things live

- `src/data/`: all the content (profile, experience, projects, skills) as typed data, so copy changes never touch layout.
- `src/components/`: one component per file; `home/` for home page sections, `work-page/` for the Facet Flow page.
- `src/styles/global.css`: design tokens (colors, type, spacing, motion).
- `src/assets/`: images processed at build time; `src/assets/archive/` keeps earlier assets on purpose.
- The previous site lives on the `legacy` branch.

## Deploy

`npm run build`, then drag the `dist/` folder onto the site's Deploys page in Netlify. `public/_headers` sets long-term caching for the hashed files in `/_astro`.
