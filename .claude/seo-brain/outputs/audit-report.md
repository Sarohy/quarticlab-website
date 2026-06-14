# Audit — /blog (+ blog system)  (2026-06-12)

## Summary
- High: 2 (1 fixed this run)  Medium: 3  Low: 1
- Source files: `src/pages/sitemap.xml.js`, `src/pages/blog/index.js`, `src/pages/blog/[slug].jsx`, `src/pages/_app.js`

## Issues
| Sev | Category | Issue | Source location | Fix (exact) | Channel | Status |
|-----|----------|-------|-----------------|-------------|---------|--------|
| High | fixing | `/blog` + published posts absent from sitemap | src/pages/sitemap.xml.js | Query Firestore `blogs` (status==published) in getServerSideProps; emit `/blog` + per-post `<url>` with real `<lastmod>` | code | ✅ FIXED this run (branch seo-brain/wk-2026-06-12-blog-sitemap) |
| High | fixing | Blog posts weakly internally linked (reachable mainly from `/blog`; homepage links only to `/blog`) | src/pages/index.js, blog/[slug].jsx, services/[slug].jsx | Add SSR "Latest insights" + "Related posts" blocks (by tags/category) | code | open → Week 3 |
| Medium | fixing | Blog index + post bypass `Seo.jsx`; `/blog` has no `og:image` | blog/index.js (~225), blog/[slug].jsx (~479) | Route both through `<Seo>`, pass `ogImage={post.heroImage}` on posts + a default on `/blog` | code | open → Week 2 |
| Medium | schema-aeo | `/blog` has no `CollectionPage` / breadcrumb; breadcrumbs are Home-only sitewide | blog/index.js, _app.js (~110-126) | Add `CollectionPage` + `Home › Blog` breadcrumb; generalize the global BreadcrumbList | code | open → Week 2/5 |
| Medium | schema-aeo | Article author is `Organization`, not a named `Person` | blog/[slug].jsx (~508-512) | Replace with `Person` (name/url/jobTitle/sameAs/worksFor) from a new `author` object on the blog doc | code | open → Week 4 |
| Low | improve-content | "X WORDS" byline trains length-optimization (not a ranking factor) | blog/[slug].jsx (~472) | Remove the words byline; keep reading-time if desired | code | open → Week 2 |

Passed clean: robots.txt (AI allowlist correct), canonical handling, Article schema present, SSR returns full contentHtml.

> Note: schema findings are infrastructure, NOT citation levers (dossier §4). Do not add schema beyond what's listed to "chase AI citations."
