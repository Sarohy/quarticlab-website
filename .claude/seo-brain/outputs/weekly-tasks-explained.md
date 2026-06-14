# This Week's SEO/AEO Tasks — Plain English
> Week of 2026-06-14 (Week 2)  |  Site: https://www.quarticlab.com  |  For: zero SEO knowledge assumed
> Auto-regenerated each weekly run.

SEO means getting your site to show up when people search Google. AEO is the same idea for AI assistants (ChatGPT, Perplexity, Gemini) — getting them to mention you. Search engines and AI engines read three things: the words people see on the page, the headings (H1/H2 structure), and invisible HTML tags that describe the page to machines. This week is almost entirely about those invisible tags for your blog.

Four tasks are marked **✅ DONE BY THE BRAIN** — the code is already written and the site builds cleanly on a separate branch; you just review and merge. One task is marked **🙋 NEEDS YOU** — a button only you can click.

**Week 1 recap:** 4 of 5 done. Your sitemap fix is live (blog posts now appear at `https://www.quarticlab.com/sitemap.xml`), Google Search Console and Bing are verified, and indexing was requested. The one leftover — turning on the BigQuery export — is carried into this week as Task 5.

---

## Task 1 — Make blog posts share the same SEO "plumbing" as the rest of the site  ·  fixing  ·  ✅ DONE, review  ·  ~45 min

### What this is
Every page on your site builds its invisible SEO tags (title, description, social-share image, etc.) through one shared component called `Seo.jsx` — except the blog, which was hand-rolling its own. That meant the blog could drift: miss a tag, duplicate another, or show no image when shared.

### Why it matters
When a blog link is pasted into LinkedIn/X/Slack, the preview card comes from these tags. Routing the blog through the shared component guarantees a correct title, description, and a preview image every time, and keeps the canonical URL consistent so Google doesn't see duplicates.

### Steps (review only)
The brain edited `src/pages/blog/[slug].jsx` on branch `seo-brain/wk-2026-06-14-blog-seo`. To review:
```bash
git diff dev...seo-brain/wk-2026-06-14-blog-seo -- "src/pages/blog/[slug].jsx"
```
It swaps the raw header for `<Seo>`, uses the post's hero image as the share image, keeps the existing Google "Article" data, and removes two tags that were already set site-wide. When happy: merge the branch and deploy.

### How to verify
After deploy, open any post and use a share-preview checker (e.g. LinkedIn Post Inspector). You should see the post title, description, and the hero image.

---

## Task 2 — Give the blog homepage a proper share image + shared plumbing  ·  fixing  ·  ✅ DONE, review  ·  ~30 min

### What this is
The blog listing page (`/blog`) had no social-share image at all and also bypassed the shared `Seo.jsx`.

### Why it matters
If someone shares `quarticlab.com/blog`, it now shows your brand image instead of a blank box — small thing, but it's the difference between a link that looks legit and one that looks broken. The "hide from Google until there are posts" safety rule is preserved.

### Steps (review only)
```bash
git diff dev...seo-brain/wk-2026-06-14-blog-seo -- src/pages/blog/index.js
```

### How to verify
After deploy, run `https://www.quarticlab.com/blog` through a share-preview checker — a card with the brand image should appear.

---

## Task 3 — Tell Google & AI engines that /blog is a "collection of articles"  ·  schema-aeo  ·  ✅ DONE, review  ·  ~45 min

### What this is
**Structured data** is invisible labelling that spells out what a page *is*, in a format machines read perfectly. The brain added two labels to `/blog`: one saying "this is a collection of articles," and a **breadcrumb** ("Home › Blog") describing where the page sits in your site.

### Why it matters
Breadcrumbs can show up directly in Google results, and both labels help AI assistants understand your site is an organized publisher — which is part of how they decide who to cite.

### Steps (review only)
Same file as Task 2 (`src/pages/blog/index.js`) — the two `application/ld+json` blocks at the top of the page.

### How to verify
After deploy, paste `https://www.quarticlab.com/blog` into Google's Rich Results Test (https://search.google.com/test/rich-results) — it should detect `CollectionPage` and `BreadcrumbList` with no errors.

---

## Task 4 — Stop showing (and chasing) a word count on posts  ·  improve-content  ·  ✅ DONE, review  ·  ~30 min

### What this is
Each post displayed a "X WORDS" label in its byline. The brain removed it (the "X min read" stays).

### Why it matters
Word count is **not** a ranking factor — Google has said so directly, and large studies confirm it. Showing it quietly trains everyone to pad articles for length instead of answering the reader's question. Removing it keeps the focus on quality.

### Steps (review only)
Part of the `src/pages/blog/[slug].jsx` diff in Task 1.

### How to verify
After deploy, open any post — the byline reads e.g. "MAY 5, 2026 · 7 MIN READ" with no "WORDS".

---

## Task 5 — Turn ON the Google → BigQuery data export  ·  measurement  ·  🙋 NEEDS YOU  ·  ~30 min

### What this is
Google Search Console only keeps 16 months of data and hides a lot of it. The free **BigQuery bulk export** streams your *complete* search data out daily so nothing is lost.

### Why it matters
It is **not retroactive** — it only captures data from the day you switch it on forward. Every day it's off is history you can never get back. This is the leftover from last week and the only thing standing between the brain and full ranking data later.

### Steps
1. Go to https://search.google.com/search-console → pick `quarticlab.com`.
2. Settings (left sidebar) → **Bulk data export**.
3. Follow the prompts to connect a Google Cloud project (free tier is fine at your volume) and confirm the export.

### How to verify
In Search Console → Settings → Bulk data export, the status shows the export is active and names the destination BigQuery dataset.

---

### A heads-up for whoever merges the code
- Branch to review: `seo-brain/wk-2026-06-14-blog-seo` (off `dev`). The site builds cleanly.
- `/blog` will temporarily have **two** breadcrumb blocks (a global "Home" one from `_app.js` plus the new "Home › Blog" one). That's expected — a later week consolidates them. Harmless in the meantime.
- Separately: there are now **two versions of the sitemap fix** — the deployed one (live) and a second one on `dev` (commit `ebba44b`). Decide which to keep before merging `dev` so they don't conflict.
