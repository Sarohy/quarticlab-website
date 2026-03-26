# Components

This folder is the root of the entire React component library for the Zweidevs website. It is split into three layers following a clear separation of concerns.

## Structure

```
Components/
├── Layout/             ← Persistent page shell (Header + children + Footer)
├── CommonComponents/   ← Reusable, page-agnostic UI components
├── MainComponents/     ← Page-specific large content components
└── index.js            ← Barrel export
```

## Architecture Overview

```
_app.js
  └── Layout
        ├── Header          (CommonComponents)
        ├── {Page Content}
        │     ├── MainComponents  (page sections)
        │     └── CommonComponents (cards, banners, buttons, etc.)
        └── Footer          (CommonComponents)
```

## Layer Responsibilities

| Layer              | Purpose                                                         | Examples                                      |
|--------------------|-----------------------------------------------------------------|-----------------------------------------------|
| `Layout`           | Shell that wraps every page — always present                    | `Layout.jsx`                                  |
| `CommonComponents` | Small to medium reusable UI — used in multiple pages/sections   | `Header`, `Footer`, `BlogCard`, `ServiceCard` |
| `MainComponents`   | Large page-level sections — tightly coupled to one page         | `HomeSection1`–`HomeSection8`, `AboutUsCard2` |

## Import Alias

The `jsconfig.json` sets up the `@component` alias pointing to `src/`:

```js
import Layout   from "@component/Components/Layout";
import { Header } from "@component/Components/CommonComponents";
import HomeSection1 from "@component/Components/MainComponents/HomeSectionsFinal/HomeSection1";
```

## Barrel Export (`index.js`)

```js
import { Layout, CommonComponents, MainComponents } from "@component/Components";
```

## Key Design Decisions

- **`next/dynamic`** is used heavily for lazy-loading heavy components (MUI, carousels) to improve initial page load performance.
- **`animate.css` + `IntersectionObserver`** is the animation pattern — elements animate once when scrolled into view.
- **CSS Modules** are co-located with each component file for scoped styling.
- Components are **prop-driven** and stateless where possible; stateful logic lives in page files or the section components themselves.
