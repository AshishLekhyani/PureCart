"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart, selectLines, selectSubtotal, selectShipping } from "@/store/cart";
import { calculateTotals, formatPrice, FREE_SHIPPING_THRESHOLD_CENTS } from "@/lib/money";
import { deliveryOptions } from "@/lib/delivery";
import { cn } from "@/lib/utils";
import QuantityStepper from "./QuantityStepper";

export default function CartView() {
  const { items, hydrated, remove, setQuantity, setDeliveryOption } = useCart();

  const lines = selectLines(items);
  const subtotal = selectSubtotal(items);
  const totals = calculateTotals(subtotal, selectShipping(items));

  if (!hydrated) {
    return <div className="gutter py-32" aria-busy="true" />;
  }

  if (lines.length === 0) {
    return (
      <div className="gutter flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <h1 className="display text-[clamp(2.5rem,7vw,5rem)] uppercase">Your bag is empty</h1>
        <p className="text-muted mt-5 max-w-sm">
          Nothing in here yet. Start with the pieces everyone else is taking home.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/shop/new" className="btn btn-solid">
            Shop new in
          </Link>
          <Link href="/shop/women" className="btn btn-outline">
            Shop women
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="gutter py-14 lg:py-20">
      <h1 className="display text-[clamp(2.5rem,7vw,5rem)] uppercase">Shopping Bag</h1>

      <div className="mt-12 grid gap-16 lg:grid-cols-12 lg:gap-12">
        {/* Lines */}
        <ul className="divide-line border-line divide-y border-y lg:col-span-8">
          {lines.map((line) => {
            const color =
              line.product.colors.find((variant) => variant.name === line.item.colorName) ??
              line.product.colors[0];

            return (
              <li
                key={line.key}
                className="grid grid-cols-[6rem_1fr] gap-5 py-8 sm:grid-cols-[9rem_1fr] sm:gap-8"
              >
                <Link
                  href={`/product/${line.product.slug}`}
                  className="bg-sand relative aspect-3/4 overflow-hidden"
                >
                  <Image
                    src={color.image}
                    alt={line.product.name}
                    fill
                    sizes="(max-width: 640px) 96px, 144px"
                    className="object-cover"
                  />
                </Link>

                <div className="flex flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link href={`/product/${line.product.slug}`} className="label link-underline">
                        {line.product.name}
                      </Link>
                      <p className="label-sm text-muted mt-1.5">
                        {line.item.colorName}
                        {line.item.size && ` · Size ${line.item.size}`}
                      </p>
                      <p className="label-sm text-muted mt-1">
                        {formatPrice(line.product.priceCents)} each
                      </p>
                    </div>

                    <p className="label shrink-0 tabular-nums">
                      {formatPrice(line.lineTotalCents)}
                    </p>
                  </div>

                  {/* Per-line delivery speed */}
                  <fieldset className="mt-5">
                    <legend className="label-sm text-muted">Delivery</legend>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {deliveryOptions.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setDeliveryOption(line.key, option.id)}
                          aria-pressed={line.item.deliveryOptionId === option.id}
                          className={cn(
                            "label-sm border px-3 py-2 transition-colors",
                            line.item.deliveryOptionId === option.id
                              ? "border-ink bg-ink text-paper"
                              : "border-line hover:border-ink",
                          )}
                        >
                          {option.name} ·{" "}
                          {option.priceCents === 0 ? "Free" : formatPrice(option.priceCents)}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <div className="mt-auto flex items-center justify-between gap-4 pt-6">
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

        {/* Summary */}
        <aside className="lg:col-span-4">
          <div className="border-line sticky top-28 border p-7">
            <h2 className="label">Order summary</h2>

            <dl className="mt-6 space-y-3">
              <Row label="Subtotal" value={formatPrice(totals.subtotalCents)} />
              <Row
                label="Shipping"
                value={totals.shippingCents === 0 ? "Free" : formatPrice(totals.shippingCents)}
              />
              <Row label="Estimated tax" value={formatPrice(totals.taxCents)} />
            </dl>

            <div className="border-line mt-5 flex items-baseline justify-between border-t pt-5">
              <span className="label">Total</span>
              <span className="tabular-nums">{formatPrice(totals.totalCents)}</span>
            </div>

            {subtotal < FREE_SHIPPING_THRESHOLD_CENTS && (
              <p className="label-sm text-muted mt-4">
                Add {formatPrice(FREE_SHIPPING_THRESHOLD_CENTS - subtotal)} for free shipping.
              </p>
            )}

            <Link href="/checkout" className="btn btn-solid mt-7 w-full">
              Checkout
            </Link>
            <Link
              href="/shop/new"
              className="label link-underline text-muted mt-6 block text-center"
            >
              Continue shopping
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <dt className="text-muted">{label}</dt>
      <dd className="tabular-nums">{value}</dd>
    </div>
  );
}
