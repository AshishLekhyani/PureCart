"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Lock } from "lucide-react";
import { useCart, selectLines, selectSubtotal, selectShipping } from "@/store/cart";
import { useOrders } from "@/store/orders";
import { calculateTotals, formatPrice } from "@/lib/money";
import { estimateDelivery, getDeliveryOption } from "@/lib/delivery";
import { createId } from "@/lib/utils";
import type { OrderItem } from "@/lib/types";
import Thumb from "@/components/product/Thumb";

const FIELDS = [
  { name: "email", label: "Email", type: "email", autoComplete: "email", span: 2 },
  { name: "firstName", label: "First name", type: "text", autoComplete: "given-name", span: 1 },
  { name: "lastName", label: "Last name", type: "text", autoComplete: "family-name", span: 1 },
  { name: "address", label: "Address", type: "text", autoComplete: "street-address", span: 2 },
  { name: "city", label: "City", type: "text", autoComplete: "address-level2", span: 1 },
  { name: "postcode", label: "Postcode", type: "text", autoComplete: "postal-code", span: 1 },
] as const;

type FieldName = (typeof FIELDS)[number]["name"];

export default function CheckoutView() {
  const router = useRouter();
  const { items, hydrated, clear } = useCart();
  const place = useOrders((state) => state.place);

  const [values, setValues] = useState<Record<FieldName, string>>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postcode: "",
  });
  const [errors, setErrors] = useState<Partial<Record<FieldName, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);

  const lines = selectLines(items);
  const subtotal = selectSubtotal(items);
  const totals = calculateTotals(subtotal, selectShipping(items));

  if (!hydrated) return <div className="gutter py-32" aria-busy="true" />;

  if (lines.length === 0) {
    return (
      <div className="gutter flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <h1 className="display text-[clamp(2.5rem,7vw,5rem)] uppercase">Nothing to check out</h1>
        <p className="text-muted mt-5">Your bag is empty.</p>
        <Link href="/shop/new" className="btn btn-solid mt-10">
          Shop new in
        </Link>
      </div>
    );
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const missing = FIELDS.filter((field) => !values[field.name].trim()).map((field) => field.name);
    if (missing.length) {
      setErrors(Object.fromEntries(missing.map((name) => [name, true])));
      return;
    }

    setSubmitting(true);

    const placedAt = new Date();
    const orderItems: OrderItem[] = lines.map((line) => ({
      ...line.item,
      priceCents: line.product.priceCents,
      estimatedDeliveryMs: estimateDelivery(
        getDeliveryOption(line.item.deliveryOptionId),
        placedAt,
      ).getTime(),
    }));

    const orderId = createId();
    place({
      id: orderId,
      placedAtMs: placedAt.getTime(),
      totalCents: totals.totalCents,
      items: orderItems,
    });
    clear();

    router.push(`/orders/${orderId}`);
  };

  return (
    <div className="gutter py-14 lg:py-20">
      <h1 className="display text-[clamp(2.5rem,7vw,5rem)] uppercase">Checkout</h1>

      <form onSubmit={handleSubmit} className="mt-12 grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <section>
            <h2 className="label border-line border-b pb-4">01 — Delivery details</h2>

            <div className="mt-7 grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2">
              {FIELDS.map((field) => (
                <div key={field.name} className={field.span === 2 ? "sm:col-span-2" : undefined}>
                  <label htmlFor={field.name} className="label-sm text-muted">
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    value={values[field.name]}
                    onChange={(event) => {
                      setValues((current) => ({ ...current, [field.name]: event.target.value }));
                      setErrors((current) => ({ ...current, [field.name]: false }));
                    }}
                    aria-invalid={Boolean(errors[field.name])}
                    className="field mt-1"
                  />
                  {errors[field.name] && (
                    <p className="label-sm text-sale mt-2">{field.label} is required</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16">
            <h2 className="label border-line border-b pb-4">02 — Payment</h2>

            <p className="label-sm text-muted mt-6 flex items-center gap-2">
              <Lock className="size-4" strokeWidth={1.25} />
              This is a portfolio build. No card details are collected and no payment is taken.
            </p>

            <div className="mt-7 grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="card" className="label-sm text-muted">
                  Card number
                </label>
                <input
                  id="card"
                  className="field mt-1"
                  placeholder="Demo mode — leave blank"
                  disabled
                />
              </div>
            </div>
          </section>
        </div>

        <aside className="lg:col-span-5">
          <div className="border-line sticky top-28 border p-7">
            <h2 className="label">Your order</h2>

            <ul className="mt-6 space-y-5">
              {lines.map((line) => {
                const color =
                  line.product.colors.find((variant) => variant.name === line.item.colorName) ??
                  line.product.colors[0];

                return (
                  <li key={line.key} className="flex gap-4">
                    <div className="relative w-16 shrink-0">
                      <Thumb product={line.product} image={color.image} sizes="64px" />
                      <span className="label-sm bg-ink text-paper absolute -top-2 -right-2 flex size-5 items-center justify-center tabular-nums">
                        {line.item.quantity}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="label truncate">{line.product.name}</p>
                      <p className="label-sm text-muted mt-1">
                        {line.item.colorName}
                        {line.item.size && ` · ${line.item.size}`}
                      </p>
                      <p className="label-sm text-muted mt-1">
                        {getDeliveryOption(line.item.deliveryOptionId).name} delivery
                      </p>
                    </div>

                    <p className="label shrink-0 tabular-nums">
                      {formatPrice(line.lineTotalCents)}
                    </p>
                  </li>
                );
              })}
            </ul>

            <dl className="border-line mt-7 space-y-3 border-t pt-6">
              <div className="flex items-baseline justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd className="tabular-nums">{formatPrice(totals.subtotalCents)}</dd>
              </div>
              <div className="flex items-baseline justify-between">
                <dt className="text-muted">Shipping</dt>
                <dd className="tabular-nums">
                  {totals.shippingCents === 0 ? "Free" : formatPrice(totals.shippingCents)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between">
                <dt className="text-muted">Estimated tax</dt>
                <dd className="tabular-nums">{formatPrice(totals.taxCents)}</dd>
              </div>
            </dl>

            <div className="border-line mt-5 flex items-baseline justify-between border-t pt-5">
              <span className="label">Total</span>
              <span className="tabular-nums">{formatPrice(totals.totalCents)}</span>
            </div>

            <button type="submit" disabled={submitting} className="btn btn-solid mt-7 w-full">
              {submitting ? "Placing order…" : "Place order"}
            </button>

            <Link href="/cart" className="label link-underline text-muted mt-6 block text-center">
              Back to bag
            </Link>
          </div>
        </aside>
      </form>
    </div>
  );
}
