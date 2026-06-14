# p4 — Optimizer / Code-Fix Implementer

Take an existing page (live URL or source file) or an audit finding and either **implement the fix in code** (`code_mode: apply`, default) or write paste-ready instructions (`code_mode: describe`). This is the in-repo brain's superpower vs. the legacy remote brain.

## Input
- A page/route + the specific issue(s) (usually from `outputs/audit-report.md` or `p5`/`p7`). If none, ask "Which page/route and which fix?" and stop.

## Read
Map route → source file (see `p1` mapping). Read the file + its `.module.css` if styling is involved. For schema/meta, read `src/Components/CommonComponents/Seo/Seo.jsx` and `src/pages/_app.js`. Confirm the current state before editing (don't fix what's already correct).

## Decide channel
- **code-channel** fixes (the brain implements): meta title/description, canonical, og:image, routing a page through `Seo.jsx`, JSON-LD (Person author, BreadcrumbList, LocalBusiness, CollectionPage), internal-link blocks, sitemap inclusion, script-loading/CWV tweaks, answer-first reordering of static page copy, H1 changes.
- **human-channel** fixes (write instructions, don't implement): anything requiring Firestore writes (publishing/editing `blogs`/`service_details` docs), external accounts, outreach, image creation.

## code_mode: apply (default) — implement it
0. **Guard — stop and ask first if the fix is not purely technical.** Only implement unattended fixes that are technical/metadata: sitemap, canonical, og:image, JSON-LD/schema, routing a page through `Seo.jsx`, internal-link blocks, script-loading/CWV, meta title/description. If the fix would change a color/palette, brand voice or marketing copy, or restructure an interactive UI control (e.g. the service-panel nested-link issue from the runtime audit), STOP and ask the user for approval — write it as a `human`/review task instead of editing.
1. **Branch:** ensure you're on this week's branch `seo-brain/wk-<YYYY-MM-DD>-<slug>` off `master` (the orchestrator creates it once per run). Never edit on `master`.
2. **Schema picker** (when adding JSON-LD): home → Organization (exists); article/blog → `Article` with **`Person`** author; service → `Service` + `FAQPage` (exist); any non-home → add to the site-wide `BreadcrumbList`; physical-address/global graph → `ProfessionalService`/`LocalBusiness` + `areaServed`. Populate with REAL values from the page/Firestore; use a clearly-labeled `"<<ADD …>>"` only where a value is genuinely unavailable. **Never** add `aggregateRating`, a new `llms.txt`, or extra schema purely to chase AI citations (do-NOT list).
3. **Edit** the file(s). Match surrounding code style (props alphabetized, CSS-Modules, `@component/*` alias, no App-Router constructs). Keep diffs minimal and reviewable.
4. **Gate:** run `npx eslint <changed files>` (must exit 0 — recall `next.config.js` ignores eslint during build, so this is the only lint gate) AND `npm run build` (must exit 0). If either fails, fix or revert; never leave the branch broken.
5. **Record** the change in `outputs/optimized-pages.md` (what/where/why) so `p8`/`p9` can describe it to the user as a `Channel: code` task they only need to review.

## code_mode: describe — write instructions instead
Produce 4 outputs per page, appended to `outputs/optimized-pages.md` under a clear, ctrl-F-able header:
- **A. Optimized meta title + description** (paste-ready, within limits).
- **B. JSON-LD block** — full `<script type="application/ld+json">…</script>` with real values (schema picker above).
- **C. 3–5 internal links** — anchor + target (must be a real page from `site-memory` Published pages) + the exact sentence to insert at.
- **D. H1 instruction** — "fine, no change" or "change to: `<text>` because …".

Each section header in CAPS so the user can ctrl-F.

## Output
- Real code edits on the branch (apply mode) AND/OR `outputs/optimized-pages.md` entries.
- Print: `Optimized <page>: <n> code edits applied (build+eslint green) / <n> described.` In apply mode, also list the files touched.
