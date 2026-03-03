# Tim Dennis — Personal & Professional Site

A structured professional portfolio built with [Astro](https://astro.build) and
[Starlight](https://starlight.astro.build) as the theme shell. The Starlight frame provides
consistent navigation, accessible typography, sidebar support, and a clean dark/light mode
toggle — customized here to read as a personal portfolio rather than a docs site.

**Live site:** `https://jt14den.github.io` (update `site` in `astro.config.mjs` before deploying)

---

## Commands

All commands run from the project root:

| Command            | Action                                   |
| :----------------- | :--------------------------------------- |
| `npm install`      | Install dependencies                     |
| `npm run dev`      | Start dev server at `localhost:4321`     |
| `npm run build`    | Build production site to `./dist/`       |
| `npm run preview`  | Preview the production build locally     |
| `npx astro check`  | Type-check `.astro` files                |

---

## Information architecture

| Route                    | Page                    | Source                                    |
| :----------------------- | :---------------------- | :---------------------------------------- |
| `/`                      | Home (splash)           | `src/pages/index.astro`                   |
| `/about`                 | About                   | `src/pages/about.astro`                   |
| `/programs`              | Programs hub            | `src/pages/programs/index.astro`          |
| `/programs/[slug]`       | Individual programs     | `src/pages/programs/[...slug].astro`      |
| `/impact`                | Impact metrics          | `src/pages/impact.astro`                  |
| `/case-studies`          | Case study listing      | `src/pages/case-studies/index.astro`      |
| `/case-studies/[slug]`   | Individual case studies | `src/pages/case-studies/[...slug].astro`  |
| `/governance`            | Governance              | `src/pages/governance.astro`              |
| `/scholarship`           | Scholarship listing     | `src/pages/scholarship/index.astro`       |
| `/talks-grants`          | Talks & grants          | `src/pages/talks-grants.astro`            |

Blog routes (`/blog`, `/blog/[slug]`) are preserved but not in the main nav.

---

## How to add a new program page

1. **Create the content file** in `src/content/programs/`:

   ```markdown
   ---
   title: My New Program
   description: One-sentence summary shown in listings and meta.
   tags: [tag-one, tag-two]
   status: published
   startYear: 2024
   order: 8          # controls sort position on /programs listing
   collaborators:
     - Partner Name
   relatedLinks:
     - label: Project website
       url: https://example.com
   ---

   ## Overview
   …
   ```

2. **Add it to the sidebar** in `astro.config.mjs` under the `Programs` group:

   ```js
   { label: 'My New Program', link: '/programs/my-new-program/' },
   ```

   The slug matches the filename (without `.md`).

That's it — the listing page at `/programs` is generated automatically from the collection.

---

## How to add a new case study

Same pattern as programs, but the file goes in `src/content/case-studies/`:

```markdown
---
title: Study Title
description: One-sentence summary.
tags: [tag]
status: published
partner: Partner Organization
year: 2024
outcomes:
  - Measurable outcome one
  - Measurable outcome two
---

## Background
…
```

Then add a sidebar entry in `astro.config.mjs` under `Case Studies`.

---

## Updating the navigation

Top navigation and sidebar are both configured in **`astro.config.mjs`** inside the `sidebar` array
passed to `starlight()`. Starlight re-renders the sidebar on every page and highlights the active
link automatically.

The sidebar structure currently looks like:

```
About
Programs/
  Overview
  UCLA Data Science Center
  UC Carpentries
  UCLA DataSquad
  UCLA Dataverse
  Redivis Restricted Data
  IMLS Open Science Curriculum
  UC OSPO Education
Impact
Case Studies/
  Overview
  Carceral Ecologies
  Biocritical Studies Lab
Governance
Scholarship
Talks & Grants
```

---

## Theme customization

Styling is in **`src/styles/starlight.css`** (loaded via Starlight's `customCss` option):

- **Font**: Atkinson Hyperlegible (woff files in `public/fonts/`)
- **Accent color**: `#2337ff` (light mode) / `#4d62ff` (dark mode)
- **Legacy CSS vars** (`--black`, `--gray`, `--gray-light`, `--accent`, etc.) are re-declared
  so that the scoped `<style>` blocks inside `.astro` pages continue to resolve correctly

To change the brand color, update the `--sl-color-accent*` values in `starlight.css`.

---

## Deployment (GitHub Pages)

The deploy workflow is at `.github/workflows/deploy.yml`. It:

1. Installs dependencies with `npm ci`
2. Runs `npm run build`
3. Uploads `./dist` as a GitHub Pages artifact
4. Deploys via `actions/deploy-pages`

**Before first deploy:**

1. Set `site` in `astro.config.mjs` to your actual GitHub Pages URL:
   ```js
   site: 'https://jt14den.github.io',
   ```
2. In your GitHub repo → Settings → Pages → set **Source** to **GitHub Actions**.
3. Push to `main` — the workflow triggers automatically.

---

## Content collections

All collections are defined in `src/content.config.ts`.

| Collection     | Directory                    | Used by                           |
| :------------- | :--------------------------- | :-------------------------------- |
| `docs`         | `src/content/docs/`          | Starlight (currently empty)       |
| `blog`         | `src/content/blog/`          | `/blog` (legacy, not in main nav) |
| `programs`     | `src/content/programs/`      | `/programs` listing + detail      |
| `caseStudies`  | `src/content/case-studies/`  | `/case-studies` listing + detail  |
| `scholarship`  | `src/content/scholarship/`   | `/scholarship` listing            |
| `talks`        | `src/content/talks/`         | `/talks-grants` listing           |
