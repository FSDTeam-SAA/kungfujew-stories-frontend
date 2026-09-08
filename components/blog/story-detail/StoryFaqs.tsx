"use client"

import * as React from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { FAQ } from "@/types/shipmentStory"

interface Props {
  faqs: FAQ[]
}

export function StoryFaqs({ faqs }: Props) {
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(0)

  if (!Array.isArray(faqs) || faqs.length === 0) return null

  return (
    <div className="mt-12 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-[#0d2861]/10 flex items-center justify-center text-[#0d2861] shrink-0">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#0a192f] tracking-tight">
            Shipment FAQs
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Frequently asked questions regarding this route and transportation service
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openFaqIndex === index
          return (
            <div
              key={index}
              className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#0a192f] hover:bg-slate-50 transition-colors cursor-pointer"
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-[#0d2861]" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed bg-slate-50/50 border-t border-slate-100">
                  {faq.answer}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
