import type { MetadataRoute } from "next";
import { categories, products } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/size-guide"), lastModified, changeFrequency: "yearly", priority: 0.3 },

    ...["new", "sale", ...categories.map((category) => category.id)].map((slug) => ({
      url: absoluteUrl(`/shop/${slug}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),

    ...products.map((product) => ({
      url: absoluteUrl(`/product/${product.slug}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
