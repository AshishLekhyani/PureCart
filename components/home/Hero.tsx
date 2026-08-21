import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative grid min-h-[calc(100svh-4rem)] grid-cols-1 items-center gap-10 pt-10 pb-16 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-12 lg:gap-0 lg:pt-0 lg:pb-0">
      <div className="gutter reveal z-10 lg:col-span-5 lg:pr-0">
        <p className="label-sm text-muted">Autumn / Winter 2025</p>

        <h1 className="display mt-5 text-[clamp(3.25rem,9vw,7rem)] uppercase">
          The
          <br />
          Quiet
          <br />
          <span className="tracking-tight lowercase italic">season</span>
        </h1>

        <p className="text-ink-soft mt-7 max-w-sm">
          Heavier cotton, longer lines, and a palette that stays out of the way. Forty pieces, made
          to be worn together.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3">
          <Link href="/shop/women" className="label link-underline">
            Shop Women
          </Link>
          <Link href="/shop/men" className="label link-underline">
            Shop Men
          </Link>
          <Link href="/shop/new" className="label link-underline text-muted">
            New In
          </Link>
        </div>
      </div>

      <div className="lg:col-span-7 lg:h-[calc(100svh-5rem)]">
        <div className="grid h-full grid-cols-2 gap-px">
          <div className="h-full min-h-80 lg:pt-14">
            <div className="border-line bg-sand relative h-full overflow-hidden border-l">
              <Image
                src="/products/variations/women-stretch-popover-hoodie-black.jpg"
                alt="Stretch popover hoodie in black"
                fill
                priority
                sizes="(max-width: 1024px) 50vw, 30vw"
                className="object-cover object-top"
              />
            </div>
          </div>

          <div className="h-full min-h-80 lg:pb-14">
            <div className="border-line bg-sand relative h-full overflow-hidden border-l">
              <Image
                src="/products/variations/men-chino-pants-beige.jpg"
                alt="Slim fit chino in sand"
                fill
                priority
                sizes="(max-width: 1024px) 50vw, 30vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
