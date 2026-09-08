"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin, Truck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

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
  image?: string
  imageAlt?: string
  isPublished: boolean
  createdAt: string
}

const categories = [
  "All Stories",
  "Vehicle Shipping",
  "Freight",
  "Heavy Equipment",
  "Auction Transportation",
  "Classic & Exotic",
  "View All",
]

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export default function ShipmentStoriesSection() {
  const [activeCategory, setActiveCategory] = React.useState("All Stories")
  const [stories, setStories] = React.useState<ShipmentStory[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function loadStories() {
      try {
        const res = await fetch(
          `${API_BASE}/api/v1/real-shipment-stories?isPublished=true&limit=10`
        )
        const json = await res.json()
        if (res.ok && json.success && Array.isArray(json.data)) {
          setStories(json.data)
        }
      } catch (err) {
        console.error("Error loading shipment stories:", err)
      } finally {
        setLoading(false)
      }
    }
    loadStories()
  }, [])

  // Filter stories by category
  const filteredStories = React.useMemo(() => {
    if (!stories || stories.length === 0) return []
    if (activeCategory === "All Stories" || activeCategory === "View All") {
      return stories
    }
    const cat = activeCategory.toLowerCase().trim()
    return stories.filter((s) => {
      const type = (s.shipmentType || "").toLowerCase().trim()
      if (type.includes(cat) || cat.includes(type)) return true
      if (
        (cat === "vehicle shipping" || cat.includes("vehicle")) &&
        (type.includes("car") || type.includes("auto") || type.includes("truck") || type.includes("suv") || type.includes("vehicle"))
      ) {
        return true
      }
      return false
    })
  }, [stories, activeCategory])

  const featuredStory = filteredStories.length > 0 ? filteredStories[0] : null
  const gridStories = filteredStories.length > 1 ? filteredStories.slice(1, 4) : []

  // Ensure safe image URL
  const getSafeImage = (imgUrl?: string) => {
    if (!imgUrl || !imgUrl.trim()) return ""
    if (imgUrl.startsWith("http://") || imgUrl.startsWith("https://") || imgUrl.startsWith("/")) {
      return imgUrl
    }
    return ""
  }

  return (
    <section className="w-full bg-white py-16 sm:py-32">
      {/* Aligned with Navbar & Hero */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <span className="text-xs sm:text-[13px] font-bold tracking-widest text-[#0d2861] uppercase block mb-3">
              Browse Shipment Stories
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0a192f] tracking-tight leading-[1.15]">
              The work behind the move
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed max-w-sm">
            Every story below is a clearly labeled demonstration of how real
            transportation needs can be understood and coordinated.
          </p>
        </div>

        {/* Filter Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none mb-10">
          {categories.map((category) => {
            const isActive = activeCategory === category
            if (category === "View All") {
              return (
                <Link
                  key={category}
                  href="/blog"
                  className="whitespace-nowrap px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all bg-[#f1f4f9] text-[#1f2d3d] hover:bg-slate-200/80 shrink-0"
                >
                  View All
                </Link>
              )
            }
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-[#0d2861] text-white shadow-sm"
                    : "bg-[#f1f4f9] text-[#1f2d3d] hover:bg-slate-200/80"
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div>
            {/* Featured Card Skeleton */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 mb-8 shadow-sm">
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

            {/* 3-Card Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[1, 2, 3].map((i) => (
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
        {!loading && filteredStories.length === 0 && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-12 text-center my-6">
            <div className="w-12 h-12 rounded-full bg-slate-200/70 flex items-center justify-center mx-auto mb-4 text-slate-500">
              <Truck className="w-6 h-6" />
            </div>
            <p className="text-base font-bold text-[#0a192f] mb-1">
              No shipment stories found
            </p>
            <p className="text-xs sm:text-sm text-slate-500 mb-6 max-w-sm mx-auto">
              There are no published stories in &quot;{activeCategory}&quot; right now.
            </p>
            {activeCategory !== "All Stories" && (
              <button
                onClick={() => setActiveCategory("All Stories")}
                className="px-5 py-2.5 rounded-xl bg-[#0d2861] text-white text-xs font-bold hover:bg-[#091b42] transition-colors cursor-pointer"
              >
                View All Stories
              </button>
            )}
          </div>
        )}

        {/* Loaded Stories */}
        {!loading && featuredStory && (
          <>
            {/* Featured Card (Top Large Card) */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 mb-8 shadow-sm hover:shadow-md transition-shadow group">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Image */}
                <Link
                  href={`/blog/${featuredStory.slug}`}
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

                {/* Right Details */}
                <div className="lg:col-span-6 flex flex-col justify-center lg:pr-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge
                      variant="secondary"
                      className="bg-slate-100 text-[#0a192f] text-[11px] font-bold tracking-wider px-2.5 py-1 rounded-sm uppercase"
                    >
                      {featuredStory.shipmentType || "Real Shipment"}
                    </Badge>
                    <span className="text-xs text-slate-400 font-normal">
                      Verified Story
                    </span>
                  </div>

                  {/* Location Route */}
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0a192f] mb-4">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{featuredStory.pickupLocation}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    <span>{featuredStory.destination}</span>
                  </div>

                  {/* Title */}
                  <Link href={`/blog/${featuredStory.slug}`}>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0a192f] leading-snug tracking-tight mb-4 hover:text-[#0d2861] transition-colors">
                      {featuredStory.title}
                    </h3>
                  </Link>

                  {/* Paragraph */}
                  <p className="text-sm sm:text-base text-slate-500 font-normal leading-relaxed mb-6 max-w-xl line-clamp-3">
                    {featuredStory.metaDescription}
                  </p>

                  {/* Read Full Story Link */}
                  <Link
                    href={`/blog/${featuredStory.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0d2861] hover:text-[#091b42] transition-colors"
                  >
                    Read Full Story
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom 3-Card Grid */}
            {gridStories.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {gridStories.map((story) => (
                  <div
                    key={story._id}
                    className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow group"
                  >
                    {/* Card Image */}
                    <Link href={`/blog/${story.slug}`} className="relative w-full aspect-[16/10] block overflow-hidden bg-slate-100">
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

                    {/* Card Body */}
                    <div className="p-6 flex flex-col flex-1">
                      {/* Category Tag */}
                      <span className="text-[11px] font-bold tracking-wider text-slate-700 uppercase mb-3">
                        {story.shipmentType || "VEHICLE SHIPPING"}
                      </span>

                      {/* Location Line */}
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-3">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
                        <span className="truncate">
                          Pickup: {story.pickupLocation} → Destination: {story.destination}
                        </span>
                      </div>

                      {/* Title */}
                      <Link href={`/blog/${story.slug}`}>
                        <h4 className="text-lg font-bold text-[#0a192f] tracking-tight mb-3 line-clamp-1 hover:text-[#0d2861] transition-colors">
                          {story.title}
                        </h4>
                      </Link>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed mb-6 flex-1 line-clamp-2">
                        {story.metaDescription}
                      </p>

                      {/* Link */}
                      <Link
                        href={`/blog/${story.slug}`}
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
          </>
        )}

      </div>
    </section>
  )
}