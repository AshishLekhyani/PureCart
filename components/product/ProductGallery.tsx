"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { cn } from "@/lib/utils";
import ProductLightbox from "./ProductLightbox";
import type { Product } from "@/lib/types";

type Props = {
  product: Product;
  index: number;
  onChange: (index: number) => void;
};

export default function ProductGallery({ product, index, onChange }: Props) {
  const [zoomed, setZoomed] = useState(false);

  const still = product.shot === "still";
  const total = product.colors.length;
  const active = product.colors[index];
  const go = (next: number) => onChange((next + total) % total);

  const widest = Math.max(...product.colors.map((variant) => variant.width / variant.height));
  const stageRatio = Math.min(Math.max(widest, 0.62), 1.8);

  return (
    <div className="border-line lg:border-r">
      <div
        className="border-line bg-paper relative w-full border-b"
        style={{
          aspectRatio: String(stageRatio),
          minHeight: "18rem",
          maxHeight: "calc(100svh - 11rem)",
        }}
        onKeyDown={(event) => {
          if (total < 2) return;
          if (event.key === "ArrowLeft") go(index - 1);
          if (event.key === "ArrowRight") go(index + 1);
        }}
      >
        {product.colors.map((variant, position) => (
          <button
            key={variant.name}
            type="button"
            tabIndex={position === index ? 0 : -1}
            onClick={() => setZoomed(true)}
            aria-label={`Expand ${product.name} in ${variant.name}`}
            aria-hidden={position !== index}
            className={cn(
              "ease-out-soft absolute inset-0 block cursor-zoom-in transition-opacity duration-500",
              still ? "p-6 lg:p-10" : "p-3 lg:p-6",
              position === index ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <Image
              src={variant.image}
              alt={`${product.name} in ${variant.name}`}
              fill
              priority={position === 0}
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-contain"
            />
          </button>
        ))}

        <span
          aria-hidden
          className="border-line bg-paper/90 text-muted absolute top-4 right-4 flex size-9 items-center justify-center border backdrop-blur-sm"
        >
          <Expand className="size-4" strokeWidth={1.25} />
        </span>

        {total > 1 && (
          <>
            <GalleryArrow direction="prev" onClick={() => go(index - 1)} />
            <GalleryArrow direction="next" onClick={() => go(index + 1)} />

            <p className="label-sm text-muted absolute bottom-4 left-4 tabular-nums" aria-hidden>
              {index + 1} / {total}
            </p>
          </>
        )}

        <p className="sr-only" aria-live="polite">
          {`Image ${index + 1} of ${total}, ${active.name}`}
        </p>
      </div>

      {total > 1 && (
        <div className="no-scrollbar flex gap-2 overflow-x-auto p-4">
          {product.colors.map((variant, position) => (
            <button
              key={variant.name}
              type="button"
              onClick={() => onChange(position)}
              aria-label={`Show ${variant.name}`}
              aria-current={position === index}
              className={cn(
                "bg-paper relative aspect-square w-16 shrink-0 border transition-colors",
                position === index ? "border-ink" : "border-line hover:border-ink/40",
              )}
            >
              <Image
                src={variant.image}
                alt=""
                fill
                sizes="64px"
                className="object-contain p-1.5"
              />
            </button>
          ))}
        </div>
      )}

      <ProductLightbox
        product={product}
        index={index}
        open={zoomed}
        onClose={() => setZoomed(false)}
        onChange={onChange}
      />
    </div>
  );
}

function GalleryArrow({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous image" : "Next image"}
      className={cn(
        "border-line bg-paper/90 hover:bg-ink hover:text-paper absolute top-1/2 flex size-10 -translate-y-1/2 items-center justify-center border backdrop-blur-sm transition-colors",
        direction === "prev" ? "left-4" : "right-4",
      )}
    >
      <Icon className="size-5" strokeWidth={1.25} />
    </button>
  );
}
