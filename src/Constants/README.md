# Constants

Centralised static values used across the application. Import from here instead of hardcoding strings or paths.

## Files

### `routePaths.js`

Defines all application route strings in one place.

```js
import routesPaths from "@component/Constants/routePaths";
// routesPaths.home      → "/"
// routesPaths.services  → "/services"
// routesPaths.aboutUs   → "/aboutus"
// routesPaths.blogs     → "/blog"
// routesPaths.projects  → "/projects"
```

### `navLinks.js`

Array of navigation link objects consumed by the `Header` component.

```js
[
  { href: "/", text: "HOME" },
  { href: "/projects", text: "PROJECTS" },
  { href: "/aboutus", text: "ABOUT US" },
  { href: "/services", text: "SERVICES" },
  { href: "/blog", text: "BLOGS" },
];
```

### `buttonTexts.js`

Named string exports for button labels — avoids magic strings scattered across components.

```js
export const loadMoreBtn = "Load More";
export const noBlogBtn = "No blog available";
```

> `noBlogBtn` is also used by `BottomBorderButton` to conditionally hide the button when no blogs exist.

## Usage Pattern

```js
import routesPaths from "@component/Constants/routePaths";
import navLinks from "@component/Constants/navLinks";
import { loadMoreBtn, noBlogBtn } from "@component/Constants/buttonTexts";
```
