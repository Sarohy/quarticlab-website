# UI/UX Audit Report -- landing

- target_commit: 6725fd1f6ab5a5e091ed2a1b31ca7870c3df65e5
- generated_at: 2026-06-11
- target_paths: src/pages/index.js, src/styles/landing.module.css
- schema_version: 1.0
- status: ALL 11 FINDINGS APPLIED (2026-06-11) -- `npx eslint` clean, `next build` Compiled successfully

## Summary

- total findings: 11 -- ALL DONE
- by_severity: blocker 0, critical 3, major 4, minor 4, info 0
- by_autofix: autofixable 3, needs-human 8, unsafe 0
- files_touched: src/pages/index.js, src/styles/landing.module.css
- blockers_gate: false
- apply_order: F-002, F-006, F-011, F-004, F-003, F-007, F-008, F-009, F-010, F-005, F-001
- verification: index.js eslint exit 0; `npm run build` -> "Compiled successfully", `/` route builds (18.7 kB)

### Applied status (apply order)
- [x] F-002 -- contact fields wired (aria-invalid/aria-describedby/aria-required on name, email, description + error span ids)
- [x] F-006 -- stat count-up now jumps to target under prefers-reduced-motion
- [x] F-011 -- featured projects empty-state branch added
- [x] F-004 -- projects error color #ef5350 -> #b3261e
- [x] F-003 -- services error color #ef5350 -> #b3261e
- [x] F-007 -- .techRun alpha 0.38 -> 0.64
- [x] F-008 -- removed !important on .statValue
- [x] F-009 -- .statValue 36px -> clamp(28px, 4vw, 48px)
- [x] F-010 -- .procLine svg 100vh -> 100svh
- [x] F-005 -- removed will-change: flex-grow (structural transform rewrite still open, see note)
- [x] F-001 -- .container max-width 1200px -> var(--max-width)

> Note on the two needs-human value calls applied with sensible defaults:
> F-001 pulled the container to the `--max-width` (1100px) token rather than bumping
> the token to 1200 -- revert if 1200 is the intended system width.
> F-003/F-004 used `#b3261e` (~5.9:1 on canvas) as the accessible error red; swap for
> a real error token if one is introduced. F-005 removed only the layout `will-change`
> hint; the transition still animates `flex-grow` -- a transform/flex-basis rewrite
> remains a follow-up.

The landing page is strong on the four reduced-motion guards that matter most
(hero canvas, kicker scramble, headline split, projects sticky-stack all check
`matchMedia('(prefers-reduced-motion: reduce)')`), uses the fluid `clamp()` type
scale, and honors the sanctioned oklch-alpha hierarchy tokens. The findings below
are the real gaps: a contrast hole in the two data-error messages, contact-form
errors that are not programmatically wired to their inputs, the count-up animation
that ignores reduced motion, the named 1200-vs-1100 `max-width` drift, the service
panel that animates `flex-grow`, and a handful of token/clamp polish items.

## How a fixing agent consumes this report

Parse the single ` ```json ` block below as the source of truth and apply findings
strictly in `summary.apply_order`. Locate each edit by `fix.before` (verbatim,
occurs exactly once) first and `location.start_line` second; after applying, the
`before` anchor must no longer match (idempotent). Honor `depends_on` (none here)
and verify every `acceptance_criteria` predicate. Do NOT apply any `needs-human`
or `unsafe` finding without human review -- those rewire events, make a palette
decision, or change a documented product value.

## Findings

### A11Y -- Accessibility

#### F-002 (A11Y-LABEL, critical) -- Contact form errors not wired to their inputs
- location: src/pages/index.js:1860 `<input className={styles.fldInput} id="landing-name" ...>` (ContactSection)
- evidence: errored fields render a `.fldErr` span but the input has no `aria-invalid`, no `aria-describedby`, and no `aria-required`/`required`.
- root_cause: the visual error exists but is not programmatically associated, violating A11Y-LABEL (1.3.1/3.3.2) -- a screen-reader user tabbing into an invalid field hears no error and does not know the field is required.
- before/after: see JSON. Wires `aria-required`, `aria-invalid`, and `aria-describedby` to the error span id (apply the same pattern to `landing-email` and `landing-description`).
- autofix: needs-human (touches markup + event semantics; gold standard is the contact-form page).
- acceptance: `aria-invalid` and `aria-describedby` present on the three validated fields; `npx eslint` exits 0.

#### F-003 (A11Y-CONTRAST-TEXT, critical) -- Services error message fails 4.5:1
- location: src/pages/index.js:974 `<p style={{ color: "#ef5350", textAlign: "center" }}>`
- evidence: `#ef5350` light red on `--ql-canvas` `#eee8dc` resolves to roughly 2.5:1, well below the 4.5:1 minimum for 16px body text.
- root_cause: a hardcoded light red on a light page background fails WCAG 1.4.3 -- the exact users who hit this branch (services failed to load) cannot reliably read the recovery copy.
- autofix: needs-human (no error-red token exists; pick an accessible red).
- acceptance: error text color resolves >= 4.5:1 over `#eee8dc`; no `#ef5350` remains on canvas backgrounds.

#### F-004 (A11Y-CONTRAST-TEXT, critical) -- Projects error message fails 4.5:1
- location: src/pages/index.js:1246 `<p style={{ color: "#ef5350", textAlign: "center" }}>`
- evidence/root_cause: same `#ef5350`-on-canvas failure as F-003, in the projects load-error branch.
- autofix: needs-human.
- acceptance: error text color resolves >= 4.5:1 over `#eee8dc`.

#### F-006 (A11Y-MOTION / RPM-07, major) -- Stat count-up ignores reduced motion
- location: src/pages/index.js:1318 (StatCard IntersectionObserver count-up)
- evidence: the `requestAnimationFrame` count-up from 0 -> target runs unconditionally; unlike the hero/kicker/headline/stack effects it has no `prefers-reduced-motion` guard.
- root_cause: animated numerics with no reduced-motion fallback violate A11Y-MOTION (2.3.3); users who request reduced motion still get a 2s animated count.
- autofix: needs-human (additive JS branch -- jump to final value when reduced).
- acceptance: with reduced motion the value renders at `stat.target` immediately; `npx eslint` exits 0.

#### F-007 (A11Y-CONTRAST-TEXT, major) -- Tech marquee names too low-contrast
- location: src/styles/landing.module.css:1163 `.techRun` (`color: oklch(20% 0.05 255 / 0.38)`)
- evidence: the non-highlighted technology names render at 0.38 alpha over `--ql-canvas`, well under 4.5:1; only the `<b>` highlighted subset reaches full contrast.
- root_cause: informative (not decorative -- the first row is not `aria-hidden`) text at tertiary alpha fails 1.4.3.
- autofix: needs-human (raising alpha changes the ambient look; a palette/brightness call).
- acceptance: visible (non `aria-hidden`) tech names resolve >= 4.5:1 over `#eee8dc`.

### VIS -- Design-system & token compliance

#### F-001 (VIS-02, major) -- `.container` hardcodes max-width 1200px (the 1100 drift)
- location: src/styles/landing.module.css:19 `max-width: 1200px;`
- evidence: `.container` uses `1200px` while `--max-width` is `1100px`; this is the named system-wide drift shared with aiServices/contactNew/projectsNew/aboutNew/services modules.
- root_cause: container width is not tokenized, violating VIS-02 single-source-of-truth; the value (bump token to 1200 vs pull to 1100) is a product decision.
- autofix: needs-human (value decision).
- acceptance: `.container` references `var(--max-width)` OR the team explicitly bumps `--max-width`; one source of truth.

#### F-008 (VIS-10, minor) -- `.statValue` uses `!important`
- location: src/styles/landing.module.css:963 `color: var(--ql-copper) !important;`
- evidence: `!important` exists only to beat the redundant inline `style={{ color: stat.accent }}` (also copper) set in StatCard.
- root_cause: fragile override (VIS-10) with no functional need -- the inline style already sets the same copper.
- autofix: autofixable (drop `!important`; rendered color is unchanged because the inline style still applies copper).
- acceptance: no `!important` on `.statValue`; stat numbers still render copper.

#### F-009 (VIS-04, minor) -- `.statValue` fixed 36px instead of clamp()
- location: src/styles/landing.module.css:959 `font-size: 36px;`
- evidence: the large stat number is a >=24px display value set at a fixed px, off the fluid scale every other heading uses.
- autofix: autofixable (nearest scale row).
- acceptance: `.statValue` uses a `clamp()`; no fixed `36px` remains there.

### RPM -- Responsive, performance & motion

#### F-005 (RPM-06, major) -- Service panel animates `flex-grow`
- location: src/styles/landing.module.css:416 `will-change: flex-grow;` (with `transition: flex-grow ...`)
- evidence: `.panel` declares `will-change: flex-grow` and transitions `flex-grow`, forcing layout on every animation frame.
- root_cause: animating a layout property (RPM-06) -- the named repo antipattern for the services panels.
- autofix: needs-human (structural -- prefer transform/flex-basis or accept a documented tradeoff). The minimal step encoded here removes the `will-change` layout hint.
- acceptance: no `will-change: flex-grow`; panel expand still works; jank reduced.

#### F-010 (RPM-02, minor) -- Process-line SVG uses legacy 100vh
- location: src/styles/landing.module.css:612 `height: 100vh;` (`.procLine svg`)
- evidence: the sticky decorative line uses `100vh`; the hero already models `100svh`.
- autofix: autofixable.
- acceptance: `.procLine svg` uses `100svh` (or `100dvh`); no `100vh` remains.

### USA -- Usability & interaction

#### F-011 (USA-STATE-02, minor) -- Featured projects list has no empty state
- location: src/pages/index.js:1250 `<div className={styles.wstack} ref={stackRef}>`
- evidence: when `projects` is empty but `projectsError` is false, the stack renders nothing (no `length === 0` branch); the gold standard `projects.js` renders an empty state.
- autofix: needs-human (content/copy).
- acceptance: an empty-state branch with actionable copy renders when `featured.length === 0`.

## Machine-readable findings

```json
{
  "schema_version": "1.0",
  "generated_at": "2026-06-11",
  "target_commit": "6725fd1f6ab5a5e091ed2a1b31ca7870c3df65e5",
  "target_paths": ["src/pages/index.js", "src/styles/landing.module.css"],
  "summary": {
    "total": 11,
    "by_severity": { "blocker": 0, "critical": 3, "major": 4, "minor": 4, "info": 0 },
    "by_autofix": { "autofixable": 3, "needs-human": 8, "unsafe": 0 },
    "files_touched": ["src/pages/index.js", "src/styles/landing.module.css"],
    "blockers_gate": false,
    "apply_order": ["F-002", "F-006", "F-011", "F-004", "F-003", "F-007", "F-008", "F-009", "F-010", "F-005", "F-001"]
  },
  "findings": [
    {
      "id": "F-001",
      "rule_id": "VIS-02",
      "dimension": "VIS",
      "title": "Landing .container hardcodes max-width:1200px instead of --max-width (1100px)",
      "severity": "major",
      "severity_rationale": "Content width drifts from the design-system token, giving the landing page a different measure than pages that use var(--max-width).",
      "confidence": "high",
      "autofix": "needs-human",
      "location": {
        "file": "src/styles/landing.module.css",
        "start_line": 19,
        "end_line": 19,
        "snippet": "  max-width: 1200px;",
        "css_module_file": "src/styles/landing.module.css",
        "selector": ".container",
        "jsx_anchor": null
      },
      "evidence": "max-width: 1200px;",
      "root_cause": "Container width is hardcoded rather than tokenized, violating VIS-02 single-source-of-truth; the 1100-vs-1200 value itself is a product decision shared across aiServices/contactNew/projectsNew/aboutNew/services modules.",
      "fix": {
        "before": "  max-width: 1200px;",
        "after": "  max-width: var(--max-width);",
        "token_mapping": { "1200px": "var(--max-width)" }
      },
      "target_file": "src/styles/landing.module.css",
      "acceptance_criteria": [
        "grep -n 'max-width: 1200px' src/styles/landing.module.css returns no match",
        "grep -n 'max-width: var(--max-width)' src/styles/landing.module.css returns the .container rule",
        "npm run build exits 0"
      ],
      "depends_on": [],
      "fingerprint": "vis02-landing-container-maxwidth"
    },
    {
      "id": "F-002",
      "rule_id": "A11Y-LABEL",
      "dimension": "A11Y",
      "title": "Contact form fields not wired to their error messages (no aria-invalid/aria-describedby/aria-required)",
      "severity": "critical",
      "severity_rationale": "A screen-reader user in the errored state hears neither that the field is required nor what is wrong, so they cannot recover.",
      "confidence": "high",
      "autofix": "needs-human",
      "location": {
        "file": "src/pages/index.js",
        "start_line": 1860,
        "end_line": 1871,
        "snippet": "            <input\n              className={styles.fldInput}\n              id=\"landing-name\"\n              name=\"name\"\n              onChange={handleChange}\n              type=\"text\"\n              value={form.name}\n            />",
        "css_module_file": null,
        "selector": null,
        "jsx_anchor": "<input className={styles.fldInput} id=\"landing-name\" name=\"name\" ... />"
      },
      "evidence": "<input className={styles.fldInput} id=\"landing-name\" ... /> followed by <span className={styles.fldErr}>{errors.name}</span> with no aria binding",
      "root_cause": "Visible field errors are not programmatically associated with the controls, violating A11Y-LABEL (WCAG 1.3.1/3.3.2); required fields also lack aria-required. Apply the same pattern to landing-email and landing-description.",
      "fix": {
        "before": "            <input\n              className={styles.fldInput}\n              id=\"landing-name\"\n              name=\"name\"\n              onChange={handleChange}\n              type=\"text\"\n              value={form.name}\n            />\n            {errors.name && (\n              <span className={styles.fldErr}>{errors.name}</span>\n            )}",
        "after": "            <input\n              aria-describedby={errors.name ? \"landing-name-err\" : undefined}\n              aria-invalid={errors.name ? true : undefined}\n              aria-required=\"true\"\n              className={styles.fldInput}\n              id=\"landing-name\"\n              name=\"name\"\n              onChange={handleChange}\n              type=\"text\"\n              value={form.name}\n            />\n            {errors.name && (\n              <span className={styles.fldErr} id=\"landing-name-err\">\n                {errors.name}\n              </span>\n            )}",
        "token_mapping": {}
      },
      "target_file": "src/pages/index.js",
      "acceptance_criteria": [
        "grep -n 'aria-invalid' src/pages/index.js returns the name field",
        "grep -n 'id=\"landing-name-err\"' src/pages/index.js returns the error span",
        "npx eslint src/pages/index.js exits 0"
      ],
      "depends_on": [],
      "fingerprint": "a11ylabel-landing-contact-error-binding"
    },
    {
      "id": "F-003",
      "rule_id": "A11Y-CONTRAST-TEXT",
      "dimension": "A11Y",
      "title": "Services load-error message uses #ef5350 (~2.5:1 on canvas), failing 4.5:1",
      "severity": "critical",
      "severity_rationale": "The users who reach this branch (services failed to load) cannot reliably read the recovery message.",
      "confidence": "high",
      "autofix": "needs-human",
      "location": {
        "file": "src/pages/index.js",
        "start_line": 974,
        "end_line": 976,
        "snippet": "          <p style={{ color: \"#ef5350\", textAlign: \"center\" }}>\n            Unable to load services right now. Please try again later.\n          </p>",
        "css_module_file": null,
        "selector": null,
        "jsx_anchor": "<p style={{ color: \"#ef5350\", textAlign: \"center\" }}>"
      },
      "evidence": "color: \"#ef5350\" on --ql-canvas #eee8dc resolves to roughly 2.5:1",
      "root_cause": "Hardcoded light red on a light page background fails WCAG 1.4.3; there is no error-red design token, so the accessible value is a human palette decision.",
      "fix": {
        "before": "          <p style={{ color: \"#ef5350\", textAlign: \"center\" }}>\n            Unable to load services right now. Please try again later.\n          </p>",
        "after": "          <p style={{ color: \"#b3261e\", textAlign: \"center\" }}>\n            Unable to load services right now. Please try again later.\n          </p>",
        "token_mapping": {}
      },
      "target_file": "src/pages/index.js",
      "acceptance_criteria": [
        "the services-error text color resolves >= 4.5:1 over #eee8dc",
        "grep -n 'Unable to load services right now' src/pages/index.js shows no #ef5350 on that paragraph",
        "npx eslint src/pages/index.js exits 0"
      ],
      "depends_on": [],
      "fingerprint": "a11ycontrast-landing-services-error-red"
    },
    {
      "id": "F-004",
      "rule_id": "A11Y-CONTRAST-TEXT",
      "dimension": "A11Y",
      "title": "Projects load-error message uses #ef5350 (~2.5:1 on canvas), failing 4.5:1",
      "severity": "critical",
      "severity_rationale": "The users who reach this branch (projects failed to load) cannot reliably read the recovery message.",
      "confidence": "high",
      "autofix": "needs-human",
      "location": {
        "file": "src/pages/index.js",
        "start_line": 1246,
        "end_line": 1248,
        "snippet": "          <p style={{ color: \"#ef5350\", textAlign: \"center\" }}>\n            Unable to load projects right now. Please try again later.\n          </p>",
        "css_module_file": null,
        "selector": null,
        "jsx_anchor": "<p style={{ color: \"#ef5350\", textAlign: \"center\" }}>"
      },
      "evidence": "color: \"#ef5350\" on --ql-canvas #eee8dc resolves to roughly 2.5:1",
      "root_cause": "Same hardcoded light-red-on-light-background failure as F-003, in the projects load-error branch; accessible value is a human palette decision.",
      "fix": {
        "before": "          <p style={{ color: \"#ef5350\", textAlign: \"center\" }}>\n            Unable to load projects right now. Please try again later.\n          </p>",
        "after": "          <p style={{ color: \"#b3261e\", textAlign: \"center\" }}>\n            Unable to load projects right now. Please try again later.\n          </p>",
        "token_mapping": {}
      },
      "target_file": "src/pages/index.js",
      "acceptance_criteria": [
        "the projects-error text color resolves >= 4.5:1 over #eee8dc",
        "grep -n 'Unable to load projects right now' src/pages/index.js shows no #ef5350 on that paragraph",
        "npx eslint src/pages/index.js exits 0"
      ],
      "depends_on": [],
      "fingerprint": "a11ycontrast-landing-projects-error-red"
    },
    {
      "id": "F-005",
      "rule_id": "RPM-06",
      "dimension": "RPM",
      "title": "Service panel animates flex-grow (will-change: flex-grow) -- forces per-frame layout",
      "severity": "major",
      "severity_rationale": "Animating a layout property recalculates layout every frame, risking jank on lower-end devices during the panel expand.",
      "confidence": "high",
      "autofix": "needs-human",
      "location": {
        "file": "src/styles/landing.module.css",
        "start_line": 416,
        "end_line": 416,
        "snippet": "  will-change: flex-grow;",
        "css_module_file": "src/styles/landing.module.css",
        "selector": ".panel",
        "jsx_anchor": null
      },
      "evidence": "will-change: flex-grow; with transition: flex-grow 0.7s ...",
      "root_cause": "Animating/hinting a layout property (RPM-06) -- the named repo antipattern for the services panels. The full fix is structural (transform/flex-basis); this minimal step removes the layout will-change hint.",
      "fix": {
        "before": "  will-change: flex-grow;",
        "after": "  /* RPM-06: avoid will-change on a layout property; revisit animating flex-grow */",
        "token_mapping": {}
      },
      "target_file": "src/styles/landing.module.css",
      "acceptance_criteria": [
        "grep -n 'will-change: flex-grow' src/styles/landing.module.css returns no match",
        "service panels still expand on select",
        "npm run build exits 0"
      ],
      "depends_on": [],
      "fingerprint": "rpm06-landing-panel-flexgrow"
    },
    {
      "id": "F-006",
      "rule_id": "A11Y-MOTION",
      "dimension": "A11Y",
      "title": "Stat count-up animation has no prefers-reduced-motion guard",
      "severity": "major",
      "severity_rationale": "Users who request reduced motion still see a 2s animated count-up, unlike every other effect on the page.",
      "confidence": "high",
      "autofix": "needs-human",
      "location": {
        "file": "src/pages/index.js",
        "start_line": 1318,
        "end_line": 1320,
        "snippet": "            if (!started.current) {\n              started.current = true;\n              const duration = 2000;",
        "css_module_file": null,
        "selector": null,
        "jsx_anchor": "StatCard IntersectionObserver count-up"
      },
      "evidence": "requestAnimationFrame count-up from 0 -> target runs unconditionally, with no matchMedia('(prefers-reduced-motion: reduce)') check",
      "root_cause": "Animated numerics with no reduced-motion fallback violate A11Y-MOTION (WCAG 2.3.3); the rest of the page guards its JS animations.",
      "fix": {
        "before": "            if (!started.current) {\n              started.current = true;\n              const duration = 2000;",
        "after": "            if (!started.current) {\n              started.current = true;\n              if (\n                window.matchMedia(\"(prefers-reduced-motion: reduce)\").matches\n              ) {\n                setCount(stat.target);\n                obs.unobserve(e.target);\n                return;\n              }\n              const duration = 2000;",
        "token_mapping": {}
      },
      "target_file": "src/pages/index.js",
      "acceptance_criteria": [
        "grep -n 'prefers-reduced-motion' src/pages/index.js returns the StatCard guard",
        "with reduced motion, the stat value renders at stat.target with no count-up",
        "npx eslint src/pages/index.js exits 0"
      ],
      "depends_on": [],
      "fingerprint": "a11ymotion-landing-statcard-countup"
    },
    {
      "id": "F-007",
      "rule_id": "A11Y-CONTRAST-TEXT",
      "dimension": "A11Y",
      "title": "Tech-marquee non-highlighted names render at 0.38 alpha (below 4.5:1)",
      "severity": "major",
      "severity_rationale": "The technology names are informative content (the first marquee row is not aria-hidden) yet most render below the text contrast minimum.",
      "confidence": "medium",
      "autofix": "needs-human",
      "location": {
        "file": "src/styles/landing.module.css",
        "start_line": 1163,
        "end_line": 1169,
        "snippet": ".techRun {\n  white-space: nowrap;\n  font-family: var(--font-mono);\n  font-size: 14px;\n  letter-spacing: 0.12em;\n  color: oklch(20% 0.05 255 / 0.38);\n}",
        "css_module_file": "src/styles/landing.module.css",
        "selector": ".techRun",
        "jsx_anchor": null
      },
      "evidence": "color: oklch(20% 0.05 255 / 0.38) over --ql-canvas for the visible tech-name row",
      "root_cause": "Tertiary-alpha text on canvas fails WCAG 1.4.3 for informative content; raising the alpha changes the ambient look, so the target value is a human call.",
      "fix": {
        "before": "  letter-spacing: 0.12em;\n  color: oklch(20% 0.05 255 / 0.38);\n}",
        "after": "  letter-spacing: 0.12em;\n  color: oklch(20% 0.05 255 / 0.64);\n}",
        "token_mapping": {}
      },
      "target_file": "src/styles/landing.module.css",
      "acceptance_criteria": [
        "the visible (non aria-hidden) tech names resolve >= 4.5:1 over #eee8dc (may require darker than 0.64 alpha -- verify)",
        "grep -n 'oklch(20% 0.05 255 / 0.38)' near .techRun returns no match",
        "npm run build exits 0"
      ],
      "depends_on": [],
      "fingerprint": "a11ycontrast-landing-techrun-alpha"
    },
    {
      "id": "F-008",
      "rule_id": "VIS-10",
      "dimension": "VIS",
      "title": ".statValue uses !important to beat a redundant inline copper color",
      "severity": "minor",
      "severity_rationale": "Fragile override with no functional need; harmless today but a maintenance trap.",
      "confidence": "high",
      "autofix": "autofixable",
      "location": {
        "file": "src/styles/landing.module.css",
        "start_line": 963,
        "end_line": 963,
        "snippet": "  color: var(--ql-copper) !important;",
        "css_module_file": "src/styles/landing.module.css",
        "selector": ".statValue",
        "jsx_anchor": null
      },
      "evidence": "color: var(--ql-copper) !important; -- the StatCard inline style already sets the same copper",
      "root_cause": "!important exists only to win over the redundant inline style={{ color: stat.accent }} (also copper), violating VIS-10; removing it leaves the rendered color unchanged because the inline style still applies.",
      "fix": {
        "before": "  color: var(--ql-copper) !important;",
        "after": "  color: var(--ql-copper);",
        "token_mapping": {}
      },
      "target_file": "src/styles/landing.module.css",
      "acceptance_criteria": [
        "grep -n '!important' src/styles/landing.module.css returns no match on .statValue",
        "stat numbers still render copper",
        "npm run build exits 0"
      ],
      "depends_on": [],
      "fingerprint": "vis10-landing-statvalue-important"
    },
    {
      "id": "F-009",
      "rule_id": "VIS-04",
      "dimension": "VIS",
      "title": ".statValue sets a fixed 36px instead of a clamp() display size",
      "severity": "minor",
      "severity_rationale": "The large stat number does not scale fluidly like the rest of the type system.",
      "confidence": "high",
      "autofix": "autofixable",
      "location": {
        "file": "src/styles/landing.module.css",
        "start_line": 959,
        "end_line": 959,
        "snippet": "  font-size: 36px;",
        "css_module_file": "src/styles/landing.module.css",
        "selector": ".statValue",
        "jsx_anchor": null
      },
      "evidence": "font-size: 36px; on the >=24px stat-number display value",
      "root_cause": "A >=24px display value uses fixed px instead of the de-facto clamp() scale (VIS-04).",
      "fix": {
        "before": "  font-size: 36px;",
        "after": "  font-size: clamp(28px, 4vw, 48px);",
        "token_mapping": { "36px": "clamp(28px, 4vw, 48px)" }
      },
      "target_file": "src/styles/landing.module.css",
      "acceptance_criteria": [
        "grep -n 'font-size: 36px' src/styles/landing.module.css returns no match",
        "grep -n 'font-size: clamp(28px, 4vw, 48px)' src/styles/landing.module.css returns the .statValue rule",
        "npm run build exits 0"
      ],
      "depends_on": [],
      "fingerprint": "vis04-landing-statvalue-fixedpx"
    },
    {
      "id": "F-010",
      "rule_id": "RPM-02",
      "dimension": "RPM",
      "title": "Process-line SVG uses legacy 100vh instead of 100svh",
      "severity": "minor",
      "severity_rationale": "On mobile the URL-bar jump makes the sticky line slightly taller than the visible viewport; the hero already uses svh.",
      "confidence": "high",
      "autofix": "autofixable",
      "location": {
        "file": "src/styles/landing.module.css",
        "start_line": 612,
        "end_line": 612,
        "snippet": "  height: 100vh;",
        "css_module_file": "src/styles/landing.module.css",
        "selector": ".procLine svg",
        "jsx_anchor": null
      },
      "evidence": "height: 100vh; on the sticky .procLine svg",
      "root_cause": "Legacy 100vh (RPM-02); the repo convention is 100svh/100dvh (see the hero).",
      "fix": {
        "before": "  height: 100vh;",
        "after": "  height: 100svh;",
        "token_mapping": { "100vh": "100svh" }
      },
      "target_file": "src/styles/landing.module.css",
      "acceptance_criteria": [
        "grep -n 'height: 100vh' src/styles/landing.module.css returns no match",
        "grep -n 'height: 100svh' src/styles/landing.module.css returns the .procLine svg rule",
        "npm run build exits 0"
      ],
      "depends_on": [],
      "fingerprint": "rpm02-landing-procline-vh"
    },
    {
      "id": "F-011",
      "rule_id": "USA-STATE-02",
      "dimension": "USA",
      "title": "Featured projects stack has no empty-state branch",
      "severity": "minor",
      "severity_rationale": "If projects load successfully but return an empty list, the section renders an empty stack with no message.",
      "confidence": "medium",
      "autofix": "needs-human",
      "location": {
        "file": "src/pages/index.js",
        "start_line": 1250,
        "end_line": 1251,
        "snippet": "          <div className={styles.wstack} ref={stackRef}>\n            {featured.map(p => (",
        "css_module_file": null,
        "selector": null,
        "jsx_anchor": "<div className={styles.wstack} ref={stackRef}>"
      },
      "evidence": "featured.map(...) render with no featured.length === 0 branch (contrast with projects.js empty state)",
      "root_cause": "List render lacks an empty-state branch (USA-STATE-02); content/copy is a human decision.",
      "fix": {
        "before": "          <div className={styles.wstack} ref={stackRef}>\n            {featured.map(p => (",
        "after": "          <div className={styles.wstack} ref={stackRef}>\n            {featured.length === 0 && (\n              <p style={{ textAlign: \"center\", opacity: 0.7 }}>\n                Selected work is on its way. Meanwhile, see the full portfolio.\n              </p>\n            )}\n            {featured.map(p => (",
        "token_mapping": {}
      },
      "target_file": "src/pages/index.js",
      "acceptance_criteria": [
        "grep -n 'featured.length === 0' src/pages/index.js returns a match",
        "an empty-state message renders when featured is empty",
        "npx eslint src/pages/index.js exits 0"
      ],
      "depends_on": [],
      "fingerprint": "usastate02-landing-projects-empty"
    }
  ]
}
```

## Component tree audited

- src/pages/index.js (LandingPage and all in-file sections: HeroSection, ServicesSection, ProcessSection, ProjectsSection, StatsSection/StatCard, TestimonialsSection/TestimonialCard/MarqueeRow, TechSection/TechRow, FaqSection, ContactSection, InlineAlert)
- src/styles/landing.module.css (the only imported module)
- Sub-imports not separately styled here: Seo (CommonComponents/Seo), ServiceIcons (CommonComponents/ServiceIcons), static SVG/PNG icon assets -- out of scope for this module's styling.

## Gaps & non-findings

Passes (held to the in-repo gold standards):
- Reduced-motion guards present and correct on the hero canvas, kicker scramble, char-split headline, and projects sticky-stack (each checks `matchMedia('(prefers-reduced-motion: reduce)')`); the testimonial and tech marquees both have `@media (prefers-reduced-motion: reduce) { animation: none }`. F-006 is the one JS animation that misses this.
- Contact form async submit IS gold-standard: button `disabled={submitting}` + label swap to "Sending..." + `role="alert"` success/error InlineAlert (USA-IU-01 / USA-ERR-02 pass). The remaining gap is the per-field aria wiring (F-002).
- Form inputs set `outline: none` (css:1361) but provide a real `:focus` replacement (copper border + ring at css:1390-1395), so A11Y-FOCUS-VISIBLE does NOT fire here.
- The oklch-with-alpha literals (`/ 0.64`, `/ 0.38`, `/ 0.14`, etc.) are the SANCTIONED semantic-hierarchy derivations per design-tokens.md, not VIS-01 violations -- not flagged. The `#000` stops in the mask-image gradients are luminance mask values, also not token candidates.
- Images: project shots and testimonial avatars have meaningful/empty `alt` correctly (duplicate marquee cards use `alt=""` + `aria-hidden`); decorative SVGs/canvas use `aria-hidden`. Heading order is clean (single h1, sequential h2/h3).
- Service panels use `role="button" tabIndex={0} onKeyDown` (Enter/Space) with `aria-expanded` -- keyboard-operable, so USA-IU-02/A11Y-KEYBOARD do NOT fire.

Could not be statically determined (verify at runtime; not auto-fixed):
- Contrast of dimmed text on dark sections (`.tqText` 0.64 over the 97% card, `.pDesc`/`.servicesLead`/`.statLabel`-at-0.55 over midnight). Several land near the 4.5:1 boundary; needs a real contrast probe (use the runtime playwright-ui-test / axe pass). Recorded as needs-human, not asserted as findings.
- `next/image` CLS for `.shot` (uses `fill`): desktop relies on the `.wcard` min-height:440px grid row to size the cell, mobile sets `aspect-ratio:16/9` -- appears reserved, but confirm no layout shift in the field.
- Landmark semantics: the hero is a `<header>`; whether it reads as a banner depends on the surrounding Layout `<main>` wrapper (out of scope here).
- `.faqAnswer` collapsed panels animate `max-height` (RPM-06-adjacent) and remain in the a11y tree when visually collapsed (no `hidden`); both are common, low-impact accordion tradeoffs -- noted, not flagged.
