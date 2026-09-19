import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin, Truck } from "lucide-react"
import { ShipmentStory } from "@/types/shipmentStory"

interface Props {
  stories: ShipmentStory[]
}

export function MoreRealShipments({ stories }: Props) {
  if (!Array.isArray(stories) || stories.length === 0) return null

  const getSafeImage = (imgUrl?: string) => {
    if (!imgUrl || !imgUrl.trim()) return ""
    if (imgUrl.startsWith("http://") || imgUrl.startsWith("https://") || imgUrl.startsWith("/")) {
      return imgUrl
    }
    return ""
  }

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl my-14 sm:my-20">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <h2 className="text-2xl sm:text-3xl font-black text-[#0a192f] tracking-tight">
          More Real Shipments
        </h2>
        <Link
          href="/stories"
          className="text-xs sm:text-sm font-bold text-[#0d2861] hover:text-[#091b42] hover:underline transition-colors"
        >
          View All Stories.
        </Link>
      </div>

      {/* 3-Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {stories.map((story) => {
          const img = getSafeImage(story.image)
          return (
            <div
              key={story._id}
              className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow group"
            >
              {/* Image with Tag Overlay */}
              <Link
                href={`/stories/${story.slug}`}
                className="relative w-full aspect-[16/10] block overflow-hidden bg-slate-100"
              >
                {img ? (
                  <Image
                    src={img}
                    alt={story.imageAlt || story.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <Truck className="w-10 h-10" />
                  </div>
                )}

                {/* Category Pill Tag Overlay */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-white/95 backdrop-blur-xs text-[#0a192f] text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-md shadow-xs border border-slate-200/60">
                    {story.shipmentType || "AUTO SHIPPING"}
                  </span>
                </div>
              </Link>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  {/* Location Line */}
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-2">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
                    <span className="truncate">
                      Pickup: {story.pickupLocation} → Destination: {story.destination}
                    </span>
                  </div>

                  {/* Title */}
                  <Link href={`/stories/${story.slug}`}>
                    <h3 className="text-base font-bold text-[#0a192f] tracking-tight line-clamp-2 hover:text-[#0d2861] transition-colors mb-4">
                      {story.title}
                    </h3>
                  </Link>
                </div>

                {/* Read Story Link */}
                <Link
                  href={`/stories/${story.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0d2861] hover:text-[#091b42] transition-colors pt-1"
                >
                  Read Story
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
