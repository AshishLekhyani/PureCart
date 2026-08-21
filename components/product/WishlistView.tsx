"use client";

import Link from "next/link";
import { useWishlist } from "@/store/wishlist";
import { getProduct } from "@/lib/catalog";
import ProductGrid from "./ProductGrid";

export default function WishlistView() {
  const { ids, hydrated, clear } = useWishlist();

  if (!hydrated) return <div className="gutter py-32" aria-busy="true" />;

  const saved = ids.flatMap((id) => {
    const product = getProduct(id);
    return product ? [product] : [];
  });

  if (saved.length === 0) {
    return (
      <div className="gutter flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <h1 className="display text-[clamp(2.5rem,7vw,5rem)] uppercase">Nothing saved yet</h1>
        <p className="text-muted mt-5 max-w-sm">
          Tap the heart on any piece to keep it here. Saved items stay in this browser, so you can
          come back and decide later.
        </p>
        <Link href="/shop/new" className="btn btn-solid mt-10">
          Browse the collection
        </Link>
      </div>
    );
  }

  return (
    <div className="gutter py-14 pb-24 lg:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="display text-[clamp(2.5rem,7vw,5rem)] uppercase">Wishlist</h1>
          <p className="text-muted mt-3">
            {saved.length} {saved.length === 1 ? "piece" : "pieces"} saved
          </p>
        </div>

        <button type="button" onClick={clear} className="label link-underline text-muted pb-2">
          Clear all
        </button>
      </div>

      <div className="mt-14">
        <ProductGrid products={saved} columns={4} priorityCount={4} />
      </div>
    </div>
  );
}
