# Weekly SEO Report — Week of 2026-06-08  (mode: heuristic)

## Summary
First brain run; no Google Search Console data yet, so this is a heuristic baseline, not a rank delta. The biggest finding is structural and now half-fixed: published blog posts were invisible to the sitemap — the brain implemented the fix this run (the served sitemap now lists `/blog` + 2 real published posts). Direction is "foundation being laid," not up/down. The single highest-leverage opportunity remaining is finishing measurement setup (GSC + BigQuery + Bing) so that from next week the brain can drive real defend/push/CTR work instead of heuristics.

## Movers and Droppers
_(data mode only — unavailable until GSC is live)_

## Heuristic health snapshot (live checks)
- `/sitemap.xml` — was missing all blog URLs; **now emits 19 URLs incl. `/blog` + 2 published posts** (fixed this run, on branch `seo-brain/wk-2026-06-12-blog-sitemap`). `changefreq`/`priority` dropped; real `lastmod` on posts.
- `/robots.txt` — healthy; AI-crawler allowlist intact; not blocking Bingbot. Leave it.
- Published posts found in Firestore (`status==published`): `ai-mvp-cost-2026`, `how-to-hire-offshore-ai-development-team`. Both now in the sitemap for the first time.
- `/blog` index + posts still bypass `Seo.jsx` (no og:image, no CollectionPage/Breadcrumb) — queued Week 2.
- Blog posts still weakly internally linked (reachable mainly from `/blog`) — queued Week 3.

## Action list — next week
1. Finish GSC + BigQuery + Bing setup (measurement) — unblocks real tracking. **#1 because everything rank-related is blind until this lands.**
2. Merge the sitemap branch + deploy, then request indexing for `/blog` + both posts (measurement/discoverability).
3. Route `/blog` + `/blog/[slug]` through `Seo.jsx` + add og:image (Week 2 fixing) — next discoverability layer.

## What to update in site-memory.md
- Published pages: mark `/blog` + `/blog/[slug]` as now-in-sitemap (pending deploy of the branch).
- Record the 2 published posts in Firestore.
- Last run / Last audit = 2026-06-12.
- Pending this week: the 5 Week-1 tasks (see weekly-plan.md).
