"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { X } from "lucide-react";
import { useCart, selectLines, selectSubtotal, selectCount } from "@/store/cart";
import { formatPrice, FREE_SHIPPING_THRESHOLD_CENTS } from "@/lib/money";
import { cn } from "@/lib/utils";
import { useDialog } from "@/hooks/useDialog";
import { products } from "@/lib/catalog";
import QuantityStepper from "./QuantityStepper";

const suggestions = products.filter((product) => product.badges.includes("bestseller")).slice(0, 2);

export default function CartDrawer() {
  const { items, isOpen, hydrated, closeDrawer, remove, setQuantity } = useCart();
  const panelRef = useRef<HTMLElement>(null);

  const lines = selectLines(items);
  const subtotal = selectSubtotal(items);
  const count = selectCount(items);
  const remaining = FREE_SHIPPING_THRESHOLD_CENTS - subtotal;

  useDialog({ open: isOpen, onClose: closeDrawer, ref: panelRef });

  return (
    <>
      <div
        aria-hidden
        onClick={closeDrawer}
        className={cn(
          "bg-ink/35 fixed inset-0 z-70 transition-opacity duration-500",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        // Hidden from the tab order when closed, or its links stay reachable
        // behind the page while the panel sits off-screen.
        inert={!isOpen}
        className={cn(
          "border-line bg-paper ease-out-soft fixed top-0 right-0 z-80 flex h-full w-full max-w-md flex-col border-l transition-transform duration-500",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <header className="border-line flex items-center justify-between border-b px-6 py-5">
          <h2 className="label">
            Shopping Bag <span className="text-muted tabular-nums">({hydrated ? count : 0})</span>
          </h2>
          <button type="button" onClick={closeDrawer} aria-label="Close bag">
            <X className="size-5" strokeWidth={1.25} />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col items-center gap-6 px-8 py-14 text-center">
              <p className="display text-3xl">Your bag is empty</p>
              <p className="text-muted">
                Nothing in here yet. The new season is a good place to start.
              </p>
              <Link href="/shop/new" onClick={closeDrawer} className="btn btn-solid">
                Shop New In
              </Link>
            </div>

            {/* An empty bag is the one place a suggestion is genuinely useful. */}
            <div className="border-line border-t px-6 py-8">
              <p className="label-sm text-muted">Most wanted</p>
              <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-6">
                {suggestions.map((product) => (
                  <li key={product.id}>
                    <Link
                      href={`/product/${product.slug}`}
                      onClick={closeDrawer}
                      className="group block"
                    >
                      <div className="bg-sand relative aspect-3/4 overflow-hidden">
                        <Image
                          src={product.colors[0].image}
                          alt={product.name}
                          fill
                          sizes="180px"
                          className="ease-out-soft object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <p className="label mt-3">{product.name}</p>
                      <p className="label-sm text-muted mt-1 tabular-nums">
                        {formatPrice(product.priceCents)}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <>
            <div className="border-line border-b px-6 py-3">
              <p className="label-sm text-muted">
                {remaining > 0
                  ? `${formatPrice(remaining)} away from free shipping`
                  : "You have earned free shipping"}
              </p>
              <div className="bg-line mt-2 h-px w-full">
                <div
                  className="bg-ink ease-out-soft h-px transition-[width] duration-700"
                  style={{
                    width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD_CENTS) * 100)}%`,
                  }}
                />
              </div>
            </div>

            <ul className="divide-line flex-1 divide-y overflow-y-auto px-6">
              {lines.map((line) => {
                const color =
                  line.product.colors.find((c) => c.name === line.item.colorName) ??
                  line.product.colors[0];

                return (
                  <li key={line.key} className="flex gap-4 py-5">
                    <Link
                      href={`/product/${line.product.slug}`}
                      onClick={closeDrawer}
                      className="bg-sand relative aspect-3/4 w-20 shrink-0 overflow-hidden"
                    >
                      <Image
                        src={color.image}
                        alt={line.product.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <Link
                          href={`/product/${line.product.slug}`}
                          onClick={closeDrawer}
                          className="label truncate"
                        >
                          {line.product.name}
                        </Link>
                        <p className="label shrink-0 tabular-nums">
                          {formatPrice(line.lineTotalCents)}
                        </p>
                      </div>

                      <p className="label-sm text-muted mt-1">
                        {line.item.colorName}
                        {line.item.size && ` · Size ${line.item.size}`}
                      </p>

                      <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                        <QuantityStepper
                          value={line.item.quantity}
                          onChange={(quantity) => setQuantity(line.key, quantity)}
                        />
                        <button
                          type="button"
                          onClick={() => remove(line.key)}
                          className="label-sm link-underline text-muted"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <footer className="border-line border-t px-6 py-5">
              <div className="flex items-baseline justify-between">
                <span className="label">Subtotal</span>
                <span className="label tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <p className="label-sm text-muted mt-1">Shipping and tax calculated at checkout.</p>

              <Link href="/checkout" onClick={closeDrawer} className="btn btn-solid mt-5 w-full">
                Checkout
              </Link>
              <Link href="/cart" onClick={closeDrawer} className="btn btn-outline mt-2 w-full">
                View bag
              </Link>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
