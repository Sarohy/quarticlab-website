import { getAllBlogs } from "@component/firebase/firebaseRequests";
import { SITE_URL } from "@component/utils/siteUrl";

// Generate sitemap.xml per-request so <loc> entries always match the
// host serving the response (audit F2). The /blog index and every
// published post are fetched from Firestore at request time (see
// getServerSideProps) and appended to the static routes below.

const STATIC_ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.00" },
  { path: "/services", changefreq: "weekly", priority: "0.90" },
  { path: "/about", changefreq: "monthly", priority: "0.80" },
  { path: "/projects", changefreq: "monthly", priority: "0.80" },
  { path: "/contact", changefreq: "monthly", priority: "0.80" },
  {
    path: "/services/web-development",
    changefreq: "monthly",
    priority: "0.85",
  },
  {
    path: "/services/mobile-development",
    changefreq: "monthly",
    priority: "0.85",
  },
  {
    path: "/services/ai-ml-development",
    changefreq: "monthly",
    priority: "0.85",
  },
  {
    path: "/services/genai-automation",
    changefreq: "monthly",
    priority: "0.85",
  },
  {
    path: "/services/blockchain-development",
    changefreq: "monthly",
    priority: "0.85",
  },
  {
    path: "/services/iot-development",
    changefreq: "monthly",
    priority: "0.85",
  },
  { path: "/services/devops", changefreq: "monthly", priority: "0.85" },
  { path: "/services/ui-ux-design", changefreq: "monthly", priority: "0.85" },
  { path: "/privacy", changefreq: "yearly", priority: "0.30" },
  { path: "/terms", changefreq: "yearly", priority: "0.30" },
  { path: "/cookies", changefreq: "yearly", priority: "0.30" },
];

// Normalize a Firestore Timestamp | ISO string | Date into YYYY-MM-DD,
// or null when the value is missing/unparseable.
function toDateString(value) {
  if (!value) {
    return null;
  }
  let date;
  if (typeof value === "object" && typeof value.toDate === "function") {
    date = value.toDate(); // Firestore Timestamp
  } else {
    date = new Date(value);
  }
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return date.toISOString().slice(0, 10);
}

// Escape characters that are not valid inside an XML <loc>.
function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Turn published blog docs into sitemap entries (the /blog index plus one
// URL per post). Returns [] when there are no published posts, which keeps
// the sitemap consistent with /blog's noindex-while-empty behavior.
function buildBlogEntries(blogs) {
  const published = (blogs || []).filter(
    b => b && b.status === "published" && b.slug,
  );
  if (!published.length) {
    return [];
  }

  const postEntries = published.map(b => ({
    path: `/blog/${b.slug}`,
    changefreq: "monthly",
    priority: "0.70",
    lastmod:
      toDateString(b.updatedAt) ||
      toDateString(b.publishedAt) ||
      toDateString(b.publishedDate),
  }));

  // Newest post drives the /blog index lastmod.
  const indexLastmod = postEntries
    .map(e => e.lastmod)
    .filter(Boolean)
    .sort()
    .pop();

  return [
    {
      path: "/blog",
      changefreq: "weekly",
      priority: "0.80",
      lastmod: indexLastmod,
    },
    ...postEntries,
  ];
}

function buildSitemap(dynamicEntries = []) {
  const today = new Date().toISOString().slice(0, 10);
  const allRoutes = [...STATIC_ROUTES, ...dynamicEntries];

  const urls = allRoutes
    .map(({ path, changefreq, priority, lastmod }) => {
      const loc = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
      return [
        "  <url>",
        `    <loc>${escapeXml(loc)}</loc>`,
        `    <lastmod>${lastmod || today}</lastmod>`,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    "</urlset>",
    "",
  ].join("\n");
}

export default function Sitemap() {
  return null;
}

export async function getServerSideProps({ res }) {
  // Fetch published posts at request time. A Firestore failure must never
  // break the sitemap — fall back to the static routes only.
  let blogEntries = [];
  try {
    const blogs = await getAllBlogs();
    blogEntries = buildBlogEntries(blogs);
  } catch {
    blogEntries = [];
  }

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.write(buildSitemap(blogEntries));
  res.end();
  return { props: {} };
}
