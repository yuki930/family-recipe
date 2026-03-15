import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/family-recipe",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
