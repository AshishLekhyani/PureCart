import Link from "next/link";
import type { Metadata } from "next";
import ProductGrid from "@/components/product/ProductGrid";
import { searchProducts } from "@/lib/catalog";

type Props = { searchParams: Promise<{ q?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Search: ${q}` : "Search",
    robots: { index: false },
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const results = query ? searchProducts(query) : [];

  return (
    <div className="gutter py-14 pb-24 lg:py-20">
      <p className="label-sm text-muted">Search</p>
      <h1 className="display mt-4 text-[clamp(2.25rem,6vw,4.5rem)] uppercase">
        {query ? `“${query}”` : "What are you looking for?"}
      </h1>

      {query && (
        <p className="text-muted mt-4">
          {results.length} {results.length === 1 ? "result" : "results"}
        </p>
      )}

      {query && results.length === 0 ? (
        <div className="py-20">
          <p className="text-muted max-w-md">
            Nothing matched that search. Try a single word — a garment type like “hoodie”, a
            material, or a department.
          </p>
          <Link href="/shop/new" className="btn btn-outline mt-8">
            Browse everything
          </Link>
        </div>
      ) : (
        <div className="mt-14">
          <ProductGrid products={results} columns={4} priorityCount={4} />
        </div>
      )}
    </div>
  );
}
