import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ShotStyle } from "@/lib/types";

type Props = {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  image: string;
  imageAlt: string;
  shot?: ShotStyle;
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
  shot = "model",
  reverse = false,
}: Props) {
  const still = shot === "still";

  return (
    <section className="border-line grid grid-cols-1 items-stretch border-y lg:grid-cols-2">
      <div
        className={cn(
          "relative aspect-4/5 lg:aspect-auto lg:min-h-144",
          still ? "bg-paper p-10 lg:p-20" : "bg-sand",
          reverse ? "lg:order-2 lg:border-l" : "lg:border-r",
          "border-line",
        )}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={still ? "object-contain" : "object-cover object-top"}
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
