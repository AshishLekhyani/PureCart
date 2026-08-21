"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { products, searchProducts } from "@/lib/catalog";
import { formatPrice } from "@/lib/money";
import { cn } from "@/lib/utils";
import Thumb from "@/components/product/Thumb";

const SUGGESTIONS = ["Hoodie", "Chino", "Sneaker", "Earrings", "Towel"];

const popular = products.filter((product) => product.badges.includes("bestseller")).slice(0, 4);

export default function SearchPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => (query.trim() ? searchProducts(query).slice(0, 8) : []), [query]);
  const showing = query.trim() ? results : popular;

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      return;
    }
    setQuery("");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      <div
        aria-hidden={!open}
        onClick={onClose}
        className={cn(
          "bg-ink/25 fixed inset-0 z-30 transition-opacity duration-500",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <div
        className={cn(
          "border-line bg-paper ease-out-soft fixed inset-x-0 top-16 z-40 overflow-hidden border-b transition-[max-height,opacity] duration-500 lg:top-20",
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="gutter max-h-[80vh] overflow-y-auto py-8 lg:py-12">
          <label htmlFor="site-search" className="label-sm text-muted block">
            Search the collection
          </label>
          <input
            ref={inputRef}
            id="site-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="What are you looking for?"
            className="field display mt-2 !text-3xl lg:!text-5xl"
            autoComplete="off"
          />

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="label-sm text-muted">Try</span>
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setQuery(suggestion)}
                className="label link-underline text-ink-soft"
              >
                {suggestion}
              </button>
            ))}
          </div>

          <p className="label-sm text-muted mt-10">
            {query.trim()
              ? `${results.length} result${results.length === 1 ? "" : "s"}`
              : "Most wanted"}
          </p>

          {query.trim() && results.length === 0 ? (
            <p className="text-muted mt-6">
              Nothing matched “{query}”. Try a shorter word, or browse the full collection.
            </p>
          ) : (
            <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
              {showing.map((product) => (
                <li key={product.id}>
                  <Link href={`/product/${product.slug}`} onClick={onClose} className="group block">
                    <Thumb
                      product={product}
                      image={product.colors[0].image}
                      sizes="(max-width: 768px) 45vw, 22vw"
                      hoverZoom
                    />
                    <p className="label mt-3">{product.name}</p>
                    <p className="label-sm text-muted mt-1">{formatPrice(product.priceCents)}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {query.trim() && results.length > 0 && (
            <Link
              href={`/search?q=${encodeURIComponent(query)}`}
              onClick={onClose}
              className="label link-underline mt-10 inline-block"
            >
              See all results
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
