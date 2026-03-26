# src

Root of all application source code. Everything outside of `public/` and config files at the project root lives here.

## Structure

```
src/
├── pages/          ← Next.js file-based routing (URL = file path)
├── Components/     ← React component library (Layout, Common, Main)
├── Constants/      ← Static app-wide values (routes, nav links, button text)
├── firebase/       ← Firebase initialisation and Firestore helper functions
├── styles/         ← Global CSS and page-level CSS modules
├── utils/          ← General utility functions and URL config
└── robots.txt      ← Search engine crawl rules
```

## Quick Reference

| Folder        | What to find there                                                |
|---------------|-------------------------------------------------------------------|
| `pages/`      | Route files — each file = one URL                                 |
| `Components/` | All React components — Layout, CommonComponents, MainComponents   |
| `Constants/`  | `navLinks`, `routePaths`, `buttonTexts`                           |
| `firebase/`   | `firebaseConfig.js`, Firestore CRUD exports                       |
| `styles/`     | `globals.css`, page CSS modules                                   |
| `utils/`      | `isValidEmail`, `groupArrayElements`, `urls` (service routes)     |

Each sub-folder has its own `README.md` with detailed documentation.
