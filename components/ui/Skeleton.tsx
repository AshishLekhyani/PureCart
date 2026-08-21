import { cn } from "@/lib/utils";

/** A neutral placeholder block. Pulses only where motion is welcome. */
export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cn("bg-sand animate-pulse", className)} />;
}

/** Placeholder matching a ProductCard's footprint. */
export function ProductCardSkeleton() {
  return (
    <div>
      <Skeleton className="aspect-3/4 w-full" />
      <Skeleton className="mt-4 h-3 w-3/5" />
      <Skeleton className="mt-2 h-3 w-1/4" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
