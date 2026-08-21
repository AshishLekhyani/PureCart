import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  outputFileTracingIncludes: {
    "/product/[slug]/opengraph-image": ["./assets/fonts/**"],
  },
};

export default nextConfig;
