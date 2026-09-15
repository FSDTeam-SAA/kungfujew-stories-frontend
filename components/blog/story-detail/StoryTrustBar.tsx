export function StoryTrustBar() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl my-12 sm:my-16">
      <div className="bg-[#f8fafc] border border-slate-200/80 rounded-2xl p-7 sm:p-10 text-center">
        
        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-black text-[#0a192f] tracking-tight mb-8">
          A clearer way to prepare for transportation
        </h3>

        {/* 4 Items */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <span className="text-base sm:text-lg font-black text-[#0a192f] block mb-1">
              Quote details
            </span>
            <span className="text-xs text-slate-500 font-medium block">
              Start with the shipment facts
            </span>
          </div>

          <div>
            <span className="text-base sm:text-lg font-black text-[#0a192f] block mb-1">
              Pickup planning
            </span>
            <span className="text-xs text-slate-500 font-medium block">
              Confirm access and contacts
            </span>
          </div>

          <div>
            <span className="text-base sm:text-lg font-black text-[#0a192f] block mb-1">
              Documentation
            </span>
            <span className="text-xs text-slate-500 font-medium block">
              Record condition at handoff
            </span>
          </div>

          <div>
            <span className="text-base sm:text-lg font-black text-[#0a192f] block mb-1">
              Delivery review
            </span>
            <span className="text-xs text-slate-500 font-medium block">
              Inspect before final paperwork
            </span>
          </div>
        </div>

      </div>
    </div>
  )
}
