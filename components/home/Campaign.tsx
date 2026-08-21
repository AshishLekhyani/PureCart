import Link from "next/link";

export default function Campaign() {
  return (
    <section className="bg-ink text-paper py-24 lg:py-36">
      <div className="gutter mx-auto max-w-4xl text-center">
        <p className="label-sm text-paper/50">The PureCart standard</p>

        <blockquote className="display mt-8 text-[clamp(2rem,5.5vw,4.25rem)]">
          “Buy less. Choose the piece you will still reach for in three winters.”
        </blockquote>

        <p className="text-paper/70 mx-auto mt-8 max-w-md">
          Every style is cut from a material we would wear ourselves, priced without the markup a
          logo usually carries, and kept in the range until it stops working.
        </p>

        <Link
          href="/shop/home"
          className="btn border-paper text-paper hover:bg-paper hover:text-ink mt-10 bg-transparent"
        >
          Explore Home
        </Link>
      </div>
    </section>
  );
}
