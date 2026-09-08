export function StoryTrustBar() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl my-12 sm:my-16">
      <div className="bg-[#f8fafc] border border-slate-200/80 rounded-2xl p-7 sm:p-10 text-center">
        
        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-black text-[#0a192f] tracking-tight mb-8">
          Transportation Experience You Can Rely On
        </h3>

        {/* 4 Items */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <span className="text-base sm:text-lg font-black text-[#0a192f] block mb-1">
              20+ Years
            </span>
            <span className="text-xs text-slate-500 font-medium block">
              Transportation Experience
            </span>
          </div>

          <div>
            <span className="text-base sm:text-lg font-black text-[#0a192f] block mb-1">
              Nationwide
            </span>
            <span className="text-xs text-slate-500 font-medium block">
              Co-ordination
            </span>
          </div>

          <div>
            <span className="text-base sm:text-lg font-black text-[#0a192f] block mb-1">
              Vehicle + Freight
            </span>
            <span className="text-xs text-slate-500 font-medium block">
              Transportation Solutions
            </span>
          </div>

          <div>
            <span className="text-base sm:text-lg font-black text-[#0a192f] block mb-1">
              Shipment Tracking
            </span>
            <span className="text-xs text-slate-500 font-medium block">
              Updates Available
            </span>
          </div>
        </div>

      </div>
    </div>
  )
}
