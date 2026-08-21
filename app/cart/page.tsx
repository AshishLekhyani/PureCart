import type { Metadata } from "next";
import CartView from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Shopping Bag",
  description: "Review the pieces in your PureCart bag before checking out.",
};

export default function CartPage() {
  return <CartView />;
}
