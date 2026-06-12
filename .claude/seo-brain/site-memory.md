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
  - Per-route metadata: the centralized `src/Components/CommonComponents/Seo/Seo.jsx` component (props: `title, description, canonical, ogImage, ogTitle, ogDescription, ogImage*, twitter*, robots, keywords, children`). **Blog pages currently bypass it** (raw `next/head`) — a known gap.
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
- **Branch naming:** `seo-brain/wk-<YYYY-MM-DD>-<short-slug>` off `master`. One branch per weekly run (all that week's code tasks on it). Never commit to `master` directly. Never push unless the user says so.
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
| `/blog` | hub | ❌ **excluded** | ❌ raw Head, no og:image | top-priority fix |
| `/blog/[slug]` | posts | ❌ **excluded** | ❌ raw Head | Article schema, Organization author (should be Person) |
| `/privacy` `/terms` `/cookies` | policy | ✅ | ✅ | thin, fine |

> **Blog post count:** unknown — read Firestore `blogs` where `status=="published"` on first `p1-audit`/`p5-track` run and record here.
> `/ai-services` exists as a route but is NOT in the sitemap — flag for the auditor (intentional or orphan?).

---

## Remediation roadmap

See `roadmap.md` for the full seeded 12-week plan (remediation → entity/schema → content engine → steady state). The brain consumes the next un-started roadmap item each week and replaces it with GSC-driven work once data exists.

- **Current roadmap position:** `Week 1 (not started)`

---

## Pending this week

- _none yet — first run will populate from roadmap Week 1._

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

- **Date:** `never` (brain installed 2026-06-12; first run pending).
- **Skills ran:** —
- **Files produced:** —
- **Last audit:** `never`
- **Keyword clusters last refreshed:** `never`
