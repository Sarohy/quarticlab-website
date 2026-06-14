# Quartic Lab — Seeded 12-Week SEO/AEO Roadmap

> The brain consumes the next un-started week each run, expands it into 5–8 small Notion tasks (via `p7-plan-week`), and replaces roadmap work with GSC-driven work once ranking data is live.
> Each line is `[category/channel] task — file/where`. `code` tasks are auto-implemented on the weekly branch (`code_mode: apply`); `human` tasks go to Notion.
> Ordering follows the dossier's "bottom line" backlog: **make content discoverable first, then build entity/schema, then run the content + backlink engine.** Earning links/citations before the discoverability fixes ship would waste them.

**Status legend:** `[ ]` not started · `[~]` in progress · `[x]` done. Update as weeks complete.

---

## PHASE 1 — Foundation & discoverability (Weeks 1–4)
*Goal: every published page is crawlable, in the sitemap, internally linked, and routed through `Seo.jsx`. Nothing else matters until this is true.*

### [~] Week 1 — Blog into the sitemap + stand up measurement  (started 2026-06-12; 4/5 done as of 2026-06-14)
- `[x]` `[fixing/code]` Include `/blog` + every `status=="published"` post in `src/pages/sitemap.xml.js` via a `getServerSideProps` Firestore query; emit per-URL `<lastmod>` from `updatedAt || publishedDate`. Reverse the "intentionally excluded" comment. — **DONE & DEPLOYED** (verified 2026-06-14: live `https://www.quarticlab.com/sitemap.xml` includes `/blog` + both posts).
- `[x]` `[fixing/code]` Replace the uniform `today` lastmod on static routes with each route's true last-modified (or omit where unknown); **drop `<changefreq>` and `<priority>`** from the `<url>` template. — **DONE** (deployed version is `<loc>`-only on static routes). NOTE: a divergent fix landed on `dev` (commit `ebba44b`) that re-adds changefreq/priority — reconcile before merging `dev`.
- `[x]` `[measurement/human]` Verify `quarticlab.com` in Google Search Console (DNS or HTML-tag). Submit `https://www.quarticlab.com/sitemap.xml`. — **DONE** (Notion, 2026-06-14).
- `[ ]` `[measurement/human]` Turn ON the GSC → BigQuery bulk export (NOT retroactive — every day delayed is lost history). Free within this site's volume. — **STILL OPEN** (Notion: Not started, Due 06-16). Rolled into Week 2.
- `[x]` `[measurement/human]` Verify the domain in Bing Webmaster Tools, submit the sitemap, open the AI Performance Report as a Copilot/ChatGPT-citation baseline. — **DONE** (Notion, 2026-06-14).

### [x] Week 2 — Route blog through Seo.jsx + blog-index schema  (done 2026-06-14 — merged to `dev` via PR #4, commit 069a043; pending deploy + live verify)
- `[x]` `[fixing/code]` Replace the raw `<Head>` in `src/pages/blog/[slug].jsx` with `<Seo>`, passing `ogImage={post.heroImage}`; keep the Article JSON-LD as `<Seo>` children. — DONE & MERGED.
- `[x]` `[fixing/code]` Replace the raw `<Head>` in `src/pages/blog/index.js` with `<Seo>`; add a default blog og:image. — DONE & MERGED.
- `[x]` `[schema-aeo/code]` Add a `CollectionPage` JSON-LD + `Home › Blog` breadcrumb to `/blog`. — DONE & MERGED.
- `[x]` `[improve-content/code]` Remove the "X WORDS" byline render in `blog/[slug].jsx` (reading-time kept). — DONE & MERGED.

### [~] Week 3 — Internal linking (the other half of discoverability)  (partial 2026-06-14: 2 done, 2 deferred by user)
- `[deferred]` `[fixing/code]` Add an SSR-rendered "Latest insights" block (3–4 related posts by `tags`/`category`) to the homepage `src/pages/index.js`, output in `getServerSideProps`. — **DEFERRED by user 2026-06-14** pending more content. Research verdict: VALID (discovery hygiene, not a freshness/ranking boost). Revisit once more posts exist.
- `[x]` `[fixing/code]` Add an SSR "Related posts" block to `src/pages/blog/[slug].jsx` (by shared `tags`). — **DONE** on branch `seo-brain/wk-2026-06-14-internal-links` (commit 1ddbb79). "Keep reading" block, shared-tag ranking, SSR, build green. Awaiting review/merge.
- `[deferred]` `[fixing/code]` Add a "From the blog" cross-link block to `src/pages/services/[slug].jsx` linking to cluster posts for that service (by `category`). — **DEFERRED by user 2026-06-14**. Research verdict: VALID-but-borderline now (only 2 posts → identical boilerplate sitewide, a devalued anti-pattern). When revisited: inventory-gate (render only when ≥2 topically-relevant posts) AND wire blog→service up-links (the direction that actually lifts the money page). See `outputs/internal-linking-research.md`.
- `[x]` `[fixing/code]` Add blockchain + IoT service links to `Footer.jsx` (was 6 of 8). — **DONE** on branch `seo-brain/wk-2026-06-14-internal-links` (commit 1ddbb79). All 8 services now footer-linked.

### [ ] Week 4 — Named authors (E-E-A-T + AEO)
- `[schema-aeo/code]` In `blog/[slug].jsx` Article JSON-LD (~lines 508–512), replace `author: {"@type":"Organization"}` with a `Person` (`name, url, jobTitle, sameAs:[LinkedIn], worksFor:{"@id": SITE_URL+"/#organization"}`) sourced from a new `author` object on the `blogs` doc; fall back to Organization if absent.
- `[schema-aeo/code]` Render a visible byline + 1–2 line author bio block on the post page.
- `[add-blog/human]` Write 1–2 real author profiles (name, title, LinkedIn) and add the `author` object to existing published `blogs` docs in Firestore. (No fake experts.)

---

## PHASE 2 — Entity, schema table-stakes & directories (Weeks 5–6)

### [ ] Week 5 — Breadcrumbs site-wide + LocalBusiness + entity graph
- `[schema-aeo/code]` Generalize the Home-only `BreadcrumbList` in `_app.js` into a route-keyed component applied on `/services`, `/services/[slug]` (Home › Services › {name}), `/blog`, `/blog/[slug]`, `/projects`. Labels from each page's already-loaded data.
- `[local/code]` Extend the global Organization to `@type: ["Organization","ProfessionalService"]` in one `@graph`; keep the Lahore `PostalAddress`; add `areaServed` Country nodes (US, GB, DE, AE, SA). **Omit `aggregateRating`.**
- `[schema-aeo/code]` Enrich Organization `sameAs` in `_app.js` (add Clutch, Crunchbase, GitHub once URLs are confirmed — currently LinkedIn + Twitter only).
- `[local/code]` Extract the NAP (address/phone) to a shared constant reused by `_app.js` PostalAddress + `Footer.jsx` so it's byte-identical everywhere.

### [ ] Week 6 — Directory tier (highest-ROI off-site)
- `[backlink/human]` Audit + complete the Clutch profile (full service taxonomy matching `services`/`service_details`); request phone-verified reviews.
- `[backlink/human]` Claim/complete GoodFirms, DesignRush, TheManifest profiles — NAP byte-identical to the `_app.js` PostalAddress.
- `[backlink/human]` Claim/complete G2 + Crunchbase + LinkedIn Company Page.
- `[local/human]` Create ONE legitimate Google Business Profile for the Lahore office (primary category "Software Company"; service areas = Lahore + nearby cities only). Add the GBP Maps URL to `sameAs`.

---

## PHASE 3 — Content engine (Weeks 7–10)
*Now that pages are discoverable and the entity is built, earned content + links land on solid ground.*

### [ ] Week 7 — Original-data cost post
- `[add-blog/human]` Publish the `ai-mvp-cost-2026` original-data post (adapt the existing legacy draft into this repo's `blogs` shape: HTML `contentHtml`, `status:"published"`, `metaDescription`, `tags`, `heroImage`, `author`). TL;DR price range in the first paragraph; real HTML `<table>` tiers; methodology section.
- `[improve-content/code]` Ensure it's answer-first and cross-linked to `/services/ai-ml-development`.

### [ ] Week 8 — Comparison page
- `[add-page/human]` Draft + publish a comparison post (start with "Next.js vs React in 2026" or "Flutter vs React Native") as a `blogs` doc: pros/cons `<table>` + "when to choose which" verdict in the first 100 words. Routed through `Seo.jsx`, in the sitemap.

### [ ] Week 9 — Pillar/cluster depth
- `[add-blog/human]` Publish 2 cluster posts under AI/ML + GenAI (e.g. "RAG vs fine-tuning: when to choose which", "How to build a production AI agent") — answer-first H2s, descriptive internal links UP to the service pillar + SIDEWAYS to siblings. See dossier §6 cluster map.

### [ ] Week 10 — Case study
- `[add-blog/human]` Turn one real `projects` entry into a narrative case study (problem → stack/tradeoffs → measurable outcome), cross-linked from the matching `service_details`. First-hand Experience is the AI-immune differentiator.

---

## PHASE 4 — Digital PR & steady state (Weeks 11–12+)

### [ ] Week 11 — Digital PR + listicle inclusion
- `[backlink/human]` Pitch the Week-7 original data via Featured.com (rehomed HARO) + Qwoted; 3–5 expert-sourcing responses using a named human author.
- `[backlink/human]` Identify which domains AI engines cite for your target prompts (AEO panel), then pursue inclusion in those "best AI/agentic/Next.js dev companies 2026" listicles.

### [ ] Week 12 — First decay/AEO review + steady state begins
- `[measurement/human]` Run the 20–30-prompt AEO visibility panel across ChatGPT/Perplexity/Gemini; record visibility rate (not "rank") in `outputs/aeo-panel.md`.
- `[improve-content/mixed]` If GSC is live: refresh 3–5 declining posts substantively. If not: refresh the oldest 2 posts (new code samples, new entities, real "Last updated").

---

## Steady state (Week 13 onward — roadmap exhausted)

Once the roadmap is done (and ideally once GSC has data), the weekly mix becomes:
- 1–2 **defend/push/CTR** tasks from `p5-track` (GSC movers, page-2 strikers, low-CTR titles).
- 1 **content** task (`add-blog`/`improve-content`) advancing a cluster.
- 1 **backlink** task (directory/PR/mention).
- rotating **technical**/**schema-aeo**/**local** housekeeping as the auditor surfaces it.
- monthly: content-decay + AEO-visibility jobs (run separately so their noise doesn't flood the weekly list).
