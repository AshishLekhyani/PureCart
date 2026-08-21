import type { Metadata } from "next";
import WishlistView from "@/components/product/WishlistView";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "The pieces you have saved from the PureCart collection.",
  robots: { index: false },
};

export default function WishlistPage() {
  return <WishlistView />;
}
