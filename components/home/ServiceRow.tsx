import { Package, RotateCcw, ShieldCheck } from "lucide-react";

const services = [
  {
    icon: Package,
    title: "Free shipping over $75",
    body: "Standard delivery in five to seven working days, tracked from the warehouse to your door.",
  },
  {
    icon: RotateCcw,
    title: "Thirty day returns",
    body: "Changed your mind? Send it back unworn within thirty days and we will refund the full amount.",
  },
  {
    icon: ShieldCheck,
    title: "Secure checkout",
    body: "Card details are never stored. This is a portfolio build, so no payment is ever taken.",
  },
];

export default function ServiceRow() {
  return (
    <section className="gutter border-line bg-line grid gap-px border-y lg:grid-cols-3">
      {services.map(({ icon: Icon, title, body }) => (
        <div key={title} className="bg-paper px-1 py-10 lg:px-8">
          <Icon className="size-5" strokeWidth={1.25} />
          <h3 className="label mt-5">{title}</h3>
          <p className="text-muted mt-2 max-w-xs">{body}</p>
        </div>
      ))}
    </section>
  );
}
