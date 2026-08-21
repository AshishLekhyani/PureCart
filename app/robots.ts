import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Personal and transient pages carry nothing worth indexing.
      disallow: ["/cart", "/checkout", "/orders", "/wishlist", "/search"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
