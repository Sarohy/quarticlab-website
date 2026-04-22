# Zweidevs Website

Official website for **Zweidevs (Pvt) Ltd** — a custom software development company based in Lahore, Pakistan. Built with **Next.js 13**, **Material UI**, and **Firebase**.

---

## Tech Stack

| Category         | Technology                                       |
| ---------------- | ------------------------------------------------ |
| Framework        | [Next.js 13](https://nextjs.org/) (Pages Router) |
| UI Library       | [MUI v5](https://mui.com/) (Material UI)         |
| Styling          | CSS Modules + `animate.css`                      |
| Font             | Poppins (`@fontsource/poppins`)                  |
| Database         | Firebase Firestore (projects, services, reviews) |
| HTTP Client      | Axios                                            |
| Carousel         | `react-material-ui-carousel`                     |
| Animations       | `animate.css` + `IntersectionObserver`           |
| Phone Validation | `libphonenumber-js`                              |
| Analytics        | Google Analytics (via `next/script`)             |
| Linting          | ESLint + Prettier + Husky + lint-staged          |
| Deployment       | Firebase Hosting / Standalone Next.js build      |

---

## Project Structure

```
zweidevs-website/
├── public/                  ← Static assets (images, SVGs, sitemap)
│   └── assets/              ← Organised by page/section
├── src/
│   ├── pages/               ← Next.js file-based routes
│   ├── Components/
│   │   ├── Layout/          ← Persistent Header + Footer shell
│   │   ├── CommonComponents/← Reusable UI components
│   │   └── MainComponents/  ← Page-specific large sections
│   ├── Constants/           ← Route paths, nav links, button text
│   ├── firebase/            ← Firebase config + Firestore helpers
│   ├── styles/              ← Global CSS + page CSS modules
│   └── utils/               ← Helper functions + service URL map
├── next.config.js           ← Next.js config (image domains, standalone output)
├── jsconfig.json            ← Path alias: @component → ./src
├── firebase.json            ← Firebase Hosting config
└── package.json
```

---

## Pages & Routes

| URL                      | Description                                                                         |
| ------------------------ | ----------------------------------------------------------------------------------- |
| `/`                      | Home — Hero, services, projects carousel, testimonials, stats, tech slider, contact |
| `/aboutus`               | About Zweidevs — vision, story, achievements, team                                  |
| `/blog`                  | Blog listing with category filter                                                   |
| `/blog/:id`              | Individual blog post (HTML content)                                                 |
| `/projects`              | Full portfolio with type filter                                                     |
| `/services`              | All 8 service areas with tech stacks                                                |
| `/services/:serviceName` | Service detail page (dynamic)                                                       |
| `/contactus`             | Contact form (same as home contact section)                                         |

---

## Services Offered

- Web Development
- Mobile App Development (iOS & Android)
- Blockchain Development
- Artificial Intelligence & Machine Learning
- IoT Devices
- DevOps & Cloud
- UI & UX Design

---

## Getting Started

### Prerequisites

- Node.js `>= 18.x`
- npm `>= 9.x`

> ⚠️ Use [`nvm`](https://github.com/nvm-sh/nvm) to manage Node versions:
>
> ```bash
> nvm install 18
> nvm use 18
> ```

### Installation

```bash
npm install --legacy-peer-deps
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
# App
NEXT_PUBLIC_URL=https://zweidevs.com
NEXT_PUBLIC_LOGO=https://zweidevs.com/assets/logo.png
NEXT_PUBLIC_TELEPHONE=+92XXXXXXXXXX

# API
NEXT_PUBLIC_API_URL=https://api.zweidevs.com/

# Firebase
NEXT_PUBLIC_apiKey=
NEXT_PUBLIC_authDomain=
NEXT_PUBLIC_projectId=
NEXT_PUBLIC_storageBucket=
NEXT_PUBLIC_messagingSenderId=
NEXT_PUBLIC_appId=
NEXT_PUBLIC_measurementId=

# Firestore Collections
NEXT_PUBLIC_collectionProjects=projects
NEXT_PUBLIC_collectionServices=services
NEXT_PUBLIC_collectionReviews=reviews

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm run start
```

### Lint & Format

```bash
npm run lint          # Check ESLint issues
npm run lint:fix      # Auto-fix ESLint issues
npm run format        # Format all files with Prettier
npm run format:check  # Check formatting without writing
```

---

## Architecture Overview

```
_app.js  (global: Layout, fonts, JSON-LD schema)
  └── Layout  (Header + {page} + Footer)
        └── Pages
              ├── Home       → HomeSections 1–8
              ├── About      → AboutUsCards + HomeSection6
              ├── Services   → ServiceDetails (dynamic, 8 services)
              ├── Projects   → ProjectCard grid
              ├── Blog       → BlogCard grid + detail
              └── Contact    → HomeSection8 (form)
```

### Component Layers

| Layer            | Location                          | Role                                  |
| ---------------- | --------------------------------- | ------------------------------------- |
| Layout           | `src/Components/Layout`           | Shell — always present on every page  |
| CommonComponents | `src/Components/CommonComponents` | Reusable UI (buttons, cards, banners) |
| MainComponents   | `src/Components/MainComponents`   | Page-specific large sections          |

### Data Flow

- **Blog posts** — fetched from REST API at `NEXT_PUBLIC_API_URL/blogs/`
- **Contact form** — posted to `NEXT_PUBLIC_API_URL/dev/contact`
- **Projects / Services / Reviews** — stored in and read from Firebase Firestore
- **Country list** — fetched from `https://restcountries.com/v3.1/all` for the contact form phone picker

---

## Key Conventions

- **Path alias** `@component/*` maps to `./src/*` (set in `jsconfig.json`)
- **CSS Modules** for all component and page styles
- **`next/dynamic`** for lazy-loading heavy MUI components and carousels
- **`IntersectionObserver` + `animate.css`** for scroll-triggered animations
- **ESLint + Prettier + Husky** enforce code quality on every commit

---

## Folder READMEs

Each major folder has its own `README.md` with detailed documentation:

| Folder                             | README                                                                                 |
| ---------------------------------- | -------------------------------------------------------------------------------------- |
| `src/`                             | [src/README.md](src/README.md)                                                         |
| `src/pages/`                       | [src/pages/README.md](src/pages/README.md)                                             |
| `src/Components/`                  | [src/Components/README.md](src/Components/README.md)                                   |
| `src/Components/Layout/`           | [src/Components/Layout/README.md](src/Components/Layout/README.md)                     |
| `src/Components/CommonComponents/` | [src/Components/CommonComponents/README.md](src/Components/CommonComponents/README.md) |
| `src/Components/MainComponents/`   | [src/Components/MainComponents/README.md](src/Components/MainComponents/README.md)     |
| `src/Constants/`                   | [src/Constants/README.md](src/Constants/README.md)                                     |
| `src/firebase/`                    | [src/firebase/README.md](src/firebase/README.md)                                       |
| `src/styles/`                      | [src/styles/README.md](src/styles/README.md)                                           |
| `src/utils/`                       | [src/utils/README.md](src/utils/README.md)                                             |
| `public/`                          | [public/README.md](public/README.md)                                                   |

---

## Company Info

- **Company:** Zweidevs (Pvt) Ltd
- **Address:** 6-B, Block B Phase 1 Johar Town, Lahore, Punjab, Pakistan
- **Booking:** [Calendly](https://calendly.com/request-demo-zweidevs/meeting)

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
