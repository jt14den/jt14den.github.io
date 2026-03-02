# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

Migration of Tim Dennis's personal/professional site from Jekyll (Hyde theme) to Astro. Tim is Director of the UCLA Library Data Science Center, positioning for University Librarian roles. Site should feel professional and accessible.

**Deployment target:** GitHub Pages at `jt14den.github.io` (or Netlify). Update `site` in `astro.config.mjs` before deploying — currently set to `https://example.com`.

**Styling:** Plain CSS via `src/styles/global.css`. TailwindCSS is planned but not yet added.

## Commands

```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build production site to ./dist/
npm run preview  # Preview the production build locally
npx astro check  # Type-check .astro files
```

No test suite configured.

## Information architecture (8 top-level pages)

| Route | Page | Source |
|---|---|---|
| `/` | Home | `src/pages/index.astro` |
| `/about` | About | `src/pages/about.astro` |
| `/programs` | Programs hub | `src/pages/programs/index.astro` |
| `/programs/[slug]` | Individual programs | `src/pages/programs/[...slug].astro` |
| `/impact` | Impact metrics | `src/pages/impact.astro` |
| `/case-studies` | Case study listing | `src/pages/case-studies/index.astro` |
| `/case-studies/[slug]` | Individual case studies | `src/pages/case-studies/[...slug].astro` |
| `/governance` | Governance | `src/pages/governance.astro` |
| `/scholarship` | Scholarship listing | `src/pages/scholarship/index.astro` |
| `/talks-grants` | Talks & grants | `src/pages/talks-grants.astro` |

Blog routes (`/blog`, `/blog/[slug]`) still exist but are not in the main nav.

## Content collections (`src/content.config.ts`)

All collections except `blog` share a base schema: `title`, `description`, `date` (optional), `tags[]`, `status` (`draft`|`published`).

| Collection | Directory | Extra fields | Notes |
|---|---|---|---|
| `blog` | `src/content/blog/` | `pubDate`, `updatedDate`, `heroImage` | Legacy; not in main nav |
| `programs` | `src/content/programs/` | `startYear`, `collaborators[]`, `relatedLinks[]`, `order` | 7 entries |
| `caseStudies` | `src/content/case-studies/` | `partner`, `outcomes[]`, `year` | 2 entries |
| `scholarship` | `src/content/scholarship/` | `doi`, `venue`, `year`, `type` | Listing only, no individual pages |
| `talks` | `src/content/talks/` | `venue`, `year`, `type` (`talk`\|`grant`\|`award`), `amount`, `role` | Listing only; talks+grants combined |

Use `getCollection('caseStudies')` (camelCase) for the case-studies collection.

## Layout pattern

**`src/layouts/BaseLayout.astro`** — used by all non-blog pages. Accepts `title`, `description`, and optional `fullTitle` (set to `true` to skip appending the site name). Wraps `BaseHead`, `Header`, `<main>`, `Footer`.

**`src/layouts/BlogPost.astro`** — used only by blog posts (self-contained, not using BaseLayout).

**`src/components/BaseHead.astro`** — all `<head>` metadata (OG tags, RSS, font preloads). Imports `src/styles/global.css`.

## Key files

- `src/consts.ts` — `SITE_TITLE`, `SITE_DESCRIPTION`, `SITE_AUTHOR`
- `src/styles/global.css` — CSS custom properties (colors, fonts, shadows)
- `src/components/Header.astro` — two-row nav: site title + social links on top, 8 nav links below
- `public/fonts/` — Atkinson Hyperlegible (woff)

## Program pages content structure

Each `src/content/programs/*.md` file uses these markdown headings:
- Overview
- What we built
- How it works
- Outcomes
- Collaborators
- Selected links

The `[...slug].astro` layout renders markdown content plus structured frontmatter blocks (tags, collaborators, relatedLinks) separately.

## Pages still to build

- `/cv` — web-friendly CV with downloadable option (linked from About)
- `/contact`
