import { ArrowRight, MapPin, ShieldCheck, Truck } from "lucide-react"
import { ShipmentStory } from "@/types/shipmentStory"

interface Props {
  story: ShipmentStory
}

export function StoryRouteCard({ story }: Props) {
  return (
    <div className="mt-8 bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div className="flex items-center gap-4 sm:gap-6 flex-1 w-full">
        {/* Origin Point */}
        <div className="flex-1">
          <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase block mb-1">
            Origin / Pickup
          </span>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
              <MapPin className="w-4 h-4 text-[#0d2861]" />
            </div>
            <span className="text-base sm:text-lg font-bold text-[#0a192f]">
              {story.pickupLocation || "Pickup Point"}
            </span>
          </div>
        </div>

        {/* Route Directional Indicator */}
        <div className="flex flex-col items-center justify-center shrink-0 px-2 sm:px-4">
          <div className="flex items-center gap-1 text-xs text-[#0d2861] font-semibold mb-1">
            <Truck className="w-4 h-4 text-[#0d2861] animate-pulse" />
            <span className="hidden sm:inline">Direct Route</span>
          </div>
          <div className="flex items-center text-slate-300">
            <div className="w-8 sm:w-16 border-t-2 border-dashed border-slate-300" />
            <ArrowRight className="w-4 h-4 text-[#0d2861] -ml-1" />
          </div>
        </div>

        {/* Destination Point */}
        <div className="flex-1">
          <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase block mb-1">
            Final Destination
          </span>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0">
              <MapPin className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-base sm:text-lg font-bold text-[#0a192f]">
              {story.destination || "Destination Point"}
            </span>
          </div>
        </div>
      </div>

      {/* Verification Badge */}
      <div className="border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 shrink-0 flex items-center gap-2 text-xs font-semibold text-slate-600">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Verified Carrier Dispatch</span>
      </div>
    </div>
  )
}

