import Link from "next/link"
import { ArrowRight, Phone, ShieldCheck, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ShipmentStory } from "@/types/shipmentStory"

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
            <span className="text-slate-500">Logistics Type</span>
            <span className="font-semibold text-emerald-700 text-right">Dedicated Carrier</span>
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
            Get a Guaranteed Move Quote
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
            Coordinating vehicles, freight, and heavy equipment across all 50 states with certified carriers.
          </p>
          <Link href="/request-a-quote" className="block w-full">
            <Button className="w-full bg-white hover:bg-slate-100 text-[#0d2861] font-bold py-5 rounded-xl shadow-sm gap-2 text-sm transition-all cursor-pointer">
              Request Quote
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Trust & Guarantees */}
      <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-5 text-xs text-slate-600 space-y-3">
        <div className="flex items-center gap-2.5 font-semibold text-slate-800">
          <ShieldCheck className="w-4 h-4 text-[#0d2861] shrink-0" />
          <span>FMCSA Licensed & Bonded Broker</span>
        </div>
        <div className="flex items-center gap-2.5 font-semibold text-slate-800">
          <Truck className="w-4 h-4 text-[#0d2861] shrink-0" />
          <span>Full Cargo Insurance On Every Load</span>
        </div>
        <div className="flex items-center gap-2.5 font-semibold text-slate-800">
          <Phone className="w-4 h-4 text-[#0d2861] shrink-0" />
          <span>Dedicated Coordinator Support</span>
        </div>
      </div>
    </div>
  )
}

