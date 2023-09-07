/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'wallpaperaccess.com',
      },
      {
        hostname: 'cdn.dribbble.com',
      },
      {
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        hostname: 'flagcdn.com',
      },
    ],
  },
};

module.exports = nextConfig;
