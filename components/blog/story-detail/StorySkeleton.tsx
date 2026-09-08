import { Skeleton } from "@/components/ui/skeleton"

export function StorySkeleton() {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Top Breadcrumb Skeleton */}
      <div className="border-b border-slate-200/80 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-3.5 flex items-center justify-between">
          <Skeleton className="h-4 w-52 rounded" />
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl pt-8 sm:pt-12 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-4">
            <Skeleton className="h-10 w-4/5 rounded-xl" />
            <Skeleton className="h-10 w-3/5 rounded-xl" />
            <Skeleton className="h-4 w-full rounded pt-2" />
            <Skeleton className="h-4 w-5/6 rounded" />
            <div className="flex items-center gap-12 pt-6 border-t border-slate-200/80">
              <div className="space-y-1">
                <Skeleton className="h-3 w-20 rounded" />
                <Skeleton className="h-5 w-28 rounded" />
              </div>
              <div className="space-y-1">
                <Skeleton className="h-3 w-24 rounded" />
                <Skeleton className="h-5 w-32 rounded" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-5">
            <Skeleton className="w-full aspect-[4/3] rounded-2xl" />
          </div>
        </div>
      </div>

      {/* 4-Box Stats Bar Skeleton */}
      <div className="w-full bg-[#f8fafc] border-y border-slate-200 py-4 sm:py-5 my-6 sm:my-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200 text-center">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="py-2 md:py-0 md:px-4 flex flex-col items-center space-y-1.5">
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-3 w-28 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid Skeleton */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-8 space-y-6">
            <Skeleton className="h-20 w-full rounded-2xl" />
            <Skeleton className="h-6 w-1/3 rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-5/6 rounded" />
            <Skeleton className="h-4 w-4/5 rounded" />
            <Skeleton className="h-72 w-full rounded-2xl" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-3/4 rounded" />
          </div>
          <div className="lg:col-span-4">
            <Skeleton className="h-96 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
