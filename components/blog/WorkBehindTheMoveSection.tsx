import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Truck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { safeStoryImage as getSafeImage } from "@/lib/api/story-response"
import { RetryStoriesButton } from "@/components/shared/RetryStoriesButton"
import { storyPageHref, type StoryQuery } from "@/lib/story-query"
import { paginationPages } from "@/lib/pagination"

import type { ShipmentStorySummary } from "@/types/shipmentStory"

interface WorkBehindTheMoveSectionProps {
  stories: ShipmentStorySummary[]
  query: StoryQuery
  totalPages?: number
  loadError?: boolean
  loading?: boolean
}

export default function WorkBehindTheMoveSection({ stories, query, totalPages = 1, loadError = false, loading = false }: WorkBehindTheMoveSectionProps) {
  const currentPage = query.page
  const featuredStory = stories.length > 0 ? stories[0] : null
  const gridStories = stories.length > 1 ? stories.slice(1) : []


  return (
    <section aria-busy={loading} aria-label="Shipment story results" className="w-full bg-white py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0a192f] tracking-tight mb-2">
            The work behind the move
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-normal">
            Every story below is a clearly labeled demonstration of how real transportation needs can be understood and coordinated.
          </p>
        </div>

        {/* Loading Skeleton State */}
        {loading && (
          <div>
            {/* Featured Skeleton */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 mb-10 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6">
                  <Skeleton className="w-full h-[260px] sm:h-[340px] md:h-[380px] rounded-xl" />
                </div>
                <div className="lg:col-span-6 flex flex-col justify-center lg:pr-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-6 w-28 rounded-full" />
                    <Skeleton className="h-4 w-20 rounded" />
                  </div>
                  <Skeleton className="h-4 w-48 rounded" />
                  <Skeleton className="h-9 w-4/5 rounded-lg" />
                  <div className="space-y-2 pt-1">
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-5/6 rounded" />
                    <Skeleton className="h-4 w-2/3 rounded" />
                  </div>
                  <Skeleton className="h-5 w-32 rounded mt-2" />
                </div>
              </div>
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-14">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden flex flex-col shadow-sm"
                >
                  <Skeleton className="w-full aspect-[16/10] rounded-none" />
                  <div className="p-6 flex flex-col flex-1 space-y-3">
                    <Skeleton className="h-4 w-24 rounded" />
                    <Skeleton className="h-4 w-44 rounded" />
                    <Skeleton className="h-6 w-5/6 rounded" />
                    <div className="space-y-1.5 pt-1">
                      <Skeleton className="h-3.5 w-full rounded" />
                      <Skeleton className="h-3.5 w-3/4 rounded" />
                    </div>
                    <Skeleton className="h-4 w-24 rounded pt-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && loadError && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-12 text-center my-8">
            <p role="alert" className="text-base font-bold text-[#0a192f] mb-2">
              Could not load shipment stories
            </p>
            <RetryStoriesButton />
          </div>
        )}

        {/* Empty State */}
        {!loading && !loadError && stories.length === 0 && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-12 text-center my-8">
            <div className="w-12 h-12 rounded-full bg-slate-200/70 flex items-center justify-center mx-auto mb-4 text-slate-500">
              <Truck className="w-6 h-6" />
            </div>
            <p className="text-base font-bold text-[#0a192f] mb-1">
              No shipment stories found
            </p>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
              Try a different route or keyword, or choose another service above.
            </p>
            {currentPage > 1 && <Link href={storyPageHref(query, 1)} className="mt-4 inline-block rounded-lg border px-4 py-3 font-semibold text-[#0d2861]">Back to first page</Link>}
          </div>
        )}

        {/* Loaded Content */}
        {!loading && featuredStory && (
          <>
            {/* Top Featured Shipment Card */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 mb-10 shadow-sm group">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <Link
                  href={`/stories/${featuredStory.slug}`}
                  className="lg:col-span-6 relative w-full h-[260px] sm:h-[340px] md:h-[380px] rounded-xl overflow-hidden block bg-slate-100"
                >
                  {getSafeImage(featuredStory.image) ? (
                    <Image
                      src={getSafeImage(featuredStory.image) || ""}
                      alt={featuredStory.imageAlt || featuredStory.title}
                      fill
                      className="object-cover story-cover"
                      style={{ objectPosition: `${featuredStory.coverPosition?.x ?? 50}% ${featuredStory.coverPosition?.y ?? 50}%` }}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                      <Truck className="w-12 h-12" />
                    </div>
                  )}
                </Link>

                <div className="lg:col-span-6 flex flex-col justify-center lg:pr-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge
                      variant="secondary"
                      className="bg-slate-100 text-[#0a192f] text-[11px] font-bold tracking-wider px-2.5 py-1 rounded-sm uppercase"
                    >
                      {featuredStory.shipmentType || "Real Shipment"}
                    </Badge>
                    <span className="text-xs text-slate-400 font-normal">
                      {featuredStory.serviceLine || "Shipment story"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0a192f] mb-4">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{featuredStory.pickupLocation}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    <span>{featuredStory.destination}</span>
                  </div>

                  <Link href={`/stories/${featuredStory.slug}`}>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#0a192f] leading-snug tracking-tight mb-4 hover:text-[#0d2861] transition-colors">
                      {featuredStory.title}
                    </h3>
                  </Link>

                  <p className="text-sm sm:text-base text-slate-500 font-normal leading-relaxed mb-6 max-w-xl line-clamp-3">
                    {featuredStory.metaDescription}
                  </p>

                  <Link
                    href={`/stories/${featuredStory.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0d2861] hover:text-[#091b42] transition-colors"
                  >
                    Read Full Story
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

              </div>
            </div>

            {/* 3x3 Card Grid */}
            {gridStories.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-14">
                {gridStories.map((story) => (
                  <div
                    key={story._id}
                    className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-md group"
                  >
                    <Link href={`/stories/${story.slug}`} className="relative w-full aspect-[16/10] block overflow-hidden bg-slate-100">
                      {getSafeImage(story.image) ? (
                        <Image
                          src={getSafeImage(story.image) || ""}
                          alt={story.imageAlt || story.title}
                          fill
                          className="object-cover story-cover"
                          style={{ objectPosition: `${story.coverPosition?.x ?? 50}% ${story.coverPosition?.y ?? 50}%` }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                          <Truck className="w-8 h-8" />
                        </div>
                      )}
                    </Link>

                    <div className="p-6 flex flex-col flex-1">
                      <span className="text-[11px] font-bold tracking-wider text-slate-700 uppercase mb-3">
                        {story.shipmentType || "VEHICLE SHIPPING"}
                      </span>

                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-3">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
                        <span className="truncate">
                          Pickup: {story.pickupLocation} → Destination: {story.destination}
                        </span>
                      </div>

                      <Link href={`/stories/${story.slug}`}>
                        <h3 className="text-lg font-bold text-[#0a192f] tracking-tight mb-3 line-clamp-1 hover:text-[#0d2861] transition-colors">
                          {story.title}
                        </h3>
                      </Link>

                      <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed mb-6 flex-1 line-clamp-2">
                        {story.metaDescription}
                      </p>

                      <Link
                        href={`/stories/${story.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0d2861] hover:text-[#091b42] transition-colors pt-2"
                      >
                        Read Story
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <nav aria-label="Story pages" className="flex flex-wrap items-center justify-center gap-2">
                <Link
                  href={storyPageHref(query, Math.max(currentPage - 1, 1))}
                  aria-disabled={currentPage === 1}
                  tabIndex={currentPage === 1 ? -1 : undefined}
                  className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-semibold rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 aria-disabled:opacity-40 aria-disabled:pointer-events-none transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  Previous
                </Link>

                <span role="status" className="sr-only">Page {currentPage} of {totalPages}</span>
                {paginationPages(currentPage, totalPages).map((page) => (
                  <Link
                    key={page}
                    href={storyPageHref(query, page)}
                    aria-label={`Page ${page}`}
                    aria-current={currentPage === page ? "page" : undefined}
                    className={`min-w-10 h-10 text-xs font-semibold rounded-md flex items-center justify-center transition-colors ${
                      currentPage === page
                        ? "bg-[#0d2861] text-white"
                        : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {page}
                  </Link>
                ))}

                <Link
                  href={storyPageHref(query, Math.min(currentPage + 1, totalPages))}
                  aria-disabled={currentPage === totalPages}
                  tabIndex={currentPage === totalPages ? -1 : undefined}
                  className="inline-flex items-center gap-1 px-4 py-2 text-xs font-semibold rounded-md bg-[#0d2861] text-white hover:bg-[#081a40] aria-disabled:opacity-40 aria-disabled:pointer-events-none transition-colors"
                >
                  Next
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </nav>
            )}
          </>
        )}

      </div>
    </section>
  )
}
