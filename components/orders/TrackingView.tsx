"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useOrders, selectOrder } from "@/store/orders";
import { getProduct } from "@/lib/catalog";
import { formatPrice } from "@/lib/money";
import { formatDeliveryDate, formatShortDate, getShipmentProgress } from "@/lib/delivery";
import { formatOrderRef } from "@/lib/utils";
import { cn } from "@/lib/utils";

const STAGES = ["Preparing", "Shipped", "Delivered"] as const;

export default function TrackingView({ orderId }: { orderId: string }) {
  const { orders, hydrated } = useOrders();
  const order = selectOrder(orders, orderId);

  // Progress depends on the current time, so it is only computed after mount.
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(timer);
  }, []);

  if (!hydrated) return <div className="gutter py-32" aria-busy="true" />;

  if (!order) {
    return (
      <div className="gutter flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <h1 className="display text-[clamp(2.5rem,7vw,5rem)] uppercase">Order not found</h1>
        <p className="text-muted mt-5 max-w-sm">
          We could not find that order in this browser. Orders are stored locally, so they will not
          follow you to another device.
        </p>
        <Link href="/orders" className="btn btn-solid mt-10">
          All orders
        </Link>
      </div>
    );
  }

  return (
    <div className="gutter py-14 lg:py-20">
      <Link href="/orders" className="label link-underline text-muted">
        ← All orders
      </Link>

      <h1 className="display mt-6 text-[clamp(2.5rem,7vw,5rem)] uppercase">
        Order {formatOrderRef(order.id)}
      </h1>

      <div className="mt-5 flex flex-wrap gap-x-10 gap-y-3">
        <div>
          <p className="label-sm text-muted">Placed</p>
          <p className="label mt-1">{formatShortDate(new Date(order.placedAtMs))}</p>
        </div>
        <div>
          <p className="label-sm text-muted">Items</p>
          <p className="label mt-1 tabular-nums">
            {order.items.reduce((total, item) => total + item.quantity, 0)}
          </p>
        </div>
        <div>
          <p className="label-sm text-muted">Total paid</p>
          <p className="label mt-1 tabular-nums">{formatPrice(order.totalCents)}</p>
        </div>
      </div>

      <div className="bg-line mt-14 space-y-px">
        {order.items.map((item, index) => {
          const product = getProduct(item.productId);
          if (!product) return null;

          const color =
            product.colors.find((variant) => variant.name === item.colorName) ?? product.colors[0];
          const progress = getShipmentProgress(
            order.placedAtMs,
            item.estimatedDeliveryMs,
            now ?? order.placedAtMs,
          );
          const stageIndex = STAGES.indexOf(progress.stage);

          return (
            <article key={`${item.productId}-${index}`} className="bg-paper p-6 lg:p-10">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
                <Link
                  href={`/product/${product.slug}`}
                  className="bg-sand relative aspect-3/4 w-32 shrink-0 lg:w-40"
                >
                  <Image
                    src={color.image}
                    alt={product.name}
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </Link>

                <div className="flex-1">
                  <p className="label-sm text-muted">
                    {progress.stage === "Delivered" ? "Delivered on" : "Arriving"}
                  </p>
                  <p className="display mt-2 text-2xl">
                    {formatDeliveryDate(new Date(item.estimatedDeliveryMs))}
                  </p>

                  <Link
                    href={`/product/${product.slug}`}
                    className="label link-underline mt-5 inline-block"
                  >
                    {product.name}
                  </Link>
                  <p className="label-sm text-muted mt-1.5">
                    {item.colorName}
                    {item.size && ` · ${item.size}`} · Qty {item.quantity} ·{" "}
                    {formatPrice(item.priceCents * item.quantity)}
                  </p>

                  {/* Progress rail */}
                  <div className="mt-9">
                    <div className="bg-line relative h-px w-full">
                      <div
                        className="bg-ink ease-out-soft absolute inset-y-0 left-0 transition-[width] duration-1000"
                        style={{ width: `${progress.percent}%` }}
                      />
                      {STAGES.map((stage, position) => (
                        <span
                          key={stage}
                          aria-hidden
                          style={{ left: `${(position / (STAGES.length - 1)) * 100}%` }}
                          className={cn(
                            "absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 border transition-colors duration-500",
                            position <= stageIndex ? "border-ink bg-ink" : "border-line bg-paper",
                          )}
                        />
                      ))}
                    </div>

                    <div className="mt-4 flex justify-between">
                      {STAGES.map((stage, position) => (
                        <span
                          key={stage}
                          className={cn(
                            "label-sm",
                            position === stageIndex
                              ? "text-ink"
                              : position < stageIndex
                                ? "text-ink-soft"
                                : "text-muted",
                          )}
                        >
                          {stage}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-14 flex flex-wrap gap-3">
        <Link href="/shop/new" className="btn btn-outline">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
