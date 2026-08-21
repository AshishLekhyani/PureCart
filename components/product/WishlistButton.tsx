"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/store/wishlist";
import { cn } from "@/lib/utils";

type Props = {
  productId: string;
  productName: string;
  variant?: "overlay" | "inline";
  className?: string;
};

export default function WishlistButton({
  productId,
  productName,
  variant = "overlay",
  className,
}: Props) {
  const ids = useWishlist((state) => state.ids);
  const hydrated = useWishlist((state) => state.hydrated);
  const toggle = useWishlist((state) => state.toggle);

  const saved = hydrated && ids.includes(productId);

  return (
    <button
      type="button"
      onClick={() => toggle(productId)}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${productName} from wishlist` : `Save ${productName} to wishlist`}
      className={cn(
        "group/heart inline-flex items-center justify-center transition-opacity",
        variant === "overlay" && "bg-paper/80 absolute top-2 right-2 z-10 size-9 backdrop-blur-sm",
        variant === "inline" && "border-line hover:border-ink size-13 border",
        className,
      )}
    >
      <Heart
        className={cn(
          "size-4 transition-all duration-300",
          saved ? "fill-ink text-ink" : "text-ink group-hover/heart:scale-110",
        )}
        strokeWidth={1.25}
      />
    </button>
  );
}
