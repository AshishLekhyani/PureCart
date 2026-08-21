import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Size Guide",
  description: "Body measurements and fit notes for PureCart clothing and footwear.",
};

const apparel = [
  { size: "XS", chest: "80–84", waist: "62–66", hip: "88–92" },
  { size: "S", chest: "86–90", waist: "68–72", hip: "94–98" },
  { size: "M", chest: "92–96", waist: "74–78", hip: "100–104" },
  { size: "L", chest: "98–104", waist: "80–86", hip: "106–112" },
  { size: "XL", chest: "106–112", waist: "88–94", hip: "114–120" },
];

const footwear = [
  { eu: "36", uk: "3", us: "5", cm: "22.5" },
  { eu: "37", uk: "4", us: "6", cm: "23.5" },
  { eu: "38", uk: "5", us: "7", cm: "24.0" },
  { eu: "39", uk: "6", us: "8", cm: "24.5" },
  { eu: "40", uk: "6.5", us: "8.5", cm: "25.5" },
  { eu: "41", uk: "7", us: "9", cm: "26.0" },
  { eu: "42", uk: "8", us: "10", cm: "27.0" },
  { eu: "43", uk: "9", us: "11", cm: "27.5" },
];

export default function SizeGuidePage() {
  return (
    <div className="gutter py-14 pb-24 lg:py-20">
      <p className="label-sm text-muted">Help</p>
      <h1 className="display mt-4 text-[clamp(2.5rem,7vw,5rem)] uppercase">Size Guide</h1>
      <p className="text-muted mt-5 max-w-lg">
        All measurements are body measurements in centimetres, not garment measurements. If you are
        between two sizes, take the larger one — our cuts run close rather than roomy.
      </p>

      <section className="mt-16">
        <h2 className="label border-line border-b pb-4">Clothing</h2>
        <div className="overflow-x-auto">
          <table className="mt-6 w-full min-w-lg border-collapse text-left">
            <thead>
              <tr className="label-sm text-muted">
                <th scope="col" className="border-line border-b py-3 pr-6 font-normal">
                  Size
                </th>
                <th scope="col" className="border-line border-b py-3 pr-6 font-normal">
                  Chest
                </th>
                <th scope="col" className="border-line border-b py-3 pr-6 font-normal">
                  Waist
                </th>
                <th scope="col" className="border-line border-b py-3 font-normal">
                  Hip
                </th>
              </tr>
            </thead>
            <tbody>
              {apparel.map((row) => (
                <tr key={row.size}>
                  <th scope="row" className="label border-line border-b py-4 pr-6 text-left">
                    {row.size}
                  </th>
                  <td className="border-line border-b py-4 pr-6 tabular-nums">{row.chest}</td>
                  <td className="border-line border-b py-4 pr-6 tabular-nums">{row.waist}</td>
                  <td className="border-line border-b py-4 tabular-nums">{row.hip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="label border-line border-b pb-4">Footwear</h2>
        <div className="overflow-x-auto">
          <table className="mt-6 w-full min-w-lg border-collapse text-left">
            <thead>
              <tr className="label-sm text-muted">
                <th scope="col" className="border-line border-b py-3 pr-6 font-normal">
                  EU
                </th>
                <th scope="col" className="border-line border-b py-3 pr-6 font-normal">
                  UK
                </th>
                <th scope="col" className="border-line border-b py-3 pr-6 font-normal">
                  US
                </th>
                <th scope="col" className="border-line border-b py-3 font-normal">
                  Foot length
                </th>
              </tr>
            </thead>
            <tbody>
              {footwear.map((row) => (
                <tr key={row.eu}>
                  <th scope="row" className="label border-line border-b py-4 pr-6 text-left">
                    {row.eu}
                  </th>
                  <td className="border-line border-b py-4 pr-6 tabular-nums">{row.uk}</td>
                  <td className="border-line border-b py-4 pr-6 tabular-nums">{row.us}</td>
                  <td className="border-line border-b py-4 tabular-nums">{row.cm} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Link href="/shop/new" className="btn btn-outline mt-16">
        Back to shopping
      </Link>
    </div>
  );
}
