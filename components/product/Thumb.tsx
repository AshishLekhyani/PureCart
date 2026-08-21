import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

type Props = {
  product: Product;
  image: string;
  sizes: string;
  className?: string;
  hoverZoom?: boolean;
};

export default function Thumb({ product, image, sizes, className, hoverZoom = false }: Props) {
  const still = product.shot === "still";

  return (
    <div
      className={cn("border-line bg-paper relative aspect-3/4 overflow-hidden border", className)}
    >
      <span className={cn("absolute inset-0 block", still && "p-2.5")}>
        <Image
          src={image}
          alt={product.name}
          fill
          sizes={sizes}
          className={cn(
            "ease-out-soft duration-700",
            still ? "object-contain" : "object-cover object-top",
            hoverZoom && "transition-transform group-hover:scale-[1.04]",
          )}
        />
      </span>
    </div>
  );
}
