"use client"

import Link from "next/link"
import { QuoteLink } from "@/components/shared/QuoteLink"

export default function StoriesError({ reset }: { reset: () => void }) {
  return (
    <section className="mx-auto max-w-2xl px-5 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">Shipment stories</p>
      <h1 className="mt-3 text-3xl font-bold text-[#0a192f]">We couldn’t load this story</h1>
      <p role="alert" className="mt-4 leading-7 text-slate-600">Please try again in a moment. You can still speak with our team about your shipment.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={reset} className="rounded-lg bg-[#0d2861] px-5 py-3 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-4">Try again</button>
        <QuoteLink placement="story-error" className="rounded-lg border px-5 py-3 font-semibold text-[#0d2861]">Request a quote</QuoteLink>
        <Link href="/stories" className="px-5 py-3 font-medium text-slate-600 underline">Browse stories</Link>
      </div>
    </section>
  )
}
