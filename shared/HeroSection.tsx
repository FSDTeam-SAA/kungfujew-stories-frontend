import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="w-full bg-white py-12 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Sub-heading */}
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#0d2861] uppercase mb-4">
              Real Shipments, Real Stories
            </span>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#0a192f] tracking-tight leading-[1.15] mb-6">
              Real Transportation.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-500 font-normal leading-relaxed max-w-xl mb-8">
              Explore real shipments handled by Car Carrier Group and see how
              we move vehicles, freight, equipment, and other transportation
              needs across the country.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Button
                className="bg-[#0d2861] hover:bg-[#081a40] text-white text-[15px] font-semibold px-6 py-6 rounded-lg gap-2 cursor-pointer transition-colors"
              >
                <Link href="/request-a-quote" className="flex justify-center items-center">
                  Request a Quote 
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>

              <Button
                variant="secondary"
                className="bg-[#f1f4f9] hover:bg-[#e4e9f2] text-[#0a192f] text-[15px] font-bold px-6 py-6 rounded-lg cursor-pointer transition-colors"
              >
                <Link href="/shipments">
                  Explore Shipments
                </Link>
              </Button>
            </div>

            {/* Route / Nationwide Indicator */}
            <div className="flex items-center gap-3">
              {/* Orange Bar */}
              <div className="w-[3px] h-6 bg-[#ea580c] rounded-full" />
              
              <div className="flex items-center gap-2 text-sm text-[#0a192f] font-semibold">
                <MapPin className="w-4 h-4 text-[#ea580c]" />
                <span>Pickup</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                <span>Destination</span>
                <span className="text-slate-400 font-normal ml-1">- Coordinated nationwide</span>
              </div>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80"
                alt="Car carrier truck transporting vehicles on highway"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}