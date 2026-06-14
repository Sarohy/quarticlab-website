# Site Memory — Quartic Lab SEO/AEO Brain

> Single source of truth for the SEO/AEO Brain. This file holds STATE (what's true now, what ran, what's queued).
> The brain reads it at the start of every weekly run and writes to it at the end.
> Bootstrapped 2026-06-12 from a full read of the live codebase + the verified `research-dossier.md`.
> Values marked `(verify)` should be confirmed against the live site before relying on them.

---

## Site info

- **URL:** `https://www.quarticlab.com/` (canonical origin lives in `src/utils/siteUrl.js` → `SITE_URL`, overridable via `NEXT_PUBLIC_URL`).
- **Repo:** THIS repository (`/Users/sarohy/Projects/zweidevs-website`). The brain runs **inside the repo** — it can read and edit source files directly. This is the key difference from the legacy remote brain in `~/my-ai-assistant`.
- **Stack:** Next.js 13.4.19 **Pages Router** (JavaScript, NOT TypeScript, NO App Router / RSC / `"use client"`). MUI + Emotion. Firestore for dynamic content. `output: "standalone"`.
- **Stack notes for code/edit instructions:**
  - Routes live in `src/pages/*.js|jsx` — never `app/*`.
  - Per-route metadata: the centralized `src/Components/CommonComponents/Seo/Seo.jsx` component (props: `title, description, canonical, ogImage, ogTitle, ogDescription, ogImage*, twitter*, robots, keywords, children`). **All pages including blog now route through it** (blog wired in Week 2, merged 2026-06-14).
  - JSON-LD: global Organization + (Home-only) BreadcrumbList injected in `src/pages/_app.js`. Per-page schema passes as `<Seo>` children or inline in the page's `<Head>`.
  - Fonts self-hosted via `next/font/google` in `_app.js` (Space Grotesk, Instrument Serif, IBM Plex Mono).
  - CSS Modules per component/page (`.module.css`).
  - Path alias `@component/*` → `./src/*`.
  - JSX props alphabetised (`react/jsx-sort-props`); Prettier + ESLint enforced (lint-staged pre-commit). `next.config.js` has `eslint.ignoreDuringBuilds: true`, so **the brain must run `npx eslint <file>` itself** after edits — the build won't catch lint.
  - Service detail pages: `src/pages/services/[slug].jsx` reads Firestore `service_details`; nav from `src/Constants/navLinks.js` → `SERVICE_DROPDOWN`. Already routes through `Seo.jsx` and emits `Service` + `FAQPage` schema with `areaServed` (US/UK/PK).
  - Blogs: `src/pages/blog/[slug].jsx` + `src/pages/blog/index.js` read Firestore `blogs` (`status === "published"` filter). Body is an **HTML string** in `contentHtml`.
- **Niche:** Software development agency — AI/ML, GenAI & agentic automation, web (React/Next/Node), mobile, DevOps, blockchain, IoT, UI/UX. Startups + enterprises.
- **Target audience:** Startup founders + enterprise tech leaders (CTO / Head of Eng / Product Lead) who need an outsourced product team.
- **Primary location:** Lahore, Pakistan (6-B, Block B Phase 1 Johar Town, 54000). Primary markets: US, Europe, MENA. Phone `+92 309 444 6225`.
- **Languages:** English only (NO hreflang needed — see dossier myths).
- **Firebase project:** `zweidevs-c4c1e`. Content collections: `blogs`, `services`, `service_details`, `projects`, `reviews`. Write collections: `contact_submissions`, `newsletter_subscribers`.

### Already implemented (do NOT re-add as new tasks — only IMPROVE)
SSR `/sitemap.xml` (16 static routes — **but excludes `/blog` + posts: a top-priority gap**), SSR `/robots.txt` with AI-crawler allowlist (correct, leave it), global Organization JSON-LD + Home-only BreadcrumbList, centralized `Seo.jsx`, `FAQPage`/`Article`/`Service`/`WebSite` schema on relevant pages, security headers (CSP/HSTS), self-hosted fonts, `next/image` + `sharp`, cookie consent + GA gated by consent.

---

## Operating config

- **Cadence:** WEEKLY. The brain plans one week at a time. Default run day: Monday.
- **Tasks per week:** target **5–8 small tasks**, balanced across categories per the planner rotation (see `procedures/p7-plan-week.md`).
- **`code_mode`:** `apply`
  - The brain AUTO-IMPLEMENTS code-channel tasks (`fixing`, `technical`, `schema-aeo`, and code-side `improve-content`) on a review branch, runs `npm run build` + `npx eslint`, and leaves the diff for the user to review/merge. It does NOT push or merge.
  - Human-channel tasks (`add-blog` publishing to Firestore, `backlink`, `local`/GBP, `measurement` setup, content personalization) are written to Notion for the user to do.
  - To switch behavior, set `code_mode: describe` (brain stops editing code; writes paste-ready instructions instead) or `code_mode: ask` (brain shows each diff and waits for OK).
- **Branch naming:** `seo-brain/wk-<YYYY-MM-DD>-<short-slug>`. One branch per weekly run. **Base branch = `dev`** (updated 2026-06-14): `revamp-landing-page` was merged via PR #1, so the SEO infra now lives on `main`/`dev`. The user's working branch is `dev` — branch off it. (Superseded the 2026-06-12 note about basing off `revamp-landing-page`.) Never commit to the base branch directly; switch back to the user's working branch after committing; never push unless the user says so.
- **Build/lint gate:** every code task must end with `npm run build` exit 0 AND `npx eslint <changed files>` exit 0 before it counts as done.

---

## GSC / ranking data

- **Status:** `NOT SET UP YET` (as of 2026-06-12).
- **Consequence:** Skill `p5-track` runs in **heuristic mode** (no real rank data) until GSC exists. The brain front-loads a **measurement-setup track** (see roadmap Week 1) and tracks rankings qualitatively (live `WebFetch` + sitemap/index checks) in the meantime.
- **When GSC is ready:** set `Status: live`, drop weekly CSV exports into `inputs/gsc-<YYYY-MM-DD>/` (columns: Query, Page, Clicks, Impressions, CTR, Position), and `p5-track` switches to data mode (movers/defend/push/CTR).
- **Striking-distance band (when live):** position 5–20 AND impressions ≥ 100 — VALIDATE against the real GSC distribution before hardcoding (see dossier §8).

---

## Current keyword targets

| Keyword | Target page | Current position | Prior position | Last checked |
|---------|-------------|------------------|----------------|--------------|
| _none tracked yet — populate after GSC is live (p5-track)_ | — | — | — | — |

> A "dropped keyword" = current position numerically larger than prior (e.g. 7 → 12).

---

## Published pages (live inventory)

| URL | Type | In sitemap? | Routes through Seo.jsx? | Notes |
|-----|------|-------------|--------------------------|-------|
| `/` | home | ✅ | ✅ | FAQPage + WebSite schema |
| `/services` | hub | ✅ | ✅ | |
| `/services/web-development` | service | ✅ | ✅ | Service + FAQPage schema |
| `/services/mobile-development` | service | ✅ | ✅ | |
| `/services/ai-ml-development` | service | ✅ | ✅ | |
| `/services/genai-automation` | service | ✅ | ✅ | |
| `/services/blockchain-development` | service | ✅ | ✅ | not in footer |
| `/services/iot-development` | service | ✅ | ✅ | not in footer |
| `/services/devops` | service | ✅ | ✅ | |
| `/services/ui-ux-design` | service | ✅ | ✅ | |
| `/about` | content | ✅ | ✅ | FAQPage schema |
| `/projects` | portfolio | ✅ | ✅ | |
| `/contact` | utility | ✅ | ✅ | FAQPage schema |
| `/ai-services` | landing | ❌ NOT in sitemap | ✅ | verify intent — orphan? |
| `/blog` | hub | ✅ (live) | ✅ (Wk2) | + CollectionPage + Home›Blog breadcrumb + default og:image |
| `/blog/[slug]` | posts | ✅ (live) | ✅ (Wk2) | Article schema; og:image=hero; author still Organization (→ Person in Wk4) |
| `/privacy` `/terms` `/cookies` | policy | ✅ | ✅ | thin, fine |

> **Blog post count:** 2 published in Firestore (found 2026-06-12): `ai-mvp-cost-2026`, `how-to-hire-offshore-ai-development-team`. Both live in `sitemap.xml` (Week-1 fix, deployed & verified 2026-06-14).
> `/ai-services` exists as a route but is NOT in the sitemap — flag for the auditor (intentional or orphan?).

---

## Remediation roadmap

See `roadmap.md` for the full seeded 12-week plan (remediation → entity/schema → content engine → steady state). The brain consumes the next un-started roadmap item each week and replaces it with GSC-driven work once data exists.

- **Current roadmap position:** `Week 2 DONE (merged to dev via PR #4, commit 069a043, 2026-06-14; pending deploy + live verify). Next: Week 3 — internal linking. Carryover open: GSC→BigQuery export (measurement, still Not started).`

---

## Week 1 status (Week of 2026-06-08 — verified 2026-06-14)

- ✅ [code] Sitemap overhaul — DEPLOYED; live sitemap includes `/blog` + both posts (verified via WebFetch 2026-06-14). Notion shows the "Review + merge" task as In progress (formal merge to user's working branch still pending).
- ✅ [measurement] Verify GSC + submit sitemap — Done.
- ✅ [measurement] Bing Webmaster + sitemap + AI Performance Report — Done.
- ✅ [measurement] After deploy: request indexing for /blog + 2 posts — Done.
- ⬜ [measurement] Turn ON GSC→BigQuery export (Due 06-16) — **STILL OPEN**, rolled into Week 2.

## Pending this week (Week of 2026-06-14 — Week 2, pushed to Notion, Source seo-brain/quarticlab/weekly)

- ✅ [code] Route `blog/[slug].jsx` through `Seo.jsx` (ogImage=heroImage; Article JSON-LD kept) — done on Week-2 branch, awaiting review.
- ✅ [code] Route `blog/index.js` through `Seo.jsx` + default blog og:image — done on Week-2 branch.
- ✅ [code] Add `CollectionPage` JSON-LD + Home › Blog breadcrumb to `/blog` — done on Week-2 branch.
- ✅ [code] Remove the "X WORDS" byline in `blog/[slug].jsx` — done on Week-2 branch.
- 🙋 [measurement] Turn ON GSC→BigQuery export (rollover from Week 1, Due 06-16).

## Content queue

- `ai-mvp-cost-2026` — original-data cost post. A draft exists in the LEGACY brain at `~/my-ai-assistant/.claude/seo-brain/outputs/content-drafts/ai-mvp-cost-2026/` — adapt it into this repo's `blogs` Firestore shape (HTML `contentHtml`) rather than re-researching from scratch. (add-blog)
- Comparison page: "Next.js vs React (2026)" or "Flutter vs React Native" (add-page)
- Pillar/cluster posts under AI/ML + GenAI (see `roadmap.md` + dossier §6 cluster map) (add-blog)

---

## Backlink / entity status

- **Referring domains:** unknown (verify with a one-time backlink audit — see `procedures/p6-backlinks.md`).
- **Directory profiles:** Clutch badge present on-site; claim/completion status of Clutch, GoodFirms, DesignRush, TheManifest, G2, Crunchbase, LinkedIn = unknown → audit in p6.
- **Organization `sameAs` (in `_app.js`):** LinkedIn + Twitter ONLY. Missing: Clutch, Crunchbase, GitHub, GBP. (schema-aeo/backlink)
- **NAP single source of truth:** not yet extracted to a shared constant (lives in `_app.js` PostalAddress + `Footer.jsx`) — see `local` tasks.
- Detailed tracker lives in `outputs/backlinks-tracker.md` (created by p6 on first run).

---

## Competitor notes

- **Main competitors:** unknown — populate manually (suggest 2 Lahore/Pakistan agencies + 2 international AI/dev shops chasing the same "AI development company / agentic AI" queries).
- **What they rank for that we don't / content gaps / shared backlink sources:** unknown — fill during first competitive pass (quarterly).

---

## Notion

- **Database:** `SEO Brain — Daily Tasks` (shared with the legacy brain — that's fine; we differentiate by `Source`).
- **Database URL:** `https://app.notion.com/p/58b63700c839446983c5be93880ad2ef`
- **Data source ID:** `b923a19f-3825-40cb-a1ee-dbda52fadd79`
- **Parent page ID:** `34c040d6-b943-8029-b5ab-c85c671c2782` (Claude Page — only used if the DB ever needs re-creation)
- **Source tag (THIS brain):** `seo-brain/quarticlab/weekly` — every page this brain pushes sets `Source` to this. The legacy brain uses `seo-brain/outputs/daily-tasks-explained.md`. **Idempotence + verification queries MUST filter on our Source so we never touch the legacy brain's tasks.**
- **Schema (confirmed 2026-06-12):** `Task name` (title), `Status` (status: Not started/In progress/Done), `Due` (date), `Effort` (select: 30 min/45 min/90 min/2 hours), `Source` (text), `Assignee` (person), **`Category` (select: fixing/technical/schema-aeo/add-blog/add-page/improve-content/backlink/local/measurement)**, **`Channel` (select: code/human)**.
- **Reminder time:** `09:00` local (PKT, `+05:00`) — time component of every task's Due datetime.
- **Assignee user ID:** `(unset — set to your Notion user UUID to get real push/email reminders at Due time)`
- **disabled:** `false`

---

## Image generation policy

- **Brand kit:** NONE in this repo, and NO `/brand-image` command available (those exist only in `~/my-ai-assistant`). So image tasks do NOT route through `/brand-image`.
- **For now:** when a task needs a visual (blog hero / og-image / cover), the brain writes a plain task describing the 1200×630 asset to create in any tool, and the destination (Firestore `blogs.heroImage` URL, or `/public/og-image.png`). Hero images for blog posts are stored as a `heroImage` URL field on the Firestore doc.
- **disabled:** `false` (tasks are written; just no auto-generation command).

---

## Last run

- **Date:** `2026-06-14` (Week 2 — status-check + Week-2 implementation; user-directed, not the full procedure sweep).
- **Step 0 verification (Week 1):** Live `/sitemap.xml` confirmed to include `/blog` + both posts (sitemap fix DEPLOYED). Notion Week-1 tasks: 3 Done (GSC verify, Bing, request-indexing), 1 In progress (sitemap review/merge — effect already live), 1 Not started (GSC→BigQuery export → rolled into Week 2).
- **Procedures ran:** Step 0 (Notion + live verify), p4-optimize (4 code tasks), p7-plan (Week 2), p8-explain, p9-notion-push. (Skipped this run by user direction: p5-track, p1-audit, p2-keywords, p6-backlinks — Week 2 is a code-only roadmap week and audit/clusters are <30 days old.)
- **Code shipped:** `src/pages/blog/[slug].jsx` + `src/pages/blog/index.js` — both routed through `Seo.jsx`; default/hero og:image; `CollectionPage` + `Home › Blog` breadcrumb on `/blog`; `og:type=article` keyed override; removed "X WORDS" byline; JSON-LD uses `SITE_URL`. Branch `seo-brain/wk-2026-06-14-blog-seo` (commit 6a85aa9). `npm run build` green; **eslint could NOT run** (broken transitive dep `has` under `eslint-plugin-react` in installed node_modules — re-run once deps repaired). **MERGED to `dev` via PR #4 (merge commit 069a043) 2026-06-14 — verified on dev working tree. Deploy + live verification still pending.**
- **Files produced/updated:** `outputs/weekly-plan.md`, `outputs/optimized-pages.md`, `outputs/weekly-tasks-explained.md`.
- **Notion:** pushed 4 NEW code tasks; after merge, all 4 set to **Status: Done**. Did NOT trash overlapping Week-1 pages (different week, meaningful statuses); did NOT duplicate the BigQuery rollover (it already exists from Week 1, still Not started).
- **Last audit:** `2026-06-12` (/blog + blog system).
- **Keyword clusters last refreshed:** `2026-06-12`.

### Deploy verification (2026-06-14, after user deployed dev→prod)
- ✅ **Blog SEO (Week 2) LIVE & verified:** `/blog` serves `CollectionPage` + `Home›Blog` `BreadcrumbList` + `og:image`=`/og-image.png`; `/blog/ai-mvp-cost-2026` serves `og:type=article` + og:image + NO "WORDS" byline. All confirmed via raw-HTML curl.
- ❌ **Sitemap fix NOT live yet:** live `/sitemap.xml` still has 19 `<changefreq>` + faked `<lastmod>2026-06-14</lastmod>` on static routes (old build). `dev` source IS correct (commit `b0da59c`). Cause: deploy predated `b0da59c` OR 1-hr CDN edge cache (`max-age=3600`). FIX: redeploy from dev HEAD (285d713+); if still stale, purge Firebase Hosting cache. RE-VERIFY next run.

### Next run (Week 3) should
- Step 0: **re-verify the live sitemap** has NO changefreq/priority (the b0da59c fix). Confirm the GSC→BigQuery export got turned on; if GSC now has data, switch p5 to data mode.
- Advance roadmap Week 3 — internal linking: SSR "Latest insights" on home, "Related posts" on `blog/[slug]`, "From the blog" on `services/[slug]`, add blockchain+IoT links to `Footer.jsx`.
- Advance roadmap Week 3 — internal linking: SSR "Latest insights" on home, "Related posts" on `blog/[slug]`, "From the blog" on `services/[slug]`, add blockchain+IoT links to `Footer.jsx`.
