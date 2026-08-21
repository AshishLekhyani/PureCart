import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // The OG route reads its display font off disk; file tracing cannot infer a
  // runtime path.join, so the font is declared for the deployment bundle.
  outputFileTracingIncludes: {
    "/product/[slug]/opengraph-image": ["./assets/fonts/**"],
  },
};

export default nextConfig;
