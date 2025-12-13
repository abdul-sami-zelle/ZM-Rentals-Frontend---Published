import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dev.zmrentals.co.nz",
      },
      {
        protocol: "https",
        hostname: "api.zmrentals.co.nz",
      },
    ],
  },
};

export default nextConfig;
