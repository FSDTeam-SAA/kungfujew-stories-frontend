import { ArrowRight, MapPin } from "lucide-react"
import { ShipmentStory } from "@/types/shipmentStory"

interface Props {
  story: ShipmentStory
}

export function StoryRouteBanner({ story }: Props) {
  return (
    <div className="my-8">
      <h3 className="text-xl sm:text-2xl font-black text-[#0a192f] tracking-tight mb-4">
        The Route
      </h3>

      <div className="bg-[#f8fafc] border border-slate-200/80 rounded-2xl p-5 sm:p-6 flex items-center justify-between gap-4">
        
        {/* Origin / Pickup */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#0d2861] flex items-center justify-center text-white shrink-0 shadow-sm">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block">
              PICKUP
            </span>
            <span className="text-sm sm:text-base font-bold text-[#0a192f]">
              {story.pickupLocation}
            </span>
          </div>
        </div>

        {/* Directional Arrow with Dotted Line */}
        <div className="flex-1 flex items-center justify-center px-4 max-w-[200px]">
          <div className="w-full border-t-2 border-dotted border-slate-300 relative flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center text-xs font-bold absolute shadow-sm">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Final Destination */}
        <div className="flex items-center gap-3 text-right">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block">
              DESTINATION
            </span>
            <span className="text-sm sm:text-base font-bold text-[#0a192f]">
              {story.destination}
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-slate-900 shrink-0 shadow-sm">
            <MapPin className="w-5 h-5" />
          </div>
        </div>

      </div>
    </div>
  )
}

