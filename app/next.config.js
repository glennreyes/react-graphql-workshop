/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    newNextLinkBehavior: true,
    scrollRestoration: true,
    serverActions: true,
  },
};

module.exports = nextConfig;
