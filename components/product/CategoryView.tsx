"use client";

import { useMemo, useState } from "react";
import { Check, SlidersHorizontal, X } from "lucide-react";
import ProductGrid from "./ProductGrid";
import { formatPrice } from "@/lib/money";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "price-desc", label: "Price: high to low" },
  { key: "rating", label: "Top rated" },
];

type Props = {
  title: string;
  tagline: string;
  products: Product[];
};

export default function CategoryView({ title, tagline, products }: Props) {
  const [sort, setSort] = useState<SortKey>("featured");
  const [columns, setColumns] = useState<2 | 4>(4);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeLines, setActiveLines] = useState<string[]>([]);
  const [activeSizes, setActiveSizes] = useState<string[]>([]);
  const [activeColors, setActiveColors] = useState<string[]>([]);
  const [saleOnly, setSaleOnly] = useState(false);

  const lines = useMemo(
    () => [...new Set(products.map((product) => product.line))].sort(),
    [products],
  );

  const sizes = useMemo(
    () => [...new Set(products.flatMap((product) => product.sizes))],
    [products],
  );

  const colors = useMemo(() => {
    const seen = new Map<string, string>();
    for (const product of products) {
      for (const color of product.colors) {
        if (!seen.has(color.name)) seen.set(color.name, color.hex);
      }
    }
    return [...seen].sort((a, b) => a[0].localeCompare(b[0]));
  }, [products]);

  const visible = useMemo(() => {
    const filtered = products.filter((product) => {
      if (activeLines.length && !activeLines.includes(product.line)) return false;
      if (activeSizes.length && !product.sizes.some((size) => activeSizes.includes(size)))
        return false;
      if (activeColors.length && !product.colors.some((color) => activeColors.includes(color.name)))
        return false;
      if (saleOnly && typeof product.compareAtCents !== "number") return false;
      return true;
    });

    const sorted = [...filtered];
    if (sort === "price-asc") sorted.sort((a, b) => a.priceCents - b.priceCents);
    if (sort === "price-desc") sorted.sort((a, b) => b.priceCents - a.priceCents);
    if (sort === "rating")
      sorted.sort((a, b) => b.rating.stars - a.rating.stars || b.rating.count - a.rating.count);

    return sorted;
  }, [products, activeLines, activeSizes, activeColors, saleOnly, sort]);

  const activeCount =
    activeLines.length + activeSizes.length + activeColors.length + (saleOnly ? 1 : 0);

  const toggle = (value: string, list: string[], setList: (next: string[]) => void) =>
    setList(list.includes(value) ? list.filter((entry) => entry !== value) : [...list, value]);

  const clearAll = () => {
    setActiveLines([]);
    setActiveSizes([]);
    setActiveColors([]);
    setSaleOnly(false);
  };

  return (
    <div className="pb-24">
      <header className="gutter pt-14 lg:pt-20">
        <h1 className="display text-[clamp(2.75rem,8vw,6rem)] uppercase">{title}</h1>
        <p className="text-muted mt-3 max-w-md">{tagline}</p>
      </header>

      <div className="gutter border-line bg-paper/95 sticky top-16 z-30 mt-10 flex items-center justify-between gap-4 border-y py-3 backdrop-blur-sm lg:top-20">
        <button
          type="button"
          onClick={() => setFiltersOpen((open) => !open)}
          aria-expanded={filtersOpen}
          className="label inline-flex items-center gap-2"
        >
          <SlidersHorizontal className="size-4" strokeWidth={1.25} />
          Filter
          {activeCount > 0 && <span className="tabular-nums">({activeCount})</span>}
        </button>

        <p className="label-sm text-muted hidden sm:block">
          {visible.length} {visible.length === 1 ? "item" : "items"}
        </p>

        <div className="flex items-center gap-5">
          <div className="hidden items-center gap-1 lg:flex" role="group" aria-label="Grid density">
            {([2, 4] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setColumns(value)}
                aria-pressed={columns === value}
                aria-label={`${value} per row`}
                className={cn(
                  "flex gap-0.5 p-1.5",
                  columns === value ? "opacity-100" : "opacity-30",
                )}
              >
                {Array.from({ length: value }).map((_, index) => (
                  <span key={index} className="bg-ink block h-3.5 w-1" />
                ))}
              </button>
            ))}
          </div>

          <label className="label inline-flex items-center gap-2">
            <span className="sr-only sm:not-sr-only">Sort</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="label cursor-pointer border-0 bg-transparent pr-1 focus:outline-none"
            >
              {SORTS.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div
        className={cn(
          "gutter border-line ease-out-soft overflow-hidden border-b transition-[max-height,opacity] duration-500",
          filtersOpen ? "max-h-[44rem] opacity-100" : "max-h-0 border-transparent opacity-0",
        )}
      >
        <div className="grid gap-10 py-8 sm:grid-cols-2 lg:grid-cols-4">
          <fieldset>
            <legend className="label-sm text-muted">Category</legend>
            <div className="mt-4 flex flex-wrap gap-2">
              {lines.map((line) => (
                <FilterChip
                  key={line}
                  label={line}
                  active={activeLines.includes(line)}
                  onClick={() => toggle(line, activeLines, setActiveLines)}
                />
              ))}
            </div>
          </fieldset>

          {sizes.length > 0 && (
            <fieldset>
              <legend className="label-sm text-muted">Size</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <FilterChip
                    key={size}
                    label={size}
                    active={activeSizes.includes(size)}
                    onClick={() => toggle(size, activeSizes, setActiveSizes)}
                  />
                ))}
              </div>
            </fieldset>
          )}

          <fieldset>
            <legend className="label-sm text-muted">Colour</legend>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {colors.map(([name, hex]) => {
                const active = activeColors.includes(name);

                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => toggle(name, activeColors, setActiveColors)}
                    aria-pressed={active}
                    title={name}
                    className={cn(
                      "size-7 border transition-all",
                      active ? "border-ink p-0.5" : "hover:border-line border-transparent",
                    )}
                  >
                    <span className="sr-only">{name}</span>
                    <span
                      aria-hidden
                      className="border-line block size-full border"
                      style={{ background: hex }}
                    />
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset>
            <legend className="label-sm text-muted">Price</legend>
            <div className="mt-4 flex flex-wrap gap-2">
              <FilterChip
                label="Reduced"
                active={saleOnly}
                onClick={() => setSaleOnly((on) => !on)}
              />
            </div>

            {activeCount > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="label-sm link-underline text-muted mt-6 inline-flex items-center gap-1.5"
              >
                <X className="size-3" strokeWidth={1.5} />
                Clear all
              </button>
            )}
          </fieldset>
        </div>
      </div>

      <div className="gutter pt-12">
        {visible.length === 0 ? (
          <div className="py-24 text-center">
            <p className="display text-3xl">Nothing matches those filters</p>
            <button type="button" onClick={clearAll} className="btn btn-outline mt-8">
              Clear filters
            </button>
          </div>
        ) : (
          <ProductGrid products={visible} columns={columns} priorityCount={4} />
        )}
      </div>

      {visible.length > 0 && (
        <p className="label-sm text-muted mt-16 text-center">
          Showing {visible.length} of {products.length} · from{" "}
          {formatPrice(Math.min(...products.map((p) => p.priceCents)))}
        </p>
      )}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "label-sm inline-flex items-center gap-1.5 border px-3 py-2 transition-colors",
        active ? "border-ink bg-ink text-paper" : "border-line hover:border-ink",
      )}
    >
      {active && <Check className="size-3" strokeWidth={2} />}
      {label}
    </button>
  );
}
