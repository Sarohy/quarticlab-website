# p8 — Plain-English Weekly Walkthrough

Expand the weekly plan into a beginner-friendly document the user (zero SEO knowledge assumed) can actually act on. The brain's chat output is just an index; THIS file is what they read. It also clearly separates "the brain already did this (review it)" from "you need to do this."

## Inputs
1. `outputs/weekly-plan.md` (from `p7`) — the task list.
2. The output files those tasks reference: `audit-report.md`, `optimized-pages.md`, `weekly-report.md`, `backlinks-tracker.md`, `content-drafts/<slug>/post.md`, `roadmap.md`.
3. `site-memory.md` — real values (site name/URL/location/Firestore collections) to ground every snippet. Never use `<YOUR_X>` placeholders.

## Output → `outputs/weekly-tasks-explained.md` (overwrite)
```markdown
# This Week's SEO/AEO Tasks — Plain English
> Week of <Monday>  |  Site: https://www.quarticlab.com  |  For: zero SEO knowledge assumed
> Auto-regenerated each weekly run.

<2-paragraph intro: what SEO and AEO are; the 3 things engines look at (visible content, headings, invisible HTML tags); note that some tasks are marked ✅ ALREADY DONE BY THE BRAIN (just review the branch) and others 🙋 NEED YOU.>

---

## Task 1 — <plain-English title>  ·  <category>  ·  <✅ done, review | 🙋 you do it>  ·  ~<effort>

### What this is
<plain explanation; define every jargon term inline (analogy ok: "a sitemap is the index at the back of a book").>

### Why it matters
<one paragraph: what breaks if skipped, what you gain.>

### Steps
<For ✅ code tasks: "The brain already changed `<files>` on branch `<branch>`. To review: `git diff master...<branch> -- <files>`, read it, and merge when happy." Quote the key part of the diff.>
<For 🙋 human tasks: numbered steps with exact files/URLs/tools and any code/text to paste verbatim, real values from site-memory. For "publish a blog": walk through Firebase console → Firestore → `blogs` → Add document → mirror an existing published doc's fields (slug, title, contentHtml [HTML], metaDescription, heroImage, author, publishedDate, tags, status:"published") → verify at the live URL → (later) request indexing once GSC exists.>

### How to verify it worked
<2–4 concrete checks: a URL to open, a validator (e.g. https://validator.schema.org/, https://search.google.com/test/rich-results), a visible change, or a command (`curl -sI https://www.quarticlab.com/sitemap.xml`).>

---
<repeat per task>

## Quick glossary
<every jargon term used, one-line plain definitions: sitemap, canonical, schema/JSON-LD, Open Graph, H1/H2, Firestore, SSR, GSC, CTR, INP/CLS/LCP, AEO/GEO, breadcrumb, lastmod, striking distance.>

## If you don't code yourself
Forward this to whoever maintains quarticlab.com. The ✅ tasks are already implemented on branch `<branch>` — they just need review + merge. The 🙋 tasks have exact steps. Total human time ≈ <sum of 🙋 efforts>.
```

## Rules
- 8th-grade reading level; short sentences; define jargon on first use.
- Real values only (Quartic Lab, quarticlab.com, Lahore, the actual Firestore collection/field names).
- No banned marketing phrases (see `p3`); no "boost rankings"/"skyrocket".
- Every human step ends with a verification. Every tool reference includes its exact URL.

## End
Print: `Weekly walkthrough saved: outputs/weekly-tasks-explained.md.`
