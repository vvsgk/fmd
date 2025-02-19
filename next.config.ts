import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["*"], // Allows all origins
    },
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "X-Forwarded-Host",
            value: process.env.NEXT_PUBLIC_SITE_URL || "localhost:3000",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
