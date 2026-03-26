# CommonComponents

Reusable, page-agnostic UI components. Every component here is designed to be consumed by multiple pages or `MainComponents`.

## Component Catalogue

### `Header`
**Files:** `Header.jsx`, `header.module.css`

Responsive navigation bar.
- Desktop: Logo on the left, nav links + "Contact Us" button on the right.
- Mobile (< 900px): Hamburger icon opens a drawer with nav links.
- Highlights the active route using `useRouter`.
- Nav links are sourced from `src/Constants/navLinks.js`.

---

### `Footer`
**Files:** `Footer.jsx`, `FooterAbout.jsx`, `FooterAllServices.jsx`, `FooterServices.jsx`, `FooterSocial.jsx`, `footer.module.css`

Multi-column footer split into four sub-components:
| Sub-component       | Content                              |
|---------------------|--------------------------------------|
| `FooterAbout`       | Company logo and short description   |
| `FooterServices`    | Quick links to main service pages    |
| `FooterAllServices` | Extended list of all services        |
| `FooterSocial`      | Social media icon links              |

Bottom bar shows copyright: `© 2023 Zweidevs. All Rights Reserved`.

---

### `BlogCard`
**Files:** `BlogCard.jsx`, `blogCard.module.css`

MUI `Card` grid that renders a list of blog post previews. Supports category-based filtering via the `filter` prop. Clicking a card navigates to `/blog/[id]` passing the post data via router query.

**Props:** `data: BlogPost[]`, `filter: string`

---

### `ProjectCard`
**Files:** `ProjectCard.jsx`, `ProjectCard.module.css`

Alternating left/right layout card for showcasing a project. Shows a project image, title, description, and a set of tech icons (AWS, Node.js, React, Ruby on Rails). Uses `IntersectionObserver` for scroll-in animations.

**Props:** `reverse`, `projectImageUrl`, `projectTitle`, `projectDescription`, `requestDemoOnClick`

---

### `ServiceCarousel`
**Files:** `ServiceCarosuel.jsx`, `serviceCarosuel.module.css`

A responsive carousel (`react-material-ui-carousel`) for project or service cards. Automatically chunks `projectData` into groups based on screen size (1 / 2 / 3 per slide).

**Props:** `cardTitle`, `displayViewMoreButton`, `projectData`, `navButtonsAlwaysVisible`

---

### `PageBanner`
**Files:** `PageBanner.jsx`, `pageBanner.module.css`

Hero-style banner used at the top of inner pages (Blog, Projects, Services, About). Shows a heading, description, optional breadcrumb, and a decorative diamond SVG.

**Props:** `heading`, `description`, `BreadcrumbTitle`, `BreadcrumbParrentPage`

---

### `InstantBookingButton`
**Files:** `InstantBookingButton.jsx`, `InstantBookingButton.module.css`

Animated CTA button with a double-arrow SVG icon. Opens the Calendly booking link when clicked.

**Props:** `title`, `svgFill`, `onClick`, `customStyle`, `customOne`, `customTwo`, `customThree`

---

### `BottomBorderButton`
**Files:** `BottomBorderButton.jsx`, `BottomBorderButton.module.css`

Animated underline-style button with a right-arrow icon (`ArrowCircleRightOutlined`). Detects touch screens and adjusts hover behaviour. Hides itself when `text === noBlogBtn`.

**Props:** `onClick`, `text`

---

### `ServiceCard`
**Files:** `ServiceCard.jsx`, `ServiceCard.module.css`

Icon + title + description card used on the Services overview page. Includes a "SEE MORE" button.

**Props:** `icon`, `title`, `description`, `onClick`, `className`

---

### `LetsTalk`
**Files:** `LetsTalk.jsx`, `letsTalk.module.css`

Full-width CTA banner (dark background) with a heading, description, and a Calendly booking link button.

**Props:** `cardTitle`, `cardDesc`, `buttonTitle`

---

### `TechStack`
**Files:** `TechStack.jsx`, `techStack.module.css`

Static section listing the mobile development tech stack (iOS: Swift/Obj-C, Android: Java/Kotlin, cross-platform, etc.).

---

### `FAQ`
**Files:** `Faq.jsx`, `faq.module.css`

Accordion-style FAQ component for service detail pages.

---

### `ReviewCard`
Card component for displaying a client review/testimonial.

---

### `LoadingSkeleton`
Skeleton placeholder shown while dynamic components are loading (used with `next/dynamic`).

---

### `SmallButton`
Small pill-shaped button used as category filter chips on the Blog page.

---

### `ChipCard`
Chip/tag-style card component.

---

### `InstantBookingBanner`
Full-width banner variant of the booking CTA.

---

### `OfferingsCard`, `ServiceDetailsCard`, `ServicesCard`, `ServicesTechnologiesCard`
Cards used within service detail pages to display offerings, technologies, and detailed service information.

---

### `BusinessProcessCard`, `ProductDevSection`, `TargetAudienceSection`, `Timeline`
Section components used in service detail and about pages.

---

### `ZButton`
General-purpose styled MUI button wrapper.

---

### `CustomInputField`
Styled text input wrapper used in forms.

## Barrel Export

All key components are re-exported from `index.js`:

```js
import {
  Header, Footer, InstantBookingButton,
  ReviewCard, ServiceCard, ServicesCard,
  InstantBookingBanner, Zbutton
} from "@component/Components/CommonComponents";
```

## Animation Pattern

Most components use `IntersectionObserver` + `animate.css` classes for scroll-triggered entry animations:

```js
observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate__animated", "animate__backInUp");
    }
  });
});
```
