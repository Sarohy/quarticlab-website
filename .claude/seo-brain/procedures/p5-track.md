# p5 — Weekly Tracker (rank-over-time engine)

Turn ranking data into a defend/push/CTR action list. Runs in one of two modes depending on `site-memory.md` → GSC Status.

---

## Mode A — HEURISTIC (GSC Status: NOT SET UP — current default)

No real rank data yet, so produce a qualitative health snapshot + keep nudging measurement setup.

1. Read `site-memory` Published pages. `WebFetch` 3–5 pages not checked in the last 2 weeks; confirm: indexable (not noindex), in sitemap, canonical correct, title/description present, answer-first intro, Person author (blog). Record regressions.
2. Check indexation signals you can see without GSC: is each key page in `sitemap.xml`? Does `site:quarticlab.com <page>` (note as a manual check for the user) look reasonable? Are blog posts reachable by an SSR link?
3. Write `outputs/weekly-report.md` (Mode A template below). The "action list" leans on the roadmap + audit, NOT rank deltas.
4. Always include one `measurement` action reminding the user to finish GSC/BigQuery/Bing setup — until that's done, rank-over-time is blind.

## Mode B — DATA (GSC Status: live — a fresh `inputs/gsc-*` export exists)

1. Read the newest CSV in `inputs/gsc-<YYYY-MM-DD>/` (Query, Page, Clicks, Impressions, CTR, Position). Pull last week's positions from `site-memory` → Current keyword targets as the baseline. Account for GSC's 3-day lag and that "position" is impression-weighted, not live rank.
2. Compute:
   - **Top 3 improved** (biggest position gain OR click gain vs baseline).
   - **Top 3 dropped** — any URL that lost ≥3 positions OR ≥20% clicks. **First segment out AI-Overview cannibalization** (a CTR dip at flat position is likely AI Overviews now folded into Performance, not a ranking loss) before flagging.
   - **Striking-distance** — position 5–20 AND impressions ≥100 (validate the band against the real distribution before trusting it). These are the highest-ROI `improve-content` targets.
   - **CTR gaps** — high impressions + low CTR → title/meta rewrite (`fixing` code task via `Seo.jsx` for static/service pages, raw `<Head>` for blog until migrated — TAG the code path).
   - **New keywords in top 20** not yet tracked; **disappeared** keywords (no impressions / out of top 100).
3. Write `outputs/weekly-report.md` (Mode B template) and the memory-update instructions.

---

## Output → `outputs/weekly-report.md` (overwrite)
```markdown
# Weekly SEO Report — Week of <Monday YYYY-MM-DD>  (mode: heuristic|data)

## Summary
<3–5 sentences: overall direction, biggest win, biggest loss, one opportunity. In heuristic mode, say so and focus on roadmap progress + setup status.>

## Movers and Droppers   (data mode only)
| Dir | Page | Keyword | Last wk | This wk | Δ | Clicks Δ | Note (AI-Overview segmented?) |
|-----|------|---------|---------|---------|---|----------|-------------------------------|

## Striking-distance (push these)   (data mode only)
- "<query>" — pos #<N>, <impr> impr → `<URL>` → improve-content: cover <missing subtopic>

## CTR gaps (rewrite titles)   (data mode only)
- `<URL>` — <impr> impr, <ctr>% CTR → new title/desc; code path: Seo.jsx | raw Head

## Action list — 3–5 ranked tasks for next week
1. <verb-led> — <page> — <category> — <why #1>
...

## What to update in site-memory.md
- Current keyword targets: prior=last-wk current; current=this-wk; last checked=<today>.
- Add new top-20 keywords as rows (prior `-`).
- Pending this week: <paraphrased actions>.
- Last run / Last audit stamps.
```

## End
Print: `Weekly report saved (mode: <heuristic|data>): outputs/weekly-report.md.`
