# Styles

Global and page-level CSS modules for the Zweidevs website.

## Files

| File                  | Scope         | Description                                                  |
|-----------------------|---------------|--------------------------------------------------------------|
| `globals.css`         | Global        | CSS reset, root variables, base typography, and utility classes shared across all pages |
| `Home.module.css`     | Page-scoped   | Styles for the Home page container (`HPStyle`)               |
| `About.module.css`    | Page-scoped   | Styles for the About Us page container (`APStyle`)           |
| `project.module.css`  | Page-scoped   | Styles for the Projects listing page                         |
| `services.module.css` | Page-scoped   | Styles for the Services overview page                        |

## Architecture Notes

- **CSS Modules** (`.module.css`) are used for all page and component styles to ensure local scoping and prevent class-name collisions.
- **`globals.css`** is the only globally imported stylesheet — it is loaded once in `src/pages/_app.js`.
- Component-level styles live alongside each component in their own `.module.css` files (e.g. `Header/header.module.css`).
- **`animate.css`** (from npm) is imported directly inside components that need scroll-triggered animations.
- **Poppins** font is loaded via `@fontsource/poppins` in `_app.js` at weights 300, 400, 500, and 700.

## Conventions

- Use **CSS Modules** for new component or page styles.
- Keep page-level styles in this folder.
- Keep component-level styles co-located with the component file.
- Use `globals.css` only for truly global rules (CSS variables, resets, body/html defaults).
