# CommonComponents

Shared UI components used by every page via the `Layout` wrapper.

## Component Catalogue

### `Header`
**Files:** `Header.jsx`, `header.module.css`

Responsive navigation bar.
- Desktop: Logo on the left, nav links + "Contact Us" button on the right.
- Mobile (< 900px): Hamburger icon opens a drawer with nav links.
- Active route is highlighted using `useRouter`.
- Nav links sourced from `src/Constants/navLinks.js`.

---

### `Footer`
**Files:** `Footer.jsx`, `FooterAbout.jsx`, `FooterAllServices.jsx`, `FooterServices.jsx`, `FooterSocial.jsx`, `footer.module.css`

Multi-column footer split into four lazy-loaded sub-components:

| Sub-component       | Content                                    |
|---------------------|--------------------------------------------|
| `FooterAbout`       | Company logo and short description         |
| `FooterServices`    | Quick nav links to main service pages      |
| `FooterAllServices` | Extended list of all service pages         |
| `FooterSocial`      | Social media icon links (FB, IG, LI, YT)   |

All sub-components use `useInView` from `react-intersection-observer` with
`triggerOnce: true` for scroll-in animations.

Bottom bar shows dynamic copyright year: `© {year} Zweidevs. All Rights Reserved`.

---

## Barrel Export (`index.js`)

```js
import { Footer, Header } from "@component/Components/CommonComponents";
```

## Animation Pattern

Scroll animations use CSS Modules + `IntersectionObserver` (no `animate.css`):

```css
/* component.module.css */
.fadeUpEl { opacity: 0; transform: translateY(24px); transition: opacity 0.55s ease, transform 0.55s ease; }
.visible  { opacity: 1; transform: translateY(0); }
```

```js
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add(styles.visible);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
```
