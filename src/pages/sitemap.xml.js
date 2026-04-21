import { SITE_URL } from "@component/utils/siteUrl";

// Generate sitemap.xml per-request so <loc> entries always match the
// host serving the response (audit F2). /how-we-work and /blog are
// intentionally excluded — see audit B1 and B2.

const STATIC_ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.00" },
  { path: "/services", changefreq: "weekly", priority: "0.90" },
  { path: "/about", changefreq: "monthly", priority: "0.80" },
  { path: "/projects", changefreq: "monthly", priority: "0.80" },
  { path: "/contact", changefreq: "monthly", priority: "0.80" },
  { path: "/ai-services", changefreq: "monthly", priority: "0.70" },
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
  {
    path: "/services/game-development",
    changefreq: "monthly",
    priority: "0.85",
  },
  { path: "/privacy", changefreq: "yearly", priority: "0.30" },
  { path: "/terms", changefreq: "yearly", priority: "0.30" },
  { path: "/cookies", changefreq: "yearly", priority: "0.30" },
];

function buildSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = STATIC_ROUTES.map(({ path, changefreq, priority }) => {
    const loc = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
    return [
      "  <url>",
      `    <loc>${loc}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      "  </url>",
    ].join("\n");
  }).join("\n");

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
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.write(buildSitemap());
  res.end();
  return { props: {} };
}
