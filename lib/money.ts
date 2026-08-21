import { STANDARD_SHIPPING_CENTS } from "./delivery";

/** Formats a cent amount as a plain decimal string, e.g. 3990 -> "39.90". */
export function formatCurrency(priceCents: number): string {
  return (Math.round(priceCents) / 100).toFixed(2);
}

/** Formats a cent amount with its currency symbol, e.g. 3990 -> "$39.90". */
export function formatPrice(priceCents: number): string {
  return `$${formatCurrency(priceCents)}`;
}

export const FREE_SHIPPING_THRESHOLD_CENTS = 7500;
const TAX_RATE = 0.1;

export type Totals = {
  subtotalCents: number;
  shippingCents: number;
  taxCents: number;
  totalCents: number;
};

/**
 * Order totals. Clearing the free-shipping threshold waives the standard fee —
 * faster options still cost the difference — and tax applies to the goods plus
 * whatever shipping is actually charged.
 */
export function calculateTotals(subtotalCents: number, shippingCents: number): Totals {
  const shipping =
    subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS
      ? Math.max(0, shippingCents - STANDARD_SHIPPING_CENTS)
      : shippingCents;
  const taxCents = Math.round((subtotalCents + shipping) * TAX_RATE);

  return {
    subtotalCents,
    shippingCents: shipping,
    taxCents,
    totalCents: subtotalCents + shipping + taxCents,
  };
}
