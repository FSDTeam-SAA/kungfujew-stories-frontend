import Image from "next/image"
import { ShipmentStory } from "@/types/shipmentStory"

interface Props {
  story: ShipmentStory
}

export function StoryHeroSection({ story }: Props) {
  const isRemoteImage =
    story.image &&
    (story.image.startsWith("http://") ||
      story.image.startsWith("https://") ||
      story.image.startsWith("/"))

  const statusDisplay = (() => {
    switch (story.shipmentStatus) {
      case "delivered":
        return "Delivered Safely"
      case "in_transit":
        return "In Transit"
      case "cancelled":
        return "Cancelled"
      case "pending":
      default:
        return "Dedicated Carrier"
    }
  })()

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl pt-8 sm:pt-12 pb-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Headline & Meta */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#0a192f] tracking-tight leading-[1.15] mb-5">
            {story.title}
          </h1>

          {story.metaDescription && (
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mb-8 max-w-xl">
              {story.metaDescription}
            </p>
          )}

          {/* Metadata Fact Blocks */}
          <div className="flex items-center gap-10 sm:gap-14 pt-6 border-t border-slate-200/80">
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-slate-400 uppercase block mb-1">
                SHIPMENT TYPE
              </span>
              <span className="text-sm sm:text-base font-bold text-[#0a192f]">
                {story.shipmentType || "Vehicle Shipping"}
              </span>
            </div>

            <div>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-slate-400 uppercase block mb-1">
                TRANSPORT METHOD
              </span>
              <span className="text-sm sm:text-base font-bold text-[#0a192f]">
                {statusDisplay}
              </span>
            </div>
          </div>
        </div>

        {/* Right Hero Image */}
        <div className="lg:col-span-5">
          {isRemoteImage ? (
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 bg-slate-100">
              <Image
                src={story.image!}
                alt={story.imageAlt || story.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          ) : (
            <div className="w-full aspect-[4/3] rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
              <span className="text-xs font-semibold">Real Shipment Coordination</span>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

