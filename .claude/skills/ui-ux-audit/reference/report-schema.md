# Report contract — what the fixing agent consumes

This is the **interface** between the audit (writer) and the fixing agent (reader).
Treat it as a strict API. The report is a single Markdown file with a human section
**and exactly one** ` ```json ` block that is the parseable source of truth. Render
the Markdown **from** the JSON so they never disagree.

## Contents
- [Output path](#output-path)
- [Markdown section order](#markdown-section-order)
- [The JSON object](#the-json-object)
- [Finding fields](#finding-fields)
- [Locating reliably (the load-bearing rule)](#locating-reliably-the-load-bearing-rule)
- [Idempotency, ordering & dependencies](#idempotency-ordering--dependencies)
- [Acceptance criteria](#acceptance-criteria)
- [Severity definitions](#severity-definitions)
- [Worked example finding](#worked-example-finding)
- [Self-validation before finishing](#self-validation-before-finishing)

## Output path

`.claude/audit/ui-ux/<scope>.report.md` — repo-relative, `<scope>` = kebab-cased
target (`projects`, `header`, `contact-form`). Create the directory if missing.
Straight ASCII only inside the JSON (no smart quotes, em-dashes, or non-breaking
spaces — they break naive parsers and grep anchors).

## Markdown section order

1. `# UI/UX Audit Report — <scope>`
2. **Metadata line:** `target_commit` (git SHA), `generated_at`, `target_paths`, `schema_version`.
3. `## Summary` — severity histogram, autofix split (`autofixable`/`needs-human`/`unsafe`), `files_touched` list, `blockers_gate` boolean, and the canonical `apply_order`. **All counts must reconcile to `findings.length`.**
4. `## How a fixing agent consumes this report` — 3–4 sentences: parse the single JSON block; apply in `apply_order`; locate by snippet then line; honor `depends_on`; verify each `acceptance_criteria`; do not apply `needs-human`/`unsafe` without human review.
5. `## Findings` (human-readable) — grouped by dimension then severity; each shows `id`, `rule_id`, `severity`, `location` (`file:line` + selector/jsx_anchor), `evidence`, `root_cause`, before/after, `autofix`, `acceptance_criteria`.
6. `## Machine-readable findings` — **exactly one** ` ```json ` fence containing the JSON object below.
7. `## Component tree audited` — the target + every sub-component + each associated `.module.css`, so the fixer knows the exact scope covered.
8. `## Gaps & non-findings` — what could not be statically determined (contrast over photos, real CWV field data, focus order across route transitions) **and** explicit passes (e.g. "contact form is the gold standard").

## The JSON object

```json
{
  "schema_version": "1.0",
  "generated_at": "<ISO-8601 or commit-relative>",
  "target_commit": "<git SHA>",
  "target_paths": ["src/pages/projects.js", "src/styles/projectsNew.module.css"],
  "summary": {
    "total": 0,
    "by_severity": { "blocker": 0, "critical": 0, "major": 0, "minor": 0, "info": 0 },
    "by_autofix": { "autofixable": 0, "needs-human": 0, "unsafe": 0 },
    "files_touched": [],
    "blockers_gate": false,
    "apply_order": []
  },
  "findings": []
}
```

- `blockers_gate` = `true` when any `blocker` exists (the fixer should stop/escalate).
- `apply_order` = array of finding `id`s; a permutation of all ids; the order the
  fixer applies edits in.
- `files_touched` = unique `target_file`s across findings.

## Finding fields

Every finding object has **all** of these (no extras):

| field | required | meaning |
|-------|----------|---------|
| `id` | yes | `F-` + zero-padded counter, unique (`F-007`) |
| `rule_id` | yes | closed-taxonomy id (`USA-* / A11Y-* / VIS-* / RPM-*`) from [audit-rules.md](audit-rules.md) |
| `dimension` | yes | `USA` \| `A11Y` \| `VIS` \| `RPM` |
| `title` | yes | one-line summary of **this instance** (not the generic rule) |
| `severity` | yes | `blocker`\|`critical`\|`major`\|`minor`\|`info` |
| `severity_rationale` | yes | one sentence of concrete user/system impact |
| `confidence` | yes | `high`\|`medium`\|`low` |
| `autofix` | yes | `autofixable`\|`needs-human`\|`unsafe` |
| `location` | yes | composite object (below) |
| `evidence` | yes | verbatim offending snippet copied from `location.file` |
| `root_cause` | yes | violated principle, distinct from symptom: "X because Y violating `<rule_id>`" |
| `fix` | yes | `{ before, after, token_mapping }` (below) |
| `target_file` | yes | repo-relative POSIX path the fix edits (may differ from `location.file`) |
| `acceptance_criteria` | yes | non-empty array of machine-checkable predicates |
| `depends_on` | yes | array of finding `id`s that must apply first (cycle-free) |
| `fingerprint` | yes | line-number-free stable hash for cross-run identity |

`location`:
```json
{
  "file": "src/styles/projectsNew.module.css",
  "start_line": 16,
  "end_line": 16,
  "snippet": "  max-width: 1200px;",
  "css_module_file": "src/styles/projectsNew.module.css",
  "selector": ".container",
  "jsx_anchor": null
}
```
- `css_module_file`: resolved `.module.css` for styling findings, else `null`.
- `selector`: authored class **with leading dot, un-hashed** (`.container`), else `null`.
- `jsx_anchor`: opening tag text for markup/a11y findings (`<article className={styles.frow} onClick={...}>`), else `null`.

`fix`:
```json
{
  "before": "  max-width: 1200px;",
  "after": "  max-width: var(--max-width);",
  "token_mapping": { "1200px": "var(--max-width)" }
}
```
- `before`: anchored search string occurring **exactly once** in `target_file`
  (include ≥1 line of unique context if the line alone is ambiguous).
- `after`: literal final code; **must differ** from `before` and the `before` anchor
  must no longer match after the edit (idempotency).
- `token_mapping`: optional `{ literal: var(--token) }` when a value maps to a token.

## Locating reliably (the load-bearing rule)

The fixer locates each edit by **snippet search first, line number second**.
Therefore `location.snippet` and `fix.before` MUST be copied **verbatim** from the
file and must occur exactly once. For styling findings, always resolve the
CSS-Module indirection: the JSX shows `className={styles.frow}`; the real edit
target is `.frow { ... }` inside the imported `*.module.css`. Pin both:
`jsx_anchor` (call-site) and `css_module_file` + `selector` (edit-site).

If a `styles.<key>` cannot be statically resolved to a selector (dynamic/concatenated
class name), set `selector: null`, `confidence: "low"`, `autofix: "needs-human"`.

## Idempotency, ordering & dependencies

- **Idempotent:** after applying a fix, re-running it is a no-op (the `before`
  anchor is gone). Never use a `before` that also matches the post-fix state.
- **`depends_on`:** e.g. a finding that adds `--radius-md` to `globals.css` must come
  before a finding that references `var(--radius-md)`. The graph must be acyclic.
- **`apply_order`:** topological over `depends_on`, and **within a single file,
  descending `start_line`** so applying an earlier edit never shifts the line numbers
  of a later one.

## Acceptance criteria

Each finding's `acceptance_criteria` is an array with at least:
1. a **negative** check — old pattern gone
   (`grep -n 'max-width: 1200px' src/styles/projectsNew.module.css` returns nothing),
2. a **positive** check — new pattern present
   (`grep -n 'max-width: var(--max-width)' ...` returns the `.container` rule),
3. a **no-regression** check — `next build` (or `npx eslint <file>`) exits 0.

Prefer greppable strings / exit-code commands. No vague "looks correct".

## Severity definitions

| level | definition |
|-------|------------|
| **blocker** | breaks the contract or makes the component unusable for a class of users with no workaround (keyboard trap, keyboard-inoperable primary control, suppressed focus with no replacement, or an unparseable report). Fixer must gate. |
| **critical** | serious functional/a11y harm for many users but a partial path exists (missing accessible name, no loading feedback on async action, clickable non-button, modal without trap/restore, text < 4.5:1, errors not wired to inputs). |
| **major** | degrades usability/a11y/quality in some states but the task still completes (missing `:active`/`:disabled`/empty state, hover w/o focus parity, 1100-vs-1200 drift, non-text < 3:1, animating layout props, reduced-motion gap). |
| **minor** | polish/consistency/maintainability, negligible direct impact (hardcoded value with an exact token, off-grid spacing, ad-hoc radius, generic-but-clear copy, fixed px where clamp() is convention). |
| **info** | advisory/forward-looking, must not block (APCA borderline, dead `@font-face`, deferred MUI note). |

## Worked example finding

```json
{
  "id": "F-003",
  "rule_id": "VIS-02",
  "dimension": "VIS",
  "title": "Portfolio .container hardcodes max-width:1200px instead of the --max-width token",
  "severity": "major",
  "severity_rationale": "Content width drifts from the design-system token, producing inconsistent line lengths versus pages that use var(--max-width).",
  "confidence": "high",
  "autofix": "needs-human",
  "location": {
    "file": "src/styles/projectsNew.module.css",
    "start_line": 16,
    "end_line": 16,
    "snippet": "  max-width: 1200px;",
    "css_module_file": "src/styles/projectsNew.module.css",
    "selector": ".container",
    "jsx_anchor": null
  },
  "evidence": "max-width: 1200px;",
  "root_cause": "Container width is hardcoded rather than tokenized, violating VIS-02 single-source-of-truth; the 1100-vs-1200 value itself is a product decision.",
  "fix": {
    "before": "  max-width: 1200px;",
    "after": "  max-width: var(--max-width);",
    "token_mapping": { "1200px": "var(--max-width)" }
  },
  "target_file": "src/styles/projectsNew.module.css",
  "acceptance_criteria": [
    "grep -n 'max-width: 1200px' src/styles/projectsNew.module.css returns no match",
    "grep -n 'max-width: var(--max-width)' src/styles/projectsNew.module.css returns the .container rule",
    "npx eslint src/styles/projectsNew.module.css || true; npm run build exits 0"
  ],
  "depends_on": [],
  "fingerprint": "vis02-projectsNew-container-maxwidth"
}
```

> This one is `needs-human` because the 1100-vs-1200 decision is a product choice
> (bump the token vs pull containers in). A pure literal→token swap with an exact
> match (e.g. `#eee8dc` → `var(--ql-canvas)`) would be `autofixable`.

## Self-validation before finishing

After writing the report, run
`bash "${CLAUDE_SKILL_DIR}/scripts/validate-report.sh" <report-path>`. It asserts:
exactly one ` ```json ` fence that parses; required top-level keys present;
`summary` counts reconcile to `findings.length`; `apply_order` is a permutation of
finding ids; `depends_on` is acyclic; and every `fix.before` occurs **exactly once**
in its `target_file`. Fix anything it flags before you report completion.
