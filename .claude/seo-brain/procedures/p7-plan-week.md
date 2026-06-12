# p7 — Weekly Planner

Assemble THIS week's task list: 5–8 small, categorized, channel-tagged tasks. This is the brain's core output — small weekly units, properly categorized, balanced for steady progress. Everything downstream (`p4` implements code tasks, `p8` explains, `p9` pushes to Notion) consumes this list.

## Inputs (read all that exist)
- `roadmap.md` → the current roadmap position (`site-memory` → Remediation roadmap → Current position).
- `outputs/weekly-report.md` (from `p5`) → defend/push/CTR actions (data mode) or health notes (heuristic).
- `outputs/audit-report.md` (from `p1`) → open High/Medium issues with source locations.
- `outputs/backlinks-tracker.md` (from `p6`) → next off-site actions.
- `site-memory.md` → Pending this week, Content queue, GSC status, `code_mode`.
- `knowledge/task-categories.md` → categories, channel routing, the do-NOT list.

## Build the candidate pool
Gather candidate tasks from each source, each as `{ title (verb-led), category, channel, effort, source_proc, where (file/URL), why }`:
- From the **current roadmap week** → expand its bullet lines into candidates (they're already categorized/channeled).
- From **weekly-report** → defend/push/CTR actions (data mode) take priority over roadmap growth items.
- From **audit-report** → any open High issue not already covered.
- From **backlinks-tracker** → the next 1–2 off-site actions.
- From **Pending this week** (rollovers) → carry forward anything not finished.

## Deduplicate (do this before selecting)
The roadmap and the audit will often name the SAME fix (e.g. roadmap Week 1 "Include /blog in sitemap" + audit High "Blog posts absent from sitemap"). For each candidate, check for overlap against already-collected candidates + open `Pending`/Notion tasks by matching the target file AND a keyword in the title (e.g. `sitemap`, `/blog`, `Seo.jsx`, `breadcrumb`, `author`). If two candidates resolve to the same change, KEEP ONE (prefer the roadmap-sourced one, which carries category/channel) and drop the duplicate. List dropped duplicates in the plan footer. Never push two Notion tasks for one change.

## Select & balance (the rotation)
Pick 5–8 tasks using these rules, in order:
1. **Rollovers first.** Unfinished tasks from last week (per Step 0 verification) lead the list — don't pile new work on an unfinished foundation.
2. **Discoverability/defense before growth.** While Phase 1 roadmap items or any High audit issue remain open, at least HALF the week is `fixing`/`technical`/`schema-aeo`. Once Phase 1 is done and GSC is live, defense (`improve-content`/`fixing` on droppers) leads.
3. **Always advance the roadmap.** Include the next roadmap week's items (or as many as fit) so the 12-week plan keeps moving.
4. **Balance categories.** Aim for a mix, not 8 of one kind. A healthy week ≈ 2–3 code tasks (`fixing`/`technical`/`schema-aeo`) + 1–2 content (`add-blog`/`improve-content`/`add-page`) + 1 `backlink`/`local` + (early on) 1 `measurement`. Adjust to whatever the roadmap week dictates.
5. **Small units.** If a candidate is >2 hours, split it into parts (each its own task) so every task is finishable in one sitting. E.g. "add Person authors" → a `code` task (wire schema + byline) + a `human` task (write the bios into Firestore).
6. **Respect `code_mode`.** In `apply` mode, code-channel tasks are implemented by `p4` on the branch during this run (so they appear in Notion as already-done-for-review). In `describe`/`ask` mode, they become instructions.
7. **Never** emit a do-NOT-list task. If a source suggested one (e.g. "add llms.txt"), drop it and note why in the report footer.

## Effort buckets
Snap each task to a Notion `Effort` option: `30 min` / `45 min` / `90 min` / `2 hours`.

## Due dates
Spread the week's tasks across working days starting from the run date (Mon→Fri), at the `Reminder time` (09:00 PKT). Code tasks the brain already did this run get a Due of the run date (they're review-only).

## Output
Write the plan to `outputs/weekly-plan.md` (overwrite) as a numbered list, each task with all fields, AND return it to the orchestrator for `p4`/`p8`/`p9`:
```markdown
# Weekly Plan — Week of <Monday YYYY-MM-DD>
> Roadmap: <current week>. GSC: <status>. code_mode: <mode>.

1. [<category> · <channel> · <effort> · Due <date>] <verb-led title>
   - where: <file/route/URL>
   - why: <one line>
   - p4/p8 detail anchor: <audit id / roadmap line / report section>
...
(Dropped do-NOT candidates: <list or "none">)
```

## End
Print: `Weekly plan: <N> tasks (<code> code / <human> human) → outputs/weekly-plan.md.`
