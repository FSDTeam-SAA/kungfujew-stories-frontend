"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Truck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import type { ServiceLine } from "@/lib/site"

interface ShipmentStory {
  _id: string
  title: string
  slug: string
  metaDescription: string
  content: string
  pickupLocation: string
  destination: string
  shipmentType: string
  shipmentStatus: string
  serviceLine?: ServiceLine
  image?: string
  imageAlt?: string
  isPublished: boolean
  createdAt: string
}

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "")

interface WorkBehindTheMoveSectionProps {
  serviceLine?: ServiceLine
  searchQuery?: string
}

export default function WorkBehindTheMoveSection({
  serviceLine,
  searchQuery = "",
}: WorkBehindTheMoveSectionProps) {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [stories, setStories] = React.useState<ShipmentStory[]>([])
  const [totalPages, setTotalPages] = React.useState(1)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function loadStories() {
      setLoading(true)
      try {
        const params = new URLSearchParams({
          isPublished: "true",
          page: currentPage.toString(),
          limit: "9",
        })
        if (serviceLine) params.set("serviceLine", serviceLine)
        if (searchQuery.trim()) params.set("search", searchQuery.trim())
        const res = await fetch(`${API_BASE}/api/v1/real-shipment-stories?${params}`)
        const json = await res.json()
        if (res.ok && json.success && Array.isArray(json.data)) {
          setStories(json.data)
          if (json.pagination?.totalPages) {
            setTotalPages(json.pagination.totalPages)
          }
        }
      } catch (err) {
        console.error("Error loading shipment stories:", err)
      } finally {
        setLoading(false)
      }
    }
    loadStories()
  }, [currentPage, searchQuery, serviceLine])

  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, serviceLine])

  const featuredStory = stories.length > 0 ? stories[0] : null
  const gridStories = stories.length > 1 ? stories.slice(1) : []

  const getSafeImage = (imgUrl?: string) => {
    if (!imgUrl || !imgUrl.trim()) return ""
    if (imgUrl.startsWith("http://") || imgUrl.startsWith("https://") || imgUrl.startsWith("/")) {
      return imgUrl
    }
    return ""
  }

  return (
    <section className="w-full bg-white py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a192f] tracking-tight mb-2">
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

        {/* Empty State */}
        {!loading && stories.length === 0 && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-12 text-center my-8">
            <div className="w-12 h-12 rounded-full bg-slate-200/70 flex items-center justify-center mx-auto mb-4 text-slate-500">
              <Truck className="w-6 h-6" />
            </div>
            <p className="text-base font-bold text-[#0a192f] mb-1">
              No shipment stories found
            </p>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
              There are no published stories available at the moment.
            </p>
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
                      src={getSafeImage(featuredStory.image)}
                      alt={featuredStory.imageAlt || featuredStory.title}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
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
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0a192f] leading-snug tracking-tight mb-4 hover:text-[#0d2861] transition-colors">
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
                    className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <Link href={`/stories/${story.slug}`} className="relative w-full aspect-[16/10] block overflow-hidden bg-slate-100">
                      {getSafeImage(story.image) ? (
                        <Image
                          src={getSafeImage(story.image)}
                          alt={story.imageAlt || story.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
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
                        <h4 className="text-lg font-bold text-[#0a192f] tracking-tight mb-3 line-clamp-1 hover:text-[#0d2861] transition-colors">
                          {story.title}
                        </h4>
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
              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-semibold rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  Previous
                </button>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i + 1}
                    type="button"
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-9 h-8 text-xs font-semibold rounded-md flex items-center justify-center transition-colors ${
                      currentPage === i + 1
                        ? "bg-[#0d2861] text-white"
                        : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center gap-1 px-4 py-2 text-xs font-semibold rounded-md bg-[#0d2861] text-white hover:bg-[#081a40] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </section>
  )
}
