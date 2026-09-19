import Link from "next/link"
import { ArrowLeft, Home, Truck, MapPinOff } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function StoryNotFound() {
  return (
    <div className="w-full min-h-[75vh] flex items-center justify-center bg-gradient-to-b from-[#f8fafc] via-white to-[#f8fafc] px-4 py-16 sm:py-24 relative overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="bg-white/90 backdrop-blur-xs border border-slate-200/90 rounded-3xl p-8 sm:p-12 shadow-sm text-center max-w-lg mx-auto relative z-10">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/70 text-[#0d2861] text-xs font-bold uppercase tracking-wider mb-6">
          <MapPinOff className="w-3.5 h-3.5" />
          <span>Story Unavailable</span>
        </div>

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-blue-50/80 border border-blue-100 flex items-center justify-center mx-auto mb-5 text-[#0d2861] shadow-xs">
          <Truck className="w-8 h-8" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a192f] tracking-tight mb-3">
          Shipment Story Not Found
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mb-8 leading-relaxed">
          The shipment story you are looking for does not exist, may have been renamed, or is currently unpublished.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/stories">
            <Button className="bg-[#0d2861] hover:bg-[#091b42] text-white px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              View All Stories
            </Button>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 text-slate-700 px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
