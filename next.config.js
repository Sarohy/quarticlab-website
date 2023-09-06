/** @type {import('next').NextConfig} */
const nextConfig = {
  output:"standalone",
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "wallpaperaccess.com"
      },
      {
        hostname: "cdn.dribbble.com"
      },
      {
        hostname: "firebasestorage.googleapis.com"
      },
      {
        hostname: "flagcdn.com"
      }
    ]
  }
};

module.exports = nextConfig;
