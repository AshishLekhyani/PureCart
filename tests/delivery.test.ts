import { describe, expect, it } from "vitest";
import {
  addBusinessDays,
  deliveryOptions,
  estimateDelivery,
  getDeliveryOption,
  getShipmentProgress,
} from "@/lib/delivery";

// Monday 5 January 2026, chosen so weekday arithmetic is easy to read.
const MONDAY = new Date(2026, 0, 5);
const FRIDAY = new Date(2026, 0, 9);

describe("getDeliveryOption", () => {
  it("finds an option by id", () => {
    expect(getDeliveryOption("3").businessDays).toBe(1);
  });

  it("falls back to standard for an unknown id", () => {
    expect(getDeliveryOption("does-not-exist")).toBe(deliveryOptions[0]);
  });
});

describe("addBusinessDays", () => {
  it("advances within the same week", () => {
    expect(addBusinessDays(MONDAY, 3).getDate()).toBe(8); // Thursday
  });

  it("skips the weekend", () => {
    const result = addBusinessDays(FRIDAY, 1);
    expect(result.getDay()).toBe(1); // Monday
    expect(result.getDate()).toBe(12);
  });

  it("never lands on a Saturday or Sunday", () => {
    for (let days = 1; days <= 20; days++) {
      const day = addBusinessDays(MONDAY, days).getDay();
      expect([0, 6]).not.toContain(day);
    }
  });

  it("returns the same date for zero days", () => {
    expect(addBusinessDays(MONDAY, 0).getTime()).toBe(MONDAY.getTime());
  });
});

describe("estimateDelivery", () => {
  it("is sooner for a faster option", () => {
    const standard = estimateDelivery(getDeliveryOption("1"), MONDAY);
    const nextDay = estimateDelivery(getDeliveryOption("3"), MONDAY);

    expect(nextDay.getTime()).toBeLessThan(standard.getTime());
  });
});

describe("getShipmentProgress", () => {
  const placed = new Date(2026, 0, 5).getTime();
  const arrives = new Date(2026, 0, 15).getTime();
  const span = arrives - placed;

  it("reports Preparing right after the order is placed", () => {
    const progress = getShipmentProgress(placed, arrives, placed);
    expect(progress.stage).toBe("Preparing");
    expect(progress.percent).toBe(0);
  });

  it("reports Shipped in the middle of the window", () => {
    expect(getShipmentProgress(placed, arrives, placed + span / 2).stage).toBe("Shipped");
  });

  it("reports Delivered once the estimate has passed", () => {
    const progress = getShipmentProgress(placed, arrives, arrives + 1000);
    expect(progress.stage).toBe("Delivered");
    expect(progress.percent).toBe(100);
  });

  it("clamps the percentage to 0–100", () => {
    expect(getShipmentProgress(placed, arrives, placed - span).percent).toBe(0);
    expect(getShipmentProgress(placed, arrives, arrives + span).percent).toBe(100);
  });

  it("treats a non-positive window as already delivered", () => {
    expect(getShipmentProgress(placed, placed, placed).stage).toBe("Delivered");
  });
});
