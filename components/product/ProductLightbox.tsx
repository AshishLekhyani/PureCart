"use client";

import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useDialog } from "@/hooks/useDialog";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

type Props = {
  product: Product;
  index: number;
  open: boolean;
  onClose: () => void;
  onChange: (index: number) => void;
};

export default function ProductLightbox({ product, index, open, onClose, onChange }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  useDialog({ open, onClose, ref: panelRef });

  const total = product.colors.length;
  const active = product.colors[index];
  const go = (next: number) => onChange((next + total) % total);

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} image viewer`}
      inert={!open}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") go(index - 1);
        if (event.key === "ArrowRight") go(index + 1);
      }}
      className={cn(
        "bg-paper fixed inset-0 z-90 flex flex-col transition-opacity duration-300",
        open ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <header className="border-line flex shrink-0 items-center justify-between border-b px-6 py-4">
        <p className="label">
          {product.name}
          <span className="text-muted ml-3">{active.name}</span>
        </p>

        <div className="flex items-center gap-6">
          {total > 1 && (
            <span className="label-sm text-muted tabular-nums">
              {index + 1} / {total}
            </span>
          )}
          <button type="button" onClick={onClose} aria-label="Close image viewer">
            <X className="size-5" strokeWidth={1.25} />
          </button>
        </div>
      </header>

      <div className="relative min-h-0 flex-1">
        {open && (
          <Image
            key={active.image}
            src={active.image}
            alt={`${product.name} in ${active.name}`}
            fill
            sizes="90vw"
            className="object-contain p-4 lg:p-10"
          />
        )}

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous image"
              className="border-line bg-paper/90 hover:bg-ink hover:text-paper absolute top-1/2 left-4 flex size-11 -translate-y-1/2 items-center justify-center border transition-colors lg:left-8"
            >
              <ChevronLeft className="size-5" strokeWidth={1.25} />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next image"
              className="border-line bg-paper/90 hover:bg-ink hover:text-paper absolute top-1/2 right-4 flex size-11 -translate-y-1/2 items-center justify-center border transition-colors lg:right-8"
            >
              <ChevronRight className="size-5" strokeWidth={1.25} />
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="border-line flex shrink-0 justify-center gap-2 border-t p-4">
          {product.colors.map((variant, position) => (
            <button
              key={variant.name}
              type="button"
              onClick={() => onChange(position)}
              aria-label={`Show ${variant.name}`}
              aria-current={position === index}
              className={cn(
                "bg-paper relative aspect-square w-14 shrink-0 border transition-colors",
                position === index ? "border-ink" : "border-line hover:border-ink/40",
              )}
            >
              <Image src={variant.image} alt="" fill sizes="56px" className="object-contain p-1" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
