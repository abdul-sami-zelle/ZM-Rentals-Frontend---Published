import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "dev.zmrentals.co.nz",
      "api.zmrentals.co.nz"
    ], // replace with your actual domain or IP
  },
};

export default nextConfig;
