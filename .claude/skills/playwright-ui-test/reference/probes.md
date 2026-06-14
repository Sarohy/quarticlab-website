# Runtime probe taxonomy (`RT-*`) — what each signal means and how to judge it

The runner emits **raw signals** per device profile. This file is the closed taxonomy
the agent maps each confirmed signal to (`probe_id`), plus how the signal is detected,
the false-positive traps for *this* repo, and default severity guidance. A signal is
**not** a finding until you confirm it (read the source / look at the screenshot).

Categories: `CONSOLE PAGEERR NETWORK HYDRATION A11Y OVERFLOW OVERLAP TOUCH IMAGE CWV STRUCTURE`.

---

## CONSOLE — `RT-CONSOLE-ERROR`, `RT-CONSOLE-WARN`
- **Source signal:** `profiles[].console.errors[]` / `.warnings[]` (text + location).
- **Detected by:** `page.on('console', msg => msg.type() in {error,warning})`.
- **Judge:** A real `console.error` in the app's own code is at least **major**; an
  uncaught React invariant or PropType failure is **critical**. Distinguish app errors
  from third-party noise by `location` (a `localhost:3000/...` or `_next/...` source is
  first-party; `googletagmanager`/`clutch`/`google-analytics` are not).
- **FP traps:** GTM/GA/Clutch widget warnings; favicon noise; React DevTools tips;
  `Download the React DevTools` info line (not even captured — info isn't collected).
- **Map MUI warnings** (e.g. "MUI: The value provided to Autocomplete is invalid") to
  `RT-CONSOLE-WARN`, severity `major`, `autofix: needs-human`.

## PAGEERR — `RT-PAGEERR`
- **Source signal:** `profiles[].pageErrors[]` (message + 6-line stack).
- **Detected by:** `page.on('pageerror', ...)` — an **uncaught exception** on the page.
- **Judge:** Almost always **critical or blocker** — something threw during render or
  an event handler. Confirm by reading the stack's top frame and the source. Map to a
  source file in `suggested_fix.target_file` only when the stack points unambiguously.

## NETWORK — `RT-NET-FAILED`, `RT-NET-4XX`, `RT-NET-5XX`
- **Source signal:** `failedRequests[]` (`requestfailed`) and `badResponses[]`
  (HTTP `status >= 400`). Each tagged `firstParty`.
- **Judge:** First-party `5xx` or a failed first-party document/script/css/fetch is
  **critical**. First-party `404` on an asset the page needs (image/font/json) is
  **major**. **Ignore** third-party (`firstParty:false`) analytics/widget failures
  unless they break rendering — record them under Gaps, not as findings.
- **FP traps:** Firebase long-poll requests that get aborted on context close show as
  `requestfailed` with `net::ERR_ABORTED` — **not** a real failure. analytics beacons
  blocked by the browser. A `404` for `/favicon.ico` if none is configured.

## HYDRATION — `RT-HYDRATION`
- **Source signal:** `profiles[].hydration[]` (console/pageerror text matching
  `/hydrat|did not match|server-rendered HTML|text content does not match/i`).
- **Judge:** Next.js Pages-Router hydration mismatch — **critical**. Common causes in
  this repo: `typeof window !== 'undefined'` branches in render, `Date`/locale/random
  used during render, `libphonenumber`/country data differing SSR vs client, or markup
  that differs by viewport computed on the client. Confirm the offending component from
  the message and read it.
- **Fix posture:** `needs-human` — the fix is moving the client-only branch into
  `useEffect`/`useState` or guarding with a mounted flag, not a literal swap.

## A11Y — `RT-A11Y-<axe-rule-id>`
- **Source signal:** `profiles[].axe.violations[]` — Deque axe-core run with tags
  `wcag2a wcag2aa wcag21a wcag21aa wcag22aa`. Each has `id`, `impact`, `help`,
  `helpUrl`, `nodes[].target` (the CSS selector) and `nodes[].failureSummary`.
- **probe_id:** `RT-A11Y-` + axe rule id, e.g. `RT-A11Y-color-contrast`,
  `RT-A11Y-image-alt`, `RT-A11Y-target-size`, `RT-A11Y-link-name`,
  `RT-A11Y-aria-required-attr`, `RT-A11Y-button-name`, `RT-A11Y-document-title`,
  `RT-A11Y-html-has-lang`, `RT-A11Y-landmark-one-main`, `RT-A11Y-heading-order`.
- **Judge by axe `impact`:** `critical`/`serious` → finding severity `critical` or
  `major`; `moderate` → `major`/`minor`; `minor` → `minor`. `color-contrast` is
  authoritative here (axe resolves the *rendered* color over the real background — this
  is the runtime answer to the static audit's oklch-over-bg guesswork).
- **Cross-link:** axe violations frequently confirm a static `ui-ux-audit` finding.
  Note the corresponding `A11Y-*` rule in `root_cause` when one exists.
- **FP traps:** `region`/`landmark-*` may fire on the MUI portal/snackbar roots;
  `color-contrast` can fire on text over a background image axe can't sample (it marks
  these `needs-review`, which is **not** returned as a violation — so a returned
  contrast violation is real). The cookie-consent banner, if open, adds its own nodes.

## OVERFLOW — `RT-OVERFLOW-X`
- **Source signal:** `profiles[].overflow[]` — elements where `rect.right > innerWidth`
  (push past the right edge) or `scrollWidth > clientWidth` (internal x-scroll, unless
  `overflow-x:auto/scroll`). `structure.pageHorizontalScroll` is the page-level headline.
- **Judge:** Page-level horizontal scroll on **phone** is **major** (the classic
  responsive bug). Pick the **outermost / largest `pastViewportPx`** offender as the
  root cause — children inherit the parent's overflow. Confirm in the screenshot.
- **Common repo causes:** a fixed `width`/`min-width` in px, a `100vw` element inside a
  padded container, an unwrapped long string/URL, a wide `<img>`/`<table>`/marquee
  (`react-fast-marquee`), negative margins, or a grid that doesn't collapse at the
  breakpoint. Map the fix to the `*.module.css` selector (hashed class prefix → module).
- **FP traps:** intentionally scrollable carousels/marquees (`overflow-x` set) are
  filtered out already; off-screen drawer/menu content positioned at `left:100%`.

## OVERLAP — `RT-OVERLAP`
- **Source signal:** `profiles[].overlaps[]` — pairs of **interactive controls** whose
  boxes intersect by >25% of the smaller box (excludes ancestor/descendant pairs).
- **Judge:** Real overlap of two tappable controls is **major** (mis-taps, especially on
  phone). **Low confidence by default** — confirm in the screenshot before reporting;
  many are stacking-context artifacts (a control under a transparent overlay, a sticky
  header over content during the snapshot). Drop if not visually confirmed.

## TOUCH — `RT-TOUCH-TARGET`
- **Source signal:** `profiles[].touchTargets[]` — interactive elements with
  `min(w,h) < 44`, flagged `belowAA` when `< 24` and `inlineLinkException` for links in
  flowing text. **Only meaningful on `ipad`/`phone` profiles** (touch).
- **Judge:** `belowAA:true` (under 24×24) on a touch profile → **major** (fails WCAG
  2.5.8 AA). 24–44px → **minor** (below the 44px best-practice / iOS HIG). Skip
  `inlineLinkException:true` (WCAG inline exception). Confirm the element is genuinely a
  tap target (icon button, nav link, social icon, close "×", pagination dot).
- **Fix posture:** usually `autofixable`/`needs-human` — add padding / min-width/height
  to the control's `*.module.css` selector; don't shrink the icon.

## IMAGE — `RT-IMG-BROKEN`
- **Source signal:** `profiles[].brokenImages[]` — `img.complete && naturalWidth===0`.
- **Judge:** A broken first-party image is **major** (visible gap/alt text). Confirm the
  `src` 404s (cross-check `badResponses[]`) and find the source `<Image>`/`<img>`.
  next/image remote hosts must be in `next.config.js images.remotePatterns` **and** the
  CSP `img-src` allowlist — a broken remote image is often a missing allowlist entry.

## CWV — `RT-CWV-LCP`, `RT-CWV-CLS`, `RT-CWV-INP`
- **Source signal:** `profiles[].webVitals` — `{lcp, cls, inp, fcp, ttfb}` in ms (cls
  unitless), via `PerformanceObserver`.
- **Thresholds:** LCP good < 2500ms / poor > 4000ms · CLS good < 0.1 / poor > 0.25 ·
  INP good < 200ms / poor > 500ms.
- **Judge:** **`info` by default, `minor` at most.** This is a single cold lab run, not
  field data — CLS especially is flaky in-lab (scrollbar reflow, late fonts/images).
  Report only egregious values (LCP > 4s, CLS > 0.25) and always mark
  `confidence: low`, `autofix: needs-human`, and note "lab estimate, confirm in field /
  Lighthouse" in `root_cause`. Never gate on CWV.

## STRUCTURE — `RT-STRUCT-*`
- **Source signal:** `profiles[].structure` — `title`, `lang`, `h1Count`, `hasMain`,
  `hasViewportMeta`, `pageHorizontalScroll`.
- Most of these are also covered by axe (`document-title`, `html-has-lang`,
  `landmark-one-main`). Only raise a `RT-STRUCT-*` finding if axe **didn't** and it's
  real: e.g. `h1Count !== 1` (`RT-STRUCT-H1`, minor/major), missing `<main>` when axe's
  `landmark-one-main` is off, missing viewport meta (`RT-STRUCT-VIEWPORT`, major — but
  this app sets it globally, so a miss is surprising — double-check the route).

---

## Severity ladder (shared with ui-ux-audit so one fixer reads both reports)
- **blocker** — uncaught exception that white-screens the route; keyboard/page totally
  broken for a class of users; report unparseable. Fixer must gate.
- **critical** — pageerror, first-party 5xx/failed critical asset, hydration mismatch,
  axe critical/serious (missing name, contrast < AA on body text).
- **major** — phone horizontal scroll, broken first-party image, sub-24px touch target,
  confirmed control overlap, first-party 404 asset, axe moderate.
- **minor** — 24–44px touch target, axe minor, off-ideal CWV that isn't egregious.
- **info** — lab CWV estimates, third-party noise worth recording, advisory notes.

## `autofix` tri-state (same meaning as ui-ux-audit)
- **autofixable** — deterministic, localized: add `min-height/min-width`/padding to a
  module selector for a touch target; add `alt`/`aria-label`; add `max-width:100%` /
  `overflow-wrap:anywhere` to stop one overflow; add a `width` token swap.
- **needs-human** — hydration refactors, pageerror root cause, contrast that needs a
  design-token decision, CWV, MUI prop fixes, anything where the offending source can't
  be pinned to a single unique anchor.
- **unsafe** — `globals.css` `!important`/`vw` hacks, MUI hashed-Emotion overrides,
  next.config CSP/remotePatterns edits (affect the whole app — human review).

## Per-route trigger checklist (exercise dynamic states the cold load misses)
The runner auto-scrolls (fires lazy images + `react-intersection-observer` reveals).
Beyond that, when a route has interactive surfaces, note in `repro`/Gaps that these were
**not** auto-exercised and may hide more findings: open the mobile **Header** menu, open
the **CookieConsent** banner, open the **projects** filter/FAQ/modal, submit the
**contact** form (empty → error states), open a **CountrySelect**. A deeper pass can
script these; the default probe is load + scroll only.
