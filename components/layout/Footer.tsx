import Link from "next/link";
import { categories } from "@/lib/catalog";

const columns = [
  {
    heading: "Help",
    links: ["Shipping & Returns", "Size Guide", "Care Instructions", "Contact"],
  },
  {
    heading: "Company",
    links: ["About PureCart", "Sustainability", "Stores", "Careers"],
  },
  {
    heading: "Legal",
    links: ["Privacy Policy", "Terms of Sale", "Cookie Settings", "Accessibility"],
  },
];

export default function Footer() {
  return (
    <footer className="border-line bg-sand mt-24 border-t">
      <div className="gutter grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5 lg:py-20">
        <div className="lg:col-span-2">
          <p className="display text-3xl tracking-[0.18em] uppercase">PureCart</p>
          <p className="text-muted mt-4 max-w-xs">
            Ready-to-wear for women, men, and the home. Plain materials, considered cuts, nothing
            louder than it needs to be.
          </p>

          <form className="mt-8 max-w-xs" aria-label="Newsletter signup">
            <label htmlFor="newsletter" className="label-sm text-muted">
              Join the list
            </label>
            <div className="mt-2 flex items-end gap-3">
              <input
                id="newsletter"
                type="email"
                placeholder="Email address"
                className="field flex-1"
                autoComplete="email"
              />
              <button type="submit" className="label link-underline pb-3">
                Sign up
              </button>
            </div>
          </form>
        </div>

        <div>
          <p className="label-sm text-muted">Shop</p>
          <ul className="mt-5 space-y-3">
            {categories.map((category) => (
              <li key={category.id}>
                <Link href={`/shop/${category.id}`} className="link-underline">
                  {category.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/shop/new" className="link-underline">
                New In
              </Link>
            </li>
            <li>
              <Link href="/wishlist" className="link-underline">
                Wishlist
              </Link>
            </li>
          </ul>
        </div>

        {columns.map((column) => (
          <div key={column.heading}>
            <p className="label-sm text-muted">{column.heading}</p>
            <ul className="mt-5 space-y-3">
              {column.links.map((link) => (
                <li key={link}>
                  <span className="link-underline text-ink-soft cursor-default">{link}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="gutter border-line flex flex-col gap-3 border-t py-6 md:flex-row md:items-center md:justify-between">
        <p className="label-sm text-muted">© {new Date().getFullYear()} PureCart</p>
        <p className="label-sm text-muted">
          A portfolio project — no real orders are placed and no payments are taken.
        </p>
      </div>
    </footer>
  );
}
