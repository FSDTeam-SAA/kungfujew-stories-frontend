import { ShieldCheck, Clock, Navigation, Quote } from "lucide-react"

const trustFeatures = [
  {
    icon: Clock,
    title: "7 Day a Week Access to Our Staff",
    description: "Direct access to our dedicated transport coordinators 7 days a week for immediate updates and support.",
  },
  {
    icon: ShieldCheck,
    title: "Fully Insured",
    description: "Complete carrier coverage and cargo insurance verification on every load, protecting your investment.",
  },
  {
    icon: Navigation,
    title: "Tracking for Shipments",
    description: "Active milestone tracking and proactive dispatch updates from pickup dispatch to delivery completion.",
  },
]

export default function CompanyTrustSection() {
  return (
    <section className="w-full bg-[#f8fafc] py-16 sm:py-20 lg:py-24 border-b border-slate-200/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-extrabold uppercase tracking-widest text-[#0d2861] bg-blue-50/80 border border-blue-200/60 px-4 py-1.5 rounded-full mb-4">
            Car Carrier Group
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0a192f] tracking-tight mb-4">
            21 Years in Business
          </h2>
          <p className="text-lg sm:text-xl font-bold text-[#0d2861] italic tracking-tight">
            &ldquo;We are your reliable shipping partner.&rdquo;
          </p>
        </div>

        {/* 3 Trust Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12 sm:mb-16">
          {trustFeatures.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 p-7 sm:p-8 flex flex-col items-start shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200"
              >
                <div className="h-12 w-12 rounded-xl bg-blue-50 border border-blue-100/80 flex items-center justify-center text-[#0d2861] mb-5 shadow-xs">
                  <Icon className="h-6 w-6 stroke-[2]" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0a192f] tracking-tight mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Mitchell Levin Testimonial Quote Box */}
        <div className="relative rounded-3xl bg-gradient-to-br from-white via-white to-blue-50/40 border border-blue-100 p-8 sm:p-10 lg:p-12 shadow-sm overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute -right-8 -bottom-8 w-44 h-44 bg-blue-100/40 rounded-full blur-2xl pointer-events-none"
          />
          <Quote className="h-10 w-10 sm:h-12 sm:w-12 text-[#d67d3e]/30 mb-4" />
          
          <blockquote className="relative z-10 text-lg sm:text-xl md:text-2xl font-bold text-[#0a192f] leading-snug tracking-tight mb-6">
            &ldquo;Our clients hire us for touchdowns, not just getting the ball up the field. Successful outcome for your shipments are the only outcome we are interested in.&rdquo;
          </blockquote>

          <div className="flex items-center gap-4 pt-4 border-t border-slate-200/70">
            <div className="h-12 w-12 rounded-full bg-[#0d2861] text-white flex items-center justify-center font-black text-sm tracking-wider shadow-sm shrink-0">
              ML
            </div>
            <div>
              <div className="text-base sm:text-lg font-black text-[#0a192f] tracking-tight">
                Mitchell Levin
              </div>
              <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#d67d3e]">
                President, Car Carrier Group
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

