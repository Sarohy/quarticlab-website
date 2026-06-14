# Device profiles — desktop / ipad / phone

The runner tests exactly three profiles by default (the ones the user asked for). They
are defined as **explicit** context options in `runner/run-probe.mjs` (not Playwright
`devices[...]` registry names) so they don't drift across Playwright versions. Keep this
table and the `ALL_PROFILES` map in the runner in sync.

| profile | viewport (CSS px) | DSF | isMobile | hasTouch | stands in for | why this size |
|---------|-------------------|-----|----------|----------|---------------|---------------|
| `desktop` | 1440 × 900 | 1 | false | false | laptop / desktop | common design width; clears the app's `--max-width` (1100) container with real gutters |
| `ipad` | 768 × 1024 (portrait) | 2 | true | true | tablet | classic iPad portrait; sits **on** the common 768 breakpoint boundary where tablet/desktop layouts switch — a high-bug seam |
| `phone` | 390 × 844 | 3 | true | true | modern phone | iPhone 12/13/14/15 logical size; the most common phone class; small enough to surface horizontal-overflow and touch-target bugs |

Notes:
- `isMobile:true` + `hasTouch:true` is **Chromium-only** (the runner launches Chromium),
  which is what enables touch-target realism and mobile UA/layout paths.
- A realistic mobile **User-Agent** is set for `ipad`/`phone` so UA-sniffing code paths
  (rare here, but the Header/menu and any device checks) behave as on a real device.
- `deviceScaleFactor` is set per device so `next/image` `srcset` picks the right
  candidate and screenshots match real DPR.

## Why these three (and the breakpoint seams to watch)
The app's CSS modules are mobile-first with breakpoints around **480 / 768 / 900 / 1024 /
1100px** (verify per module). The three profiles bracket those seams:
- **phone (390)** — below all breakpoints: single-column, hamburger nav, stacked cards.
- **ipad (768)** — *exactly on* the 768 seam: the most likely place a layout half-switches
  (desktop grid with phone spacing, or vice-versa). Highest-yield tablet check.
- **desktop (1440)** — above the 1100 `--max-width`: centered container + full gutters,
  hover-only affordances, multi-column grids.

## Adding / changing profiles
Pass `--profiles desktop,phone` to run a subset, or add a new key to `ALL_PROFILES` in
`run-probe.mjs` (e.g. a landscape phone `844×390`, a small laptop `1280×800`, or a wide
`1920×1080`) and document it here. `--profiles` accepts any subset of the defined keys.
The report's `viewports[]` field and the validator's allow-list (`desktop|ipad|phone`)
must be extended together if you add a permanent profile.
