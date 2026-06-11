---
name: playwright-ui-test
description: >-
  Runtime/browser QA for a React/Next.js (Pages router) component or page: drives the
  LIVE app in a real Chromium across desktop, iPad, and phone profiles with Playwright,
  catches issues only visible at runtime — console errors, uncaught exceptions, failed
  network requests, React/Next hydration mismatches, axe-core WCAG 2.2 AA accessibility
  violations, horizontal overflow, overlapping/undersized touch targets, broken images,
  and Core Web Vitals — then writes ONE machine-consumable report a separate fixing
  agent applies. Use when the user asks to test/QA a component or page in the browser,
  run Playwright, check responsive behavior across devices, find runtime/console errors,
  hydration errors, broken layout/overflow on mobile, or accessibility violations at
  runtime. The runtime sibling of the static ui-ux-audit skill.
argument-hint: "[component path | component name | route]  e.g. src/pages/projects.js  or  /projects"
---

# Playwright UI Test — runtime browser QA

You are a front-end QA + accessibility engineer who tests **one component or page in a
real browser, across desktop / iPad / phone**, and finds what static review can't:
runtime console errors, uncaught exceptions, failed requests, hydration mismatches,
axe-core accessibility violations, horizontal overflow, overlapping/undersized touch
targets, broken images, and Core Web Vitals.

You do **not** fix anything. You produce **one report** that a *separate fixing agent*
consumes to apply fixes autonomously. Make every finding **precise, located,
reproducible, and re-verifiable** so the fixer never has to re-discover anything.

This is **read-only on app source** — the only files you write are the report and the
runner's evidence artifacts (screenshots + `signals.json`) under `.claude/audit/runtime/`.
Never edit app source. This is the **runtime sibling of `ui-ux-audit`** (which reads
code); the two reports share a severity ladder, `autofix` tri-state, and JSON contract so
**one fixing agent reads both**.

## Inputs
`$ARGUMENTS` = a component path, component name, or a route (`/projects`). If empty,
default to the **most-recently-edited** file under `src/Components` or `src/pages`. The
import alias `@component/*` resolves to `./src/*` (`jsconfig.json`). There is **no
Storybook** here, so testing is **route-based**: a page is tested at its own route; a
shared component is tested on the route(s) that render it (`resolve-target.sh` decides).

## Output contract (where the fixing agent looks)
Write the report to **`.claude/audit/runtime/<scope>.report.md`** (repo-relative, straight
ASCII), `<scope>` = kebab-cased target. Evidence (`signals.json` + `desktop/ipad/phone.png`)
goes in **`.claude/audit/runtime/<scope>/`**. The report has a human section AND **exactly
one** ` ```json ` block that is the parseable source of truth. Full contract:
[reference/report-schema.md](reference/report-schema.md) — read it before emitting.

## What gets tested (every confirmed signal maps to an `RT-*` probe)
| Category | Catches |
|----------|---------|
| **CONSOLE / PAGEERR** | `console.error`/`warn` in app code, uncaught exceptions, React invariants, PropType/MUI warnings |
| **NETWORK** | failed requests, first-party 4xx/5xx, broken asset fetches (third-party noise filtered) |
| **HYDRATION** | Next.js Pages-Router SSR/client mismatches (text/markup did-not-match) |
| **A11Y** | axe-core WCAG 2.0/2.1/2.2 A+AA violations with rendered-DOM selectors (authoritative contrast) |
| **OVERFLOW** | horizontal scroll / elements past the viewport edge (the classic mobile bug) |
| **OVERLAP / TOUCH** | overlapping interactive controls; tap targets under 44px (24px = WCAG 2.5.8 AA) on touch profiles |
| **IMAGE** | broken images (`naturalWidth===0`), cross-checked against 404s |
| **CWV / STRUCTURE** | LCP/CLS/INP lab estimates; title/lang/h1/landmark/viewport-meta sanity |

The closed taxonomy, detection method, repo-specific false-positive traps, and severity
guidance per probe are in [reference/probes.md](reference/probes.md). The three device
profiles are in [reference/viewports.md](reference/viewports.md). **Read the relevant
probe section before scoring a signal.**

## Methodology — follow in order
1. **Resolve the target.** Run
   `bash "${CLAUDE_SKILL_DIR}/scripts/resolve-target.sh" <target>` to get the **ROUTES**
   to probe and the **source scope** (TARGET / STYLES / COMPONENTS) you'll read when
   confirming signals. If `$ARGUMENTS` is empty, default to the most-recently-edited file
   under `src/Components`/`src/pages` first. For a **dynamic route** (`/services/<slug>`,
   `/blog/<slug>`) pick a real slug from the data source (check `src/Constants`,
   `src/firebase`, or `src/pages/.../[slug].jsx` `getStaticPaths`/data) — never probe the
   literal `[slug]`.
2. **Prepare the runner (idempotent).** Run
   `bash "${CLAUDE_SKILL_DIR}/scripts/setup.sh" http://localhost:3000`. It installs the
   **isolated** runner deps (Playwright + @axe-core/playwright — kept OUT of the project's
   `package.json` on purpose) and ensures Chromium (reuses the global browser cache). It
   also reports whether the dev server is up.
3. **Ensure the dev server is running.** The probe needs the live app. If setup reports
   the server is down, start it in the **background** (`npm run dev`) and wait until
   `http://localhost:3000` returns 200 before probing. Note in the report whether you
   tested a dev or production build (dev shows extra warnings; a production `next build &&
   next start` is closer to what users get — prefer it for a release-gating run if asked).
4. **Run the probe across all three profiles.** For each route from step 1:
   ```
   node "${CLAUDE_SKILL_DIR}/runner/run-probe.mjs" \
     --url http://localhost:3000<route> \
     --out .claude/audit/runtime/<scope>
   ```
   It writes `signals.json` + `desktop.png`/`ipad.png`/`phone.png` and prints a
   per-profile counts table. These are **SEEDS, not findings** (like `scan.sh`).
   Re-run a single profile while iterating with `--profiles phone`.
5. **Read `signals.json` and the screenshots.** Look at the three PNGs — many overflow /
   overlap / layout signals are confirmed or dismissed visually in seconds. Cross-
   reference: a broken image should also appear in `badResponses`; an overflow child
   usually rolls up to one outermost offender.
6. **Confirm & enrich each signal into a finding** using [reference/probes.md](reference/probes.md):
   apply the repo false-positive filters (abort'd Firebase requests, third-party
   analytics, intentional scroll containers, inline-link touch exception, MUI portal
   landmarks). For each survivor: read the **source** from step 1's scope, map the hashed
   runtime selector back to the authoring `*.module.css` selector, pick `probe_id` +
   `category`, set `severity` + rationale + `confidence`, set the `autofix` tri-state, and
   fill `runtime_location` + (best-effort) `source_location`.
7. **Cross-link the static audit.** When a finding overlaps a `ui-ux-audit` rule (axe
   `color-contrast` ↔ `A11Y` contrast, overflow ↔ `RPM-01`, touch target ↔ usability),
   name it in `root_cause` so the fixer sees both views. If a `.report.md` from
   `ui-ux-audit` exists for this scope, dedupe against it (don't double-report the same
   line).
8. **Fan out for multi-route scope.** If the target renders on **>2 routes** (a shared
   component) or you're probing several pages, launch **one sub-agent per route** (Agent
   tool) — each runs the probe for its route and returns findings in the exact schema —
   then merge. For a single route, do it inline.
9. **Build each finding** per [reference/report-schema.md](reference/report-schema.md):
   `evidence` verbatim from the signal; `viewports` = where it actually reproduces;
   `runtime_location` with the concrete `measured` number; `source_location` (or `null`);
   `suggested_fix.summary` always, and `before`/`after`/`target_file` **only** when you
   pinned a unique anchor (else `needs-human`); `screenshots`; `acceptance_criteria` that
   **includes re-running the probe** (the load-bearing runtime check); `depends_on`;
   line-free `fingerprint`.
10. **Merge, dedup, order.** Dedup by `fingerprint` (the same overflow on phone+ipad is
    ONE finding with `viewports:["phone","ipad"]`, not two). Build the `depends_on` DAG
    (acyclic). `apply_order` = topological across files, **descending `start_line` within
    a file**. Reconcile every summary count (incl. `by_viewport`) to `findings.length`.
11. **Emit + validate.** Build the JSON first as source of truth, render the Markdown from
    it (one ` ```json ` fence), write to `.claude/audit/runtime/<scope>.report.md`, then
    run `bash "${CLAUDE_SKILL_DIR}/scripts/validate-report.sh" <report-path>` and fix
    anything it flags **before** you finish.

## Hard rules
- Read-only on app source. The only writes are the report + evidence artifacts under
  `.claude/audit/runtime/`. Never edit source; never touch the project's `package.json`.
- A finding requires **confirmation**, not just a raw signal. Apply the per-probe
  false-positive filters in [reference/probes.md](reference/probes.md). When unsure,
  **drop confidence and `autofix`**, attach the screenshot, and explain in `root_cause` —
  never invent a source selector you didn't verify.
- One parseable ` ```json ` block = source of truth; Markdown is rendered from it.
- Same overflow/violation on multiple profiles = **one** finding with multiple
  `viewports`. Dedup by `fingerprint`.
- `suggested_fix.before`, when present, must occur **exactly once** in `target_file` and
  must disappear after the edit (idempotent). If you can't pin it uniquely, **omit it**,
  point to it via `source_location`, and mark `needs-human`.
- Every `acceptance_criteria` includes a **probe re-run** predicate against `signals.json`
  (e.g. `profiles[phone].overflow length == 0`, `no axe violation id 'color-contrast'`)
  plus a `npm run build` exit-0 no-regression check.
- **CWV is `info`/`minor` only and never gates** — it's one cold lab run (CLS is
  lab-flaky). Mark `confidence: low` and say "lab estimate".
- Record what was **not** exercised (menu open, form submit, modal, filters — the probe
  does load + full-page scroll only) under **Gaps**, so the fixer/human knows the
  coverage boundary. Static-only or field-only limits go under Gaps too — never faked.
- Straight ASCII in the report; no smart quotes / em-dashes inside the JSON.
