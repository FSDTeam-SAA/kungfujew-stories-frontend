import Link from "next/link"
import { ArrowLeft, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function StoryNotFound() {
  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center bg-[#fafbfc] px-4 py-20">
      <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm text-center max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6 text-slate-400">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a192f] tracking-tight mb-3">
          Shipment Story Not Found
        </h1>
        <p className="text-sm text-slate-500 mb-8 leading-relaxed">
          The shipment story you are looking for does not exist, has been removed, or is currently unpublished.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/blog">
            <Button className="bg-[#0d2861] hover:bg-[#091b42] text-white px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              View All Stories
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="border-slate-300 text-slate-700 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

