# MainComponents

Reserved for page-specific larger components that compose full page content.

## Current Status

Both previous sub-folders (`HomeSectionsFinal` and `Aboutus`) have been removed.
All page UI now lives directly in the corresponding `src/pages/` files:

| Page file                       | Contains                                                                  |
| ------------------------------- | ------------------------------------------------------------------------- |
| `src/pages/index.js`            | Hero, services grid, projects showcase, stats, testimonials, contact form |
| `src/pages/aboutus.js`          | Full About Us page sections                                               |
| `src/pages/projects.js`         | Projects listing with Firestore data                                      |
| `src/pages/services/index.js`   | Services listing with Firestore data                                      |
| `src/pages/services/[slug].jsx` | Service detail page (fully self-contained)                                |
| `src/pages/contactUs/index.js`  | Contact form + FAQ section                                                |
| `src/pages/blog/[id].jsx`       | Blog post detail page                                                     |

## Adding New Components

- Shared across **two or more pages** → add to `CommonComponents/`.
- Belongs to exactly one page → keep inline in that page file, or add a sub-folder here.
