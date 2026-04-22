/** @type {import('next').NextConfig} */
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
};

module.exports = nextConfig;
