# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

Tim Dennis's personal/professional site. Tim is Director of the UCLA Library Data Science Center. Blog-first, minimal, writing-centered — Greg Wilson / third-bit style. Also surfaces structured program pages.

**Live site:** `https://www.tim-dennis.com`
**Repo:** `jt14den.github.io` → custom domain via CNAME

**Stack:** Astro 5.x, plain CSS, Pagefind search. No Starlight, no Tailwind, no heavy frameworks.

## Commands

```bash
npm run dev           # Dev server at localhost:4321
npm run build         # astro build + pagefind index (use for production)
npm run build:astro   # astro build only (faster for dev iteration)
npm run preview       # Preview production build
```

No test suite configured.

## Site structure

| Route | Page | Source |
|---|---|---|
| `/` | Writing-first homepage | `src/pages/index.astro` |
| `/blog` | Blog listing (published only) | `src/pages/blog/index.astro` |
| `/blog/[slug]` | Blog post | `src/pages/blog/[...slug].astro` |
| `/blog/tags/[tag]` | Tag pages | `src/pages/blog/tags/[tag].astro` |
| `/blog/archive` | Posts by year | `src/pages/blog/archive.astro` |
| `/notes` | Notes listing | `src/pages/notes/index.astro` |
| `/notes/[slug]` | Note/linkpost/crosspost | `src/pages/notes/[...slug].astro` |
| `/programs` | Programs hub | `src/pages/programs/index.astro` |
| `/programs/[slug]` | Individual programs | `src/pages/programs/[...slug].astro` |
| `/case-studies` | Case study listing | `src/pages/case-studies/index.astro` |
| `/case-studies/[slug]` | Individual case studies | `src/pages/case-studies/[...slug].astro` |
| `/impact` | Impact metrics | `src/pages/impact.astro` |
| `/governance` | Governance | `src/pages/governance.astro` |
| `/scholarship` | Scholarship listing | `src/pages/scholarship/index.astro` |
| `/talks-grants` | Talks & grants | `src/pages/talks-grants.astro` |
| `/about` | About | `src/pages/about.astro` |
| `/search` | Pagefind search | `src/pages/search.astro` |
| `/rss.xml` | RSS feed (blog + notes) | `src/pages/rss.xml.js` |

## Content collections (`src/content.config.ts`)

| Collection | Directory | Key extra fields |
|---|---|---|
| `blog` | `src/content/blog/` | `date`/`pubDate` (legacy), `type`, `status`, `canonicalUrl`, `externalUrl` |
| `notes` | `src/content/notes/` | same as blog + `promoteToBlog` |
| `programs` | `src/content/programs/` | `startYear`, `collaborators[]`, `relatedLinks[]`, `order` |
| `caseStudies` | `src/content/case-studies/` | `partner`, `outcomes[]`, `year` |
| `scholarship` | `src/content/scholarship/` | `doi`, `venue`, `year`, `type` |
| `talks` | `src/content/talks/` | `venue`, `year`, `type` (`talk`|`grant`|`award`), `amount`, `role` |

Use `getCollection('caseStudies')` (camelCase) for the case-studies collection.

**Blog/notes `status` field:** Only `status: published` entries appear in listings. Old 2016–2018 posts default to `draft`.

**Blog/notes `type` field:** `essay` | `note` | `linkpost` | `crosspost` | `roundup` | `announcement`

**`promoteToBlog: true`** on a note makes it appear in `/blog/` listing with a "From Notes" badge.

## Layout pattern

**`src/layouts/BaseLayout.astro`** — all structured pages (about, impact, governance, programs, case-studies, scholarship, talks-grants). Props: `title`, `description`, optional `fullTitle`, `canonicalUrl`. Has `data-pagefind-body` on `<main>`.

**`src/layouts/PostLayout.astro`** — blog posts and notes. Handles LinkedIn share link, type badges (crosspost/linkpost/from-notes), canonical URL for crossposts, OG tags.

**`src/components/BaseHead.astro`** — `<head>` metadata. Props: `title`, `description`, `canonicalUrl` (optional override), `image`. Imports `global.css`.

## Key files

- `src/consts.ts` — `SITE_TITLE`, `SITE_DESCRIPTION`, `SITE_AUTHOR`
- `src/styles/global.css` — all CSS: vars, typography, post lists, tags, badges, layouts
- `src/components/Header.astro` — nav: Blog | Notes | Programs | Case Studies | Impact | Governance | About
- `src/components/Footer.astro` — copyright, RSS, Search, GitHub, LinkedIn links
- `public/fonts/` — Atkinson Hyperlegible (woff)
- `.github/workflows/deploy.yml` — CI/CD: astro build → pagefind → GitHub Pages

## CSS conventions

CSS custom properties (in `global.css`):
- `--accent: #2337ff`, `--accent-dark: #000d8a`
- `--black: 15, 18, 25` (use as `rgb(var(--black))`)
- `--gray: 96, 115, 159`, `--gray-light: 229, 233, 240`, `--gray-dark: 34, 41, 57`
- `--max-w: 720px` — content width
- `--box-shadow` — standard shadow

Reusable classes: `.post-list`, `.card-list`, `.item-list`, `.tags`, `.tag`, `.type-badge`, `.page-intro`, `.section-heading`, `.share-linkedin`, `.crosspost-notice`, `.home-section`

## Pages still to build

- `/cv` — web-friendly CV (linked from About, PDF already at `public/tim_dennis_cv.pdf`)
- `/contact`
- About page rewrite: remove "Career Transition / seeking UL positions" section
