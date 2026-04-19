# Components

Root of the React component library for the Quartic Lab website.
Follows a clear separation of concerns across three layers.

## Structure

```
Components/
├── Layout/             ← Persistent page shell (Header + children + Footer)
├── CommonComponents/   ← Shared UI: Header + Footer
├── MainComponents/     ← (empty — all page-level sections live directly in pages/)
└── index.js            ← Barrel export
```

## Architecture

```
_app.js
  └── Layout
        ├── Header          (CommonComponents)
        ├── {Page Content}  (self-contained in each pages/*.js file)
        └── Footer          (CommonComponents)
```

## Layer Responsibilities

| Layer              | Purpose                                              | Current contents     |
| ------------------ | ---------------------------------------------------- | -------------------- |
| `Layout`           | Shell that wraps every page — always present         | `Layout.jsx`         |
| `CommonComponents` | Header + Footer used by every page via Layout        | `Header/`, `Footer/` |
| `MainComponents`   | Reserved for future page-specific section components | _(empty)_            |

## Import Alias

`jsconfig.json` sets up `@component` → `src/`:

```js
import Layout from "@component/Components/Layout";
import { Header, Footer } from "@component/Components/CommonComponents";
```

## Barrel Export (`index.js`)

```js
import { Layout, CommonComponents } from "@component/Components";
```

## Key Design Decisions

- All page UI (sections, cards, forms) lives directly in the corresponding `src/pages/` file — no intermediate component layer.
- **CSS Modules** are co-located with each component file for scoped styling.
- **`IntersectionObserver`** + CSS Module `.visible` class is the scroll animation pattern (no `animate.css`).
- Firebase data is fetched via `getServerSideProps` in each page and passed as props.
