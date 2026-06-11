# Runtime report contract — what the fixing agent consumes

This is the **interface** between this skill (writer) and the separate fixing agent
(reader). Treat it as a strict API. It is intentionally a **superset of the
`ui-ux-audit` report** so the same fixing agent can consume both: same severity ladder,
same `autofix` tri-state, same single-`json`-fence-is-source-of-truth rule, same
`acceptance_criteria` / `depends_on` / `apply_order` discipline.

The one deliberate difference: runtime findings are **observed in the browser**, so the
exact source edit is sometimes not yet known. Therefore `suggested_fix.before` /
`suggested_fix.target_file` are **optional** — when present they must be exact (validated
to occur exactly once); when absent the finding carries a `runtime_location` + a
`suggested_fix.summary` and the fixer must locate the source. Static audits never get to
omit them; runtime audits may.

## Contents
- [Output path & artifacts](#output-path--artifacts)
- [Markdown section order](#markdown-section-order)
- [The JSON object](#the-json-object)
- [Finding fields](#finding-fields)
- [Locating reliably](#locating-reliably)
- [Acceptance criteria](#acceptance-criteria)
- [Severity & autofix](#severity--autofix)
- [Worked example findings](#worked-example-findings)
- [Self-validation](#self-validation)

## Output path & artifacts
- **Report:** `.claude/audit/runtime/<scope>.report.md` — repo-relative, `<scope>` =
  kebab-cased target (`projects`, `header`, `services-slug`). Straight ASCII only inside
  the JSON (no smart quotes / em-dashes / non-breaking spaces — they break parsers and
  grep anchors).
- **Evidence dir:** `.claude/audit/runtime/<scope>/` holds the runner's `signals.json`
  and `desktop.png` / `ipad.png` / `phone.png`. Findings reference screenshots by their
  repo-relative path so a human reviewer can look.

## Markdown section order
1. `# Runtime UI-Test Report — <scope>`
2. **Metadata line:** `target_commit` (git SHA), `generated_at`, `url`, `profiles_run`,
   `routes`, `schema_version`.
3. `## Summary` — severity histogram, autofix split, a **per-viewport** issue matrix
   (how many findings reproduce on desktop / ipad / phone), `files_touched`,
   `blockers_gate` boolean, `apply_order`. **All counts reconcile to `findings.length`.**
4. `## How a fixing agent consumes this report` — 3-4 sentences: parse the single JSON
   block; apply in `apply_order`; for findings with `suggested_fix.before` locate by that
   anchor (occurs once); for findings without it, use `runtime_location` + `source_location`
   to find the edit site, then implement `suggested_fix.summary`; honor `depends_on`;
   verify each `acceptance_criteria` (which includes **re-running the probe**); do not
   apply `needs-human`/`unsafe` without human review.
5. `## Findings` (human-readable) — grouped by category then severity; each shows `id`,
   `probe_id`, `severity`, `viewports`, `runtime_location`, `evidence`, `root_cause`,
   `suggested_fix`, `autofix`, the screenshot link, and `acceptance_criteria`.
6. `## Machine-readable findings` — **exactly one** ` ```json ` fence (the object below).
7. `## Probe coverage` — routes + profiles tested, what was auto-exercised (load +
   full-page scroll), and the runner's raw per-category counts.
8. `## Gaps & non-findings` — interactions NOT auto-exercised (menu open, form submit,
   modal, filters — see probes.md checklist), third-party noise ignored, CWV caveats,
   and explicit passes ("no console errors on any profile").

## The JSON object
```json
{
  "schema_version": "runtime-1.0",
  "generated_at": "<ISO-8601 or commit-relative>",
  "target_commit": "<git SHA>",
  "url": "http://localhost:3000/projects",
  "routes": ["/projects"],
  "profiles_run": ["desktop", "ipad", "phone"],
  "summary": {
    "total": 0,
    "by_severity": { "blocker": 0, "critical": 0, "major": 0, "minor": 0, "info": 0 },
    "by_autofix": { "autofixable": 0, "needs-human": 0, "unsafe": 0 },
    "by_viewport": { "desktop": 0, "ipad": 0, "phone": 0 },
    "files_touched": [],
    "blockers_gate": false,
    "apply_order": []
  },
  "findings": []
}
```
- `blockers_gate` = `true` when any `blocker` exists (fixer should stop/escalate).
- `apply_order` = permutation of all finding `id`s; the order the fixer applies edits.
- `by_viewport` counts how many findings list that profile in `viewports` (a finding can
  count toward several).

## Finding fields
Every finding has **all** of these (no extras):

| field | required | meaning |
|-------|----------|---------|
| `id` | yes | `F-` + zero-padded counter, unique (`F-007`) |
| `probe_id` | yes | closed-taxonomy id from [probes.md](probes.md) (`RT-OVERFLOW-X`, `RT-A11Y-color-contrast`, ...) |
| `category` | yes | `CONSOLE`\|`PAGEERR`\|`NETWORK`\|`HYDRATION`\|`A11Y`\|`OVERFLOW`\|`OVERLAP`\|`TOUCH`\|`IMAGE`\|`CWV`\|`STRUCTURE` |
| `title` | yes | one-line summary of **this instance** |
| `severity` | yes | `blocker`\|`critical`\|`major`\|`minor`\|`info` |
| `severity_rationale` | yes | one sentence of concrete user/system impact |
| `confidence` | yes | `high`\|`medium`\|`low` |
| `autofix` | yes | `autofixable`\|`needs-human`\|`unsafe` |
| `viewports` | yes | non-empty array of profiles where it reproduces (`["phone","ipad"]`) |
| `evidence` | yes | verbatim signal: console text, axe `failureSummary`, overflow px, request URL+status, measured size |
| `runtime_location` | yes | where in the browser (below) |
| `source_location` | yes (nullable) | best-effort source mapping (below) or `null` if not yet located |
| `root_cause` | yes | violated principle distinct from symptom: "X because Y violating `<probe_id>`" |
| `suggested_fix` | yes | object (below) |
| `screenshots` | yes | array of repo-relative png paths (may be empty) |
| `acceptance_criteria` | yes | non-empty array of machine-checkable predicates incl. a probe re-run |
| `depends_on` | yes | array of finding ids that must apply first (acyclic) |
| `fingerprint` | yes | line-free stable hash for cross-run identity (`rt-overflow-projects-marquee-phone`) |

`runtime_location`:
```json
{
  "profile": "phone",
  "selector": "section.projects_hero__x1y2 > div.projects_row__a9",
  "axe_target": null,
  "request_url": null,
  "measured": "rect.right=438 vs innerWidth=390 (past by 48px)"
}
```
- `selector`: the runtime CSS path from the signal (hashed class hints at the module).
- `axe_target` / `request_url`: set for A11Y / NETWORK findings; else `null`.
- `measured`: the concrete number that makes it objective.

`source_location` (or `null`):
```json
{
  "file": "src/styles/projectsNew.module.css",
  "selector": ".row",
  "css_module_file": "src/styles/projectsNew.module.css",
  "jsx_anchor": "<div className={styles.row}>",
  "jsx_file": "src/pages/projects.js",
  "start_line": 142
}
```

`suggested_fix`:
```json
{
  "summary": "Add overflow-wrap and a max-width:100% to .row so the marquee child can't exceed the viewport",
  "before": "  .row {\n    display: flex;\n  }",
  "after": "  .row {\n    display: flex;\n    max-width: 100%;\n    overflow-wrap: anywhere;\n  }",
  "target_file": "src/styles/projectsNew.module.css",
  "token_mapping": {}
}
```
- `summary`: always present — the fix intent in one sentence.
- `before`/`after`/`target_file`: **optional**. Include only when you located an exact,
  unique anchor. If present, `before` must occur **exactly once** in `target_file` and
  must no longer match after the edit (idempotent). If you can't pin it uniquely, omit
  them, set `source_location` as a pointer, and `autofix: needs-human`.

## Locating reliably
The fixer locates an edit by **`suggested_fix.before` first, then `source_location`,
then `runtime_location.selector`**. Runtime selectors carry hashed CSS-module classes
(`projectsNew_row__a9f3`) — the prefix before `__` maps to the authoring module
(`projectsNew.module.css` → `.row`). Always resolve that mapping into `source_location`
when you can, so the fixer edits the authored selector, not a hashed runtime string.

## Acceptance criteria
Each `acceptance_criteria` array has at least:
1. a **re-run-the-probe** check — the load-bearing runtime criterion, e.g.
   `re-run: node runner/run-probe.mjs --url http://localhost:3000/projects --profiles phone --out <dir>; signals.json profiles[phone].overflow length == 0`,
   or `... axe.violations has no entry with id "color-contrast"`.
2. a **source** check when an edit is shipped — greppable negative + positive, e.g.
   `grep -n 'overflow-wrap: anywhere' src/styles/projectsNew.module.css returns the .row rule`.
3. a **no-regression** check — `npm run build` (or `npx eslint <file>`) exits 0.

Prefer greppable strings / exit-code commands and the probe JSON path. No vague
"looks correct".

## Severity & autofix
Use the shared ladder and tri-state defined at the bottom of [probes.md](probes.md).
`blockers_gate` is `true` iff any `blocker` finding exists. CWV findings are `info`/
`minor` only and never gate.

## Worked example findings
Overflow (exact edit located → ships `before`/`after`):
```json
{
  "id": "F-001",
  "probe_id": "RT-OVERFLOW-X",
  "category": "OVERFLOW",
  "title": "Projects hero row causes 48px horizontal scroll on phone",
  "severity": "major",
  "severity_rationale": "The page scrolls horizontally on a 390px phone, exposing a dead gutter and making the hero feel broken.",
  "confidence": "high",
  "autofix": "autofixable",
  "viewports": ["phone"],
  "evidence": "rect.right=438 vs innerWidth=390 (past by 48px); pageHorizontalScroll=true",
  "runtime_location": {
    "profile": "phone",
    "selector": "section.projectsNew_hero__x1y2 > div.projectsNew_row__a9f3",
    "axe_target": null,
    "request_url": null,
    "measured": "pastViewportPx=48"
  },
  "source_location": {
    "file": "src/styles/projectsNew.module.css",
    "selector": ".row",
    "css_module_file": "src/styles/projectsNew.module.css",
    "jsx_anchor": "<div className={styles.row}>",
    "jsx_file": "src/pages/projects.js",
    "start_line": 142
  },
  "root_cause": "The flex row has no max-width and a wide child overflows the viewport, violating RT-OVERFLOW-X (mobile-first containment).",
  "suggested_fix": {
    "summary": "Constrain .row to the viewport and allow long content to wrap.",
    "before": "  display: flex;\n  gap: 24px;",
    "after": "  display: flex;\n  gap: 24px;\n  max-width: 100%;\n  flex-wrap: wrap;",
    "target_file": "src/styles/projectsNew.module.css",
    "token_mapping": {}
  },
  "screenshots": [".claude/audit/runtime/projects/phone.png"],
  "acceptance_criteria": [
    "re-run: node .claude/skills/playwright-ui-test/runner/run-probe.mjs --url http://localhost:3000/projects --profiles phone --out .claude/audit/runtime/projects ; signals.json profiles[0].structure.pageHorizontalScroll == false and profiles[0].overflow length == 0",
    "grep -n 'flex-wrap: wrap' src/styles/projectsNew.module.css returns the .row rule",
    "npm run build exits 0"
  ],
  "depends_on": [],
  "fingerprint": "rt-overflow-projects-hero-row-phone"
}
```

Accessibility contrast (no unique anchor → omits before/after, needs-human):
```json
{
  "id": "F-002",
  "probe_id": "RT-A11Y-color-contrast",
  "category": "A11Y",
  "title": "Footer legal links fail 4.5:1 contrast on the dark footer (all profiles)",
  "severity": "critical",
  "severity_rationale": "Body-size legal links at ~3.1:1 are unreadable for low-vision users; axe resolved the rendered colors, so this is authoritative.",
  "confidence": "high",
  "autofix": "needs-human",
  "viewports": ["desktop", "ipad", "phone"],
  "evidence": "axe color-contrast: Element has insufficient color contrast of 3.11 (foreground #7a7a7a, background #111418, expected 4.5:1)",
  "runtime_location": {
    "profile": "desktop",
    "selector": null,
    "axe_target": ["footer .footer_legal__1ab a"],
    "request_url": null,
    "measured": "3.11:1 (need 4.5:1)"
  },
  "source_location": {
    "file": "src/Components/CommonComponents/Footer/footer.module.css",
    "selector": ".legal a",
    "css_module_file": "src/Components/CommonComponents/Footer/footer.module.css",
    "jsx_anchor": null,
    "jsx_file": null,
    "start_line": null
  },
  "root_cause": "Link color token is too light against the footer surface, violating RT-A11Y-color-contrast; the replacement token is a design decision.",
  "suggested_fix": {
    "summary": "Raise the footer link color to a token that clears 4.5:1 on --footer-bg (design-token decision; confirm with ui-ux-audit design-tokens.md)."
  },
  "screenshots": [".claude/audit/runtime/projects/desktop.png"],
  "acceptance_criteria": [
    "re-run: node .claude/skills/playwright-ui-test/runner/run-probe.mjs --url http://localhost:3000/projects --out .claude/audit/runtime/projects ; no axe violation with id 'color-contrast' targeting the footer legal links on any profile",
    "npm run build exits 0"
  ],
  "depends_on": [],
  "fingerprint": "rt-a11y-contrast-footer-legal-links"
}
```

## Self-validation
After writing the report, run
`bash "${CLAUDE_SKILL_DIR}/scripts/validate-report.sh" <report-path>`. It asserts:
exactly one ` ```json ` fence that parses; required top-level + per-finding keys;
`viewports` non-empty and within `{desktop,ipad,phone}`; summary counts reconcile to
`findings.length`; `apply_order` is a permutation of ids; `depends_on` is acyclic and
references known ids; and any finding that ships `suggested_fix.before` +
`target_file` has that anchor occur **exactly once**. Fix everything it flags before
reporting completion.
