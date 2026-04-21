// Single source of truth for the site's canonical origin.
// Set NEXT_PUBLIC_URL per environment (e.g. https://dev.quarticlab.com
// for staging, https://www.quarticlab.com for production) so canonical
// URLs, OG tags, sitemap URLs, and structured data all match the host
// they were served from (audit F1, F3, H1).

const DEFAULT_SITE_URL = "https://www.quarticlab.com";

export const SITE_URL = (process.env.NEXT_PUBLIC_URL || DEFAULT_SITE_URL)
  .trim()
  .replace(/\/$/, "");

export function absoluteUrl(path = "/") {
  if (!path || path === "/") {
    return `${SITE_URL}/`;
  }
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized.replace(/\/$/, "")}`;
}
