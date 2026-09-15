import { ArrowRight } from "lucide-react"
import { ShipmentStory } from "@/types/shipmentStory"
import { QuoteLink } from "@/components/shared/QuoteLink"

interface Props {
  story: ShipmentStory
}

export function StorySidebar({ story }: Props) {
  const statusLabel = (() => {
    switch (story.shipmentStatus) {
      case "delivered":
        return "Delivered"
      case "in_transit":
        return "In Transit"
      case "cancelled":
        return "Cancelled"
      case "pending":
      default:
        return "Scheduled"
    }
  })()

  return (
    <div className="sticky top-24 space-y-6">
      {/* Quick Facts Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <h4 className="text-xs font-bold tracking-widest text-[#0d2861] uppercase mb-4">
          Shipment Quick Facts
        </h4>
        <div className="space-y-4 text-xs sm:text-sm">
          <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
            <span className="text-slate-500">Service</span>
            <span className="font-bold text-[#0a192f] text-right">{story.shipmentType}</span>
          </div>
          <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
            <span className="text-slate-500">Pickup</span>
            <span className="font-semibold text-[#0a192f] text-right">{story.pickupLocation}</span>
          </div>
          <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
            <span className="text-slate-500">Destination</span>
            <span className="font-semibold text-[#0a192f] text-right">{story.destination}</span>
          </div>
          <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
            <span className="text-slate-500">Status</span>
            <span className="font-semibold capitalize text-right">{statusLabel}</span>
          </div>
          <div className="flex items-start justify-between gap-2">
            <span className="text-slate-500">Service line</span>
            <span className="font-semibold text-right">{story.serviceLine || "Not specified"}</span>
          </div>
        </div>
      </div>

      {/* Need Similar Transport CTA Box */}
      <div className="bg-[#0d2861] text-white rounded-2xl p-6 sm:p-7 shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <span className="text-[11px] font-bold tracking-widest text-slate-300 uppercase block mb-2">
            Need Similar Transport?
          </span>
          <h4 className="text-xl font-extrabold text-white tracking-tight leading-snug mb-3">
            Request a transportation quote
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
            Continue to Car Carrier Group&apos;s quote form to share the details needed for your shipment.
          </p>
          <QuoteLink placement="story-sidebar" serviceLine={story.serviceLine} storySlug={story.slug} className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-bold text-[#0d2861] shadow-sm transition-colors hover:bg-slate-100">
              Request Quote
              <ArrowRight className="w-4 h-4" />
          </QuoteLink>
        </div>
      </div>

    </div>
  )
}
