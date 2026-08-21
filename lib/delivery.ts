export type DeliveryOption = {
  id: string;
  name: string;
  businessDays: number;
  priceCents: number;
};

export const deliveryOptions: DeliveryOption[] = [
  { id: "1", name: "Standard", businessDays: 7, priceCents: 495 },
  { id: "2", name: "Express", businessDays: 3, priceCents: 995 },
  { id: "3", name: "Next Day", businessDays: 1, priceCents: 1495 },
];

export const STANDARD_SHIPPING_CENTS = deliveryOptions[0].priceCents;

export function getDeliveryOption(id: string): DeliveryOption {
  return deliveryOptions.find((option) => option.id === id) ?? deliveryOptions[0];
}

const isWeekend = (date: Date) => date.getDay() === 0 || date.getDay() === 6;

export function addBusinessDays(from: Date, businessDays: number): Date {
  const date = new Date(from);
  let remaining = businessDays;

  while (remaining > 0) {
    date.setDate(date.getDate() + 1);
    if (!isWeekend(date)) remaining--;
  }

  return date;
}

export function estimateDelivery(option: DeliveryOption, from: Date = new Date()): Date {
  return addBusinessDays(from, option.businessDays);
}

export function formatDeliveryDate(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

export function formatShortDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export type ShipmentStage = "Preparing" | "Shipped" | "Delivered";

export type ShipmentProgress = {
  stage: ShipmentStage;
  percent: number;
};

export function getShipmentProgress(
  placedAtMs: number,
  estimatedDeliveryMs: number,
  nowMs: number = Date.now(),
): ShipmentProgress {
  const span = estimatedDeliveryMs - placedAtMs;
  const elapsed = nowMs - placedAtMs;
  const ratio = span <= 0 ? 1 : elapsed / span;
  const percent = Math.min(100, Math.max(0, Math.round(ratio * 100)));

  if (ratio >= 1) return { stage: "Delivered", percent: 100 };
  if (ratio >= 0.33) return { stage: "Shipped", percent };
  return { stage: "Preparing", percent };
}
