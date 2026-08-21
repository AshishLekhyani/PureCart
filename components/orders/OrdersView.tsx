"use client";

import Image from "next/image";
import Link from "next/link";
import { useOrders } from "@/store/orders";
import { getProduct } from "@/lib/catalog";
import { formatPrice } from "@/lib/money";
import { formatShortDate, getShipmentProgress } from "@/lib/delivery";
import { formatOrderRef } from "@/lib/utils";

export default function OrdersView() {
  const { orders, hydrated } = useOrders();

  if (!hydrated) return <div className="gutter py-32" aria-busy="true" />;

  if (orders.length === 0) {
    return (
      <div className="gutter flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <h1 className="display text-[clamp(2.5rem,7vw,5rem)] uppercase">No orders yet</h1>
        <p className="text-muted mt-5 max-w-sm">
          Once you place an order it will appear here, with tracking from the warehouse to your
          door.
        </p>
        <Link href="/shop/new" className="btn btn-solid mt-10">
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="gutter py-14 lg:py-20">
      <h1 className="display text-[clamp(2.5rem,7vw,5rem)] uppercase">Orders</h1>
      <p className="text-muted mt-3">
        {orders.length} {orders.length === 1 ? "order" : "orders"}
      </p>

      <div className="bg-line mt-12 space-y-px">
        {orders.map((order) => {
          // The whole order is as far along as its slowest line.
          const soonest = Math.min(...order.items.map((item) => item.estimatedDeliveryMs));
          const progress = getShipmentProgress(order.placedAtMs, soonest);

          return (
            <article key={order.id} className="bg-paper p-6 lg:p-8">
              <header className="border-line flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b pb-5">
                <div className="flex flex-wrap gap-x-10 gap-y-3">
                  <Detail label="Order" value={formatOrderRef(order.id)} />
                  <Detail label="Placed" value={formatShortDate(new Date(order.placedAtMs))} />
                  <Detail label="Total" value={formatPrice(order.totalCents)} />
                  <Detail label="Status" value={progress.stage} />
                </div>

                <Link href={`/orders/${order.id}`} className="label link-underline">
                  Track order
                </Link>
              </header>

              <ul className="mt-6 flex flex-wrap gap-6">
                {order.items.map((item, index) => {
                  const product = getProduct(item.productId);
                  if (!product) return null;

                  const color =
                    product.colors.find((variant) => variant.name === item.colorName) ??
                    product.colors[0];

                  return (
                    <li key={`${item.productId}-${index}`} className="flex gap-4">
                      <Link
                        href={`/product/${product.slug}`}
                        className="bg-sand relative aspect-3/4 w-20 shrink-0"
                      >
                        <Image
                          src={color.image}
                          alt={product.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </Link>

                      <div>
                        <Link href={`/product/${product.slug}`} className="label link-underline">
                          {product.name}
                        </Link>
                        <p className="label-sm text-muted mt-1.5">
                          {item.colorName}
                          {item.size && ` · ${item.size}`} · Qty {item.quantity}
                        </p>
                        <p className="label-sm text-muted mt-1">
                          {formatPrice(item.priceCents * item.quantity)}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="label-sm text-muted">{label}</p>
      <p className="label mt-1">{value}</p>
    </div>
  );
}
