import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb"
    }
  },
  images: {
    domains: ["localhost"],

  }
};

export default nextConfig;
