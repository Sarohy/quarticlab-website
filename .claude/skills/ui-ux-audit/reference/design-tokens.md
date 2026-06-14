# Design tokens — literal → var() lookup

Source of truth for the `token_mapping` field of every VIS finding. When a styling
value **equals** a token value, the fix is mechanical: replace the literal with the
`var()`. Tokens are defined in [`src/styles/globals.css`](../../../../src/styles/globals.css) `:root`.

## Contents
- [Color tokens](#color-tokens)
- [Known color literals to re-tokenize](#known-color-literals-to-re-tokenize)
- [Font tokens](#font-tokens)
- [Layout tokens](#layout-tokens)
- [Type scale (use clamp, not fixed px)](#type-scale-use-clamp-not-fixed-px)
- [Spacing scale (4/8pt)](#spacing-scale-48pt)
- [Breakpoints](#breakpoints)
- [Motion](#motion)
- [How to use this in a finding](#how-to-use-this-in-a-finding)

## Color tokens

| Token | Value | Role |
|-------|-------|------|
| `--ql-copper` | `oklch(58% 0.12 45)` | brand accent, CTAs, active focus ring |
| `--ql-copper-dk` | `oklch(48% 0.11 42)` | accent on light, eyebrow text |
| `--ql-parchment` | `oklch(88% 0.03 70)` | warm neutral surface |
| `--ql-linen` | `oklch(95% 0.018 75)` | light text on dark, light surface |
| `--ql-oxford` | `oklch(20% 0.05 255)` | primary text, dark UI |
| `--ql-midnight` | `oklch(14% 0.04 255)` | darkest surface |
| `--ql-canvas` | `#eee8dc` | page background (the one legacy hex) |

Semantic derivations actually used in the codebase (prefer these exact alphas for hierarchy):

| Intent | Value | Notes |
|--------|-------|-------|
| text-secondary | `oklch(20% 0.05 255 / 0.64)` | dimmed body / lead |
| text-tertiary | `oklch(20% 0.05 255 / 0.38)` | captions, meta |
| hairline border | `oklch(20% 0.05 255 / 0.14)` | 1px dividers |

## Known color literals to re-tokenize

Flag these literals (rule **VIS-01**) and map to the token:

| Literal found in repo | → token | Where seen |
|-----------------------|---------|-----------|
| `oklch(48% 0.11 42)` (any alpha) | `var(--ql-copper-dk)` | landing/projectsNew gradients |
| `oklch(58% 0.12 45)` (any alpha) | `var(--ql-copper)` | icon gradients, focus rings |
| `oklch(20% 0.05 255)` | `var(--ql-oxford)` | text/borders |
| `oklch(14% 0.04 255)` | `var(--ql-midnight)` | overlays, dark sections |
| `#eee8dc` / `#EEE8DC` | `var(--ql-canvas)` | backgrounds |
| `#ffffff` / `#fff` (as surface) | keep or `var(--ql-linen)` if used as light surface — **judge, confidence:medium** | misc |
| `#ff9700` (orange) | `var(--ql-copper)` (closest brand) — **needs-human**, palette decision | `aiServices.module.css` legacy |
| `#2b2a35`, `#596380` | no exact token — **needs-human**, propose a token | `aiServices.module.css` legacy |
| `Poppins` / `"Poppins"` | `var(--font-body)` | `aiServices.module.css` legacy |

> Alpha caveat: `oklch(... / 0.5)` over `#eee8dc` is **not** the same rendered color
> as the opaque token. Map the **hue/lightness/chroma** to the token and keep the
> alpha: `oklch(48% 0.11 42 / .5)` → `color-mix(in oklch, var(--ql-copper-dk), transparent 50%)`
> **or** keep the literal and mark `needs-human` if no `color-mix` is used elsewhere.

## Font tokens

| Token | Stack | Use |
|-------|-------|-----|
| `--font-display` | `"Instrument Serif", serif` | h1/h2 display, `<em>` accents |
| `--font-body` | `"Space Grotesk", system-ui, sans-serif` | all body + UI |
| `--font-mono` | `"IBM Plex Mono", monospace` | eyebrows, kickers, code, stats labels |

Fonts are loaded in [`src/pages/_app.js`](../../../../src/pages/_app.js) via
`next/font/google` with `display: swap` and injected as CSS variables. A
`font-family:` literal (e.g. `Poppins`, `Arial`) that is not one of the three
`var(--font-*)` is a **VIS-03** finding.

Dead `@font-face` loads in `globals.css` (`NeueMachina`, `pp-telegraf`) that are
never referenced are **VIS-11 / info** (remove to save a network request).

## Layout tokens

| Token | Value | Note |
|-------|-------|------|
| `--max-width` | `1100px` | **but 7 modules hardcode `1200px`** — the **VIS-02** drift |
| `--border-radius` | `2px` | stale; cards actually use 12–22px. Reconcile (propose a scale) |

## Type scale (use clamp, not fixed px)

Headings ≥ 24px should use `clamp()` on this de-facto scale (from
`landing.module.css`, the craft reference):

| Role | clamp() |
|------|---------|
| display xl | `clamp(46px, 8vw, 112px)` |
| heading lg | `clamp(36px, 5vw, 64px)` |
| heading md | `clamp(28px, 4vw, 48px)` |
| body lg | `clamp(15.5px, 1.5vw, 17.5px)` |
| body | `15px` |
| small | `14px` |
| caption / eyebrow | `11px–11.5px` |

A heading with a **fixed px** `font-size` (e.g. `font-size: 48px`) is **VIS-04**;
fix = nearest clamp() row.

## Spacing scale (4/8pt)

Allowed step values: `4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96`.
One-off values like `13px`, `15px`, `9px`, `7px`, `5px` used as layout spacing are
**VIS-06 / minor** (snap to nearest grid step). `clamp(20px, 4vw, 52px)` for
container padding is the repo convention and is fine.

## Breakpoints

Mobile-first reasoning, but the repo authors `max-width` queries. Canonical set:

| Name | Query | Use |
|------|-------|-----|
| mobile | `max-width: 540px` | single column, stacked |
| (small) | `max-width: 680px` / `600px` | grid 1-col |
| tablet / major | `max-width: 900px` | nav collapse, 2→1 col |
| desktop | `max-width: 1040px` | container reflow |

A new component should reuse these, not invent a 7th breakpoint (**RPM-01 / minor**
if it does without reason).

## Motion

| Token-ish | Value |
|-----------|-------|
| standard easing | `cubic-bezier(0.22, 1, 0.36, 1)` |
| interaction duration | `0.2s–0.4s` |
| reveal duration | `0.5s–0.6s` |
| reveal pattern | `.reveal { opacity:0; transform:translateY(24px) }` → `.visible { opacity:1; transform:none }` |

Animate **transform / opacity only**. Animating `width/height/top/left/flex-grow`
(and `will-change: flex-grow`) is **RPM-06**.

## How to use this in a finding

For a VIS-01/02/03 finding, set:

```json
"fix": {
  "before": "  background: oklch(48% 0.11 42 / .5);",
  "after": "  background: color-mix(in oklch, var(--ql-copper-dk), transparent 50%);",
  "token_mapping": { "oklch(48% 0.11 42)": "var(--ql-copper-dk)" }
}
```

If the literal has **no** exact token, do not invent one in the fix — set
`autofix: "needs-human"`, `confidence: "medium"`, and propose adding a token in
`root_cause`.
