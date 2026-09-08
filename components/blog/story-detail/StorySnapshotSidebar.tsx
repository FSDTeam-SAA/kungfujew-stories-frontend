import Link from "next/link"
import { ShipmentStory } from "@/types/shipmentStory"

interface Props {
  story: ShipmentStory
}

export function StorySnapshotSidebar({ story }: Props) {
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
        return "Scheduled"
    }
  })()

  return (
    <div className="sticky top-24">
      <div className="bg-[#f8fafc] border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        
        {/* Card Header */}
        <h4 className="text-xs font-black tracking-widest text-[#0a192f] uppercase mb-6">
          SHIPMENT SNAPSHOT
        </h4>

        {/* Fact Rows */}
        <div className="space-y-4">
          <div>
            <span className="text-[11px] font-medium text-slate-400 block mb-0.5">
              Pickup
            </span>
            <span className="text-sm font-bold text-[#0a192f] block">
              {story.pickupLocation}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-medium text-slate-400 block mb-0.5">
              Destination
            </span>
            <span className="text-sm font-bold text-[#0a192f] block">
              {story.destination}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-medium text-slate-400 block mb-0.5">
              Vehicle / Cargo
            </span>
            <span className="text-sm font-bold text-[#0a192f] block">
              {story.shipmentType || "Vehicle"}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-medium text-slate-400 block mb-0.5">
              Status / Condition
            </span>
            <span className="text-sm font-bold text-[#0a192f] block capitalize">
              {statusDisplay}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-medium text-slate-400 block mb-0.5">
              Trailer Type
            </span>
            <span className="text-sm font-bold text-[#0a192f] block">
              Dedicated Motor Carrier
            </span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          href="/request-a-quote"
          className="mt-7 w-full block text-center py-3.5 px-6 rounded-xl bg-[#0d2861] hover:bg-[#091b42] text-white font-bold text-sm shadow-sm transition-all duration-200 cursor-pointer"
        >
          Get a Quote
        </Link>

      </div>
    </div>
  )
}

