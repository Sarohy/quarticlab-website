# Audit — /blog (+ blog system)  (2026-06-12)

## Summary
- High: 2 (1 fixed this run)  Medium: 3  Low: 1
- Source files: `src/pages/sitemap.xml.js`, `src/pages/blog/index.js`, `src/pages/blog/[slug].jsx`, `src/pages/_app.js`

## Issues
| Sev | Category | Issue | Source location | Fix (exact) | Channel | Status |
|-----|----------|-------|-----------------|-------------|---------|--------|
| High | fixing | `/blog` + published posts absent from sitemap | src/pages/sitemap.xml.js | Query Firestore `blogs` (status==published) in getServerSideProps; emit `/blog` + per-post `<url>` with real `<lastmod>` | code | ✅ FIXED this run (branch seo-brain/wk-2026-06-12-blog-sitemap) |
| High | fixing | Blog posts weakly internally linked (reachable mainly from `/blog`; homepage links only to `/blog`) | src/pages/index.js, blog/[slug].jsx, services/[slug].jsx | Add SSR "Latest insights" + "Related posts" blocks (by tags/category) | code | ✅ PARTIAL: related-posts (Wk3) merged+live; homepage/service blocks DEFERRED (research) pending content |
| Medium | fixing | Blog index + post bypass `Seo.jsx`; `/blog` has no `og:image` | blog/index.js (~225), blog/[slug].jsx (~479) | Route both through `<Seo>`, pass `ogImage={post.heroImage}` on posts + a default on `/blog` | code | ✅ FIXED (Wk2, merged + live) |
| Medium | schema-aeo | `/blog` has no `CollectionPage` / breadcrumb; breadcrumbs are Home-only sitewide | blog/index.js, _app.js (~110-126) | Add `CollectionPage` + `Home › Blog` breadcrumb; generalize the global BreadcrumbList | code | ✅ `/blog` done (Wk2, live); sitewide generalization still Week 5 |
| Medium | schema-aeo | Article author is `Organization`, not a named `Person` | blog/[slug].jsx (~506) | Replace with `Person` (name/url/jobTitle/sameAs/worksFor) from a new `author` object on the blog doc | code | ✅ CODE done (Wk4, branch seo-brain/wk-2026-06-14-authors); needs Firestore author objects |
| Low | improve-content | "X WORDS" byline trains length-optimization (not a ranking factor) | blog/[slug].jsx (~472) | Remove the words byline; keep reading-time if desired | code | ✅ FIXED (Wk2, merged + live) |

Passed clean: robots.txt (AI allowlist correct), canonical handling, Article schema present, SSR returns full contentHtml.

> Note: schema findings are infrastructure, NOT citation levers (dossier §4). Do not add schema beyond what's listed to "chase AI citations."

---

# Audit — /blog/ai-mvp-cost-2026  (2026-06-14)

## Summary
- High: 0  Medium: 2  Low: 1
- Source file: `src/pages/blog/[slug].jsx` + Firestore `blogs` doc `ai-mvp-cost-2026`

## Issues
| Sev | Category | Issue | Source location | Fix (exact) | Channel | Status |
|-----|----------|-------|-----------------|-------------|---------|--------|
| Medium | schema-aeo | Article author renders as `Organization`; no named Person / visible bio with credentials | blog/[slug].jsx Article JSON-LD + byline | Person schema + byline role + bio (code) THEN add a structured `author` object to the Firestore doc (human) | code+human | code done (Wk4 branch); Firestore object pending |
| Medium | improve-content | Author byline shows "Zweidevs Team" (legacy brand) instead of a Quartic Lab named human | Firestore `blogs/ai-mvp-cost-2026.author` | Set `author` to a real Quartic Lab person object {name, jobTitle, url, sameAs:[LinkedIn], bio} | human | open → Week 4 |
| Low | improve-content | No visible "Last updated" date surfaced (freshness signal) | blog/[slug].jsx byline / Firestore `updatedAt` | Surface a "Last updated" line when `updatedAt` > `publishedDate` | code | backlog (post-Week 4) |

Passed clean: in sitemap, indexable, canonical correct, og:image (hero) present, og:type=article, answer-first intro, SSR full contentHtml, "Keep reading" related block present.
