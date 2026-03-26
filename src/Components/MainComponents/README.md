# MainComponents

Page-specific larger components that compose the full content of each page. These are not meant to be reused across unrelated pages — they belong to a specific page context.

## Structure

```
MainComponents/
├── HomeSectionsFinal/    ← All 8 home page sections
└── Aboutus/              ← All About Us page cards
```

---

## HomeSectionsFinal

The home page is built from 8 sequential section components. All are exported from `index.js` for convenience.

| Component              | Purpose                                                                 |
|------------------------|-------------------------------------------------------------------------|
| `HomeSection1`         | **Hero / Landing section** — Zweidevs logo, "Empowering Innovation" headline, and two `InstantBookingButton` CTAs (desktop + mobile placement). Links to Calendly. |
| `HomeSection2`         | **Services grid** — Animated cards for each service (Web, Mobile, Blockchain, AI, IoT, DevOps, UI/UX, Game Dev). Each card navigates to the respective service detail page. |
| `HomeSection3`         | **Mobile app showcase** — Highlights mobile development capability with image, text, and a CTA button. |
| `HomeSection4`         | **Business process / methodology** — Describes the development process (not rendered on home page by default). |
| `HomeSection5`         | **Client testimonials** — Carousel of client reviews with avatar, name, and quote. Uses `react-material-ui-carousel` (SSR disabled). |
| `HomeSection6`         | **Company stats / achievements** — Animated counters (e.g. projects delivered, clients, years). Accepts a `heading` prop — reused on the About page with a different heading. |
| `HomeSection7`         | **Technologies slider** — Displays a scrolling SVG banner of all technology logos Zweidevs works with. |
| `HomeSection8`         | **Contact form** — Full contact form with name, email, phone (with country picker from REST Countries API), and message. Submits to `POST /dev/contact`. Also used as the standalone `/contactus` page. |
| `CompanyStatsArc`      | Arc/visual decoration used alongside company statistics.               |
| `HomeSection6Counter`  | Animated number counter sub-component used inside `HomeSection6`.      |

### Props

| Component      | Prop                   | Description                                  |
|----------------|------------------------|----------------------------------------------|
| `HomeSection1` | `handleButtonClick`    | Callback for the CTA button (smooth scroll)  |
| `HomeSection6` | `heading`              | Section heading text (reusable across pages) |

---

## Aboutus

Composes the About Us page (`/aboutus`). Each card is a distinct page section.

| Component        | Purpose                                                                       |
|------------------|-------------------------------------------------------------------------------|
| `AboutUsCard1`   | **Page banner** — Uses `PageBanner` with title "About Zweidevs" and vision statement. |
| `AboutUsCard2`   | **Story section** — Company background, image, and animated text blocks describing mission, values, and approach. |
| `AboutUSCard4`   | **Team / values section** — Additional about page content (team or culture section). |
| `AboutsUsCard5`  | **Closing section** — Final about page section (process or awards).           |
| `AboutUsCard`    | Base/shared card variant used internally.                                     |

### Page Assembly (`aboutus.js`)

```
AboutUsCard1        ← Banner
AboutUsCard2        ← Story + image
HomeSection6        ← "Zweidevs Achievements Since 2020" (stats counters)
AboutUSCard4        ← Team/culture
AboutsUsCard5       ← Closing
```

---

## Animation Pattern

All `HomeSectionsFinal` and `Aboutus` components use `IntersectionObserver` with `animate.css`:
- Elements animate in once when they scroll into view (threshold 0.1–0.5).
- Common animations: `animate__backInUp`, `animate__zoomIn`, `animate__bounceIn`, `animate__backInLeft`, `animate__shakeX`.
- Refs are created as arrays when multiple elements in one component need independent animation triggers.
