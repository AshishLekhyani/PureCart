import Link from "next/link";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/types";

type Props = {
  title: string;
  products: Product[];
  href?: string;
  cta?: string;
};

/** A horizontally scrolling row of cards — the shop-the-edit strip. */
export default function ProductRail({ title, products, href, cta = "View all" }: Props) {
  if (products.length === 0) return null;

  return (
    <section className="py-20 lg:py-28">
      <div className="gutter flex items-end justify-between gap-6">
        <h2 className="display text-[clamp(2rem,5vw,3.5rem)] uppercase">{title}</h2>
        {href && (
          <Link href={href} className="label link-underline shrink-0 pb-2">
            {cta}
          </Link>
        )}
      </div>

      <div className="no-scrollbar px-gutter scroll-px-gutter mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
        {products.map((product) => (
          <div key={product.id} className="w-[62vw] shrink-0 snap-start sm:w-[38vw] lg:w-[23vw]">
            <ProductCard product={product} columns={4} />
          </div>
        ))}
      </div>
    </section>
  );
}
