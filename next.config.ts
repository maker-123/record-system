/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  experimental: {
    functions: {
      "api/*": {
        maxDuration: 60,
      },
    },
  },
};

module.exports = nextConfig;
