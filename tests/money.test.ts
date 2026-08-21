import { describe, expect, it } from "vitest";
import {
  calculateTotals,
  formatCurrency,
  formatPrice,
  FREE_SHIPPING_THRESHOLD_CENTS,
} from "@/lib/money";
import { STANDARD_SHIPPING_CENTS } from "@/lib/delivery";

describe("formatCurrency", () => {
  it("converts cents to a two-decimal string", () => {
    expect(formatCurrency(2095)).toBe("20.95");
  });

  it("keeps trailing zeroes", () => {
    expect(formatCurrency(2000)).toBe("20.00");
  });

  it("rounds fractional cents to the nearest cent", () => {
    expect(formatCurrency(2000.5)).toBe("20.01");
    expect(formatCurrency(2000.4)).toBe("20.00");
  });

  it("handles zero", () => {
    expect(formatCurrency(0)).toBe("0.00");
  });
});

describe("formatPrice", () => {
  it("prefixes the currency symbol", () => {
    expect(formatPrice(3990)).toBe("$39.90");
  });
});

describe("calculateTotals", () => {
  it("charges shipping in full below the free-shipping threshold", () => {
    const totals = calculateTotals(5000, STANDARD_SHIPPING_CENTS);

    expect(totals.shippingCents).toBe(495);
    expect(totals.taxCents).toBe(550); // 10% of 5495
    expect(totals.totalCents).toBe(6045);
  });

  it("waives the standard fee at the threshold", () => {
    const totals = calculateTotals(FREE_SHIPPING_THRESHOLD_CENTS, STANDARD_SHIPPING_CENTS);

    expect(totals.shippingCents).toBe(0);
    expect(totals.totalCents).toBe(FREE_SHIPPING_THRESHOLD_CENTS + totals.taxCents);
  });

  it("still charges the difference on a faster option above the threshold", () => {
    const totals = calculateTotals(FREE_SHIPPING_THRESHOLD_CENTS, 1495);
    expect(totals.shippingCents).toBe(1495 - STANDARD_SHIPPING_CENTS);
  });

  it("never lets the waiver push shipping negative", () => {
    expect(calculateTotals(FREE_SHIPPING_THRESHOLD_CENTS, 0).shippingCents).toBe(0);
  });

  it("taxes the goods plus whatever shipping is actually charged", () => {
    expect(calculateTotals(1000, 500).taxCents).toBe(150);
  });

  it("returns a zero total for an empty bag", () => {
    expect(calculateTotals(0, 0).totalCents).toBe(0);
  });
});
