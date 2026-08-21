"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const LIMIT = 12;

type RecentlyViewedState = {
  ids: string[];
  hydrated: boolean;
  record: (productId: string) => void;
  markHydrated: () => void;
};

export const useRecentlyViewed = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      ids: [],
      hydrated: false,

      record: (productId) =>
        set((state) => ({
          ids: [productId, ...state.ids.filter((id) => id !== productId)].slice(0, LIMIT),
        })),

      markHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "purecart.recentlyViewed",
      partialize: (state) => ({ ids: state.ids }),
      onRehydrateStorage: () => (state) => state?.markHydrated(),
    },
  ),
);
