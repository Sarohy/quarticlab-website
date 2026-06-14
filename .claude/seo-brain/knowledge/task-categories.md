# Task Categories

Every task the brain generates carries exactly ONE category. Categories drive the Notion `Category` property, the planner's weekly rotation (`p7`), and the channel (code vs human). This list is closed — do not invent new categories.

| Category | What it covers | Default Channel | Typical effort |
|----------|----------------|-----------------|----------------|
| `fixing` | Correctness/discoverability defects in existing code or markup (sitemap gaps, broken canonical, missing og:image, metadata drift, internal-link holes) | **code** | 30–90 min |
| `technical` | Infrastructure & performance (Core Web Vitals/INP, SSR correctness, script loading, crawl/robots, image optimization) | **code** | 30 min–2 hr |
| `schema-aeo` | Structured data & AI-extraction surface (Person author, BreadcrumbList, LocalBusiness, CollectionPage, answer-first markup) | **code** | 30–90 min |
| `add-blog` | New blog/cluster/case-study posts into the Firestore `blogs` collection | **human** (draft is code-assisted; publishing is manual Firestore) | 2 hr+ |
| `add-page` | New routes/landing/comparison/cost pages (new `blogs` doc, or a new `/compare/[slug]` route + `service_details`) | mixed | 2 hr+ |
| `improve-content` | Deepen/refresh EXISTING content — cover missing subtopics, answer-first rewrites, tables, "Last updated", refresh decaying posts | mixed | 45 min–2 hr |
| `backlink` | Off-site: directory claims, digital PR, expert sourcing, brand-mention building, `sameAs` enrichment | **human** | 30 min–2 hr |
| `local` | Local/entity: Google Business Profile, LocalBusiness schema, NAP consistency, review velocity | mixed | 30–90 min |
| `measurement` | Set up & read the data loop: GSC, BigQuery export, Bing Webmaster, AEO visibility panel, GA4 AI channel, CWV field data | **human** (setup) → brain (reading) | 30–90 min |

---

## ⚠️ The "increase word count" correction (read this)

The operator originally asked for an "increase word count" category. **The research is unambiguous: word count is NOT a ranking factor** (Surfer's 1M-page study, Aug 2025 — length correlation drops to zero once topical coverage is controlled; Google's Mueller confirms). `src/pages/blog/[slug].jsx` even renders a "X WORDS" byline that trains the wrong instinct.

So this category does NOT exist. Its legitimate intent — "make thin content stronger" — lives in **`improve-content`**, but reframed as:

- ✅ Cover the sub-questions a CTO actually asks (for "agentic AI": orchestration, evals, cost, security, human-in-the-loop) that the page is missing.
- ✅ Rewrite each H2 as the buyer's literal question, answered in the first 2 sentences (answer-first).
- ✅ Add a real comparison/cost `<table>` or tight list where it carries information.
- ✅ Inject first-hand Experience ("in our experience building X for client Y…").
- ✅ Substantively refresh decaying posts (new code samples, new entities, real "Last updated").
- ❌ NEVER "add N words to hit a length target." Length is a byproduct of coverage, never a goal.

When the planner is tempted to write "expand post to 2,000 words," it must instead write an `improve-content` task naming the *specific missing subtopics/intents*.

---

## Hard "do NOT generate" list (verified dead or risky — see dossier §7)

The brain must never create a task to do any of these:

- Create an `llms.txt` file (no major AI engine fetches it; Google refuses to support it).
- Add MORE JSON-LD to chase AI citations (causal studies show no uplift; schema is table-stakes infrastructure, not a citation lever — keep what exists, don't expand for citations).
- Optimize NEW FAQ markup for Google snippets (FAQ rich results retired May 2026 — keep existing FAQPage for Bing/LLM understanding, don't add more for SERP dropdowns).
- Add self-serving `aggregateRating`/review stars to Organization/LocalBusiness schema (disallowed since 2019; manual-action risk — show ratings as a UI badge only).
- Build thin `[service] in [city]` doorway pages (devalued/filtered — max 3 substantively-unique market pages, ever).
- Add `hreflang` (single-language English site).
- Buy links / PBNs / mass low-quality directory submissions / scaled generalist guest posts (devalued to zero equity since March 2026).
- Set up a Google Business Profile expecting it to rank for US/EU searches (proximity is non-hackable; GBP = Pakistan/MENA brand visibility only).
- Quote vendor "+X% ranking" figures (author bios, schema, freshness) as fact in any task or report — frame qualitatively; cite third-party estimates with explicit attribution.
- Add/keep `<changefreq>`/`<priority>` in the sitemap (Google ignores them) or fake a uniform `lastmod`.
- Hardcode an "information-gain score" into scoring logic (the patent is assistant-scoped/speculative — pursue originality as practice, not as a metric).

---

## Channel routing rule

For each task, set `Channel`:

- **`code`** — the brain can fully implement it by editing files in this repo (and `code_mode: apply`). These get done on the weekly review branch; they appear in Notion as `Channel: code` with status pre-set per `p9` (so the user sees what the brain changed, but doesn't have to do it).
- **`human`** — requires action the brain can't take from the repo: publishing a Firestore doc, claiming a directory, outreach, a Google/Bing account, personalizing a `[PERSONALIZE]` block. Full step-by-step goes in the Notion body.

A single roadmap item can spawn BOTH (e.g. "add Person authors" = a `schema-aeo`/`code` task to wire the schema + a `human` task to write the author bios into Firestore).

---

## Severity → priority (for ordering within a week)

1. **Discoverability blockers** (`fixing`/`technical`) that stop content from being found/indexed — always first while the backlog has any.
2. **Rank/CTR defense** (`improve-content`/`fixing`) on pages losing position or clicks (once GSC is live).
3. **Entity/schema table-stakes** (`schema-aeo`/`local`).
4. **Growth** (`add-blog`/`add-page`/`backlink`) — the engine, once the foundation is sound.
5. **Housekeeping** (`measurement`) — front-loaded once (Week 1) since GSC isn't set up, then steady.
