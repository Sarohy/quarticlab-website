# Audit rules — closed taxonomy + checklists

Every finding's `rule_id` MUST come from this file. Read the dimension you are
scoring before assigning severity. Columns: **Detect** = how to find it statically
in JSX + CSS modules; **Fix** = the pattern a fixing agent applies; **Sev** =
default severity (adjust up/down per concrete impact); **AF** = default autofix
tri-state (`A`=autofixable, `H`=needs-human, `U`=unsafe).

## Contents
- [USA — Usability & Interaction Integrity](#usa--usability--interaction-integrity)
- [A11Y — Accessibility (WCAG 2.2 AA)](#a11y--accessibility-wcag-22-aa)
- [VIS — Visual Design-System & Token Compliance](#vis--visual-design-system--token-compliance)
- [RPM — Responsive, Performance & Motion](#rpm--responsive-performance--motion)
- [Per-dimension checklists](#per-dimension-checklists)
- [In-repo gold-standard pass templates](#in-repo-gold-standard-pass-templates)
- [Severity & confidence calibration](#severity--confidence-calibration)

---

## USA — Usability & Interaction Integrity

| rule_id | Title | Detect | Fix | Sev | AF |
|---------|-------|--------|-----|-----|----|
| USA-IU-01 | Async action has no loading feedback | `onClick`/`onSubmit` calling async/`fetch`/`axios`/`router.push` with no `loading`-gated disable+spinner | gate control on `loading`: disable + label swap + spinner CSS (contact-form pattern) | critical | H |
| USA-IU-02 | Click handler on non-button element | `<div\|article\|span\|li ... onClick>` | convert to `<button type="button">`; or `role="button" tabIndex={0} onKeyDown` if layout-bound | critical | H |
| USA-STATE-01 | Incomplete interaction states | selector has `:hover` but no `:focus-visible`; no `:active`; no `:disabled` for a disable-able control | add `:focus-visible` parity, `:active` press, `:disabled` style | major | A |
| USA-STATE-02 | List has no empty state | `.map(` render with no `length === 0` branch | add empty-state branch w/ actionable copy | major | H |
| USA-STATE-03 | No loading/skeleton placeholder | data-driven section renders nothing while pending | add skeleton/placeholder | minor | H |
| USA-MODAL-01 | Modal close affordances incomplete | dialog without X **and** Escape **and** overlay-click | provide all three close paths | major | H |
| USA-ERR-01 | Errors not inline / not specific | submit error is a generic toast or absent | inline, field-anchored, recovery-oriented message | major | H |
| USA-ERR-02 | No success/confirmation feedback | successful submit gives no visible confirmation | add success state that closes the loop | major | H |
| USA-TARGET-01 | Hit target too small | interactive element computed box < 24px incl. padding (worse at 540/400px) | grow padding/min-size to >=24px (aim 44px touch) | major | A |
| USA-FEEDBACK-01 | Active selection not exposed | tab/filter/toggle group with no `aria-pressed`/`aria-selected`/`aria-current` + visual active | add active state + ARIA (projects.js `.on` pill is the model) | major | A |
| USA-COPY-01 | Weak CTA microcopy | bare `Submit`/`Click here`/`Learn more` | verb+object label ("Send a brief", "Book a 30-min call") | minor | H |
| USA-COPY-02 | Destructive action w/o guard | delete/clear/irreversible action, no confirm/undo | add confirm or undo affordance | major | H |
| USA-RECOGNITION-01 | Placeholder used as label | `<input placeholder=...>` with no visible `<label>` | add persistent `<label htmlFor>` (also A11Y-LABEL) | major | H |
| USA-CONSISTENCY-01 | Inconsistent sibling patterns | same component type styled/behaving differently across instances | unify to one pattern | minor | H |

## A11Y — Accessibility (WCAG 2.2 AA)

| rule_id | Title | Detect | Fix | Sev | AF | WCAG |
|---------|-------|--------|-----|-----|----|------|
| A11Y-CONTRAST-TEXT | Text contrast < 4.5:1 (3:1 large) | resolve oklch token+alpha over the real bg; flag copper-on-canvas small text, low-alpha placeholders (`/0.4`,`/0.5`) | darken/raise to meet ratio using existing tokens | critical | H | 1.4.3 |
| A11Y-CONTRAST-NONTEXT | UI/border/focus contrast < 3:1 | hairlines (`#d9d9d9`, low-alpha borders), `0.16`-alpha focus ring | raise to >=3:1 | major | A | 1.4.11 |
| A11Y-FOCUS-VISIBLE | `outline:none` w/o replacement | `outline:\s*(none\|0)` with no `:focus-visible` for that selector | add `:focus-visible` ring `2px solid var(--ql-copper-dk)` offset 2px | critical | A | 2.4.7/2.4.11 |
| A11Y-KEYBOARD-OPERABLE | Not keyboard-operable | hover/mouse-only handlers (`onMouseEnter` opens menu), non-button click targets | provide keyboard path (button + Enter/Space/Escape) | blocker | H | 2.1.1 |
| A11Y-FOCUS-TRAP | Modal focus not managed | dialog without Tab trap / initial focus / restore-on-close / Escape | trap Tab, set+restore focus, `inert` background, Escape | critical | H | 2.4.3/2.1.2 |
| A11Y-SEMANTIC-HTML | Div/span soup for interactive/structural content | clickable `div`/`article`; sections built from `div` only | use `button`/`a`/`nav`/`main`/`section`/`ul>li` | critical | H | 1.3.1/4.1.2 |
| A11Y-HEADING-ORDER | Heading structure broken | multiple `h1`, or skipped level (h2→h4) | one `h1`/page, sequential levels | major | A | 1.3.1 |
| A11Y-NAME | Missing accessible name | icon-only `button` w/o `aria-label`; `<Image>`/`img` w/o meaningful `alt`; decorative img missing empty `alt`/`aria-hidden` | add `aria-label`/`alt`; decorative → `alt=""`/`aria-hidden` | critical | A | 1.1.1/4.1.2 |
| A11Y-ARIA-STATE | ARIA state not bound / invalid | static `aria-expanded`, redundant `role`, invalid attr/value | bind to React state; remove redundant/invalid ARIA | major | A | 4.1.2 |
| A11Y-LABEL | Form control unlabeled | input/select without programmatic `<label htmlFor>`; no `aria-invalid`/`aria-describedby` on errored field | add label + required/`aria-required` + `aria-invalid` + error `aria-describedby` | critical | H | 1.3.1/3.3.2 |
| A11Y-LIVE | Dynamic update not announced | filter count / empty-state / form result / spinner with no live region | add `aria-live`/`role="status"`(polite) or `role="alert"`(errors) | major | A | 4.1.3 |
| A11Y-TARGET-SIZE | Target < 24x24 CSS px | small icon buttons / close `X` / pills | >=24px (44 ideal) via min-size/padding | major | A | 2.5.8 |
| A11Y-MOTION | Motion not reduced | CSS/JS animation with no `prefers-reduced-motion` guard (per-component, see antipatterns) | guard with media query / `matchMedia` | major | A | 2.3.3 |
| A11Y-LINK-BUTTON | Link vs button misuse | `<a>` with `onClick` and no `href` doing an in-page action; `<button>` used for navigation | navigation → `<a>`/`<Link>`; action → `<button>` | major | H | 4.1.2 |
| A11Y-LANDMARK | Missing/!duplicate landmarks | no `main`/`nav`/`header`/`footer`; multiple unnamed `nav` | add landmarks; name duplicates with `aria-label` | minor | A | 1.3.1 |
| A11Y-APCA-FORWARD | APCA perceptual borderline | passes WCAG 4.5:1 but Lc < 75 for dense body text | advisory; consider stronger contrast | info | H | (WCAG3/APCA) |

## VIS — Visual Design-System & Token Compliance

| rule_id | Title | Detect | Fix | Sev | AF |
|---------|-------|--------|-----|-----|----|
| VIS-01 | Hardcoded color where token exists | raw `#hex`/`oklch()`/named color equal to a token value | literal → `var(--ql-*)` (see design-tokens.md) | minor–major | A |
| VIS-02 | `max-width` drift (1200 vs 1100) | `max-width: 1200px` in a `.container` vs `--max-width: 1100px` | one source of truth → `var(--max-width)` (value decision = human) | major | H |
| VIS-03 | Non-token `font-family` | `font-family` literal not `var(--font-*)` (e.g. `Poppins`) | map to `var(--font-display/body/mono)` | major | A |
| VIS-04 | Fixed-px heading | heading selector `font-size: <N>px` (>=24px) not `clamp()` | nearest clamp() scale row | minor | A |
| VIS-05 | Measure too wide | body prose with no `max-width`/`ch` cap (>75ch) | cap at `~66ch` (45–75ch) | minor | A |
| VIS-06 | Off-grid spacing | `padding`/`margin`/`gap` one-offs (13/15/9/7px) | snap to 4/8pt step | minor | A |
| VIS-07 | Ad-hoc border-radius | scattered radius values, token unused | propose `--radius-*` scale; map | minor | H |
| VIS-08 | Weak hierarchy | secondary text same weight/color as primary | dim via oklch alpha (`/0.64`,`/0.38`) | minor | A |
| VIS-09 | Bad line-height | `line-height: 0`/`0%`; display text too loose / body too tight | display 1.0–1.15, body 1.6–1.72 | minor | A |
| VIS-10 | `!important` / `vw` hack in global selector | `!important`, `margin-left: 42vw` | raise specificity / flex-grid (unsafe in globals) | major | U |
| VIS-11 | Dead font load | `@font-face` never referenced | remove unused load | info | A |
| VIS-12 | MUI hashed-class override | `.css-XXXX-Mui...` selector | style via `sx`/theme | major | U |

## RPM — Responsive, Performance & Motion

| rule_id | Title | Detect | Fix | Sev | AF |
|---------|-------|--------|-----|-----|----|
| RPM-01 | Overflow / raw `vw` sizing | `vw` in `width`/`margin`/`left`; horizontal scroll; `overflow-x:clip` used to mask | fluid units / flex-grid; clip only as backstop | major | H |
| RPM-02 | Legacy `100vh` hero | `min-height: 100vh` (mobile URL-bar jump) | `100svh`/`100dvh` | major | A |
| RPM-03 | `next/image` CLS risk | `<Image fill>` parent w/o reserved height/aspect-ratio; LCP img w/o `priority`; raw `<img>` w/o w/h | reserve box; add `priority` for LCP; keep `sizes` | major | A |
| RPM-04 | Container not responsive | fixed px width not reducing at breakpoints | `max-width`/`clamp()` + breakpoint reflow (see VIS-02) | major | H |
| RPM-05 | Font load shift | `@import` font / no `display:swap` / no fallback metrics | `next/font` with `display:swap` (already the convention) | minor | A |
| RPM-06 | Animating layout properties | `transition`/`animation`/`will-change` on `width/height/top/left/margin/flex-grow` | animate `transform`/`opacity`; rethink flex anim | major | H |
| RPM-07 | Per-component reduced-motion gap | JS animation w/o `matchMedia` guard; keyframe re-declares duration after the global query | add guard / honor reduced-motion | major | A |
| RPM-08 | INP risk | heavy synchronous work in `onClick`/`onScroll`; layout thrash in a loop | debounce / `requestAnimationFrame` / memoize | minor | H |
| RPM-09 | Hover-only affordance on touch | important info/action revealed only on `:hover` | provide tap/visible equivalent (no `@media (hover)` escape) | major | H |

---

## Per-dimension checklists

Run these as binary yes/no while reading each file. A "no" usually maps to the
matching rule above.

**USA**
- [ ] Every async `onClick`/`onSubmit` has a loading-gated disabled+spinner branch
- [ ] Every `onClick` is on a `button`/`a`/`input` (or has `role`+`tabIndex`+`onKeyDown`)
- [ ] Every interactive selector defines `:hover` **and** `:focus-visible`; buttons add `:active`; disable-able controls add `:disabled`
- [ ] Every `.map(` has a `length === 0` empty-state branch
- [ ] Modals close via X **and** Escape **and** overlay click
- [ ] Errors are inline + specific; success is confirmed
- [ ] Hit targets compute >= 24px incl. padding at the smallest breakpoint
- [ ] Active item in tabs/filters exposed via ARIA + visual
- [ ] CTA copy is verb+object; destructive actions are guarded

**A11Y**
- [ ] Text contrast >= 4.5:1 (3:1 large) over the **actual** background
- [ ] Borders/focus rings >= 3:1
- [ ] Every `outline:none` has a `:focus-visible` replacement
- [ ] Interactive content uses semantic elements; one `h1`; no skipped levels
- [ ] Everything is keyboard-operable (no hover/mouse-only)
- [ ] Modal traps Tab, sets initial focus, restores focus, supports Escape
- [ ] ARIA states bound to React state; no invalid/redundant ARIA
- [ ] Images have meaningful `alt` (or `alt=""`/`aria-hidden` if decorative); icon buttons have `aria-label`
- [ ] Form fields have `<label htmlFor>`, `aria-invalid`, `aria-describedby` for errors
- [ ] Dynamic changes announced via `aria-live`/`role=status|alert`
- [ ] Every animation honors `prefers-reduced-motion`

**VIS**
- [ ] No raw color/font/px where a token exists
- [ ] `.container` uses `var(--max-width)` (flag 1200px)
- [ ] Headings >= 24px use `clamp()`
- [ ] Body measure 45–75ch; spacing on 4/8pt grid; radius from a scale
- [ ] Hierarchy via oklch alpha; line-height role-appropriate
- [ ] No `!important`/`vw` hacks or MUI hashed-class overrides in new code

**RPM**
- [ ] Mobile-first; no horizontal overflow; no raw `vw` in `width/margin/left`
- [ ] Full-height heroes use `svh`/`dvh`
- [ ] `next/image` parents reserve space; LCP image has `priority`
- [ ] Animations use `transform`/`opacity` only; `will-change` is scoped
- [ ] JS animations guard `prefers-reduced-motion`

## In-repo gold-standard pass templates

Hold components to these real examples, not abstract ideals. When a component
matches the pattern, record it under the report's **Gaps & non-findings** as a pass.

| Pattern | Reference | What it does right |
|---------|-----------|--------------------|
| Forms / async states | `src/pages/contact/index.js` + `src/styles/contactNew.module.css` | labels, field errors, disabled+loading submit, success branch, retry |
| Lists / filters / modal baseline | `src/pages/projects.js` | empty-state branch, `aria-pressed` filter pills, live count, FAQ `aria-expanded`, modal `role=dialog`+`aria-modal`+Escape, reduced-motion-guarded JS kicker |
| Fluid type + tokens | `src/styles/landing.module.css` | `clamp()` scale, oklch-alpha de-emphasis, `ch` measure caps, eyebrow/title/lead hierarchy |
| Correct `--max-width` use | `src/styles/Home.module.css` | uses `var(--max-width)` (contrast with the 1200px drift) |
| Skip link + focus target | `src/Components/Layout/Layout.jsx` + `layout.module.css` | `.skipLink` to `<main id="main-content" tabIndex={-1}>` |

## Severity & confidence calibration

- **Pick severity by user/system impact, not by rule default** — a `VIS-01`
  hardcoded color in a 1px decorative border is `minor`; the same rule on primary
  body text that fails contrast escalates to the A11Y finding at `critical`.
- **Confidence** is independent: `high` only when you can see both the violation and
  that the fix is correct (token exact-match, additive ARIA). Drop to `medium`/`low`
  when a `styles.x` key can't be statically resolved to a selector, when contrast
  depends on a photographic background, or when the fix is structural. **Low
  confidence ⇒ `autofix` not `autofixable`.**
