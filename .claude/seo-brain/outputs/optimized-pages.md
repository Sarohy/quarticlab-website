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

> Status update 2026-06-14: DEPLOYED — live `/sitemap.xml` includes `/blog` + both posts (verified via WebFetch). A divergent re-implementation also landed on `dev` (commit `ebba44b`) that re-adds `changefreq`/`priority`; reconcile before merging `dev`.

---

# Week 2 — Blog through Seo.jsx + blog-index schema — 2026-06-14 (branch seo-brain/wk-2026-06-14-blog-seo)

## src/pages/blog/[slug].jsx
**Category:** fixing + improve-content · **Channel:** code · **Status:** done, awaiting review

### What changed
- Replaced the raw `<Head>` with the centralized `<Seo>` component (`title`, `description`, `canonical`, `ogTitle`, `ogImage={post.heroImage}` with a default fallback, `ogImageAlt`).
- Kept the `Article` JSON-LD as `<Seo>` children; `og:type="article"` and `article:published_time` now carry stable `key`s so the article type correctly overrides the global `og:type="website"` from `_app.js`.
- Dropped the duplicate `og:site_name` / `twitter:card` (already global in `_app.js`).
- Hardcoded `https://www.quarticlab.com` strings in the JSON-LD swapped for `SITE_URL` (so staging/preview hosts stay consistent).
- Removed the `wordCount` calc and the "X WORDS" segment of the byline (length is not a ranking signal); reading time retained.

## src/pages/blog/index.js
**Category:** fixing + schema-aeo · **Channel:** code · **Status:** done, awaiting review

### What changed
- Replaced the raw `<Head>` with `<Seo>`; added a default blog `og:image` (`/og-image.png`) so shares of `/blog` render a card. Preserved the `noindex, follow` guard while there are zero published posts.
- Added two JSON-LD blocks as `<Seo>` children: a `CollectionPage` (`@id` `/blog#webpage`, publisher → Organization `@id`) and a `Home › Blog` `BreadcrumbList`.
- Extracted `BLOG_TITLE` / `BLOG_DESCRIPTION` constants (used by `<title>`, og tags, and CollectionPage so they can't drift).

### Verification
- `npm run build` → compiled successfully; `/blog` and `/blog/[slug]` build as SSR routes (λ).
- eslint could NOT run in this environment (broken transitive dep `has` under `eslint-plugin-react` in the installed `node_modules` — pre-existing, unrelated to the diff). SWC transpiled both files cleanly during build. Re-run `npx eslint` once deps are repaired.

### Known transitional note
- `/blog` now carries a page-level `Home › Blog` BreadcrumbList while `_app.js` still emits a global Home-only BreadcrumbList → two BreadcrumbList blocks on `/blog`. Roadmap Week 5 consolidates the global breadcrumb into a route-keyed component; acceptable until then.

---

# Week 3 — Internal linking (partial) — 2026-06-14 (merged to dev: merge a856bf9)

## src/Components/CommonComponents/Footer/Footer.jsx
**Category:** fixing · **Channel:** code · **Status:** DONE & MERGED + (Task 4)
- Added `/services/blockchain-development` ("Blockchain") and `/services/iot-development` ("IoT Solutions") to `FOOTER_SERVICES` — all 8 services now have site-wide footer links (was 6).

## src/pages/blog/[slug].jsx + blogDetail.module.css
**Category:** fixing · **Channel:** code · **Status:** DONE & MERGED (Task 2)
- SSR "Keep reading" related-posts block, ranked by shared tags (newest tiebreak, recent fallback), computed in `getServerSideProps` so links are in the no-JS HTML AI crawlers read. Styled with `.related*` classes.
- Tasks 1 (homepage block) + 3 (service-page block) DEFERRED pending more content (research: `outputs/internal-linking-research.md`).

---

# Week 4 — Named authors — 2026-06-14 (branch seo-brain/wk-2026-06-14-authors, commit 58b6d6e)

## src/pages/blog/[slug].jsx + blogDetail.module.css
**Category:** schema-aeo · **Channel:** code · **Status:** done, awaiting review

### What changed
- Article JSON-LD `author` now emits a `Person` (`name`, optional `jobTitle`/`url`/`sameAs`, `worksFor` → Quartic Lab Organization) when the Firestore `blogs` doc carries a structured `author` OBJECT; falls back to the existing `Organization` author when `author` is a plain string (current data) — zero visible change until structured authors are added.
- Visible byline gains an author role line (`.brole`); the end-card author block now renders the author bio + an optional "More from <name>" link (`.endcRole`, `.endcAuthorLink`) from `author.url`/`author.sameAs[0]`.
- Author normalization handles object | string | absent gracefully.

### Verification
- `npm run build` → compiled successfully; `/blog/[slug]` builds as an SSR route (λ, 6.62 kB).
- eslint still cannot run in this environment (pre-existing broken `eslint-plugin-react` dep). SWC transpiled cleanly.

### Pairing
- Needs the human task "add `author` objects to Firestore posts" to display Person data. Until then, behavior is identical to today.
