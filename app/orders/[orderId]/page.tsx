import type { Metadata } from "next";
import TrackingView from "@/components/orders/TrackingView";

export const metadata: Metadata = {
  title: "Track order",
  description: "Follow your PureCart order from the warehouse to your door.",
};

export default async function TrackingPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  return <TrackingView orderId={orderId} />;
}
