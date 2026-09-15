"use client"

import * as React from "react"
import { Search } from "lucide-react"
import type { ServiceLine } from "@/lib/site"

const categories = [
  { label: "All Stories", value: "all" },
  { label: "Vehicle Shipping", value: "vehicle" },
  { label: "Freight", value: "freight" },
  { label: "Heavy Equipment", value: "heavy-equipment" },
] as const

interface ShipmentFilterBarProps {
  activeServiceLine: ServiceLine | "all"
  searchQuery: string
  onServiceLineChange: (value: ServiceLine | "all") => void
  onSearchChange: (value: string) => void
}

export default function ShipmentFilterBar({
  activeServiceLine,
  searchQuery,
  onServiceLineChange,
  onSearchChange,
}: ShipmentFilterBarProps) {

  return (
    <section className="w-full bg-[#f8fafc] py-6">
      {/* Layout aligned container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Search Input Box */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 stroke-[2]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search real shipment stories..."
            className="w-full bg-white border border-slate-200/90 rounded-xl pl-11 pr-4 py-3.5 text-sm text-[#0a192f] placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0d2861] focus:border-[#0d2861] transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
          />
        </div>

        {/* Filter Pills (Horizontal scrollable on mobile) */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((category) => {
            const isActive = activeServiceLine === category.value
            return (
              <button
                key={category.value}
                type="button"
                onClick={() => onServiceLineChange(category.value)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-lg text-xs sm:text-[13px] font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#0d2861] text-white shadow-sm"
                    : "bg-white border border-slate-200/80 text-[#0a192f] hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                {category.label}
              </button>
            )
          })}
        </div>

      </div>
    </section>
  )
}
