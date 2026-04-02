import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "www.shrimpswap.com",
    "shrimpswap.com",
    "https://www.shrimpswap.com",
  ],
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // any hostname
      },
      {
        protocol: "http",
        hostname: "**", // also allow http (optional)
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
