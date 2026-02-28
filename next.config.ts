import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
