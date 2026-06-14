# Weekly Plan — Week of 2026-06-14 (Week 4 — Named authors + content engine kickoff)
> Roadmap: Phase 1 · Week 4 (Named authors, E-E-A-T + AEO), pulling forward one Phase-3 content task + the off-site baseline. GSC: not live (heuristic). code_mode: apply.
> 5 tasks · 1 code (done, review) · 4 human (1 rollover). Branch: `seo-brain/wk-2026-06-14-authors` (commit 58b6d6e).

1. [measurement · human · 30 min · Due 2026-06-16] Turn ON the GSC → BigQuery bulk export  **(ROLLOVER — leads the list)**
   - where: Google Search Console → Settings → Bulk data export
   - why: not retroactive; every day off is lost history. Still the one blocker to real rank tracking. Already in Notion from Week 1.
   - status: 🙋 needs you.

2. [schema-aeo · code · 45 min · Due 2026-06-14] Add `Person` author schema + visible byline/bio to blog posts (Organization fallback)
   - where: `src/pages/blog/[slug].jsx` (+ `blogDetail.module.css`)
   - why: named human authors are one of the few corroborated E-E-A-T/AEO levers. Article JSON-LD now emits a `Person` when the post carries a structured `author` object; falls back to Organization for string authors so nothing breaks today.
   - status: ✅ DONE by brain — review only.

3. [add-blog · human · 90 min · Due 2026-06-17] Write 1–2 author profiles + add `author` objects to the 2 published Firestore posts
   - where: Firestore `blogs` docs (`ai-mvp-cost-2026`, `how-to-hire-offshore-ai-development-team`)
   - why: lights up the Person schema/byline from task 2 AND fixes the "Zweidevs Team" byline on `ai-mvp-cost-2026`. No fake experts — real Quartic Lab people.
   - status: 🙋 needs you.

4. [add-blog · human · 2 hours · Due 2026-06-19] Adapt + publish the `ai-mvp-cost-2026` original-data post into Firestore
   - where: Firestore `blogs` (adapt the existing legacy draft at `~/my-ai-assistant/.claude/seo-brain/outputs/content-drafts/ai-mvp-cost-2026/`)
   - why: content inventory (2 posts) is now the binding constraint — it caps internal linking AND AEO. Original-data posts are the #1 citation magnet. Publishing grows the cluster and unblocks the deferred homepage/service internal-link blocks.
   - status: 🙋 needs you. (I can pre-draft the `contentHtml` on request.)

5. [backlink · human · 90 min · Due 2026-06-18] One-time backlink + directory baseline audit
   - where: Ahrefs/Semrush free tier or GSC Links report; Clutch/GoodFirms/DesignRush/TheManifest/G2/Crunchbase/LinkedIn
   - why: Phase 1 shipped, so earned links now land on crawlable pages. Capture referring domains + directory claim status (fills the `?`s in backlinks-tracker.md) before Week 5-6 directory completion.
   - status: 🙋 needs you.

(Dropped do-NOT candidates: none. Deferred this week by prior decision: homepage "Latest insights" block + service-page "From the blog" block — revisit after content inventory grows. Week-3 tasks 2 & 4 already merged + on dev.)
