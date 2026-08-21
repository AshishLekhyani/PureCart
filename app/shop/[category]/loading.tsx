import { Skeleton, ProductGridSkeleton } from "@/components/ui/Skeleton";

export default function CategoryLoading() {
  return (
    <div className="pb-24" aria-busy="true">
      <header className="gutter pt-14 lg:pt-20">
        <Skeleton className="h-16 w-72 lg:h-24 lg:w-[28rem]" />
        <Skeleton className="mt-5 h-3 w-64" />
      </header>

      <div className="gutter border-line mt-10 flex items-center justify-between border-y py-4">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-24" />
      </div>

      <div className="gutter pt-12">
        <ProductGridSkeleton />
      </div>
    </div>
  );
}
