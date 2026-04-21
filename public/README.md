# public

Static assets served directly by Next.js at the root URL (`/`). All files here are publicly accessible without any processing.

## Structure

```
public/
├── sitemap.xml           ← SEO sitemap for all pages
├── assets/               ← All SVGs, PNGs, and image assets
│   ├── index.js          ← (dev utility) barrel export of asset paths
│   ├── AboutUs/          ← About page images (AboutUsMainImg.png, etc.)
│   ├── blogIcons/        ← Blog section icons
│   ├── footerIcons/      ← Footer decorative SVGs (copyright lines, etc.)
│   ├── headerIcons/      ← Logo SVG (logoWithText.svg)
│   ├── HomeIcons/        ← Home page assets
│   │   ├── zweidevsLogo.svg         ← Hero section logo
│   │   ├── slider-technologies.svg  ← Technologies section scrolling banner
│   │   ├── HSImg1–5.svg             ← Service card illustrations (HomeSection2)
│   │   ├── HS3Img.svg               ← Mobile showcase image (HomeSection3)
│   │   ├── clients/                 ← Client avatar photos (testimonials)
│   │   └── Project/                 ← Project showcase images (Web1, Web4, Mobo1, etc.)
│   ├── pageBannerIcons/  ← DiamondIcon.svg used in PageBanner component
│   ├── projectIcon/      ← Tech stack icons on ProjectCard (AWS, Node, React, RoR)
│   ├── projectsPage/     ← Project thumbnail images (aivst, blockcircle, neverleft, etc.)
│   ├── reviewIcons/      ← Icons used in review/testimonial components
│   ├── serviceDetailsIcons/  ← Service detail page icons, grouped by service:
│   │   ├── aiIcons/
│   │   ├── bcIcons/
│   │   ├── devOpsIcons/
│   │   ├── gdIcons/
│   │   ├── iotIcons/
│   │   ├── moboIcons/
│   │   └── uiuxIcons/
│   └── serviceIcons/     ← Service overview icons + tech stack SVGs, grouped by service:
│       ├── index.js
│       ├── aiIcons/
│       ├── BCIcons/
│       ├── businessProcessIcons/
│       ├── devOPSIcon/
│       ├── gdIcons/
│       ├── iotIcons/
│       ├── moboIcons/
│       ├── uiuxIcons/
│       └── webServicesIcons/
├── fonts/                ← Custom font files (if any)
└── HomeIcons/            ← (Legacy) duplicate of assets/HomeIcons — prefer assets/HomeIcons
```

## Asset Naming Conventions

| Folder               | Pattern                | Example                 |
| -------------------- | ---------------------- | ----------------------- |
| `serviceIcons/`      | `<service>/<name>.svg` | `aiIcons/ai1.svg`       |
| `projectsPage/`      | `<projectName>.png`    | `blockcircle.png`       |
| `HomeIcons/clients/` | `<clientName>.png`     | `nick-angelov.png`      |
| `HomeIcons/Project/` | `<type><number>.png`   | `Web1.png`, `Mobo1.png` |

## Remote Image Domains

The following external image domains are whitelisted in `next.config.js` for use with `next/image`:

| Domain                           | Used For                            |
| -------------------------------- | ----------------------------------- |
| `firebasestorage.googleapis.com` | Blog post thumbnails from Firebase  |
| `flagcdn.com`                    | Country flag images in contact form |
| `wallpaperaccess.com`            | External wallpaper assets           |
| `cdn.dribbble.com`               | External design assets              |
