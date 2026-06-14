# This Week's SEO/AEO Tasks — Plain English
> Week of 2026-06-14 (Week 4 — Named authors + content)  |  Site: https://www.quarticlab.com  |  For: zero SEO knowledge assumed
> Auto-regenerated each weekly run.

SEO = showing up on Google. AEO = the same for AI assistants (ChatGPT, Perplexity, Gemini). This week has one job done by me (the code for named authors) and four for you — and the theme is shifting from *code* to *content*, because your site's plumbing is now solid and the real bottleneck is that you only have 2 published posts.

**Recap of what's now live:** clean sitemap (with your blog posts), blog pages with proper share images + structured data, the word-count byline removed, a "Keep reading" related-posts block, and all 8 services in the footer. Phase 1 (make everything findable) is done.

One task is **✅ DONE BY THE BRAIN** (review only). Four are **🙋 NEEDS YOU.**

---

## Task 1 — Turn ON the Google → BigQuery data export  ·  measurement  ·  🙋 NEEDS YOU  ·  ~30 min  ·  Due Jun 16

### What this is
Google Search Console keeps only ~16 months of data and hides a lot. The free BigQuery export streams your full search data out daily.

### Why it matters
It is **not retroactive** — it only captures data from the day you switch it on. This is a carryover from earlier weeks and the single thing blocking me from doing real "what's ranking / what's slipping" work instead of educated guesses.

### Steps
1. https://search.google.com/search-console → pick `quarticlab.com`
2. Settings → **Bulk data export** → connect a Google Cloud project (free tier is fine) → confirm.

### Verify
Settings → Bulk data export shows the export active with a BigQuery dataset named.

---

## Task 2 — Show the real author on each post (and tell Google who wrote it)  ·  schema-aeo  ·  ✅ DONE, review  ·  ~45 min

### What this is
AI engines and Google increasingly favor content with a **named, credentialed human author** over a faceless brand. I rewired the blog post template so that when a post has author details (name, job title, LinkedIn, short bio), it: (a) tells Google it's written by a *Person* (not just "the company"), and (b) shows a proper byline with role + an author bio with a link.

### Why it matters
"Named human authors" is one of the few things research consistently links to trust signals and AI-citation eligibility. Right now your posts say the author is the organization — which is the weakest option.

### Steps (review only)
```bash
git diff dev...seo-brain/wk-2026-06-14-authors -- "src/pages/blog/[slug].jsx"
```
It's built to be safe: until you add author details (Task 3), posts look exactly as they do today. Merge + deploy with Task 3.

### Verify
After Task 3 + deploy, open a post → you'll see the author's name + role + bio + a "More from…" link, and Google's Rich Results Test will show an `author` of type `Person`.

---

## Task 3 — Write 1–2 author profiles and attach them to your posts  ·  add-blog  ·  🙋 NEEDS YOU  ·  ~90 min  ·  Due Jun 17

### What this is
Task 2 built the *plumbing*; this fills it with *real people*. Add an `author` object to each published post in your database (Firestore `blogs`), with: name, job title, LinkedIn URL, and a 1–2 sentence bio.

### Why it matters
This is what actually makes the named-author benefit appear. It also fixes a real bug: the `ai-mvp-cost-2026` post currently shows **"Zweidevs Team"** (an old brand name) as the author — it should be a Quartic Lab person. **Use real people only — never invent experts.**

### Steps
1. Pick 1–2 real Quartic Lab people who can stand behind the posts (an engineer/founder).
2. For each, gather: full name, job title, LinkedIn URL, 1–2 sentence bio.
3. In Firestore, set each post's `author` field to an object like:
   ```json
   {
     "name": "Jane Doe",
     "jobTitle": "Lead AI Engineer",
     "url": "https://www.linkedin.com/in/janedoe",
     "sameAs": ["https://www.linkedin.com/in/janedoe"],
     "bio": "Jane has shipped production AI systems for fintech and health clients."
   }
   ```
   (If you leave `author` as a plain string, the page safely falls back to the old "Quartic Lab" display.)

### Verify
Open the post after deploy — the real name, role, and bio show; the "Zweidevs Team" byline is gone.

---

## Task 4 — Publish your first original-data post (the AI-MVP cost article)  ·  add-blog  ·  🙋 NEEDS YOU  ·  ~2 hrs  ·  Due Jun 19

### What this is
You have a strong draft sitting in the legacy tooling (`~/my-ai-assistant/.claude/seo-brain/outputs/content-drafts/ai-mvp-cost-2026/`). Adapt it into a published post in your `blogs` database (as `contentHtml`, with a meta description, tags, hero image, and the author object from Task 3).

### Why it matters
This is the **highest-leverage move you have right now.** Your whole site is built to rank/serve content — but you only have 2 posts. More posts means more to rank, more for AI to cite, and it unblocks the homepage/service "related posts" blocks we deliberately deferred. Original-data/cost posts are the single most-cited format by AI engines. Lead with the price range in the first paragraph, use a real HTML table for the cost tiers, and include a short "how we got these numbers" methodology note.

### Steps
1. Open the existing draft; tighten it for your voice + 2026 numbers.
2. Create/Update the Firestore `blogs` doc: `status: "published"`, `contentHtml`, `metaDescription`, `tags`, `heroImage`, `author` (from Task 3).
3. It will appear in the sitemap, the blog index, and "Keep reading" automatically.

### Verify
The post is live at `/blog/ai-mvp-cost-2026`, in `/sitemap.xml`, and shows on `/blog`.

> Want me to pre-draft the `contentHtml` from the existing draft so this becomes a quick review-and-publish? Just say so.

---

## Task 5 — One-time backlink & directory baseline audit  ·  backlink  ·  🙋 NEEDS YOU  ·  ~90 min  ·  Due Jun 18

### What this is
Now that your pages are findable, off-site reputation work pays off. First we need a baseline: who currently links to you, and which industry directories you've claimed.

### Why it matters
Brand mentions + directory presence correlate far more with AI citations than raw backlinks. But you can't improve what you haven't measured — this audit fills in the unknowns so Weeks 5–6 (completing Clutch/GoodFirms/etc.) are targeted, not guesswork.

### Steps
1. Referring domains: use Ahrefs/Semrush free tier (or the GSC "Links" report once GSC is live).
2. For each of Clutch, GoodFirms, DesignRush, TheManifest, G2, Crunchbase, LinkedIn Company Page: note claimed? complete? reviews? Is the name/address/phone identical to the site footer?
3. Record findings in `.claude/seo-brain/outputs/backlinks-tracker.md`.

### Verify
The `?` cells in the backlinks tracker are filled with real status.

---

### For whoever merges the code
- Branch: `seo-brain/wk-2026-06-14-authors` (off `dev`). Build green. Merge with Task 3 so the Person data has something to display.
- Deferred (by earlier decision): homepage + service-page internal-link blocks — revisit once more posts exist.
