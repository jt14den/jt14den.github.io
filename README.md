# Tim Dennis — Personal Site

A blog-first personal site built with [Astro](https://astro.build). Minimal, text-forward, writing-centered. Designed for an Obsidian-based writing workflow with static deployment to GitHub Pages.

**Live site:** `https://www.tim-dennis.com`

---

## Commands

| Command              | Action                                          |
| :------------------- | :---------------------------------------------- |
| `npm install`        | Install dependencies                            |
| `npm run dev`        | Start dev server at `localhost:4321`            |
| `npm run build`      | Build site + generate Pagefind search index     |
| `npm run build:astro`| Build site only (no search index)               |
| `npm run preview`    | Preview the production build locally            |

---

## Site Structure

```
/             Writing-first homepage: recent posts, notes, links to work
/blog         All published blog posts, chronological
/blog/archive Archive by year
/blog/tags/[tag] Posts by tag
/notes        Quick notes, linkposts, crosspost summaries
/programs     Durable program pages
/case-studies Research partnership case studies
/impact       Quantitative outcomes
/governance   Governance work
/scholarship  Publications and citable outputs
/talks-grants Selected talks and grant awards
/about        Professional biography
/search       Pagefind-powered site search
/rss.xml      RSS feed (blog + notes)
```

---

## Writing in Obsidian

Notes live in the vault. The site reads them via symlink — write in Obsidian, publish by changing `status: draft` to `status: published`.

### Current setup (already configured)

```
~/Documents/tasks/         ← Obsidian vault
  site/
    notes/                 ← publishable notes (symlinked)

~/projects/websites/jt14den-astro/
  src/content/
    notes  →  ~/Documents/tasks/site/notes   (symlink, active)
    blog/                                     (in repo, not symlinked)
```

Blog posts stay in the repo for now. Notes live in the vault.

### To publish a note

1. Create a new file in `~/Documents/tasks/site/notes/` using the **Site Note Template** in Obsidian
2. Write the note — keep it 200–400 words, one clear point
3. Set `status: published` when ready
4. Run `npm run build` or let the dev server pick it up

Filename convention: `YYYY-MM-DD-short-slug.md`

### Frontmatter reference

**Synthesis note** (something you keep noticing across projects):
```yaml
---
title: "The thing I keep seeing"
description: "One sentence for RSS and SEO."
date: 2026-06-06
tags: [infrastructure, open-science]
status: published
type: note
---
```

**Linkpost** (you read something that connects directly to your work):
```yaml
---
title: "What this piece gets right about X"
date: 2026-06-06
tags: [ai-agents]
status: published
type: linkpost
externalUrl: "https://..."
---
```

**Crosspost** (summary of something you published elsewhere):
```yaml
---
title: "Post title"
date: 2026-06-06
status: published
type: crosspost
canonicalUrl: "https://..."
promoteToBlog: false
---
```

Add `promoteToBlog: true` to any note to also surface it in `/blog/` with a "From Notes" badge.

---

## Notes as synthesis, not summaries

The vault (`reference/wiki/`, daily notes, project files) is where you carry things.
A site note is where you set something down — crystallized, in your voice.

**What makes a good note:**
- You've noticed the same pattern across 2+ projects
- You just figured something out that cost you real time
- You read something that reframed how you think about your actual work
- You want to put a thing down so you can stop carrying it

**Dictation → note pipeline:**
1. Speak the observation (phone Voice Memos, iOS dictation, or any transcription tool)
2. Drop the raw transcript into `site/notes/` as a draft
3. Clean up frontmatter, tighten one pass
4. Publish

The constraint that makes this sustainable: if you're spending more than 20 minutes on it, it wants to be a blog post.

---

## Promoting a Note to the Blog

Add `promoteToBlog: true` to a note's frontmatter. It will appear in:
- `/notes/` (as a note)
- `/blog/` (with a "From Notes" badge)
- RSS feed (once)

No file duplication needed.

---

## Creating Crosspost Summaries
## Creating Crosspost Summaries

A **crosspost** is a locally-written summary of something you published elsewhere (DataSquad blog, IMLS project site, etc.). The canonical URL points to the external source.

```yaml
---
title: "Post title as it appeared externally"
description: "One sentence summary."
date: 2026-03-04
status: published
type: crosspost
canonicalUrl: "https://ucla-datasquad.github.io/posts/example/"
externalUrl: "https://ucla-datasquad.github.io/posts/example/"
tags: [datasquad, research]
---

Write a summary or excerpt here. The page will show a notice:
"This is a summary. Read the full post at [url]."
```

Search engines will credit the canonical URL, not this page.

For **linkposts** (brief commentary + external link):

```yaml
---
title: "Interesting thing I found"
date: 2026-03-04
status: published
type: linkpost
externalUrl: "https://example.com/the-thing"
tags: [link]
---

Brief commentary on why this is interesting.
```

---

## Sharing to LinkedIn

Every blog post and note automatically includes a LinkedIn share link at the bottom of the page. It uses:

```
https://www.linkedin.com/sharing/share-offsite/?url=<encoded-post-url>
```

To share manually:
1. Open the post on your site.
2. Click "Share on LinkedIn" at the bottom of the post.
3. LinkedIn will pull the title, description, and OG image from the page metadata.

Make sure your post has `description` set for the best preview card.

---

## Search

The site uses [Pagefind](https://pagefind.app) for lightweight, fully static search.

The search index is generated automatically when you run:

```bash
npm run build
```

This runs `astro build` followed by `npx pagefind --site dist`, creating `dist/pagefind/` with the index and UI.

During local dev (`npm run dev`), the search page will show a notice that the index isn't available. Run `npm run build && npm run preview` to test search locally.

---

## Deploying to GitHub Pages

The site deploys via GitHub Actions on every push to `master`.

### First-time setup

1. In your GitHub repo, go to **Settings → Pages → Source** and select **GitHub Actions**.
2. Push to `master` — the workflow builds the site and deploys automatically.

### The deploy workflow (`.github/workflows/deploy.yml`)

1. Checks out the repo.
2. Installs Node 20 + npm dependencies.
3. Runs `astro build`.
4. Runs `npx pagefind --site dist` to generate the search index.
5. Uploads and deploys to GitHub Pages.

### Custom domain

The site uses `www.tim-dennis.com`. DNS is configured at Squarespace:
- 4 A records pointing to GitHub Pages IPs
- CNAME `www` → `jt14den.github.io`

`public/CNAME` contains `www.tim-dennis.com`.

---

## Content Collections

| Collection   | Directory                    | Purpose                                  |
| :----------- | :--------------------------- | :--------------------------------------- |
| `blog`       | `src/content/blog/`          | Primary writing, essays, longform        |
| `notes`      | `src/content/notes/`         | Quick notes, linkposts, crossposts       |
| `programs`   | `src/content/programs/`      | Durable program/initiative pages         |
| `caseStudies`| `src/content/case-studies/`  | Research partnership case studies        |
| `scholarship`| `src/content/scholarship/`   | Publications, reports, datasets          |
| `talks`      | `src/content/talks/`         | Talks and grant awards                   |

### Common fields (blog + notes)

| Field          | Type       | Required | Notes                                    |
| :------------- | :--------- | :------- | :--------------------------------------- |
| `title`        | string     | yes      |                                          |
| `date`         | Date       | yes      | `YYYY-MM-DD`                             |
| `status`       | string     | yes      | `draft` or `published`                   |
| `type`         | string     | yes      | `essay`, `note`, `linkpost`, `crosspost`, `roundup`, `announcement` |
| `description`  | string     | no       | Used in listings, RSS, OG tags           |
| `tags`         | string[]   | no       |                                          |
| `updated`      | Date       | no       | Last updated date                        |
| `canonicalUrl` | string     | no       | Overrides canonical for crossposts       |
| `externalUrl`  | string     | no       | Link target for linkposts/crossposts     |
| `promoteToBlog`| boolean    | no       | Notes only: also appear in blog index    |
