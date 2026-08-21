"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getProduct } from "@/lib/catalog";
import { getDeliveryOption } from "@/lib/delivery";
import { lineKey } from "@/lib/utils";
import type { CartItem, Product } from "@/lib/types";

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  /** False until the persisted cart has been read back from localStorage. */
  hydrated: boolean;
  add: (product: Product, colorName: string, size: string, quantity?: number) => void;
  remove: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  setDeliveryOption: (key: string, deliveryOptionId: string) => void;
  clear: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  markHydrated: () => void;
};

const keyOf = (item: CartItem) => lineKey(item.productId, item.colorName, item.size);

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      hydrated: false,

      add: (product, colorName, size, quantity = 1) =>
        set((state) => {
          const key = lineKey(product.id, colorName, size);
          const existing = state.items.find((item) => keyOf(item) === key);

          const items = existing
            ? state.items.map((item) =>
                keyOf(item) === key ? { ...item, quantity: item.quantity + quantity } : item,
              )
            : [
                ...state.items,
                { productId: product.id, colorName, size, quantity, deliveryOptionId: "1" },
              ];

          return { items, isOpen: true };
        }),

      remove: (key) =>
        set((state) => ({ items: state.items.filter((item) => keyOf(item) !== key) })),

      setQuantity: (key, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((item) => keyOf(item) !== key)
              : state.items.map((item) =>
                  keyOf(item) === key ? { ...item, quantity: Math.min(quantity, 99) } : item,
                ),
        })),

      setDeliveryOption: (key, deliveryOptionId) =>
        set((state) => ({
          items: state.items.map((item) =>
            keyOf(item) === key ? { ...item, deliveryOptionId } : item,
          ),
        })),

      clear: () => set({ items: [] }),
      openDrawer: () => set({ isOpen: true }),
      closeDrawer: () => set({ isOpen: false }),
      markHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "purecart.cart",
      // Only the line items are persisted; drawer and hydration state are per-session.
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => state?.markHydrated(),
    },
  ),
);

/* --------------------------- Derived selectors --------------------------- */

export type CartLine = {
  key: string;
  item: CartItem;
  product: Product;
  lineTotalCents: number;
};

/** Cart items joined against the catalog; unknown product ids are dropped. */
export function selectLines(items: CartItem[]): CartLine[] {
  return items.flatMap((item) => {
    const product = getProduct(item.productId);
    if (!product) return [];

    return [
      {
        key: keyOf(item),
        item,
        product,
        lineTotalCents: product.priceCents * item.quantity,
      },
    ];
  });
}

export const selectCount = (items: CartItem[]) =>
  items.reduce((total, item) => total + item.quantity, 0);

export const selectSubtotal = (items: CartItem[]) =>
  selectLines(items).reduce((total, line) => total + line.lineTotalCents, 0);

/** Shipping is charged once, at the fastest speed any line asked for. */
export const selectShipping = (items: CartItem[]) =>
  items.reduce(
    (max, item) => Math.max(max, getDeliveryOption(item.deliveryOptionId).priceCents),
    0,
  );
