/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "wallpaperaccess.com",
      },
      {
        hostname: "cdn.dribbble.com",
      },
    ],
  },
};

module.exports = nextConfig;
