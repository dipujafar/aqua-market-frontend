import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
};

export default nextConfig;
