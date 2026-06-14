import { getAllBlogs } from "@component/firebase/firebaseRequests";
import { SITE_URL } from "@component/utils/siteUrl";

// Generate sitemap.xml per-request so <loc> entries always match the
// host serving the response (audit F2). The /blog index and every
// published post are fetched from Firestore at request time (see
// getServerSideProps) and appended to the static routes below.
//
// <changefreq> and <priority> are intentionally omitted — Google ignores
// both. <lastmod> is only emitted when we have a real date (blog posts);
// static routes carry <loc> only rather than a faked uniform timestamp.

const STATIC_ROUTES = [
  "/",
  "/services",
  "/about",
  "/projects",
  "/contact",
  "/services/web-development",
  "/services/mobile-development",
  "/services/ai-ml-development",
  "/services/genai-automation",
  "/services/blockchain-development",
  "/services/iot-development",
  "/services/devops",
  "/services/ui-ux-design",
  "/privacy",
  "/terms",
  "/cookies",
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

  return [{ path: "/blog", lastmod: indexLastmod }, ...postEntries];
}

function buildSitemap(dynamicEntries = []) {
  const allRoutes = [
    ...STATIC_ROUTES.map(path => ({ path })),
    ...dynamicEntries,
  ];

  const urls = allRoutes
    .map(({ path, lastmod }) => {
      const loc = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
      const lines = ["  <url>", `    <loc>${escapeXml(loc)}</loc>`];
      if (lastmod) {
        lines.push(`    <lastmod>${lastmod}</lastmod>`);
      }
      lines.push("  </url>");
      return lines.join("\n");
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
