# SEO/AEO Brain — Quartic Lab

An in-repo, **weekly** SEO + AEO operating system for `quarticlab.com`. Run it by typing **`/seo-brain`** (or "run the seo brain"). Each run it audits, plans 5–8 small **categorized** tasks, **auto-implements the code fixes** on a review branch, and **pushes the human tasks to Notion** with a plain-English walkthrough.

## How to run
- `/seo-brain` — full weekly run.
- `/seo-brain dry-run` — plan + draft everything but DON'T write to Notion or commit code (diffs shown only).
- `/seo-brain audit /blog` / `/seo-brain just backlinks` — scope to a focus.

## What's where
| Path | Purpose |
|------|---------|
| `../skills/seo-brain/SKILL.md` | The orchestrator (weekly run protocol). This is what `/seo-brain` runs. |
| `site-memory.md` | **State** — read at start, written at end. The single source of truth. |
| `research-dossier.md` | Verified 2026 SEO/AEO knowledge (8 research agents + 14 adversarial verdicts). Don't contradict it. |
| `roadmap.md` | Seeded 12-week plan (foundation → entity/schema → content → PR/steady-state). |
| `knowledge/task-categories.md` | The 9 task categories + channel routing + the "do NOT generate" list. |
| `knowledge/aeo-playbook.md`, `backlink-playbook.md` | Operational summaries the procedures cite. |
| `procedures/p1…p9.md` | The skills: audit, keywords, content-draft, optimize/implement, track, backlinks, plan-week, explain, notion-push. |
| `outputs/` | Reports, drafts, weekly plan + walkthrough. |
| `inputs/` | Drop weekly GSC CSV exports here (`inputs/gsc-<date>/`). |

## The 9 categories
`fixing` · `technical` · `schema-aeo` · `add-blog` · `add-page` · `improve-content` · `backlink` · `local` · `measurement`
(There is deliberately **no "increase word count"** — the research shows length isn't a ranking factor; that intent lives in `improve-content` as "cover missing subtopics", not padding.)

## Operating assumptions (set in `site-memory.md`)
- `code_mode: apply` — the brain edits code on a branch `seo-brain/wk-<date>-<slug>`, runs build + eslint, never pushes/merges. Change to `describe`/`ask` to alter this.
- Notion: shared DB `SEO Brain — Daily Tasks`, this brain's tasks tagged `Source = seo-brain/quarticlab/weekly` (isolated from the legacy brain).
- GSC: **not set up yet** → tracker runs heuristically + the roadmap front-loads measurement setup. Once live, drop CSVs in `inputs/` and it switches to data-driven defend/push/CTR tasks.

## Before the first run (optional but recommended)
To get real push/email reminders at each task's Due time, set your Notion user UUID in `site-memory.md` → `Notion → Assignee user ID` (currently unset, so tasks have a due date + an in-page date reminder but won't email you).

## First run
The first `/seo-brain` will execute **roadmap Week 1**: get the blog into the sitemap, drop changefreq/priority (code, on a branch) + queue the GSC/BigQuery/Bing setup tasks (human, to Notion).
