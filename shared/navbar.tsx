import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const navLinks = [
  { title: "Shipment Stories", href: "/shipment-stories" },
  { title: "Transportation Services", href: "/services" },
  { title: "Resources", href: "/resources" },
]

export default function Navbar() {
  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.jpeg"
            alt="Car Carrier Group"
            width={120}
            height={64}
            priority
            className="h-14 sm:h-16 w-auto object-contain"
          />
        </Link>

        {/* Right Side: Navigation Links & CTA Button */}
        <div className="flex items-center gap-8 lg:gap-10">
          
          {/* Menu Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="text-[15px] font-bold text-[#1f2d3d] hover:text-[#0d2861] transition-colors"
              >
                {link.title}
              </Link>
            ))}
          </nav>

          {/* shadcn Button (Request a Quote) */}
          <Button
            className="bg-[#0d2861] hover:bg-[#091b42] text-white text-[15px] font-semibold px-6 py-6 rounded-lg shadow-sm tracking-wide"
          >
            <Link href="/request-a-quote">
              Request a Quote
            </Link>
          </Button>

        </div>
      </div>
    </header>
  )
}