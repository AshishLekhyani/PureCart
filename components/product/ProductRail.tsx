"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

type Props = {
  title: string;
  products: Product[];
  href?: string;
  cta?: string;
};

export default function ProductRail({ title, products, href, cta = "View all" }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const syncEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    setAtStart(track.scrollLeft <= 1);
    setAtEnd(maxScroll <= 1 || track.scrollLeft >= maxScroll - 1);
  }, []);

  useEffect(() => {
    syncEdges();
    window.addEventListener("resize", syncEdges);
    return () => window.removeEventListener("resize", syncEdges);
  }, [syncEdges, products]);

  const scrollByPage = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" });
  };

  if (products.length === 0) return null;

  return (
    <section className="py-20 lg:py-28">
      <div className="gutter flex items-end justify-between gap-6">
        <h2 className="display text-[clamp(2rem,5vw,3.5rem)] uppercase">{title}</h2>

        <div className="flex shrink-0 items-center gap-6 pb-2">
          {href && (
            <Link href={href} className="label link-underline">
              {cta}
            </Link>
          )}

          <div className="hidden items-center gap-2 lg:flex" aria-hidden>
            <RailArrow direction="left" disabled={atStart} onClick={() => scrollByPage(-1)} />
            <RailArrow direction="right" disabled={atEnd} onClick={() => scrollByPage(1)} />
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={syncEdges}
        className="no-scrollbar px-gutter scroll-px-gutter mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
      >
        {products.map((product) => (
          <div key={product.id} className="w-[62vw] shrink-0 snap-start sm:w-[38vw] lg:w-[23vw]">
            <ProductCard product={product} columns={4} />
          </div>
        ))}
      </div>
    </section>
  );
}

function RailArrow({
  direction,
  disabled,
  onClick,
}: {
  direction: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = direction === "left" ? ArrowLeft : ArrowRight;

  return (
    <button
      type="button"
      tabIndex={-1}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "border-line hover:border-ink hover:bg-ink hover:text-paper flex size-9 items-center justify-center border transition-colors",
        disabled && "pointer-events-none opacity-25",
      )}
    >
      <Icon className="size-4" strokeWidth={1.25} />
    </button>
  );
}
