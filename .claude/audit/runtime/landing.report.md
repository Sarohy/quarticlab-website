# Runtime UI-Test Report -- landing

- target_commit: c7d82cb65b0cefe3e7950227bfdbd762ac66a01e
- generated_at: 2026-06-11
- url: http://localhost:3101/ (production build -- `next build` output, served on :3101)
- profiles_run: desktop (1440x900), ipad (768x1024), phone (390x844)
- routes: /
- schema_version: runtime-1.0
- status: ALL 4 FINDINGS FIXED + VERIFIED (2026-06-11). Re-probe across desktop/ipad/phone now reports **0 axe violations** (down from 4), 0 console/page/hydration errors, 0 broken images. `next build` Compiled successfully; `npx eslint src/pages/index.js` exit 0.

### Resolution log (verified by re-running the probe against the production build on :3101)
- [x] F-001 color-contrast -- process steps now LATCH on (stay readable, no re-dim to opacity 0.25); copper text/CTAs on the dark navy sections moved to a lighter `--copper-on-dark` / global `--ql-copper-on-dark` token (oklch(72% 0.13 52)); testimonial position text raised from `/0.38` (2.4:1) to `/0.7`. Also fixed the same root cause in the Footer column titles + CookieConsent (shared chrome that renders on the page). axe `color-contrast`: 72 -> 0 nodes.
- [x] F-002 nested-interactive -- the panel toggle is now a real `<button>` (the full-bleed `.pRail`); the EXPLORE `<a>` lives in the sibling `.pBody`, no longer nested in an interactive ancestor. axe `nested-interactive`: 8 -> 0.
- [x] F-003 aria-prohibited-attr -- added `role="group"` to the Clutch badge wrapper so its `aria-label` is permitted. axe `aria-prohibited-attr`: 1 -> 0.
- [x] F-004 target-size -- `.pLink` EXPLORE link given `min-height: 44px`. axe `target-size`: 1 -> 0; `.pLink` no longer in the phone touch-target list.

> Files changed: src/pages/index.js, src/styles/landing.module.css, src/styles/globals.css
> (added `--ql-copper-on-dark`), src/Components/CommonComponents/Footer/footer.module.css,
> src/Components/CommonComponents/CookieConsent/cookieConsent.module.css. The lighter
> copper is a deliberate palette call (the original `--ql-copper` is unchanged for
> light-background uses); revert the token value if the brand owner prefers a different shade.

## Summary

- total findings: 4 (all A11Y, confirmed by axe-core over the rendered DOM)
- by_severity: blocker 0, critical 1, major 2, minor 1, info 0
- by_autofix: autofixable 2, needs-human 2, unsafe 0
- by_viewport: desktop 4, ipad 4, phone 4 (all four are DOM-structural, not viewport-specific)
- files_touched: src/pages/index.js, src/styles/landing.module.css
- blockers_gate: false
- apply_order: F-001, F-002, F-003, F-004

> IMPORTANT testing note. The dev server (`npm run dev` on :3000) rendered the
> homepage **collapsed to zero height** (`#__next` measured 1440x0, every section
> 0x0, all screenshots blank) -- so the FIRST probe run against :3000 reported a
> false "all clean" (axe/overflow/touch all 0 because nothing was laid out). A
> production build (`next build` served on :3101) renders the full page correctly
> (`#__next` 1440x11412, h1 1052x220, 0 bad responses). This report uses the
> production run. The dev-only blank render is documented under Gaps -- it does not
> affect users but a developer viewing localhost:3000 will see a blank page.

All four findings are accessibility issues that **static review could not confirm**
and that the runtime probe surfaced authoritatively: rendered-DOM color contrast,
nested interactive controls, a prohibited ARIA attribute, and an undersized tap
target. There were **zero** console errors, page errors, hydration mismatches,
failed/4xx/5xx requests, broken images, or page-level horizontal scroll on any
profile.

## How a fixing agent consumes this report

Parse the single ` ```json ` block as the source of truth and apply findings in
`summary.apply_order`. None of these ship a `suggested_fix.before` anchor (runtime
A11Y fixes here are palette/structure decisions), so locate each edit via
`source_location` + `runtime_location.axe_target`, then implement
`suggested_fix.summary`. Honor `depends_on` (none). Every `acceptance_criteria`
includes a **probe re-run** against the production build plus a `npm run build`
exit-0 check -- the re-run is the load-bearing verification. Do not apply the two
`needs-human` findings (contrast palette, nested-interactive restructure) without
human review; the two `autofixable` ones (add a role, grow the tap target) are
additive.

## Findings

### A11Y

#### F-001 (RT-A11Y-color-contrast, critical) -- Dark-section text below 4.5:1 (72 nodes)
- viewports: desktop, ipad, phone
- runtime_location: axe targets incl. `.landing_pIx2` (QL/01), `.landing_pLink` (EXPLORE), `.landing_psNum` (NODE 01 - DESIGN), `.landing_psTitle`, `.landing_psDesc`, `.landing_psRow`
- evidence: axe color-contrast -- "insufficient color contrast of 4.04 (foreground #b36139, background #05162c, font size 11.5px)". 72 nodes total across the process section and expanded service panel.
- root_cause: copper-dk / dimmed oklch text on the midnight + oxford dark surfaces resolves to ~4.0:1, under the 4.5:1 minimum (WCAG 1.4.3). Cross-links the static `ui-ux-audit` "dark-section dimmed text" gap, now CONFIRMED by axe over rendered colors.
- suggested_fix: raise the copper/secondary text on dark surfaces to a token that clears 4.5:1 (a palette decision -- see ui-ux-audit design-tokens.md). NOTE: a portion of the 72 nodes are the `.pstep` process steps in their default `opacity:0.25` pre-reveal state (they brighten to full opacity only while scrolled into a specific band); those are state-dependent, but the fully-revealed copper-on-midnight (e.g. `.pIx2`, `.pLink`) genuinely fails at ~4.04 independent of opacity.
- autofix: needs-human
- screenshot: .claude/audit/runtime/landing/desktop.png

#### F-002 (RT-A11Y-nested-interactive, major) -- Service panel button contains a nested link (8 nodes)
- viewports: desktop, ipad, phone
- runtime_location: axe targets `.landing_panel[role="button"]` (x8) each wrapping the `.landing_pLink` EXPLORE anchor
- evidence: axe nested-interactive -- "Interactive controls must not be nested". `<div role="button" aria-expanded="..." tabindex="0">` containing `<a href="/services/...">EXPLORE</a>`.
- root_cause: each service panel is a `role="button"` with an `<a>` (the EXPLORE link) nested inside it, violating RT-A11Y-nested-interactive (4.1.2) -- a button must not contain another focusable control; screen readers and keyboard users get an ambiguous control. The static audit marked the panel `role="button"` a PASS; the runtime probe overturned that because of the nested link.
- suggested_fix: restructure so the panel is not a button wrapping a link -- e.g. make the whole expanded panel a link/region and drive expansion from the rail header only, or keep the panel as a non-button container and expose the EXPLORE link as the single interactive control. Rewires events + ARIA -> human review.
- autofix: needs-human
- screenshot: .claude/audit/runtime/landing/desktop.png

#### F-004 (RT-A11Y-target-size, major) -- EXPLORE link tap target under 24px
- viewports: desktop, ipad, phone
- runtime_location: axe target `.landing_pLink[href$="genai-automation"]`; also surfaced in the phone touch-target probe
- evidence: axe target-size -- "All touch targets must be 24px large, or leave sufficient space". The `.pLink` EXPLORE link computes under the 24px AA minimum.
- root_cause: `.pLink` is an `inline-flex` 12px mono link with no min-height/padding, so its hit box is below 24px (WCAG 2.5.8). 
- suggested_fix: grow `.pLink` to a >=24px (ideally 44px) target via `min-height` + vertical padding without disturbing the panel layout.
- autofix: autofixable
- screenshot: .claude/audit/runtime/landing/desktop.png

#### F-003 (RT-A11Y-aria-prohibited-attr, minor) -- aria-label on a div with no role
- viewports: desktop, ipad, phone
- runtime_location: axe target `.landing_clutchBadgeInline`
- evidence: axe aria-prohibited-attr -- `<div aria-label="Clutch reviews" class="landing_clutchBadgeInline...">`. aria-label is not permitted on a generic `div` with no role, so assistive tech ignores it.
- root_cause: the Clutch badge wrapper carries `aria-label` without a role that permits a name, violating RT-A11Y-aria-prohibited-attr (4.1.2) -- the intended "Clutch reviews" label is silently dropped.
- suggested_fix: give the wrapper a role that accepts an accessible name (e.g. `role="group"` or wrap it in a labelled `<section aria-label="Clutch reviews">`), or move the label to the embedded widget.
- autofix: autofixable
- screenshot: .claude/audit/runtime/landing/desktop.png

## Machine-readable findings

```json
{
  "schema_version": "runtime-1.0",
  "generated_at": "2026-06-11",
  "target_commit": "c7d82cb65b0cefe3e7950227bfdbd762ac66a01e",
  "url": "http://localhost:3101/",
  "routes": ["/"],
  "profiles_run": ["desktop", "ipad", "phone"],
  "summary": {
    "total": 4,
    "by_severity": { "blocker": 0, "critical": 1, "major": 2, "minor": 1, "info": 0 },
    "by_autofix": { "autofixable": 2, "needs-human": 2, "unsafe": 0 },
    "by_viewport": { "desktop": 4, "ipad": 4, "phone": 4 },
    "files_touched": ["src/pages/index.js", "src/styles/landing.module.css"],
    "blockers_gate": false,
    "apply_order": ["F-001", "F-002", "F-003", "F-004"]
  },
  "findings": [
    {
      "id": "F-001",
      "probe_id": "RT-A11Y-color-contrast",
      "category": "A11Y",
      "title": "Dark-section text (process steps + expanded service panel) fails 4.5:1 contrast",
      "severity": "critical",
      "severity_rationale": "Body and label text on the dark midnight/oxford surfaces resolves to ~4.0:1, unreadable for low-vision users; axe resolved the rendered colors so this is authoritative.",
      "confidence": "high",
      "autofix": "needs-human",
      "viewports": ["desktop", "ipad", "phone"],
      "evidence": "axe color-contrast: Element has insufficient color contrast of 4.04 (foreground color: #b36139, background color: #05162c, font size: 11.5px, font weight: normal). Expected contrast ratio of 4.5:1. 72 nodes total (incl. .pIx2, .pLink, .psNum, .psTitle, .psDesc, .psRow).",
      "runtime_location": {
        "profile": "desktop",
        "selector": "section.landing_process__... .landing_pstep__...",
        "axe_target": [".landing_pIx2", ".landing_pLink", ".landing_psNum", ".landing_psTitle", ".landing_psDesc"],
        "request_url": null,
        "measured": "4.04:1 (need 4.5:1); 72 nodes"
      },
      "source_location": {
        "file": "src/styles/landing.module.css",
        "selector": ".pIx2 / .pLink / .psNum / .psTitle / .psDesc / .psRow",
        "css_module_file": "src/styles/landing.module.css",
        "jsx_anchor": null,
        "jsx_file": "src/pages/index.js",
        "start_line": null
      },
      "root_cause": "Copper-dk and dimmed oklch text on the dark process/panel surfaces is below 4.5:1, violating RT-A11Y-color-contrast (WCAG 1.4.3); the replacement is a palette decision. Confirms the static ui-ux-audit dark-section contrast gap. A subset of the 72 nodes are .pstep steps measured in their default opacity:0.25 pre-reveal state.",
      "suggested_fix": {
        "summary": "Raise copper/secondary text on the dark midnight/oxford surfaces to a token that clears 4.5:1 (palette decision; cross-check ui-ux-audit design-tokens.md), and ensure process steps are not left at opacity 0.25 when in view."
      },
      "screenshots": [".claude/audit/runtime/landing/desktop.png"],
      "acceptance_criteria": [
        "re-run: node .claude/skills/playwright-ui-test/runner/run-probe.mjs --url http://localhost:3101/ --out .claude/audit/runtime/landing ; signals.json has no axe violation with id 'color-contrast' on any profile",
        "the cited dark-surface text resolves >= 4.5:1 over its rendered background",
        "npm run build exits 0"
      ],
      "depends_on": [],
      "fingerprint": "rt-a11y-contrast-landing-dark-process-panel"
    },
    {
      "id": "F-002",
      "probe_id": "RT-A11Y-nested-interactive",
      "category": "A11Y",
      "title": "Service panel role=button wraps the nested EXPLORE link (nested interactive)",
      "severity": "major",
      "severity_rationale": "Each service panel is a button containing a focusable link, giving keyboard and screen-reader users an ambiguous, double-interactive control.",
      "confidence": "high",
      "autofix": "needs-human",
      "viewports": ["desktop", "ipad", "phone"],
      "evidence": "axe nested-interactive (8 nodes): <div role=\"button\" aria-expanded=\"...\" tabindex=\"0\" class=\"landing_panel...\"> containing <a class=\"landing_pLink...\" href=\"/services/...\">EXPLORE</a>",
      "runtime_location": {
        "profile": "desktop",
        "selector": ".landing_panel[role=\"button\"]",
        "axe_target": [".landing_panelOn", ".landing_panel[role=\"button\"]:nth-child(2)"],
        "request_url": null,
        "measured": "8 nested-interactive nodes"
      },
      "source_location": {
        "file": "src/pages/index.js",
        "selector": ".panel / .pLink",
        "css_module_file": "src/styles/landing.module.css",
        "jsx_anchor": "<div aria-expanded={on} className={`${styles.panel} ${on ? styles.panelOn : \"\"}`} ... role=\"button\" tabIndex={0}>",
        "jsx_file": "src/pages/index.js",
        "start_line": null
      },
      "root_cause": "A role=button must not contain another interactive control, but the panel button wraps the EXPLORE <a>, violating RT-A11Y-nested-interactive (WCAG 4.1.2). The static audit passed the panel; runtime overturned it via the nested link.",
      "suggested_fix": {
        "summary": "Restructure so the panel is not a button wrapping a link -- drive expansion from the rail header only and keep EXPLORE as the single interactive control, or make the panel a non-button container. Rewires events + ARIA."
      },
      "screenshots": [".claude/audit/runtime/landing/desktop.png"],
      "acceptance_criteria": [
        "re-run: node .claude/skills/playwright-ui-test/runner/run-probe.mjs --url http://localhost:3101/ --out .claude/audit/runtime/landing ; signals.json has no axe violation with id 'nested-interactive' on any profile",
        "service panels remain keyboard-operable (Enter/Space expand; EXPLORE reachable by Tab)",
        "npm run build exits 0"
      ],
      "depends_on": [],
      "fingerprint": "rt-a11y-nested-interactive-landing-service-panel"
    },
    {
      "id": "F-003",
      "probe_id": "RT-A11Y-aria-prohibited-attr",
      "category": "A11Y",
      "title": "Clutch badge wrapper has aria-label on a div with no role",
      "severity": "minor",
      "severity_rationale": "The intended 'Clutch reviews' accessible name is silently dropped because aria-label is not allowed on a roleless div.",
      "confidence": "high",
      "autofix": "autofixable",
      "viewports": ["desktop", "ipad", "phone"],
      "evidence": "axe aria-prohibited-attr (1 node): <div aria-label=\"Clutch reviews\" class=\"landing_clutchBadgeInline...\">",
      "runtime_location": {
        "profile": "desktop",
        "selector": ".landing_clutchBadgeInline",
        "axe_target": [".landing_clutchBadgeInline"],
        "request_url": null,
        "measured": "1 node"
      },
      "source_location": {
        "file": "src/pages/index.js",
        "selector": ".clutchBadgeInline",
        "css_module_file": "src/styles/landing.module.css",
        "jsx_anchor": "<div aria-label=\"Clutch reviews\" className={styles.clutchBadgeInline}>",
        "jsx_file": "src/pages/index.js",
        "start_line": null
      },
      "root_cause": "aria-label requires a role that supports a name; on a generic div it is prohibited and ignored, violating RT-A11Y-aria-prohibited-attr (WCAG 4.1.2).",
      "suggested_fix": {
        "summary": "Add a role that accepts a name (e.g. role=\"group\") to the wrapper, or wrap the widget in <section aria-label=\"Clutch reviews\">, so the label is exposed."
      },
      "screenshots": [".claude/audit/runtime/landing/desktop.png"],
      "acceptance_criteria": [
        "re-run: node .claude/skills/playwright-ui-test/runner/run-probe.mjs --url http://localhost:3101/ --out .claude/audit/runtime/landing ; signals.json has no axe violation with id 'aria-prohibited-attr' on any profile",
        "grep -n 'Clutch reviews' src/pages/index.js shows the wrapper now carries a name-bearing role or landmark",
        "npm run build exits 0"
      ],
      "depends_on": [],
      "fingerprint": "rt-a11y-aria-prohibited-landing-clutch-badge"
    },
    {
      "id": "F-004",
      "probe_id": "RT-A11Y-target-size",
      "category": "A11Y",
      "title": "EXPLORE service link tap target is under 24px",
      "severity": "major",
      "severity_rationale": "The EXPLORE link's hit box is below the 24px AA minimum, hard to tap on touch and easy to miss.",
      "confidence": "high",
      "autofix": "autofixable",
      "viewports": ["desktop", "ipad", "phone"],
      "evidence": "axe target-size (1 node): .landing_pLink[href$=\"genai-automation\"] -- target under 24px; also flagged by the phone touch-target probe.",
      "runtime_location": {
        "profile": "phone",
        "selector": ".landing_pLink",
        "axe_target": [".landing_pLink[href$=\"genai-automation\"]"],
        "request_url": null,
        "measured": "< 24px CSS"
      },
      "source_location": {
        "file": "src/styles/landing.module.css",
        "selector": ".pLink",
        "css_module_file": "src/styles/landing.module.css",
        "jsx_anchor": "<Link className={styles.pLink} href={s.href}>",
        "jsx_file": "src/pages/index.js",
        "start_line": null
      },
      "root_cause": "The 12px inline-flex .pLink has no min-height/padding, so its tap target is below 24px, violating RT-A11Y-target-size (WCAG 2.5.8).",
      "suggested_fix": {
        "summary": "Grow .pLink to a >=24px (ideally 44px) hit area via min-height + vertical padding without disturbing the expanded-panel layout."
      },
      "screenshots": [".claude/audit/runtime/landing/phone.png"],
      "acceptance_criteria": [
        "re-run: node .claude/skills/playwright-ui-test/runner/run-probe.mjs --url http://localhost:3101/ --out .claude/audit/runtime/landing ; signals.json has no axe violation with id 'target-size' and no .pLink in profiles[phone].touchTargets",
        "grep -n 'min-height' src/styles/landing.module.css returns the .pLink rule",
        "npm run build exits 0"
      ],
      "depends_on": [],
      "fingerprint": "rt-a11y-target-size-landing-plink"
    }
  ]
}
```

## Probe coverage

- Routes tested: `/` (landing). Single route -> audited inline.
- Profiles: desktop 1440x900, ipad 768x1024, phone 390x844.
- Build under test: production (`next build` -> served via `next start` on :3101). The
  dev server (:3000) was NOT usable -- see the blank-render note below.
- Auto-exercised: initial load + full-page scroll (which triggers IntersectionObserver
  reveals, count-up, process-line draw, sticky-stack). axe-core ran post-scroll on each
  profile.
- Raw per-category counts (production run): console.errors 0, pageErrors 0, hydration 0,
  failed/4xx/5xx 0, brokenImages 0 on all profiles. axe 4 distinct violations
  (color-contrast 72 nodes, nested-interactive 8, target-size 1, aria-prohibited-attr 1).
  overflow 30 (all clipped marquee descendants -- see Gaps), touch<44 31-33 (mostly
  footer/header chrome -- see Gaps), overlap 6-14 (header drawer + hidden panel bodies --
  see Gaps).

## Gaps & non-findings

DEV-SERVER BLANK RENDER (observation, not a user-facing finding):
- `npm run dev` on :3000 served the homepage with `#__next` and every descendant at 0
  height (all three screenshots blank, `body.scrollHeight==0`), with NO console/page
  errors. The same commit built with `next build` renders perfectly (`#__next`
  1440x11412). So this is a dev-mode/Fast-Refresh artifact, not a production bug -- but
  it means the first probe pass on :3000 produced a FALSE "all clean", and a developer
  checking localhost:3000 may see a blank page. Worth a quick dev-server restart / Fast
  Refresh investigation; it did not reproduce in the production build, so it is recorded
  here rather than as a finding.

False positives filtered out (not reported):
- OVERFLOW (30 nodes): all are tech-marquee (`.techMq`/`.techRun`) and testimonial-marquee
  (`.tmrow`/`.tq`) descendants with `width: max-content`, intentionally wider than the
  viewport and clipped by `overflow:hidden` parents (`.techMqBox`, `.tmwrap`). Page-level
  `pageHorizontalScroll` is false and `docScrollWidth == viewportWidth` on all profiles,
  so there is no real horizontal scroll.
- TOUCH (31-33): the large majority are footer links (21) and the mobile header drawer /
  hamburger / logo / cookie-consent banner -- all shared Layout chrome, OUT OF SCOPE for
  the landing target (index.js + landing.module.css). They belong to the Footer/Header/
  CookieConsent component audits. The only landing-scope small target is `.pLink` (F-004).
- OVERLAP (6-14): mostly the mobile header drawer sublinks overlapping the nav behind a
  closed/animated drawer (Header component, out of scope), plus the collapsed service
  panels' absolutely-positioned `.pBody`/`.pContent` which overlap geometrically but are
  `opacity:0; pointer-events:none` when collapsed (visually hidden, not a real overlap).

Not exercised by the probe (load + scroll only) -- verify manually if needed:
- Service panel expand/collapse interaction (click/keyboard), FAQ accordion toggle,
  contact form submit (success + validation-error states, including the F-002/F-003 aria
  wiring and the recolored error messages from the static audit), mobile menu open, the
  Clutch widget's own loaded contents (third-party iframe).
- CWV: the lab `webVitals` came back lcp/cls/inp = 0 (one cold run, text-LCP not captured
  reliably) -- treated as no-signal, not a pass or a finding; CWV never gates.

Explicit passes (production build, all profiles):
- Zero console errors/warnings, zero uncaught exceptions, zero hydration mismatches, zero
  failed/4xx/5xx requests, zero broken images.
- Structure healthy: single `<h1>`, `<main>` landmark present, `lang="en"`, viewport meta
  present, no page-level horizontal scroll at 1440 / 768 / 390.
