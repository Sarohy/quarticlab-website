import { SITE_URL } from "@component/utils/siteUrl";

// Emit robots.txt per-request so the Sitemap: line always matches the
// host serving the response (audit F2). Pair with src/pages/sitemap.xml.js.

const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "CCBot",
  "Google-Extended",
  "Applebot-Extended",
  "Bytespider",
  "Amazonbot",
  "MistralAI-User",
  "YouBot",
  "DuckAssistBot",
];

function buildRobotsTxt() {
  const aiRules = AI_CRAWLERS.map(ua => `User-agent: ${ua}\nAllow: /\n`).join(
    "\n",
  );
  return [
    "# Quartic Lab robots.txt",
    "# Generic crawl rules",
    "User-agent: *",
    "Allow: /",
    "Disallow: /api/",
    "",
    "# Explicitly allow major AI crawlers (AEO)",
    aiRules,
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ].join("\n");
}

export default function RobotsTxt() {
  return null;
}

export async function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.write(buildRobotsTxt());
  res.end();
  return { props: {} };
}
