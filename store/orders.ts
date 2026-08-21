"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Order } from "@/lib/types";

type OrderState = {
  orders: Order[];
  hydrated: boolean;
  place: (order: Order) => void;
  markHydrated: () => void;
};

export const useOrders = create<OrderState>()(
  persist(
    (set) => ({
      orders: [],
      hydrated: false,
      place: (order) => set((state) => ({ orders: [order, ...state.orders] })),
      markHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "purecart.orders",
      partialize: (state) => ({ orders: state.orders }),
      onRehydrateStorage: () => (state) => state?.markHydrated(),
    },
  ),
);

export const selectOrder = (orders: Order[], id: string) => orders.find((order) => order.id === id);
