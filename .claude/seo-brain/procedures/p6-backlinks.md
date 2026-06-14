# p6 — Backlinks & Digital PR

Maintain the off-site engine: directory profiles, digital PR, expert sourcing, brand mentions, `sameAs`. Reads `knowledge/backlink-playbook.md` (ranked ROI) and emits the next 1–2 highest-value un-done items each week.

## Inputs
1. `knowledge/backlink-playbook.md` — the ranked plan.
2. `outputs/backlinks-tracker.md` if it exists (else create from the template below).
3. `site-memory.md` → Backlink/entity status + NAP + Organization `sameAs`.

## Run
1. **First run only — one-time audit.** Have the user (or via any available tool) capture the current state: referring domains, which directories are claimed, current Clutch/G2/etc. completeness, and any toxic patterns. Record in the tracker. Don't invent numbers — mark unknowns `?` and emit a `measurement`/`backlink` task to capture them.
2. **NAP guard.** Confirm the canonical NAP (name/address/phone) from `_app.js` Organization PostalAddress. Every directory profile must match it byte-for-byte; flag mismatches.
3. **Pick the next actions.** Walk the ranked playbook top-down; the next 1–2 un-`done` items become this week's `backlink`/`local` tasks (e.g. "Complete the Clutch service taxonomy + request 2 verified reviews"). Respect anchor governance (≤15% exact-match; branded-dominant). Never emit a do-NOT-list tactic (PBNs, paid links, mass directories, scaled guest posts).
4. **Digital-PR pipeline.** If an original-data post has shipped (roadmap Phase 3), open/advance a PR pitch (Featured.com / Qwoted / direct) and log it in the tracker pipeline.

## Output → `outputs/backlinks-tracker.md` (update in place)
```markdown
# Backlinks & Entity Tracker — updated <YYYY-MM-DD>

## Directory profiles
| Profile | URL | Claimed | Complete | NAP-correct | Reviews | Next action |
|---------|-----|---------|----------|-------------|---------|-------------|
| Clutch | … | ? | ? | ? | ? | … |
| GoodFirms / DesignRush / TheManifest / G2 / Crunchbase / LinkedIn | … | | | | | |

## Organization sameAs checklist (in _app.js)
- [x] LinkedIn  - [x] Twitter  - [ ] Clutch  - [ ] Crunchbase  - [ ] GitHub  - [ ] GBP

## Digital-PR pipeline
| Asset (post) | Outlet/journalist | Channel | Pitched | Status | Link earned |
|--------------|-------------------|---------|---------|--------|-------------|

## Brand mentions to convert to links
- <unlinked mention URL> → request link

## Notes / toxic patterns to disavow
- …
```

## End
Print: `Backlinks tracker updated → outputs/backlinks-tracker.md. Next actions: <1–2 lines>.`
