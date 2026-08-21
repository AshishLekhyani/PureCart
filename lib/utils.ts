import clsx, { type ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => clsx(inputs);

export function lineKey(productId: string, colorName: string, size: string): string {
  return `${productId}::${colorName}::${size}`;
}

export function formatOrderRef(orderId: string): string {
  return `PC-${orderId.slice(0, 6).toUpperCase()}`;
}

export function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
