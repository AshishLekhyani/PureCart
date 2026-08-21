import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/catalog";

export default function CategoryTiles() {
  return (
    <section className="gutter py-20 lg:py-28">
      <div className="flex items-end justify-between gap-6">
        <h2 className="display text-[clamp(2rem,5vw,3.5rem)] uppercase">Departments</h2>
        <Link href="/shop/new" className="label link-underline shrink-0 pb-2">
          View all
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
        {categories.map((category) => (
          <Link key={category.id} href={`/shop/${category.id}`} className="group block">
            <div className="border-line bg-sand group-hover:border-ink/25 relative aspect-3/4 overflow-hidden border transition-colors duration-500">
              <Image
                src={category.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="ease-out-soft object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              />
            </div>

            <h3 className="display mt-4 text-2xl uppercase">{category.name}</h3>
            <p className="label-sm text-muted mt-1">{category.tagline}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
