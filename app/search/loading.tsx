import { Skeleton, ProductGridSkeleton } from "@/components/ui/Skeleton";

export default function SearchLoading() {
  return (
    <div className="gutter py-14 pb-24 lg:py-20" aria-busy="true">
      <Skeleton className="h-3 w-16" />
      <Skeleton className="mt-4 h-14 w-80 lg:h-20 lg:w-[32rem]" />
      <Skeleton className="mt-4 h-3 w-24" />
      <div className="mt-14">
        <ProductGridSkeleton />
      </div>
    </div>
  );
}
