import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ShipmentStory } from "@/types/shipmentStory"
import { StoryShareButton } from "./StoryShareButton"

interface Props {
  story: ShipmentStory
}

export function StoryBreadcrumbBar({ story }: Props) {
  return (
    <div className="border-b border-slate-200/80 bg-white sticky top-0 z-20 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 truncate">
          <Link href="/" className="hover:text-[#0d2861] transition-colors font-medium">
            Home
          </Link>
          <span className="text-slate-300">/</span>
          <Link href="/blog" className="hover:text-[#0d2861] transition-colors font-medium">
            Shipment Stories
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-[360px]">
            {story.title}
          </span>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <StoryShareButton title={story.title} />
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0d2861] hover:text-[#091b42] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">All Stories</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

