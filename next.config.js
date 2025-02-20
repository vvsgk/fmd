/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["humble-guacamole-v6vg55x46rj7hwg6q-3000.app.github.dev", "localhost:3000"],
    },
  },
}

module.exports = nextConfig