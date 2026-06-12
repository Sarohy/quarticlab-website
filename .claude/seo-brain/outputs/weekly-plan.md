# Weekly Plan — Week of 2026-06-08
> Roadmap: Week 1 (Foundation & discoverability). GSC: not set up. code_mode: apply.
> 5 tasks · 1 code (done, review) · 4 human. Base branch for code: `revamp-landing-page` (the SEO infra lives there, not master).

1. [fixing · code · 30 min · Due 2026-06-12] Review + merge the sitemap overhaul (blog posts now in sitemap; changefreq/priority dropped)
   - where: branch `seo-brain/wk-2026-06-12-blog-sitemap` (commit c6d5123), file `src/pages/sitemap.xml.js`
   - why: published posts were invisible to the sitemap — the #1 discoverability gap. Done + verified on the served build; needs your review + merge + deploy.
   - status: ✅ DONE by brain — review only.

2. [measurement · human · 45 min · Due 2026-06-15] Verify quarticlab.com in Google Search Console + submit the sitemap
   - where: search.google.com/search-console
   - why: nothing rank-related can be measured until GSC exists; it's the input the brain needs to switch from heuristics to real defend/push/CTR tasks.

3. [measurement · human · 30 min · Due 2026-06-16] Turn ON the GSC → BigQuery bulk export
   - where: GSC → Settings → Bulk data export
   - why: NOT retroactive — every day delayed is lost history. Free at this site's volume; gives full (un-capped) query data later.

4. [measurement · human · 30 min · Due 2026-06-17] Verify in Bing Webmaster Tools + submit sitemap + open the AI Performance Report
   - where: bing.com/webmasters
   - why: ChatGPT/Copilot lean on Bing's index; the AI Performance Report is a free AI-citation baseline.

5. [measurement · human · 30 min · Due 2026-06-18] After the sitemap branch is merged + deployed, request indexing for /blog + both posts in GSC
   - where: GSC URL Inspection → Request indexing (depends on #1 merged + #2 done)
   - why: pushes the newly-discoverable blog URLs into Google's crawl queue immediately instead of waiting.

(Dropped do-NOT candidates: none.)
