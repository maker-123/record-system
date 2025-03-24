/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    functions: {
      "api/*": {
        maxDuration: 60, // Set timeout limit for all API routes
      },
    },
  },
};

module.exports = nextConfig;
