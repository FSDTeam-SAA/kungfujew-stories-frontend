import Link from "next/link"
import { ArrowRight, Car, Shield, Truck } from "lucide-react"

const resources = [
  {
    icon: Car,
    category: "VEHICLE SHIPPING",
    title: "How Does Vehicle Shipping Work?",
    href: "/resources/how-vehicle-shipping-works",
  },
  {
    icon: Shield,
    category: "TRANSPORT OPTIONS",
    title: "Open vs. Enclosed Auto Transport",
    href: "/resources/open-vs-enclosed-auto-transport",
  },
  {
    icon: Truck,
    category: "EQUIPMENT",
    title: "How to Transport Heavy Equipment",
    href: "/resources/how-to-transport-heavy-equipment",
  },
]

export default function MoreResourcesSection() {
  return (
    <section className="w-full bg-[#f8fafc] py-16 sm:py-20 lg:py-24">
      {/* Aligned with Navbar container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs sm:text-[13px] font-bold tracking-widest text-[#0d2861] uppercase block mb-3">
              Keep Exploring
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0a192f] tracking-tight leading-tight">
              More Transportation Resources
            </h2>
          </div>

          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0d2861] hover:text-[#091b42] transition-colors whitespace-nowrap"
          >
            View all resources
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Resource Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {resources.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200/80 p-7 sm:p-8 flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow"
              >
                <div>
                  {/* Blue Outline Icon */}
                  <div className="mb-6">
                    <Icon className="w-7 h-7 text-[#0d2861] stroke-[1.75]" />
                  </div>

                  {/* Category Tag */}
                  <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase block mb-2">
                    {item.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-[#0a192f] tracking-tight mb-8">
                    {item.title}
                  </h3>
                </div>

                {/* Bottom Link */}
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0d2861] hover:text-[#091b42] transition-colors"
                >
                  Explore guide
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}