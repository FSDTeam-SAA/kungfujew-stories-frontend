import { Phone, ArrowRight, Zap, Clock } from "lucide-react"
import { QuoteLink } from "@/components/shared/QuoteLink"
import type { ServiceLine } from "@/lib/site"

const quoteServices = ["Vehicles", "Freight", "Heavy Equipment"]

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
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#d67d3e]/20 border border-[#d67d3e]/30 px-3.5 py-1 text-xs sm:text-[13px] font-bold uppercase tracking-widest text-[#f59e0b]">
              <Zap className="h-3.5 w-3.5 fill-current" />
              Direct Carrier Dispatch
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white tracking-tight uppercase leading-[1.08] mb-3 max-w-4xl mx-auto">
            ONE QUICK CALL DOES IT ALL!
          </h2>

          <div className="grid w-full max-w-5xl grid-cols-1 gap-4 mx-auto md:grid-cols-3">
            <div className="w-full">
              <a
                href="tel:8887027322"
                aria-label="Call Car Carrier Group directly at 888-702-7322"
                className="group flex min-h-36 w-full flex-col items-center justify-center rounded-2xl border border-white/20 bg-white/[0.08] p-5 text-center shadow-lg transition-colors duration-200 hover:border-white/40 hover:bg-white/[0.14] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#d67d3e] text-white shadow-md transition-transform duration-200 group-hover:scale-105">
                  <Phone className="h-5 w-5 fill-white stroke-none" aria-hidden="true" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Call us</span>
                <span className="mt-1 text-xl font-bold tracking-tight text-white transition-colors group-hover:text-amber-300 sm:text-2xl">
                  888-702-7322
                </span>
              </a>
            </div>

            <div className="w-full">
              <QuoteLink
                placement="fullwidth-cta"
                serviceLine={serviceLine}
                storySlug={storySlug}
                className="group flex min-h-36 w-full flex-col items-center justify-center rounded-2xl bg-white p-5 text-center shadow-xl transition-colors duration-200 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span className="flex items-center gap-2 text-lg font-bold uppercase tracking-wide text-[#0d2861] sm:text-xl">
                  Get an Instant Quote
                  <ArrowRight className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </span>
                <span className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs font-bold uppercase tracking-wide text-slate-500">
                  {quoteServices.map((service, index) => (
                    <span key={service}>
                      {index > 0 && <span aria-hidden="true" className="mr-2 text-slate-300">•</span>}
                      {service}
                    </span>
                  ))}
                </span>
              </QuoteLink>
            </div>

            <div className="flex min-h-36 w-full flex-col items-center justify-center rounded-2xl border border-[#d67d3e]/50 bg-[#d67d3e]/15 p-5 text-center">
              <span className="rounded-full border border-[#f59e0b]/40 bg-[#d67d3e]/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-200">
                Coming soon
              </span>
              <p className="font-heading mt-3 text-lg font-bold leading-tight tracking-tight text-white sm:text-xl">
                New Auto Shipping Quote Tool
              </p>
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
