# Repo antipattern catalog

Concrete, greppable smells **already present** in this codebase. Each entry =
signature (how `scan.sh` / you detect it), default severity, autofix tri-state, and
the prescribed fix. These are the highest-value findings because they are specific
and verifiable — a generic UI audit would miss them.

## Contents
- [VIS / system drift](#vis--system-drift)
- [A11Y / keyboard + focus](#a11y--keyboard--focus)
- [USA / interaction states](#usa--interaction-states)
- [RPM / responsive + motion](#rpm--responsive--motion)
- [Global / fragile overrides](#global--fragile-overrides)

## VIS / system drift

### `max-width` 1200 vs 1100 drift — VIS-02 · major · needs-human
- **Signature:** `grep -rn 'max-width: 1200px' src --include='*.module.css'`
  (present in aiServices, landing, contactNew, projectsNew, aboutNew, and the
  services modules). `--max-width` is `1100px`.
- **Fix:** prescribe one source of truth. Default: `max-width: var(--max-width);`.
  But the **value decision** (bump `--max-width` to 1200 vs pull containers to 1100)
  is a product choice → `autofix: needs-human`, surface as ONE named system finding
  referencing all offending files in `depends_on`/notes.

### Hardcoded color/font where a token exists — VIS-01 / VIS-03 · minor–major · autofixable
- **Signature:** `grep -nE '#[0-9a-fA-F]{3,6}|oklch\(' file.module.css` then
  cross-map against [design-tokens.md](design-tokens.md); `grep -n 'Poppins'`.
- **Worst offender:** `src/styles/aiServices.module.css` — legacy `#ff9700`,
  `#2b2a35`, `#596380`, `Poppins`. Re-tokenize.
- **Fix:** literal → `var(--ql-*)` / `var(--font-*)` per the lookup. Exact match =
  `autofixable`; no exact token = `needs-human`.

### Stale `--border-radius: 2px` vs 12–22px cards — VIS-07 · minor · needs-human
- **Signature:** ad-hoc `border-radius: 18px;` etc. scattered, token unused.
- **Fix:** propose a small radius scale (`--radius-sm/md/lg`) and map; decision is
  human.

## A11Y / keyboard + focus

### Hover-only dropdown — A11Y-KEYBOARD-OPERABLE · **blocker** · needs-human
- **Where:** `src/Components/CommonComponents/Header/Header.jsx` services dropdown
  opened via `onMouseEnter` on a `<div>`, no `aria-haspopup`/`aria-expanded`, no
  `Enter`/`Space`/`Escape` handling.
- **Signature:** `grep -nE 'onMouseEnter' Header.jsx` with no neighboring
  `aria-expanded`/`onKeyDown` and the trigger not a `<button>`.
- **Fix (needs-human, give explicit before/after):** make the trigger a
  `<button aria-haspopup="menu" aria-expanded={open}>`, open on click + hover, close
  on `Escape`, move focus into the menu. Rewires events → human review.

### `onClick` on non-interactive element — A11Y-SEMANTIC-HTML / USA-IU-02 · critical · needs-human
- **Where:** `src/pages/projects.js` `<article onClick={() => setActive(p)}>`
  (~line 285) and the project-card `<button onClick>` is fine, but the featured
  `<article>` and the modal overlay `<div onClick={requestClose}>` (~line 531) are not.
- **Signature:** `grep -nE '<(div|article|span|li)[^>]*onClick' *.js`.
- **Fix:** convert to `<button type="button">` (or add `role="button" tabIndex={0}
  onKeyDown` if layout forbids a button). Overlay click-to-close is acceptable **if**
  a real keyboard path (Escape) exists — verify, else flag. `needs-human` (event
  wiring + CSS).

### `outline:none` without `:focus-visible` — A11Y-FOCUS-VISIBLE · critical · autofixable
- **Signature:** `grep -nE 'outline:\s*(none|0)' file.module.css` with no
  `:focus-visible` rule for the same selector.
- **Fix (autofixable):** add
  `&:focus-visible { outline: 2px solid var(--ql-copper-dk); outline-offset: 2px; }`
  (or a ≥3:1 `box-shadow` ring). Removing the default outline is only OK with a
  visible replacement.

### Modal missing focus-trap / restore — A11Y-FOCUS-TRAP · critical · needs-human
- **Where:** `projects.js` modal sets initial focus + Escape (good) but does **not**
  trap `Tab` inside or restore focus to the trigger on close.
- **Fix:** trap Tab between first/last focusable, mark background `inert`/`aria-hidden`,
  restore focus to the opener on close. `needs-human`.

## USA / interaction states

### Missing state coverage — USA-STATE-01 · major · autofixable (additive CSS)
- **Signature:** a selector has `:hover` but no `:focus-visible`
  (repo skews ~114 `:hover` to ~3 `:focus` rules); **0** `:active` rules exist;
  only ~5 `:disabled`.
- **Fix:** add `:focus-visible` parity, `:active` press feedback for buttons, and
  `:disabled` styling for any control the JSX can disable.

### `array.map` with no empty state — USA-STATE-02 · major · needs-human
- **Signature:** `grep -nE '\.map\(' file.js` whose render has no `length === 0`
  branch. **Pass template:** `projects.js` renders `.empty` when `filtered.length === 0`.
- **Fix:** add an empty-state branch with actionable copy.

### Async action without loading feedback — USA-IU-01 · critical · needs-human
- **Signature:** `onClick`/`onSubmit` calling async/`router.push`/`fetch`/`axios`
  with no disabled+spinner+text-swap. **Gold standard:** the contact form
  (`contactNew.module.css` + `pages/contact/index.js`) does disabled + loading + success.
- **Fix:** gate the control on a `loading` state (disable + label swap + spinner CSS).

## RPM / responsive + motion

### `vw` layout hack — RPM-01 / VIS-10 · major · unsafe
- **Where:** `globals.css` phone input `margin-left: 42vw !important; width: 38vw !important`.
- **Signature:** `grep -nE '[0-9.]+vw' globals.css` in `margin`/`width`/`left`.
- **Fix:** replace with flex/grid placement or `clamp()` width. Touches global +
  third-party → `unsafe`.

### Legacy `100vh` hero — RPM-02 · major · autofixable
- **Signature:** `grep -nE 'min-height:\s*100vh' file` (e.g. `Home.module.css`).
- **Fix:** `min-height: 100svh;` (or `100dvh`). `landing.module.css` hero is the model.

### Animating layout properties — RPM-06 · major · needs-human
- **Signature:** `transition`/`animation`/`will-change` referencing
  `width|height|top|left|margin|flex-grow` (service panels use `will-change: flex-grow`).
- **Fix:** animate `transform`/`opacity`; for flex expansion prefer `flex-basis` with
  `transform` or accept a documented tradeoff. Behavioral → `needs-human`.

### `next/image` CLS risk — RPM-03 · major · autofixable
- **Signature:** `<Image fill>` whose parent has no reserved aspect-ratio/height, or
  `<img>` without width/height, or LCP image without `priority`.
- **Fix:** give the `fill` parent a fixed aspect-ratio/height; add `priority` to the
  hero/LCP image; keep `sizes`.

### Per-component reduced-motion gap — RPM-07 / A11Y-MOTION · major · autofixable
- **Note:** the **global** `@media (prefers-reduced-motion: reduce)` block in
  `globals.css` only zeros durations. Component `@keyframes` that re-declare a
  non-zero duration after the query, or **JS** animations (the `projects.js` kicker
  scramble, IntersectionObserver reveals) without a `matchMedia('(prefers-reduced-motion:
  reduce)')` guard, still need individual findings.
- **Signature:** JS `setTimeout`/`requestAnimationFrame` animation with no
  `matchMedia` reduced-motion check. (`projects.js` DOES guard the kicker — use as pass.)

## Global / fragile overrides

### `!important` overuse — VIS-10 · major · unsafe
- **Signature:** `grep -c '!important' src/styles/globals.css` (≈35, phone input).
- **Fix:** raise specificity / scope; do not autofix global third-party overrides.

### MUI hashed-Emotion class override — VIS-12 · major · unsafe
- **Signature:** `grep -nE '\.css-[a-z0-9]+-Mui' globals.css`.
- **Fix:** style via MUI `sx`/theme, not the hashed runtime class (breaks on upgrade).
  `unsafe`.
