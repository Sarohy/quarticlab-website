# Copilot Instructions — zweidevs-website

## Stack
- **Next.js 13** (Pages Router — no App Router), **React 18**, **MUI v5**
- **Node 18.x / npm 9.x** required — use `nvm use 18` if on a newer version
- `reactStrictMode: false` in `next.config.js` (intentional — avoids double-mount side-effects in observers)

## Path Alias
`@component/*` resolves to `./src/*` (defined in `jsconfig.json`).  
Always use this alias for imports: `import Foo from "@component/Components/..."`.

## Project Structure
```
src/
  pages/           # Next.js routes (Pages Router)
  Components/
    CommonComponents/  # Shared UI: Header, Footer, cards, buttons, skeletons
    MainComponents/
      HomeSectionsFinal/ # 8 landing page sections (HomeSection1–8)
    Layout/            # Layout.jsx wraps every page with Header + Footer
  Constants/         # navLinks.js, routePaths.js — single source of truth for routes
  utils/urls.js      # Service page URLs — always reference this, never hardcode paths
  firebase/          # firebaseConfig.js + firebaseRequests.js (Firestore CRUD helpers)
  styles/            # Global CSS + per-page modules
```

## Component Patterns

### Scroll-triggered animations (all landing sections)
Never use `animate.css` — it has been fully removed. Use the CSS module pattern:
```jsx
// JSX: add base class, observer adds .visible when in view
<div className={`${styles.fadeUpEl}`} ref={myRef} />

// useEffect:
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add(styles.visible);
      observer.unobserve(entry.target); // fires once only
    }
  });
}, { threshold: 0.1 });
```
```css
/* In the section's .module.css */
.fadeUpEl { opacity: 0; transform: translateY(24px); transition: opacity 0.55s ease, transform 0.55s ease; }
.visible  { opacity: 1; transform: translateY(0); }
```
Each section has its own prefixed variants (e.g. `.HS3SlideLeft`, `.HS3Visible`).

### Footer sub-components (FooterAbout / FooterServices / FooterAllServices / FooterSocial)
Use `useInView` from `react-intersection-observer` (already installed) with `triggerOnce: true`. Toggle CSS classes directly via the `inView` boolean — no `useRef`/`useEffect`/`classList.add` needed:
```jsx
const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
<div className={`${styles.footerFadeEl} ${inView ? styles.footerVisible : ""}`} ref={ref} />
```

### Dynamic imports (below-fold sections)
All sections except `HomeSection1` use `next/dynamic` with `<LoadingSkeleton />` fallback. Components with browser-only APIs (carousel, contact form) also get `ssr: false`. See `src/pages/index.js` for the established pattern.

### JSX prop ordering
ESLint enforces `react/jsx-sort-props` (case-insensitive alphabetical). Props must be sorted or the pre-commit hook will fail.

## Styling
- Co-located CSS Modules per component (`.module.css` next to `.jsx`)
- No global utility classes — all animation utilities live in the component's own module
- Prettier enforces: `printWidth: 80`, `tabWidth: 2`, `trailingComma: "all"`, `singleQuote: false`
- Multi-attribute JSX elements must have each prop on its own line when they exceed 80 chars
- Single-line `if` bodies **must** use curly braces: `if (x) { doThing(); }`

## Developer Workflow
```bash
npm run dev          # local dev server
npm run lint         # ESLint check (does NOT auto-fix)
npm run lint:fix     # ESLint with --fix
npm run format       # Prettier on all files
```
Pre-commit hook runs `format:changed` (prettier on staged files) then `lint` — both must pass before a commit lands.  
**`eslint.ignoreDuringBuilds: true`** in `next.config.js` — linting only happens via the hook, not `next build`.

## Data Flow
- **Firebase Firestore** → `src/firebase/firebaseRequests.js` (`getAllItems`, `addItem`) for projects and blog data
- **REST API** → `src/pages/api/api.js` (`getApiWithoutAuth`, `postAPIWithoutAuth`) via `axios`, base URL from `NEXT_PUBLIC_API_URL`
- Contact form in `HomeSection8` posts via `postAPIWithoutAuth`
- All service URLs come from `src/utils/urls.js` — never write `/services/...` strings inline

## Environment Variables (`.env.local`)
```
NEXT_PUBLIC_API_URL
NEXT_PUBLIC_collectionProjects
NEXT_PUBLIC_collectionBlogs   (inferred)
```
Firebase credentials are in `src/firebase/firebaseConfig.js` (not in env — do not move without updating `firebaseRequests.js`).



