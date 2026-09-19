import type { Metadata } from "next"
import Link from "next/link"
import Navbar from "@/shared/navbar"
import Footer from "@/components/home/Footer"
import {
  Compass,
  Home,
  Truck,
  ArrowRight,
  MapPinOff,
  Shield,
  FileText,
} from "lucide-react"

export const metadata: Metadata = {
  title: "404 - Route Not Found | Car Carrier Group",
  description: "The page or shipment record you are looking for cannot be found.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-foreground">
      {/* Site Header */}
      <Navbar />

      {/* Main 404 Hero Area */}
      <main className="flex-1 flex flex-col justify-center relative overflow-hidden bg-gradient-to-b from-[#f8fafc] via-white to-[#f8fafc] py-16 sm:py-24">
        {/* Soft Background Accent Glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-slate-200/30 rounded-full blur-2xl pointer-events-none -z-10" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Top Status Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/70 text-[#0d2861] text-xs font-bold uppercase tracking-wider mb-6 shadow-xs">
            <MapPinOff className="w-3.5 h-3.5 text-[#0d2861]" />
            <span>Route Not Found • 404 Error</span>
          </div>

          {/* Large Stylized 404 Graphic */}
          <div className="relative inline-flex items-center justify-center mb-6">
            <span className="text-8xl sm:text-[140px] font-black tracking-tighter text-slate-100 select-none leading-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white shadow-xl shadow-slate-200/80 border border-slate-200/80 flex items-center justify-center text-[#0d2861] transform -rotate-3 hover:rotate-0 transition-transform">
                <Compass className="w-10 h-10 sm:w-12 sm:h-12 stroke-[1.6] text-[#0d2861]" />
              </div>
            </div>
          </div>

          {/* Headline & Description */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a192f] tracking-tight leading-tight mb-4 max-w-2xl mx-auto">
            We couldn&apos;t find this shipment route
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 font-normal leading-relaxed max-w-xl mx-auto mb-9">
            The page, story, or shipment resource you requested may have been relocated,
            re-routed, or temporarily retired. Let&apos;s get you back on track.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-14 sm:mb-16">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#0d2861] hover:bg-[#091b42] text-white px-6 py-3.5 rounded-xl font-semibold text-sm shadow-sm transition-all hover:shadow-md cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Back to Homepage</span>
            </Link>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-300 text-[#0a192f] px-6 py-3.5 rounded-xl font-semibold text-sm shadow-xs transition-all hover:border-slate-400 cursor-pointer"
            >
              <Truck className="w-4 h-4 text-[#0d2861]" />
              <span>Browse Real Stories</span>
            </Link>

            <Link
              href="/request-a-quote"
              className="inline-flex items-center gap-1.5 bg-[#f1f4f9] hover:bg-slate-200/80 text-[#0d2861] px-5 py-3.5 rounded-xl font-semibold text-sm transition-colors cursor-pointer"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Popular Destinations / Helpful Navigation Cards */}
          <div className="border-t border-slate-200/80 pt-10 sm:pt-12 max-w-4xl mx-auto w-full">
            <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-6 text-center">
              Popular Destinations
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-left">
              {/* Card 1: Stories */}
              <Link
                href="/blog"
                className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0d2861] mb-3.5 group-hover:bg-[#0d2861] group-hover:text-white transition-colors">
                    <Truck className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#0a192f] mb-1.5 flex items-center justify-between">
                    <span>Real Shipment Stories</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-[#0d2861]" />
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed">
                    Verified case studies with routes, vehicle types, and logistics handling insights.
                  </p>
                </div>
              </Link>

              {/* Card 2: Services */}
              <Link
                href="/#services"
                className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[#0d2861] mb-3.5 group-hover:bg-[#0d2861] group-hover:text-white transition-colors">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#0a192f] mb-1.5 flex items-center justify-between">
                    <span>Transportation Services</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-[#0d2861]" />
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed">
                    Nationwide vehicle shipping, heavy machinery, freight, and auction transport.
                  </p>
                </div>
              </Link>

              {/* Card 3: Instant Quote */}
              <Link
                href="/request-a-quote"
                className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700 mb-3.5 group-hover:bg-[#0d2861] group-hover:text-white transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#0a192f] mb-1.5 flex items-center justify-between">
                    <span>Get an Upfront Quote</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-[#0d2861]" />
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed">
                    Calculate quick transparent estimates for your specific shipping requirements.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  )
}

