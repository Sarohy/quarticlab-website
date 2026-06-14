# Weekly Plan — Week of 2026-06-14 (Week 2)
> Roadmap: Phase 1 · Week 2 — Route blog through Seo.jsx + blog-index schema. GSC: not live (heuristic). code_mode: apply.
> 5 tasks · 4 code (done, review) · 1 human (rollover). Base branch for code: `dev` (the SEO infra is now merged to main/dev; the old `revamp-landing-page` base note is superseded). Branch: `seo-brain/wk-2026-06-14-blog-seo`.

1. [fixing · code · 45 min · Due 2026-06-14] Route the blog post template through `Seo.jsx`
   - where: `src/pages/blog/[slug].jsx`
   - why: post pages bypassed the centralized SEO component (raw `<Head>`) — inconsistent OG/Twitter tags, no default og:image fallback, duplicate `og:site_name`/`twitter:card`, hardcoded host in JSON-LD.
   - status: ✅ DONE by brain — review only.

2. [fixing · code · 30 min · Due 2026-06-14] Route the blog index through `Seo.jsx` + add a default og:image
   - where: `src/pages/blog/index.js`
   - why: `/blog` had no og:image and bypassed `Seo.jsx`; shares now render the brand card. Noindex-while-empty guard preserved.
   - status: ✅ DONE by brain — review only.

3. [schema-aeo · code · 45 min · Due 2026-06-15] Add `CollectionPage` + `Home › Blog` breadcrumb JSON-LD to `/blog`
   - where: `src/pages/blog/index.js`
   - why: tells search/AI engines `/blog` is a content collection and gives it a breadcrumb trail for better SERP/AEO understanding.
   - status: ✅ DONE by brain — review only.

4. [improve-content · code · 30 min · Due 2026-06-15] Remove the "X WORDS" byline from the post page
   - where: `src/pages/blog/[slug].jsx`
   - why: word count is not a ranking signal; a visible "X WORDS" trains writing-for-length. Reading time kept.
   - status: ✅ DONE by brain — review only.

5. [measurement · human · 30 min · Due 2026-06-16] Turn ON the GSC → BigQuery bulk export
   - where: Google Search Console → Settings → Bulk data export
   - why: rollover from Week 1 (still Not started). The export is NOT retroactive — every delayed day is lost ranking history.
   - status: 🙋 needs you.

(Dropped do-NOT candidates: none. Backlink/local growth intentionally deferred to Phase 2 per the roadmap — discoverability ships first.)
