import ProductCard from "./ProductCard";
import type { Product } from "@/lib/types";

export default function ProductGrid({
  products,
  columns = 4,
  priorityCount = 0,
}: {
  products: Product[];
  columns?: 2 | 3 | 4;
  priorityCount?: number;
}) {
  const columnClass =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 3
        ? "sm:grid-cols-2 lg:grid-cols-3"
        : "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <div className={`grid grid-cols-2 gap-x-4 gap-y-12 ${columnClass}`}>
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          columns={columns}
          priority={index < priorityCount}
        />
      ))}
    </div>
  );
}
