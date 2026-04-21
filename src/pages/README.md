# Pages

This folder contains all Next.js pages following the **file-based routing** convention. Each file/folder maps directly to a URL route.

## Route Map

| File / Folder                     | URL                      | Description                                                                            |
| --------------------------------- | ------------------------ | -------------------------------------------------------------------------------------- |
| `index.js`                        | `/`                      | Home page — 8 sections (hero, services, projects, testimonials, stats, tech, contact)  |
| `aboutus.js`                      | `/aboutus`               | About Us page — company vision, story, milestones, team                                |
| `contactUs/index.js`              | `/contactus`             | Contact page — reuses the HomeSection8 contact form                                    |
| `blog/index.js`                   | `/blog`                  | Blog listing — fetches posts from API, supports category filtering                     |
| `blog/[id].jsx`                   | `/blog/:id`              | Blog detail — renders HTML content passed via router query                             |
| `projects/index.js`               | `/projects`              | Projects portfolio — filterable grid of all client projects                            |
| `services/index.js`               | `/services`              | Services overview — lists all 8 service areas with tech stacks                         |
| `services/[serviceName]/index.js` | `/services/:serviceName` | Service detail — dynamic page for each service (e.g. `/services/web-development`)      |
| `api/api.js`                      | N/A (utility)            | Axios API helpers (`getApiWithoutAuth`, `postAPIWithoutAuth`)                          |
| `_app.js`                         | N/A (Next.js entry)      | Global layout wrapper — injects `Layout`, Poppins font, global CSS, and JSON-LD schema |
| `_document.js`                    | N/A (Next.js HTML shell) | Custom HTML document — adds Google Analytics `<Script>` tags                           |

## Key Details

### `_app.js`

- Wraps every page in the `Layout` component (Header + Footer).
- Injects **Organization JSON-LD** structured data for SEO.
- Loads **Poppins** font weights (300, 400, 500, 700).
- Imports `globals.css`.

### `_document.js`

- Loads Google Analytics via `next/script` with `strategy="afterInteractive"`.
- Uses `NEXT_PUBLIC_GA_MEASUREMENT_ID` environment variable.

### `index.js` (Home)

- Renders `HomeSection1` through `HomeSection8` in sequence.
- Includes a `ServiceCarousel` showing top 3 projects.
- Smooth scrolls to Section 2 on hero CTA click.

### `blog/index.js`

- Fetches blog posts from `GET /blogs/` via the API utility.
- Supports category filter buttons: All, Marketing, Technology, Grow.
- Uses `IntersectionObserver` for scroll-triggered animations.

### `projects/index.js`

- Statically imports all project images from `public/assets/projectsPage/`.
- Filterable by type: `allProjects`, `ai`, `mobile`, `web`, `blockchain`, etc.

### `services/[serviceName]/ServiceDetails.jsx`

- A single 1800+ line dynamic component that renders different content based on `router.query.serviceName`.
- Covers: Web Dev, Mobile Dev, UI/UX, Game Dev, Blockchain, AI/ML, IoT, DevOps & Cloud.

## Environment Variables Used

| Variable                        | Used In        |
| ------------------------------- | -------------- |
| `NEXT_PUBLIC_API_URL`           | `api/api.js`   |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `_document.js` |
| `NEXT_PUBLIC_URL`               | `_app.js`      |
| `NEXT_PUBLIC_LOGO`              | `_app.js`      |
| `NEXT_PUBLIC_TELEPHONE`         | `_app.js`      |
