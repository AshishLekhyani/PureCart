import type { Metadata } from "next";
import OrdersView from "@/components/orders/OrdersView";

export const metadata: Metadata = {
  title: "Orders",
  description: "Track everything you have ordered from PureCart.",
};

export default function OrdersPage() {
  return <OrdersView />;
}
