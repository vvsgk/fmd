/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: ["*"], // Allow all origins (or specify your domain)
    },
  },
};

module.exports = nextConfig;
