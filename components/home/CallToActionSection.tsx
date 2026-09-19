import { Phone, ArrowRight, Zap, Clock } from "lucide-react"
import { QuoteLink } from "@/components/shared/QuoteLink"
import type { ServiceLine } from "@/lib/site"

interface CallToActionSectionProps {
  serviceLine?: ServiceLine
  storySlug?: string
}

export default function CallToActionSection({
  serviceLine,
  storySlug,
}: CallToActionSectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#0d2861] py-14 sm:py-16 lg:py-20 text-white border-y border-blue-900/60">
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl"
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white/[0.04] border border-white/10 p-6 sm:p-10 lg:p-14 backdrop-blur-sm shadow-2xl">
          
          {/* Top Eyebrow */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#d67d3e]/20 border border-[#d67d3e]/30 px-3.5 py-1 text-xs sm:text-[13px] font-extrabold uppercase tracking-widest text-[#f59e0b]">
              <Zap className="h-3.5 w-3.5 fill-current" />
              Direct Carrier Dispatch
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-center text-white tracking-tight uppercase leading-[1.08] mb-3 max-w-4xl mx-auto">
            ONE QUICK CALL DOES IT ALL!
          </h2>

          {/* Client Requested Subtitle: CALL 888-702-7322 OR REQUEST AN INSTANT QUOTE ONLINE */}
          <p className="text-base sm:text-lg md:text-xl font-bold text-center text-blue-100/90 tracking-wide uppercase mb-8 sm:mb-10 max-w-3xl mx-auto">
            Call 888-702-7322 or Request an Instant Quote Online
          </p>

          {/* Full-Width Action Container: Left-to-Right Phone + Quote Button */}
          <div className="grid grid-cols-1 lg:grid-cols-11 items-center gap-5 lg:gap-8 w-full max-w-5xl mx-auto">
            
            {/* Left Action: Direct Call Button (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end w-full">
              <a
                href="tel:8887027322"
                aria-label="Call Car Carrier Group directly at 888-702-7322"
                className="group w-full flex items-center justify-center sm:justify-start gap-4 rounded-2xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 hover:border-white/40 p-4 sm:p-5 transition-all duration-200 shadow-lg hover:shadow-xl text-left"
              >
                <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-[#d67d3e] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200">
                  <Phone className="h-6 w-6 fill-white stroke-none" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-300">
                    Call 888-702-7322
                  </span>
                  <span className="text-xl sm:text-2xl lg:text-[26px] font-black text-white tracking-tight group-hover:text-amber-300 transition-colors">
                    888-702-7322
                  </span>
                </div>
              </a>
            </div>

            {/* Middle Divider: OR (1 col) */}
            <div className="lg:col-span-1 flex items-center justify-center w-full my-1 lg:my-0">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-300 bg-white/[0.08] rounded-full px-3.5 py-1 border border-white/10">
                OR
              </span>
            </div>

            {/* Right Action: Instant Online Quote Button (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start w-full">
              <QuoteLink
                placement="fullwidth-cta"
                serviceLine={serviceLine}
                storySlug={storySlug}
                className="group w-full inline-flex items-center justify-center gap-3 rounded-2xl bg-white hover:bg-slate-100 p-4 sm:p-5 text-center shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span className="text-base sm:text-lg lg:text-xl font-black text-[#0d2861] uppercase tracking-wide">
                  GET AN INSTANT ONLINE QUOTE
                </span>
                <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 text-[#0d2861] shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
              </QuoteLink>
            </div>

          </div>

          {/* Bottom Reassurance Bar */}
          <div className="mt-8 sm:mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs sm:text-sm font-semibold text-slate-300">
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#d67d3e]" />
              7-Day-a-Week Staff Access
            </span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span>Accurate Route-Based Pricing</span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span>No Upfront Obligation</span>
          </div>

        </div>
      </div>
    </section>
  )
}
