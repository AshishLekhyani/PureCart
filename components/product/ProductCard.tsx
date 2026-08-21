"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatPrice } from "@/lib/money";
import { useCart } from "@/store/cart";
import { cn } from "@/lib/utils";
import WishlistButton from "./WishlistButton";
import type { Product } from "@/lib/types";

type Props = {
  product: Product;
  priority?: boolean;
  columns?: 2 | 3 | 4;
};

export default function ProductCard({ product, priority = false, columns = 4 }: Props) {
  const [colorIndex, setColorIndex] = useState(0);
  const add = useCart((state) => state.add);

  const color = product.colors[colorIndex];
  const hoverImage = product.colors[(colorIndex + 1) % product.colors.length].image;
  const hasHoverImage = product.colors.length > 1;
  const still = product.shot === "still";

  const onSale = typeof product.compareAtCents === "number";
  const flag = product.badges.includes("new")
    ? "New"
    : product.badges.includes("limited")
      ? "Limited"
      : onSale
        ? "Sale"
        : null;

  const sizes =
    columns === 2
      ? "(max-width: 768px) 50vw, 50vw"
      : columns === 3
        ? "(max-width: 768px) 50vw, 33vw"
        : "(max-width: 768px) 50vw, 25vw";

  const imageClass = cn(
    "ease-out-soft duration-700",
    still ? "object-contain" : "object-cover object-top",
  );

  return (
    <article className="group relative">
      <div className="border-line bg-paper group-hover:border-ink/25 relative aspect-3/4 overflow-hidden border transition-colors duration-500">
        <Link
          href={`/product/${product.slug}`}
          className="absolute inset-0 block"
          aria-label={product.name}
        >
          <span className={cn("absolute inset-0 block", still && "p-5 lg:p-7")}>
            <Image
              src={color.image}
              alt={`${product.name} in ${color.name}`}
              fill
              priority={priority}
              sizes={sizes}
              className={cn(
                imageClass,
                "transition-opacity",
                hasHoverImage && "group-hover:opacity-0",
              )}
            />

            {hasHoverImage && (
              <Image
                src={hoverImage}
                alt=""
                aria-hidden
                fill
                sizes={sizes}
                className={cn(imageClass, "opacity-0 transition-opacity group-hover:opacity-100")}
              />
            )}
          </span>
        </Link>

        {flag && (
          <span
            className={cn(
              "label-sm border-line bg-paper absolute top-0 left-0 border-r border-b px-2.5 py-1.5",
              flag === "Sale" && "text-sale",
            )}
          >
            {flag}
          </span>
        )}

        <WishlistButton
          productId={product.id}
          productName={product.name}
          className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100 max-lg:opacity-100"
        />

        {product.sizes.length > 0 && (
          <div className="ease-out-soft pointer-events-none absolute inset-x-0 bottom-0 hidden translate-y-full transition-transform duration-500 group-hover:pointer-events-auto group-hover:translate-y-0 lg:block">
            <div className="border-line bg-paper/95 flex flex-wrap items-center justify-center gap-px border-t backdrop-blur-sm">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => add(product, color.name, size)}
                  className="label-sm hover:bg-ink hover:text-paper flex-1 px-2 py-3 transition-colors"
                  aria-label={`Add ${product.name}, size ${size}, to bag`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-3.5 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
        <div className="min-w-0">
          <h3 className="label sm:truncate">
            <Link href={`/product/${product.slug}`}>{product.name}</Link>
          </h3>
          <p className="label-sm text-muted mt-1">{product.line}</p>
        </div>

        <p className="label shrink-0 tabular-nums">
          {onSale && (
            <span className="text-muted mr-2 line-through">
              {formatPrice(product.compareAtCents!)}
            </span>
          )}
          <span className={cn(onSale && "text-sale")}>{formatPrice(product.priceCents)}</span>
        </p>
      </div>

      {product.colors.length > 1 && (
        <div className="mt-3 flex items-center gap-2">
          {product.colors.map((variant, index) => (
            <button
              key={variant.name}
              type="button"
              onMouseEnter={() => setColorIndex(index)}
              onFocus={() => setColorIndex(index)}
              onClick={() => setColorIndex(index)}
              aria-label={`Show ${variant.name}`}
              aria-pressed={index === colorIndex}
              className={cn(
                "size-3.5 border transition-all",
                index === colorIndex ? "border-ink p-px" : "border-transparent",
              )}
            >
              <span
                className="border-line block size-full border"
                style={{ background: variant.hex }}
              />
            </button>
          ))}
        </div>
      )}
    </article>
  );
}
