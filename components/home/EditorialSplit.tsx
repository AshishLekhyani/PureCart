import Image from "next/image";
import Link from "next/link";

type Props = {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  image: string;
  imageAlt: string;
  /** Puts the image on the right instead of the left. */
  reverse?: boolean;
};

export default function EditorialSplit({
  eyebrow,
  title,
  body,
  href,
  cta,
  image,
  imageAlt,
  reverse = false,
}: Props) {
  return (
    <section className="grid grid-cols-1 items-stretch lg:grid-cols-2">
      <div
        className={`bg-sand relative aspect-4/5 lg:aspect-auto lg:min-h-[36rem] ${reverse ? "lg:order-2" : ""}`}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-top"
        />
      </div>

      <div className="bg-sand px-gutter flex flex-col justify-center py-16 lg:py-24">
        <p className="label-sm text-muted">{eyebrow}</p>
        <h2 className="display mt-4 max-w-md text-[clamp(2.25rem,5vw,4rem)] uppercase">{title}</h2>
        <p className="text-ink-soft mt-6 max-w-sm">{body}</p>
        <Link href={href} className="btn btn-outline mt-9 self-start">
          {cta}
        </Link>
      </div>
    </section>
  );
}
