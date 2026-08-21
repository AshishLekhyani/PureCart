"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Minus, Plus, Star, Truck } from "lucide-react";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/money";
import { deliveryOptions, estimateDelivery, formatDeliveryDate } from "@/lib/delivery";
import { cn } from "@/lib/utils";
import WishlistButton from "./WishlistButton";
import SizeGuideDrawer from "./SizeGuideDrawer";
import { tableForSizes } from "@/lib/sizeGuide";
import type { Product } from "@/lib/types";

export default function ProductDetail({ product }: { product: Product }) {
  const add = useCart((state) => state.add);

  const [colorIndex, setColorIndex] = useState(0);
  const [size, setSize] = useState<string | null>(product.sizes.length ? null : "");
  const [showSizeError, setShowSizeError] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  // The sticky mobile bar appears once the real add-to-bag button scrolls away.
  const addButtonRef = useRef<HTMLDivElement>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const color = product.colors[colorIndex];
  const onSale = typeof product.compareAtCents === "number";
  // Null for sock packs and homeware, where a body-measurement chart says nothing.
  const sizeGuide = tableForSizes(product.sizes);

  // The chosen colourway leads; the rest of the range follows it down the page.
  const gallery = useMemo(
    () => [color, ...product.colors.filter((variant) => variant.name !== color.name)],
    [color, product.colors],
  );

  // Resolved after mount: the page is prerendered, so "today" is only known on the client.
  const [arrival, setArrival] = useState<string | null>(null);
  useEffect(() => {
    setArrival(formatDeliveryDate(estimateDelivery(deliveryOptions[0])));
  }, []);

  useEffect(() => {
    const target = addButtonRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const handleAdd = () => {
    if (size === null) {
      setShowSizeError(true);
      // Scrolling the picker back into view is the only useful response on mobile,
      // where the request came from the sticky bar rather than the form itself.
      addButtonRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    add(product, color.name, size);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12">
      {/* Gallery */}
      <div className="lg:col-span-7">
        <div className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto lg:grid lg:grid-cols-2 lg:gap-px lg:overflow-visible">
          {gallery.map((variant, index) => (
            <div
              key={variant.name}
              className={cn(
                "bg-sand relative aspect-3/4 w-full shrink-0 snap-start",
                // A lone image spans the full width rather than leaving a gap.
                gallery.length === 1 && "lg:col-span-2 lg:aspect-4/3",
              )}
            >
              <Image
                src={variant.image}
                alt={`${product.name} in ${variant.name}`}
                fill
                priority={index === 0}
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover object-top"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Detail column */}
      <div className="lg:col-span-5">
        <div className="px-gutter sticky top-16 py-10 lg:top-20 lg:px-14 lg:py-16">
          <nav aria-label="Breadcrumb" className="label-sm text-muted">
            <Link href={`/shop/${product.category}`} className="link-underline">
              {product.category}
            </Link>
            <span className="mx-2">/</span>
            <span>{product.line}</span>
          </nav>

          <h1 className="display mt-5 text-[clamp(2rem,4vw,3rem)] uppercase">{product.name}</h1>

          <div className="mt-4 flex items-baseline gap-3">
            {onSale && (
              <span className="text-muted tabular-nums line-through">
                {formatPrice(product.compareAtCents!)}
              </span>
            )}
            <span className={cn("text-lg tabular-nums", onSale && "text-sale")}>
              {formatPrice(product.priceCents)}
            </span>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <span className="flex items-center gap-0.5" aria-hidden>
              {Array.from({ length: 5 }).map((_, index) => {
                const filled = index + 1 <= product.rating.stars;
                const half = !filled && index + 0.5 <= product.rating.stars;

                return (
                  <Star
                    key={index}
                    className={cn(
                      "size-3",
                      filled && "fill-ink text-ink",
                      half && "fill-ink/40 text-ink",
                      !filled && !half && "text-line",
                    )}
                    strokeWidth={1}
                  />
                );
              })}
            </span>
            <span className="label-sm text-muted">
              {product.rating.stars.toFixed(1)} · {product.rating.count.toLocaleString()} reviews
            </span>
          </div>

          <p className="text-ink-soft mt-7">{product.description}</p>

          {/* Colour */}
          <div className="mt-9">
            <p className="label-sm">
              Colour — <span className="text-muted">{color.name}</span>
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2.5">
              {product.colors.map((variant, index) => (
                <button
                  key={variant.name}
                  type="button"
                  onClick={() => setColorIndex(index)}
                  aria-label={variant.name}
                  aria-pressed={index === colorIndex}
                  className={cn(
                    "size-7 border transition-all",
                    index === colorIndex
                      ? "border-ink p-0.5"
                      : "hover:border-line border-transparent",
                  )}
                >
                  <span
                    className="border-line block size-full border"
                    style={{ background: variant.hex }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          {product.sizes.length > 0 && (
            <div className="mt-8">
              <div className="flex items-baseline justify-between">
                <p className="label-sm">Size</p>
                {sizeGuide && (
                  <button
                    type="button"
                    onClick={() => setSizeGuideOpen(true)}
                    className="label-sm link-underline text-muted"
                  >
                    Size guide
                  </button>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setSize(option);
                      setShowSizeError(false);
                    }}
                    aria-pressed={size === option}
                    className={cn(
                      "label-sm min-w-14 border px-3 py-3 transition-colors",
                      size === option
                        ? "border-ink bg-ink text-paper"
                        : "border-line hover:border-ink",
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {showSizeError && (
                <p role="alert" className="label-sm text-sale mt-3">
                  Please select a size
                </p>
              )}
            </div>
          )}

          <div ref={addButtonRef} className="mt-8 flex gap-2">
            <button type="button" onClick={handleAdd} className="btn btn-solid flex-1">
              Add to bag
            </button>
            <WishlistButton productId={product.id} productName={product.name} variant="inline" />
          </div>

          <p className="label-sm text-muted mt-4 flex items-start gap-2">
            <Truck className="mt-0.5 size-4 shrink-0" strokeWidth={1.25} />
            <span>
              Free standard shipping over $75
              {arrival && (
                <>
                  <br />
                  Order today, arrives {arrival}
                </>
              )}
            </span>
          </p>

          <div className="border-line mt-10 border-t">
            <Accordion title="Composition & care" defaultOpen>
              <ul className="space-y-1.5">
                {product.details.map((detail) => (
                  <li key={detail} className="text-ink-soft">
                    {detail}
                  </li>
                ))}
              </ul>
            </Accordion>

            <Accordion title="Shipping & returns">
              <ul className="text-ink-soft space-y-1.5">
                {deliveryOptions.map((option) => (
                  <li key={option.id}>
                    {option.name} — {option.businessDays} working{" "}
                    {option.businessDays === 1 ? "day" : "days"},{" "}
                    {option.priceCents === 0 ? "free" : formatPrice(option.priceCents)}
                  </li>
                ))}
                <li>Free returns within 30 days, unworn and with tags attached.</li>
              </ul>
            </Accordion>
          </div>
        </div>
      </div>

      {/* Sticky mobile purchase bar */}
      <div
        className={cn(
          "border-line bg-paper/95 ease-out-soft fixed inset-x-0 bottom-0 z-40 border-t backdrop-blur-sm transition-transform duration-500 lg:hidden",
          showStickyBar ? "translate-y-0" : "translate-y-full",
        )}
      >
        <div className="gutter flex items-center gap-4 py-3">
          <div className="min-w-0 flex-1">
            <p className="label truncate">{product.name}</p>
            <p className="label-sm text-muted mt-0.5 tabular-nums">
              {size ? `Size ${size} · ` : ""}
              {formatPrice(product.priceCents)}
            </p>
          </div>

          <button type="button" onClick={handleAdd} className="btn btn-solid px-6 py-3.5">
            Add
          </button>
        </div>
      </div>

      {sizeGuide && (
        <SizeGuideDrawer
          open={sizeGuideOpen}
          onClose={() => setSizeGuideOpen(false)}
          table={sizeGuide}
        />
      )}
    </div>
  );
}

function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-line border-b">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="label flex w-full items-center justify-between py-4 text-left"
      >
        {title}
        {open ? (
          <Minus className="size-4" strokeWidth={1.25} />
        ) : (
          <Plus className="size-4" strokeWidth={1.25} />
        )}
      </button>

      <div
        className={cn(
          "ease-out-soft grid transition-[grid-template-rows,opacity] duration-500",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="pb-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
