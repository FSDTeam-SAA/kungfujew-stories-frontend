"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function RequestQuotePage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div>
      <section className="w-full bg-white py-16 sm:py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-[#0d2861] uppercase mb-4 sm:mb-6 block">
              Request a Quote
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.12] mb-6">
              <span className="text-[#0a192f]">Ready to </span>
              <span className="text-[#0d2861]">move?</span>
            </h1>
            <p className="text-sm sm:text-base md:text-[17px] text-slate-500 font-normal leading-relaxed max-w-2xl">
              Tell us about your shipment and we'll get back to you with a free, no-obligation quote.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#f8fafc] py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {sent ? (
            <div className="bg-white p-10 rounded-3xl border border-slate-200/80 shadow-xs text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h2 className="text-2xl font-bold text-slate-900">Quote request sent!</h2>
              <p className="text-sm text-slate-500">Thank you — we'll be in touch shortly.</p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="text-xs font-semibold text-[#0d2861] hover:underline"
              >
                Send another request
              </button>
            </div>
          ) : (
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs">
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                    <input required className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#0d2861] focus:bg-white" />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Email</label>
                    <input required type="email" className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#0d2861] focus:bg-white" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Pickup Location</label>
                    <input required className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#0d2861] focus:bg-white" />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Destination</label>
                    <input required className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#0d2861] focus:bg-white" />
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Service Type</label>
                  <select className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#0d2861] focus:bg-white">
                    <option>Standard Vehicle Shipping</option>
                    <option>Classic & Exotic</option>
                    <option>Freight & Logistics</option>
                    <option>Heavy Equipment</option>
                    <option>International Shipping</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Additional Details</label>
                  <textarea rows={4} className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#0d2861] focus:bg-white" />
                </div>
                <button type="submit" className="inline-flex items-center gap-2 px-5 py-2.5 font-semibold text-white bg-[#0d2861] hover:bg-[#091b42] rounded-lg">
                  <Loader2 className="w-4 h-4 hidden" />
                  Send Request
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
