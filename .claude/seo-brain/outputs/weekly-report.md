# Weekly SEO Report — Week of 2026-06-14  (mode: heuristic)

## Summary
Phase 1 (discoverability) is essentially complete and **verified live**: the sitemap is clean (19 URLs, no changefreq/priority, real lastmod, blog posts included), blog pages route through `Seo.jsx` with `CollectionPage` + breadcrumb + og:images, the "X WORDS" byline is gone, related-posts ("Keep reading") ships on posts, and all 8 services are footer-linked. Still no GSC data, so this remains a heuristic baseline — finishing the **GSC→BigQuery export** is now the single blocker to real rank-over-time work. Strategically, the binding constraint is no longer code: it's **content inventory (only 2 published posts)**, which is why the deferred internal-link blocks (homepage/service-page) and the whole content engine are the highest-leverage next moves. Week 4 advances named-author E-E-A-T (the code half shipped this run) and pushes the first original-data post toward publication.

## Movers and Droppers
_(data mode only — unavailable until GSC + BigQuery are live)_

## Heuristic health snapshot (live checks, 2026-06-14)
- `/sitemap.xml` — ✅ clean & live: 19 URLs, 0 changefreq/priority, real `lastmod`, `/blog` + 2 posts included.
- `/blog` — ✅ live: `CollectionPage` + `Home › Blog` breadcrumb + default og:image; routes through `Seo.jsx`.
- `/blog/[slug]` — ✅ live: `Seo.jsx`, `og:type=article`, hero og:image, no "X WORDS", "Keep reading" related block. ⚠️ Article author still `Organization` (Person schema = this week, code shipped on branch; needs Firestore author objects to light up). Post author field shows "Zweidevs Team" on `ai-mvp-cost-2026` — a content-data cleanup for the author task.
- `/robots.txt` — healthy; AI-crawler allowlist intact. Leave it.
- Internal linking — homepage→post and service→post blocks DEFERRED pending more content (validated by research; see `outputs/internal-linking-research.md`).
- Published posts in Firestore (`status==published`): `ai-mvp-cost-2026`, `how-to-hire-offshore-ai-development-team` (still only 2 — the bottleneck).

## Action list — next week (Week 4)
1. **Turn ON GSC→BigQuery export** (measurement) — #1: rank tracking is blind until this lands; rollover, due 06-16.
2. **Person author schema + visible byline/bio** (schema-aeo) — code shipped on branch this run; needs review/merge.
3. **Write 1–2 author profiles + add `author` objects to the 2 Firestore posts** (add-blog) — lights up the Person schema + fixes the "Zweidevs Team" byline.
4. **Adapt + publish the `ai-mvp-cost-2026` original-data post** (add-blog) — the highest-leverage content move; grows inventory and unblocks the deferred internal-link blocks.
5. **One-time backlink + directory baseline audit** (backlink) — Phase 1 shipped, so off-site work can begin; capture referring domains + directory claim status.

## What to update in site-memory.md
- Roadmap position → Week 4 (in progress).
- Pending this week: the 5 actions above (1 code done-for-review + 4 human, BigQuery is a rollover).
- Last run / Last audit = 2026-06-14.
