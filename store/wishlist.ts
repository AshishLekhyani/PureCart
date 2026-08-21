"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishlistState = {
  ids: string[];
  hydrated: boolean;
  toggle: (productId: string) => void;
  remove: (productId: string) => void;
  clear: () => void;
  markHydrated: () => void;
};

export const useWishlist = create<WishlistState>()(
  persist(
    (set) => ({
      ids: [],
      hydrated: false,

      toggle: (productId) =>
        set((state) => ({
          ids: state.ids.includes(productId)
            ? state.ids.filter((id) => id !== productId)
            : [productId, ...state.ids],
        })),

      remove: (productId) => set((state) => ({ ids: state.ids.filter((id) => id !== productId) })),
      clear: () => set({ ids: [] }),
      markHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "purecart.wishlist",
      partialize: (state) => ({ ids: state.ids }),
      onRehydrateStorage: () => (state) => state?.markHydrated(),
    },
  ),
);
