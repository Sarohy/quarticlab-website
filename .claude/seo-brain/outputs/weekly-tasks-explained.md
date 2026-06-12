# This Week's SEO/AEO Tasks — Plain English
> Week of 2026-06-08  |  Site: https://www.quarticlab.com  |  For: zero SEO knowledge assumed
> Auto-regenerated each weekly run.

SEO means getting your site to show up when people search Google. AEO is the same idea for AI assistants (ChatGPT, Perplexity, Gemini) — getting them to mention you. Search engines look at three things: the words people can see on your page, your headings (the H1/H2 structure), and invisible HTML tags that describe the page to machines.

One task below is marked **✅ DONE BY THE BRAIN** — the code is already written and tested on a separate branch; you just review and merge it. The other four are marked **🙋 NEEDS YOU** — accounts and buttons only you can click. Forward this to whoever maintains the site if you don't do code yourself.

---

## Task 1 — Put your blog posts on the site's "map" for Google  ·  fixing  ·  ✅ DONE, review  ·  ~30 min

### What this is
A **sitemap** is a list of every page on your site that you hand to Google — like the index at the back of a book. Yours was leaving out your entire blog. So even though you have published posts, Google had no easy list pointing to them.

### Why it matters
Posts that aren't in the sitemap get found slowly or not at all. Your two published posts (the AI-MVP-cost article and the offshore-hiring article) were invisible here. Now they're listed, each with a "last updated" date, which is the one freshness signal Google still trusts.

### Steps
The brain already changed `src/pages/sitemap.xml.js` on the branch `seo-brain/wk-2026-06-12-blog-sitemap` (commit c6d5123). To review:
```bash
git diff revamp-landing-page...seo-brain/wk-2026-06-12-blog-sitemap -- src/pages/sitemap.xml.js
```
It now pulls your published blog posts from the database and adds them to the sitemap, and it removed two old tags (`changefreq`/`priority`) that Google ignores. When you're happy: merge the branch into your release branch and deploy.

### How to verify it worked
After deploy, open `https://www.quarticlab.com/sitemap.xml` in a browser — you should see lines for `/blog`, `/blog/ai-mvp-cost-2026`, and `/blog/how-to-hire-offshore-ai-development-team`. (Already confirmed locally: 19 URLs, no changefreq/priority.)

---

## Task 2 — Connect Google Search Console  ·  measurement  ·  🙋 NEEDS YOU  ·  ~45 min

### What this is
**Google Search Console (GSC)** is Google's free dashboard showing what people typed to find you, where you ranked, and how many clicked.

### Why it matters
Until this exists, the brain is flying blind — it can't tell you which keywords are improving or slipping. This is the single thing that unlocks real weekly ranking work.

### Steps
1. Go to https://search.google.com/search-console and add the property `quarticlab.com` (choose "Domain" and add the DNS record it gives you, or use the HTML-tag method).
2. Once verified, open **Sitemaps** in the left menu and submit `https://www.quarticlab.com/sitemap.xml`.

### How to verify it worked
The property shows "Verified" and the sitemap shows "Success" with a discovered-URL count (should be ~19+).

---

## Task 3 — Turn on the BigQuery data export  ·  measurement  ·  🙋 NEEDS YOU  ·  ~30 min

### What this is
GSC only keeps a 16-month, row-capped view. The **BigQuery bulk export** streams your full search data into a free Google database so nothing is lost.

### Why it matters
It is **not** retroactive — it only captures data from the day you switch it on. Every day you wait is history you can never get back. It's free at your traffic level.

### Steps
1. In GSC → **Settings** → **Bulk data export**.
2. Follow the prompts to link a Google Cloud project (create a free one if needed) and confirm.

### How to verify it worked
GSC Settings shows the export as "Active" with a dataset name.

---

## Task 4 — Set up Bing Webmaster Tools  ·  measurement  ·  🙋 NEEDS YOU  ·  ~30 min

### What this is
Bing's version of Search Console. It matters now because **ChatGPT and Copilot pull from Bing's index**, and Bing has a free report showing when AI engines cite you.

### Steps
1. Go to https://www.bing.com/webmasters, add `quarticlab.com` (you can import directly from GSC once Task 2 is done).
2. Submit `https://www.quarticlab.com/sitemap.xml`.
3. Open the **AI Performance Report** and note the starting numbers as your baseline.

### How to verify it worked
Site is verified and the sitemap is submitted; the AI Performance Report loads.

---

## Task 5 — Ask Google to index the blog posts  ·  measurement  ·  🙋 NEEDS YOU  ·  ~30 min

### What this is
After the sitemap fix is live, you can tell Google "please look at these now" instead of waiting for it to wander by.

### Why it matters
It pushes your newly-listed blog URLs into Google's crawl queue immediately. (Do this only after Task 1 is merged + deployed and Task 2 is done.)

### Steps
1. In GSC, use the **URL Inspection** bar at the top.
2. Paste `https://www.quarticlab.com/blog`, press enter, then click **Request indexing**. Repeat for `/blog/ai-mvp-cost-2026` and `/blog/how-to-hire-offshore-ai-development-team`.

### How to verify it worked
Each URL shows "Indexing requested" / "URL is on Google" over the following days.

---

## Quick glossary
- **Sitemap** — a machine-readable list of your pages you give Google (`/sitemap.xml`).
- **lastmod** — the "last modified" date on a sitemap entry; a freshness hint.
- **Search Console (GSC)** — Google's free dashboard of your search performance.
- **BigQuery export** — streams your full GSC data into a free database (not retroactive).
- **Bing Webmaster Tools** — Bing's version of GSC; matters because ChatGPT/Copilot use Bing.
- **Indexing** — when a search engine has read and stored your page so it can show it.
- **AEO** — getting AI assistants (ChatGPT/Perplexity/Gemini) to mention your site.
- **Branch** — a separate copy of the code where changes are reviewed before going live.

## If you don't code yourself
Task 1 is already implemented on branch `seo-brain/wk-2026-06-12-blog-sitemap` — forward it to your developer to review + merge. Tasks 2-5 are account setup you (or your developer) click through. Total human time ≈ 2.5 hours.
