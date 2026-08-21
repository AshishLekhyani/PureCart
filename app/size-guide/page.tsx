import type { Metadata } from "next";
import Link from "next/link";
import SizeTable from "@/components/product/SizeTable";
import { sizeTables } from "@/lib/sizeGuide";

export const metadata: Metadata = {
  title: "Size Guide",
  description: "Body measurements and fit notes for PureCart clothing, trousers and footwear.",
};

export default function SizeGuidePage() {
  return (
    <div className="gutter py-14 pb-24 lg:py-20">
      <p className="label-sm text-muted">Help</p>
      <h1 className="display mt-4 text-[clamp(2.5rem,7vw,5rem)] uppercase">Size Guide</h1>
      <p className="text-muted mt-5 max-w-lg">
        All measurements are body measurements, not garment measurements. If you are between two
        sizes, take the larger one — our cuts run close rather than roomy.
      </p>

      {sizeTables.map((table) => (
        <section key={table.id} className="mt-16">
          <h2 className="label border-line border-b pb-4">{table.title}</h2>
          <div className="mt-6">
            <SizeTable table={table} />
          </div>
        </section>
      ))}

      <section className="mt-16">
        <h2 className="label border-line border-b pb-4">How to measure</h2>
        <ul className="text-ink-soft mt-6 space-y-2">
          <li>Chest — around the fullest part, keeping the tape level under the arms.</li>
          <li>Waist — around the natural waist, at the narrowest point.</li>
          <li>Hip — around the fullest part, roughly 20 cm below the waist.</li>
          <li>Foot — the longest point of the foot, standing, measured late in the day.</li>
        </ul>
      </section>

      <Link href="/shop/new" className="btn btn-outline mt-16">
        Back to shopping
      </Link>
    </div>
  );
}
