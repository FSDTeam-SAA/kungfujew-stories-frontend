import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  "Vehicle Shipping",
  "Freight",
  "Heavy Equipment",
  "Nationwide Transportation",
]

export default function CallToActionSection() {
  return (
    <section className="w-full bg-[#0d2861] py-16 sm:py-20 lg:py-24">
      {/* Aligned with Navbar, Hero & Other Sections */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          
          {/* Left Side Content */}
          <div className="">
            {/* Small Uppercase Subtitle */}
            <span className="text-xs sm:text-[13px] font-bold tracking-widest text-slate-300 uppercase block mb-3">
              Ready to Move?
            </span>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Need Something Similar Transported?
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed mb-6 max-w-xl">
              Tell us what you need transported, where it needs to go, and our team will help
              determine the right transportation solution.
            </p>

            {/* Inline Bullet Points */}
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm font-medium text-slate-200">
              {services.map((service, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/90 inline-block" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: Button */}
          <div className="flex-shrink-0">
            <Button
              className="bg-white hover:bg-slate-100 text-[#0d2861] text-[15px] font-bold px-7 py-6 rounded-xl shadow-md gap-2 transition-all duration-200"
            >
              <Link href="/request-a-quote" className="flex items-center gap-3 justify-center ">
                Get a Transportation Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

        </div>
      </div>
    </section>
  )
}