"use client";

import { useEffect } from "react";
import { useRecentlyViewed } from "@/store/recentlyViewed";
import { getProduct } from "@/lib/catalog";
import ProductRail from "./ProductRail";

type Props = {
  currentProductId?: string;
};

export default function RecentlyViewed({ currentProductId }: Props) {
  const { ids, hydrated, record } = useRecentlyViewed();

  useEffect(() => {
    if (currentProductId) record(currentProductId);
  }, [currentProductId, record]);

  if (!hydrated) return null;

  const products = ids
    .filter((id) => id !== currentProductId)
    .flatMap((id) => {
      const product = getProduct(id);
      return product ? [product] : [];
    });

  if (products.length < 2) return null;

  return <ProductRail title="Recently viewed" products={products} />;
}
