import { Calendar, CheckCircle2, Clock, Truck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ShipmentStory } from "@/types/shipmentStory"

interface Props {
  story: ShipmentStory
}

export function StoryHeader({ story }: Props) {
  // Format published date
  const formattedDate = (() => {
    if (!story.createdAt) return ""
    try {
      return new Date(story.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    } catch {
      return ""
    }
  })()

  // Calculate read time
  const readingTime = (() => {
    if (!story.content) return "3 min read"
    const text = story.content.replace(/<[^>]*>?/gm, "")
    const words = text.split(/\s+/).filter(Boolean).length
    const minutes = Math.max(1, Math.ceil(words / 180))
    return `${minutes} min read`
  })()

  // Render status badge
  const renderStatusBadge = (status?: string) => {
    switch (status) {
      case "delivered":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Delivered Safely
          </span>
        )
      case "in_transit":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <Truck className="w-3.5 h-3.5 text-blue-600" />
            In Transit
          </span>
        )
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            Cancelled
          </span>
        )
      case "pending":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            Coordinated & Scheduled
          </span>
        )
    }
  }

  return (
    <div className="space-y-5">
      {/* Badges & Meta Row */}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
        <Badge
          variant="secondary"
          className="bg-[#0d2861] text-white hover:bg-[#091b42] text-[11px] sm:text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full"
        >
          {story.shipmentType || "Vehicle Shipping"}
        </Badge>

        {renderStatusBadge(story.shipmentStatus)}

        {formattedDate && (
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium pl-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            {formattedDate}
          </span>
        )}

        <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <Clock className="w-3.5 h-3.5" />
          {readingTime}
        </span>
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0a192f] tracking-tight leading-[1.2]">
        {story.title}
      </h1>

      {/* Excerpt / Meta Description */}
      {story.metaDescription && (
        <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-normal leading-relaxed max-w-3xl pb-2">
          {story.metaDescription}
        </p>
      )}
    </div>
  )
}

