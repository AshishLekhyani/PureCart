import { Skeleton } from "@/components/ui/Skeleton";

export default function ProductLoading() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12" aria-busy="true">
      <div className="lg:col-span-7">
        <div className="grid gap-px lg:grid-cols-2">
          <Skeleton className="aspect-3/4 w-full" />
          <Skeleton className="hidden aspect-3/4 w-full lg:block" />
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="px-gutter py-10 lg:px-14 lg:py-16">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="mt-5 h-10 w-4/5" />
          <Skeleton className="mt-5 h-4 w-24" />
          <Skeleton className="mt-8 h-3 w-full" />
          <Skeleton className="mt-2 h-3 w-11/12" />
          <Skeleton className="mt-2 h-3 w-2/3" />
          <Skeleton className="mt-10 h-7 w-40" />
          <Skeleton className="mt-8 h-12 w-full" />
          <Skeleton className="mt-8 h-14 w-full" />
        </div>
      </div>
    </div>
  );
}
