# Quartic Lab — Marketing Website

Source for the public marketing site at **www.quarticlab.com** (formerly Zweidevs). It is a server-rendered **Next.js 13 application built on the Pages Router** (no App Router, no React Server Components), with Firebase Firestore as the dynamic content store.

> **Important — Pages Router**
> This project deliberately uses the **Next.js Pages Router** (`src/pages/*`). All routing, data fetching (`getServerSideProps`, `getStaticProps`, `getInitialProps`), and document/app shells follow Pages Router conventions. Do **not** introduce the `app/` directory, `"use client"` directives, or React Server Components — they will not be wired into the build.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Routes (Pages Router)](#routes-pages-router)
4. [Services Offered](#services-offered)
5. [Getting Started](#getting-started)
6. [Environment Variables](#environment-variables)
7. [Scripts](#scripts)
8. [Architecture](#architecture)
9. [Data Layer](#data-layer)
10. [SEO, Security & Privacy](#seo-security--privacy)
11. [Coding Conventions](#coding-conventions)
12. [Deployment](#deployment)
13. [Folder READMEs](#folder-readmes)
14. [Company Info](#company-info)

---

## Tech Stack

| Category          | Technology                                                              |
| ----------------- | ----------------------------------------------------------------------- |
| Framework         | [Next.js 13.4](https://nextjs.org/) — **Pages Router**                  |
| Language          | JavaScript (ES2022) + TypeScript-ready (`typescript` installed)         |
| UI Library        | [MUI v5](https://mui.com/) (`@mui/material`, `@mui/icons-material`, `@mui/lab`) |
| Styling           | CSS Modules (per-component / per-page) + global `globals.css`           |
| Fonts             | `next/font/google` — Space Grotesk, Instrument Serif, IBM Plex Mono     |
| Database          | Firebase Firestore (modular SDK v9)                                     |
| HTTP Client       | Axios                                                                   |
| Carousel          | `react-material-ui-carousel`, `react-fast-marquee`                      |
| Animations        | `IntersectionObserver` + CSS modules (no `animate.css`)                 |
| Phone Validation  | `libphonenumber-js`                                                     |
| Image Optim.      | `next/image` + `sharp`                                                  |
| Analytics         | Google Analytics 4 (consent-gated via `next/script`)                    |
| Cookie Consent    | First-party banner (`localStorage` — `ql_cookie_consent_v1`)            |
| Linting/Format    | ESLint + Prettier + Husky + lint-staged                                 |
| Build Output      | `output: "standalone"` (Node-server bundle)                             |
| Deployment        | Firebase Hosting / any Node host that runs `next start`                 |

**Engines**: Node `>= 18.x`, npm `>= 9.x`.

---

## Project Structure

```
zweidevs-website/
├── public/                       ← Static assets, favicons, manifest
│   ├── assets/                   ← Images, SVGs (organised by section)
│   ├── HomeIcons/                ← Home-page icon set
│   ├── fonts/                    ← Self-hosted font fallbacks
│   ├── favicon.{ico,svg,png}     ← Multi-size favicon set
│   └── site.webmanifest          ← PWA manifest
│
├── src/
│   ├── pages/                    ← **Pages Router routes**
│   │   ├── _app.js               ← App shell, fonts, JSON-LD, ServicesContext
│   │   ├── _document.js          ← <Html>, favicons, theme-color
│   │   ├── index.js              ← Home (/)
│   │   ├── about.js              ← About (/about)
│   │   ├── projects.js           ← Portfolio (/projects)
│   │   ├── ai-services.js        ← AI services landing
│   │   ├── privacy.js / terms.js / cookies.js  ← Legal pages
│   │   ├── sitemap.xml.js        ← SSR-generated sitemap
│   │   ├── robots.txt.js         ← SSR-generated robots.txt
│   │   ├── services/
│   │   │   ├── index.js          ← /services
│   │   │   └── [slug].jsx        ← /services/:slug (dynamic)
│   │   ├── blog/
│   │   │   ├── index.js          ← /blog
│   │   │   └── [slug].jsx        ← /blog/:slug (dynamic)
│   │   ├── contact/index.js      ← /contact
│   │   └── api/api.js            ← Axios wrapper (NOT a Next API route)
│   │
│   ├── Components/
│   │   ├── Layout/               ← Persistent shell (Header + Footer + consent)
│   │   ├── CommonComponents/     ← Header, Footer, CookieConsent, CountrySelect,
│   │   │                          QuarticMark, ServiceIcons, ServiceDoodles
│   │   └── MainComponents/       ← Reserved for page-specific large sections
│   │
│   ├── Constants/                ← routePaths.js, navLinks.js, buttonTexts.js
│   ├── firebase/                 ← firebaseConfig.js + firebaseRequests.js
│   ├── styles/                   ← globals.css + per-page CSS modules
│   ├── utils/                    ← siteUrl, urls, consent, countries, helpers,
│   │                              ServicesContext
│   └── types/                    ← Reserved for shared type defs
│
├── scripts/
│   ├── generateFavicons.js       ← Regenerate favicon set from source SVG
│   └── seedServiceDetails.js     ← Seed Firestore `service_details` collection
│
├── .husky/pre-commit             ← Runs lint-staged
├── next.config.js                ← Standalone output, image hosts, CSP + security headers
├── jsconfig.json                 ← Path alias: @component/* → ./src/*
├── firebase.json / .firebaserc   ← Firebase Hosting config
└── package.json
```

---

## Routes (Pages Router)

Every route below is a file in `src/pages/`. Dynamic segments use `[slug].jsx`.

| URL                        | File                              | Notes                                                   |
| -------------------------- | --------------------------------- | ------------------------------------------------------- |
| `/`                        | `pages/index.js`                  | Hero, services, projects, testimonials, tech stack, CTA |
| `/about`                   | `pages/about.js`                  | Mission, values, process, engagement models, stats      |
| `/projects`                | `pages/projects.js`               | Portfolio with discipline + industry filters            |
| `/services`                | `pages/services/index.js`         | Index of all 8 service areas                            |
| `/services/[slug]`         | `pages/services/[slug].jsx`       | Per-service detail (reads from Firestore)               |
| `/blog`                    | `pages/blog/index.js`             | Listing with category filter + newsletter sign-up       |
| `/blog/[slug]`             | `pages/blog/[slug].jsx`           | Individual blog post                                    |
| `/contact`                 | `pages/contact/index.js`          | Contact form (writes to Firestore)                      |
| `/ai-services`             | `pages/ai-services.js`            | AI-focused landing page                                 |
| `/privacy`                 | `pages/privacy.js`                | Privacy policy                                          |
| `/terms`                   | `pages/terms.js`                  | Terms of service                                        |
| `/cookies`                 | `pages/cookies.js`                | Cookie policy                                           |
| `/sitemap.xml`             | `pages/sitemap.xml.js`            | SSR-generated, host-aware                               |
| `/robots.txt`              | `pages/robots.txt.js`             | SSR-generated, AI-crawler allowlist                     |

> **About `pages/api/api.js`**: this file is _not_ a Next.js API route — it is an Axios client wrapped in `getApiWithoutAuth` / `postAPIWithoutAuth`. The `pages/api/` folder is otherwise unused; Firestore is the primary backend.

---

## Services Offered

The 8 service areas (sourced from `src/Constants/navLinks.js` → `SERVICE_DROPDOWN` and `src/utils/urls.js`):

**Development**
- Web Development — `/services/web-development`
- Mobile App Development — `/services/mobile-development`
- Blockchain Development — `/services/blockchain-development`
- IoT Solutions — `/services/iot-development`

**AI & Design**
- GenAI & Automation — `/services/genai-automation`
- AI / ML Development — `/services/ai-ml-development`
- UI/UX Design — `/services/ui-ux-design`
- DevOps & Cloud — `/services/devops`

---

## Getting Started

### Prerequisites

- Node.js `>= 18.x`
- npm `>= 9.x`

```bash
nvm install 18
nvm use 18
```

### Installation

```bash
npm install --legacy-peer-deps
```

### Development

```bash
npm run dev
```

The dev server runs at [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm run start
```

### Lint & format

```bash
npm run lint           # ESLint check
npm run lint:fix       # ESLint with --fix
npm run format         # Prettier (write)
npm run format:check   # Prettier (check only)
npm run format:changed # Prettier on staged + changed files
```

A Husky `pre-commit` hook runs `lint-staged`, which runs `eslint --fix` on staged JS/TS/JSX/TSX files.

---

## Environment Variables

Create a `.env.local` in the project root:

```env
# Site
NEXT_PUBLIC_URL=https://www.quarticlab.com
NEXT_PUBLIC_LOGO=https://www.quarticlab.com/mark-dark.svg
NEXT_PUBLIC_TELEPHONE=+923094446225

# REST API (used only by src/pages/api/api.js axios wrapper)
NEXT_PUBLIC_API_URL=https://api.quarticlab.com/

# Firebase — currently inlined in src/firebase/firebaseConfig.js.
# To move to env, uncomment the env block at the top of that file
# and supply these values:
NEXT_PUBLIC_apiKey=
NEXT_PUBLIC_authDomain=
NEXT_PUBLIC_projectId=
NEXT_PUBLIC_storageBucket=
NEXT_PUBLIC_messagingSenderId=
NEXT_PUBLIC_appId=
NEXT_PUBLIC_measurementId=

# Google Analytics (loaded only after consent)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

`SITE_URL` falls back to `https://www.quarticlab.com` when `NEXT_PUBLIC_URL` is unset (see `src/utils/siteUrl.js`).

---

## Scripts

Located in `scripts/` — run with `node`:

| Script                         | Purpose                                                        |
| ------------------------------ | -------------------------------------------------------------- |
| `scripts/generateFavicons.js`  | Generate the favicon/PWA icon set from a source SVG            |
| `scripts/seedServiceDetails.js`| Seed the Firestore `service_details` collection from local data |

---

## Architecture

```
_app.js
  ├── next/font (Space Grotesk, Instrument Serif, IBM Plex Mono)
  ├── ServicesContext.Provider           ← injected from getInitialProps
  ├── <Head> Organization JSON-LD + BreadcrumbList JSON-LD
  └── Layout
        ├── Header (mega-dropdown for Services)
        ├── <main id="main-content">{children}</main>
        ├── Footer (About / Services / All Services / Social)
        ├── CookieConsent (dynamic, ssr:false)
        └── ConsentedScripts (dynamic, ssr:false — GA loads here on consent)
```

### Component layers

| Layer             | Path                                | Role                                                        |
| ----------------- | ----------------------------------- | ----------------------------------------------------------- |
| Layout            | `src/Components/Layout`             | Persistent shell — Header, Footer, consent UI on every page |
| CommonComponents  | `src/Components/CommonComponents`   | Reusable atoms: Header, Footer, CountrySelect, QuarticMark, ServiceIcons, CookieConsent |
| MainComponents    | `src/Components/MainComponents`     | Reserved for page-specific large sections                   |

### Layout features

- Skip-link (`#main-content`) for keyboard / screen-reader navigation
- Focus-visible styles in `globals.css`
- All below-the-fold sections use `next/dynamic` with skeleton fallbacks
- Animations are scroll-triggered via `IntersectionObserver` toggling a `.visible` class on a base CSS-Module class

---

## Data Layer

**Firestore (`src/firebase/firebaseRequests.js`)** is the primary backend. Collections:

| Collection              | Helper                                                |
| ----------------------- | ----------------------------------------------------- |
| `projects`              | `getAllProjects`, `getProjectsByIds(ids[])`, `addProject` |
| `services`              | `getAllServices`, `addService`                        |
| `service_details`       | `getAllServiceDetails`, `getServiceBySlug`, `addServiceDetail` |
| `reviews`               | `getAllReviews`, `addReview`                          |
| `blogs`                 | `getAllBlogs`, `getBlogBySlug`                        |
| `contact_submissions`   | `submitContactForm`                                   |
| `newsletter_subscribers`| `subscribeEmail`                                      |

`getProjectsByIds` chunks the `documentId() in […]` queries to respect Firestore's 30-item `in` limit.

**Other sources**

- **REST** — `src/pages/api/api.js` Axios wrapper for `NEXT_PUBLIC_API_URL` (currently unused by main pages but kept available)
- **Country list** — bundled at `src/utils/countries.js` (no runtime fetch)
- **Service nav** — `_app.js#getInitialProps` fetches `getAllServices()` server-side and passes them through `ServicesContext` so every page can read the navigation list without re-fetching

---

## SEO, Security & Privacy

### SEO

- **Per-route `<Head>` metadata** — every page sets its own `<title>`, description, canonical, and Open Graph tags
- **Organization + BreadcrumbList JSON-LD** injected globally from `_app.js`
- **Sitemap** — `/sitemap.xml` is SSR-generated per request so `<loc>` always matches the serving host
- **Robots** — `/robots.txt` explicitly allow-lists major AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, …) for AEO

### Security headers (set in `next.config.js`)

- `Content-Security-Policy` — restrictive: self + GA/GTM + Clutch widget + Firebase/Google APIs + flagcdn + a few image CDNs
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Frame-Options: DENY`, `frame-ancestors 'none'`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

### Cookie consent

- First-party banner stored at `ql_cookie_consent_v1` in `localStorage`
- Categories: `analytics`, `functional` (independently toggleable)
- `ConsentedScripts` mounts Google Analytics **only** after the visitor grants analytics consent
- Hooks: `useConsent()`, `hasAnalyticsConsent`, `hasFunctionalConsent` from `src/utils/consent.js`
- `openPreferences()` re-opens the banner from anywhere (used by the footer link)

---

## Coding Conventions

- **Path alias** — always import via `@component/*` (resolves to `./src/*`); never write deep relative paths like `../../../Components/...`
- **CSS Modules** — every component / page has a co-located `*.module.css`; no global utility classes
- **Animations** — `animate.css` has been removed; use `IntersectionObserver` + a `.visible` toggle on a base class with `opacity` / `transform` transitions
- **`react/jsx-sort-props`** — JSX props must be alphabetised (case-insensitive)
- **Prettier** — `printWidth: 80`, `tabWidth: 2`, `trailingComma: "all"`, `singleQuote: false`
- **ESLint** — `no-console`, `no-unused-vars`, `eslint-config-next`, `eslint-config-prettier`
- **`reactStrictMode: false`** — intentional, to avoid double-mount side-effects in `IntersectionObserver` setup
- **`eslint.ignoreDuringBuilds: true`** — linting runs in the pre-commit hook, not in `next build`
- **Service URLs** — always read from `src/utils/urls.js` or `src/Constants/navLinks.js`; never hardcode `/services/...` strings

---

## Deployment

The project builds to a **Node standalone bundle** (`next.config.js → output: "standalone"`):

```bash
npm run build
node .next/standalone/server.js
```

`firebase.json` is configured for legacy static hosting (`public: "out"`); the active deployment target is the standalone Node server. Adapt to your host (Firebase Hosting + Cloud Run, Vercel, Render, etc.).

---

## Folder READMEs

Each major folder has a more detailed `README.md`:

| Folder                                | README                                                                                 |
| ------------------------------------- | -------------------------------------------------------------------------------------- |
| `src/`                                | [src/README.md](src/README.md)                                                         |
| `src/pages/`                          | [src/pages/README.md](src/pages/README.md)                                             |
| `src/Components/`                     | [src/Components/README.md](src/Components/README.md)                                   |
| `src/Components/Layout/`              | [src/Components/Layout/README.md](src/Components/Layout/README.md)                     |
| `src/Components/CommonComponents/`    | [src/Components/CommonComponents/README.md](src/Components/CommonComponents/README.md) |
| `src/Components/MainComponents/`      | [src/Components/MainComponents/README.md](src/Components/MainComponents/README.md)     |
| `src/Constants/`                      | [src/Constants/README.md](src/Constants/README.md)                                     |
| `src/firebase/`                       | [src/firebase/README.md](src/firebase/README.md)                                       |
| `src/styles/`                         | [src/styles/README.md](src/styles/README.md)                                           |
| `src/utils/`                          | [src/utils/README.md](src/utils/README.md)                                             |
| `public/`                             | [public/README.md](public/README.md)                                                   |

For agent-specific guidance, see [.github/copilot-instructions.md](.github/copilot-instructions.md).

---

## Company Info

- **Company:** Quartic Lab (formerly Zweidevs (Pvt) Ltd)
- **Address:** 6-B, Block B Phase 1, Johar Town, Lahore, Punjab 54000, Pakistan
- **Email:** hello@quarticlab.com
- **Booking:** [Calendly — Start a project](https://calendly.com/quarticlab/meeting)
- **LinkedIn:** [linkedin.com/company/quarticlab](https://www.linkedin.com/company/quarticlab)
- **Twitter / X:** [@quarticlab](https://twitter.com/quarticlab)
