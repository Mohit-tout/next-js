/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yemca-services.net",
      },
    ],
  },
};

module.exports = nextConfig;
