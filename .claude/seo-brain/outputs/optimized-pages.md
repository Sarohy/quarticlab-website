# Optimized Pages (code changes the brain applied)

---

# src/pages/sitemap.xml.js — 2026-06-12 (branch seo-brain/wk-2026-06-12-blog-sitemap, commit c6d5123)

**Category:** fixing · **Channel:** code · **Status:** done, awaiting review/merge

## What changed
- `getServerSideProps` now queries Firestore `getAllBlogs()`, filters `status === "published"`, and emits `/blog` + one `<url>` per post with a real per-URL `<lastmod>` (from `updatedAt || publishedDate || createdAt`). Reverses the prior "blog intentionally excluded" comment.
- Dropped `<changefreq>` and `<priority>` (Google ignores both).
- Stopped stamping a uniform `today` `<lastmod>` on every static route; static routes now carry `<loc>` only (no faked date), blog posts carry a real `<lastmod>`.
- Wrapped the Firestore call in try/catch: on failure the sitemap falls back to static routes only (never breaks).

## Verification (done)
- `npx eslint src/pages/sitemap.xml.js` → 0 errors.
- `npm run build` → compiled successfully; `/sitemap.xml` is an SSR route (λ).
- Served the production build + fetched `/sitemap.xml`: HTTP 200, `application/xml`, **19 `<url>`** entries (16 static + `/blog` + `ai-mvp-cost-2026` + `how-to-hire-offshore-ai-development-team`), **0** changefreq/priority, 3 real `<lastmod>`.

## Post-merge follow-up (human)
- Merge the branch + deploy, then in GSC submit `https://www.quarticlab.com/sitemap.xml` and request indexing for `/blog` + both posts.
