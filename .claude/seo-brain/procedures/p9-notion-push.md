# p9 — Push Weekly Tasks to Notion

Push every task from `outputs/weekly-tasks-explained.md` into the shared Notion DB as a standalone, self-contained page with `Category`, `Channel`, `Effort`, and a Due-date reminder. The reader must be able to do (or review) the task from the Notion page alone.

## Config (from `site-memory.md` → Notion)
- **Data source ID:** `b923a19f-3825-40cb-a1ee-dbda52fadd79`
- **Source tag (THIS brain):** `seo-brain/quarticlab/weekly` — set on EVERY page. Critical: all idempotence/verification queries filter on this so we NEVER touch the legacy brain's tasks (`seo-brain/outputs/daily-tasks-explained.md`).
- **Reminder time:** 09:00, `+05:00` (PKT).
- **Schema (confirmed):** `Task name` (title), `Status` (status), `date:Due:start`/`is_datetime`, `Effort` (select), `Source` (text), `Category` (select: fixing/technical/schema-aeo/add-blog/add-page/improve-content/backlink/local/measurement), `Channel` (select: code/human), `Assignee` (person, optional).
- If `disabled: true`, skip and print `(Note: p9 skipped — Notion disabled)`.

## Step 1 — ensure the Category/Channel properties exist (idempotent)
Fetch the data source (`notion-fetch` on `collection://b923a19f-…`). If `Category` or `Channel` is missing, add via `notion-update-data-source` DDL:
`ADD COLUMN "Category" SELECT('fixing':red,'technical':orange,'schema-aeo':purple,'add-blog':blue,'add-page':green,'improve-content':yellow,'backlink':pink,'local':brown,'measurement':gray); ADD COLUMN "Channel" SELECT('code':blue,'human':default)`
(They were added 2026-06-12, so normally this is a no-op.)

## Step 2 — idempotence (scoped to OUR Source only)
Query the data source for non-trashed pages where `Source == "seo-brain/quarticlab/weekly"` AND `Due` is within this run's week (±5 days). If any exist, this is a re-run → set those `in_trash: true` first, then push fresh.
**Never** archive pages with a different `Source`, and never archive titles starting with `🔄 Rolled:` (those are verification rollovers that must stay on the user's plate).

## Step 3 — compose each page body (proper Notion blocks, not a text wall)
Per task, in order:
1. **Callout** (`⏰`, `blue_background`): bold `Reminder:` + inline `date` mention at the Due datetime · bold `Category:` value · bold `Channel:` value (code/human) · bold `Effort:` value.
2. **Divider.**
3. **Heading 2** "What this is" → paragraph(s) from the walkthrough's What.
4. **Heading 2** "Why it matters" → paragraph(s) from Why.
5. **Heading 2** "Steps" → one `to_do` per step (checkable). For `Channel: code` tasks, the first to_do is "Review the brain's change" with a nested `code` block containing the `git diff` command; for `human` tasks, the actual steps with nested `code`/`paragraph` for any commands/paths.
6. **Heading 2** "How to verify" → one summary paragraph + a `code` block with the verify commands verbatim.
Preserve code blocks verbatim with correct `language`. Inline `code:true` for file paths. Bold the labels.
**Fallback** if the runtime only exposes `paragraph`+`bulleted_list_item`: heading_2→bold paragraph, to_do→bulleted_list_item, code→paragraph with `code:true`, callout→paragraph with leading `⏰`, divider→omit; append `(formatting fallback)` to the final chat line.

## Step 4 — push
One batched `mcp__claude_ai_Notion__notion-create-pages`:
```
parent: { type: "data_source_id", data_source_id: "b923a19f-3825-40cb-a1ee-dbda52fadd79" }
pages: [ one per task ]
```
Each page:
```json
{
  "icon": "🗓️",
  "properties": {
    "Task name": "<verb-led title>",
    "date:Due:start": "<YYYY-MM-DDT09:00:00.000+05:00>",
    "date:Due:is_datetime": 1,
    "Status": "Not started",
    "Category": "<one of the 9>",
    "Channel": "code|human",
    "Effort": "<30 min|45 min|90 min|2 hours>",
    "Source": "seo-brain/quarticlab/weekly"
  },
  "content": "<composed block body>"
}
```
If `Assignee user ID` is set in site-memory, add `"Assignee": "<uuid>"` so Notion fires a real reminder at Due time.
> Optional nicety: for `Channel: code` tasks the brain already applied, you may set `Status: "In progress"` (work done, awaiting the user's review/merge) instead of `Not started`. Default to `Not started` if unsure.

## Error handling
- 404 on the data source → stop, tell the user to fix `Notion → Data source ID` in site-memory. Do NOT create a new DB.
- `validation_error` on a property → fetch the schema, add the missing column (Step 1), retry once.
- Any other error → abort the push (no partial commit), print `(Note: p9 failed — <error>)`, continue.

## End — one line
Success: `Notion tasks pushed: <N> (<code>/<human>) → https://app.notion.com/p/58b63700c839446983c5be93880ad2ef`
Skipped: `Notion push skipped: <reason>`
