import Link from "next/link"
import { resources } from "@/lib/content"

export default function ResourcesPage() {

  return (
    <div>
      <section className="w-full bg-white py-16 sm:py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-[#0d2861] uppercase mb-4 sm:mb-6 block">
              Resources
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.12] mb-6">
              <span className="text-[#0a192f]">Everything </span>
              <span className="text-[#0d2861]">you</span>
              <span className="text-[#0a192f]"> need.</span>
            </h1>
            <p className="text-sm sm:text-base md:text-[17px] text-slate-500 font-normal leading-relaxed max-w-2xl">
              Practical guides for understanding the quote, pickup, transit, inspection, and delivery process.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#f8fafc] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {resources.map((r) => (
              <Link key={r.slug} href={`/resources/${r.slug}`} className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d2861]">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{r.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{r.description}</p>
                <span className="mt-5 inline-block text-sm font-bold text-[#0d2861]">Read guide</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
