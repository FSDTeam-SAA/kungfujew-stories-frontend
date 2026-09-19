"use client"

import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useId, useState } from "react"
import { QuoteLink } from "@/components/shared/QuoteLink"

const navLinks = [
  { title: "Shipment Stories", href: "/stories" },
  { title: "Transportation Services", href: "/services" },
  { title: "Resources", href: "/resources" },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuId = useId()

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
        <div className="flex items-center gap-3 lg:gap-10">
          
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
          <QuoteLink
            placement="header"
            className="hidden sm:inline-flex items-center rounded-lg bg-[#0d2861] px-5 py-3 text-[15px] font-semibold tracking-wide text-white shadow-sm transition-colors hover:bg-[#091b42] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d2861]"
          >
            Request a Quote
          </QuoteLink>

          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-[#0d2861] hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d2861] md:hidden"
            aria-expanded={isMenuOpen}
            aria-controls={menuId}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>

        </div>
      </div>
      <div id={menuId} className={isMenuOpen ? "border-t border-gray-100 md:hidden" : "hidden"}>
        <nav aria-label="Mobile navigation" className="container mx-auto flex flex-col px-4 py-3 sm:px-6">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-md px-3 py-3 text-[15px] font-bold text-[#1f2d3d] hover:bg-slate-50 hover:text-[#0d2861] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d2861]"
            >
              {link.title}
            </Link>
          ))}
          <QuoteLink
            placement="mobile-header"
            className="mt-2 rounded-md bg-[#0d2861] px-3 py-3 text-center text-[15px] font-semibold text-white hover:bg-[#091b42] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d2861]"
          >
            Request a quote from Car Carrier Group
          </QuoteLink>
        </nav>
      </div>
    </header>
  )
}
