# p1 — Auditor

Audit one page and produce an actionable issues report. Because the brain runs **inside the repo**, every issue must point at the exact source file + selector so a `fixing`/`technical`/`schema-aeo` task can implement it. No generic advice.

## Input
- A URL or route (e.g. `/blog` or `https://www.quarticlab.com/blog`). If the orchestrator didn't pass one, pick by impact priority: **(1) `/blog` (the known top-priority gap — audit it FIRST on the very first run), (2) `/`, (3) `/services`, (4) the rest by importance/age**, skipping any page marked clean within the last 30 days.

## Run
1. `WebFetch` the live URL (rendered HTML + headers). If unreachable, audit against the source file instead and note "static-only (site unreachable)".
2. Map the route to its source file: `/` → `src/pages/index.js`; `/blog` → `src/pages/blog/index.js`; `/blog/<slug>` → `src/pages/blog/[slug].jsx`; `/services` → `src/pages/services/index.js`; `/services/<slug>` → `src/pages/services/[slug].jsx`; `/about|projects|contact|...` → matching file. Read that file to anchor each finding to a line.
3. Check every item below. Record Pass/Fail/Warning internally; only Fail + Warning reach the report.

### A. Discoverability (highest priority on this site)
- Route present in `src/pages/sitemap.xml.js`? (Blog routes currently are NOT — auto-Fail until Phase 1 ships.)
- Reachable by ≥1 SSR `<a href>` from homepage/nav/another indexable page? (Blog posts currently are weakly linked — check.)
- `<lastmod>` realistic (not a uniform `today` on every URL)?
- Canonical present, self-referencing, absolute? Sitemap excludes a noindex'd page correctly?

### B. Meta basics
- `<title>` missing/empty/>60 chars / duplicates H1 verbatim.
- `<meta name="description">` missing/empty/>155 chars.
- `<meta name="robots">` noindex (flag whether intentional — `/blog` is noindex until posts exist; that's by design).
- Open Graph: `og:title`, `og:description`, **`og:image`** present? (Blog index has no og:image — Fail.)
- Routes through `Seo.jsx`? Raw `next/head` on a page that should use the component = Warning (metadata-drift risk).

### C. Headings & content
- Exactly one `<h1>`; H1 contains the page's primary topic.
- No skipped heading levels.
- **Answer-first:** does the first paragraph answer the page's core question in ≤3 sentences? (AEO)
- At least one H2 phrased as a question a buyer would ask? (AEO)

### D. Images
- `<img>`/`next/image` without `alt`; content image with empty alt; `next/image` hero without explicit width/height (CLS); raw `<img>` where `next/image` should be used.

### E. Schema (infrastructure, NOT a citation lever — keep correct, don't expand to chase AI)
- Homepage Organization present? Global (it is, via `_app.js`).
- BreadcrumbList present for THIS page? (Currently Home-only — non-home pages Fail until Phase 2.)
- Article page: author is `Person` (not `Organization`)? `datePublished`/`dateModified` present?
- Service page: `Service` + `FAQPage` present? (They are.)
- FAQ block visible but no `FAQPage`? (Add markup — but do NOT add NEW FAQ blocks just for snippets.)
- LocalBusiness/ProfessionalService present in the global graph? (Not yet — Fail, Phase 2.)
- ❌ Do NOT flag "missing aggregateRating", "missing llms.txt", or "add more schema for AI" — those are on the do-NOT list.

### F. Technical / CWV-observable
- Render-blocking third-party `<script>` in `<head>` without `async`/`defer` (GTM/GA/Clutch widget → should be `lazyOnload`).
- Hero `next/image` without `priority`/`fetchpriority`.
- Large client-side DOM work on `contentHtml` (the `useEnhanceArticle` hook) that could spike INP.
- `>3` third-party domains above the fold.

### G. Internal linking
- <3 internal outbound links; orphaned page; anchor text "click here"/"read more"/bare URL.

### H. AEO readiness (score yes/no, don't over-weight)
- Answer-first first paragraph · question H2s · `Person` author w/ visible bio · visible "Last updated" · in sitemap · SSR returns full `contentHtml`.

## Output
Append/overwrite `outputs/audit-report.md` (one section per audited URL, dated). Structure:

```markdown
# Audit — <URL>  (<YYYY-MM-DD>)

## Summary
- High: <n>  Medium: <n>  Low: <n>
- Source file: `<path>`

## Issues
| Sev | Category | Issue | Source location | Fix (exact) | Channel |
|-----|----------|-------|-----------------|-------------|---------|
| High | fixing | Blog posts absent from sitemap | src/pages/sitemap.xml.js:7 | Query Firestore `blogs` (status==published) in getServerSideProps; emit `<url>` per post with real lastmod | code |
| ... | ... | ... | ... | ... | ... |

Passed clean: <category names>
```

### Severity
- **High** — blocks ranking/indexing/AI citation: not in sitemap, missing/duplicate canonical, missing H1, unintended noindex, no og:image where shared, answer buried.
- **Medium** — meaningfully reduces performance/CTR: title/desc over limit, weak internal links, raw-Head drift, Person-author missing, breadcrumb missing.
- **Low** — polish: alt hygiene, decorative alt, file naming.

### Fix-cell rules
Every Fix cell names the file + selector/line and what to write — concrete enough that `p4`/`p7` can turn it into a `code`-channel task and implement it directly. Honor the do-NOT list in `knowledge/task-categories.md`.

## End
Print one line: `Audited <URL> → outputs/audit-report.md (High <n> / Med <n> / Low <n>).`
