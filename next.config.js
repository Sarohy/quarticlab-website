/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV !== "production";

// Content-Security-Policy for this app.
// 'unsafe-inline' in script-src is required by Next.js Pages Router
// (__NEXT_DATA__ inline script). Tighten to nonce-based CSP once the
// app migrates to App Router with React Server Components.
// 'unsafe-eval' is only included in dev (Next.js HMR / source maps use eval).
const CSP = [
  "default-src 'self'",
  // Next.js inline hydration script + GTM/GA + Clutch widget
  // Dev adds 'unsafe-eval' for hot-module replacement
  `script-src 'self' 'unsafe-inline'${
    isDev ? " 'unsafe-eval'" : ""
  } https://www.googletagmanager.com https://www.google-analytics.com https://widget.clutch.co`,
  // CSS-in-JS / inline styles from Next.js
  "style-src 'self' 'unsafe-inline'",
  // Remote images (see next.config images.remotePatterns)
  "img-src 'self' data: blob: https://wallpaperaccess.com https://cdn.dribbble.com https://firebasestorage.googleapis.com https://flagcdn.com",
  // Self-hosted fonts via next/font — no external font CDN needed
  "font-src 'self'",
  // Firebase Firestore + Google Analytics
  "connect-src 'self' https://*.googleapis.com https://*.firebase.google.com https://www.google-analytics.com",
  // No iframes — document.js loads no iframes
  "frame-src 'none'",
  // Belt-and-suspenders: block plugins and base-tag hijacks
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  // Covered by X-Frame-Options header below too (legacy browsers)
  "frame-ancestors 'none'",
]
  .join("; ")
  .trim();

const SECURITY_HEADERS = [
  // HSTS — 2-year max-age, include subdomains, submit to preload list
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: CSP,
  },
  // Block clickjacking in browsers that don't support CSP frame-ancestors
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // Prevent MIME-type sniffing
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Limit access to browser features not used by this site
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig = {
  output: "standalone",
  reactStrictMode: false,
  transpilePackages: ["react-intersection-observer"],
  images: {
    remotePatterns: [
      {
        hostname: "wallpaperaccess.com",
      },
      {
        hostname: "cdn.dribbble.com",
      },
      {
        hostname: "firebasestorage.googleapis.com",
      },
      {
        hostname: "flagcdn.com",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [];
  },
  async headers() {
    return [
      {
        // Apply to all routes
        source: "/(.*)",
        headers: SECURITY_HEADERS,
      },
    ];
  },
};

module.exports = nextConfig;
