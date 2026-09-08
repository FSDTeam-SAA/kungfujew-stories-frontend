import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const footerLinks = {
  services: [
    { title: "Vehicle Shipping", href: "/services/vehicle-shipping" },
    { title: "Freight", href: "/services/freight" },
    { title: "Heavy Equipment", href: "/services/heavy-equipment" },
  ],
  company: [
    { title: "Shipment Stories", href: "/shipment-stories" },
    { title: "Resources", href: "/resources" },
    { title: "Request a Quote", href: "/request-a-quote" },
  ],
}

export default function Footer() {
  return (
    <footer className="w-full bg-[#f8fafc] border-t border-slate-300">
      {/* Container aligned with entire layout */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        
        {/* Main Footer Links & Brand */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-8 pb-14">
          
          {/* Brand Info */}
          <div className="md:col-span-4 lg:col-span-4 flex flex-col items-start">
            <Link href="/" className="mb-6 block">
              <Image
                src="/logo.jpeg"
                alt="Car Carrier Group"
                width={130}
                height={70}
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-xs sm:text-[13px] text-slate-600 font-normal leading-relaxed max-w-xs">
              Transportation coordination for vehicles, freight, equipment, and more nationwide.
            </p>
          </div>

          {/* Services Column */}
          <div className="md:col-span-3 lg:col-span-2 lg:col-start-6">
            <h4 className="text-sm font-bold text-[#0a192f] mb-4 tracking-tight">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-xs sm:text-[13px] text-slate-600 hover:text-[#0d2861] transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="md:col-span-3 lg:col-span-2">
            <h4 className="text-sm font-bold text-[#0a192f] mb-4 tracking-tight">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-xs sm:text-[13px] text-slate-600 hover:text-[#0d2861] transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div className="md:col-span-2 lg:col-span-3">
            <h4 className="text-sm font-bold text-[#0a192f] mb-4 tracking-tight">
              Connect
            </h4>
            <p className="text-xs sm:text-[13px] text-slate-600 mb-3">
              Available seven days a week
            </p>
            <Link
              href="/request-a-quote"
              className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-[#0d2861] hover:text-[#081a40] transition-colors"
            >
              Get a quote
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Disclaimer */}
        <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs text-slate-500 font-normal">
          <p>© Car Carrier Group. All rights reserved.</p>
          <p>Placeholder shipment stories are provided for demonstration purposes.</p>
        </div>

      </div>
    </footer>
  )
}