export default function StoriesHero() {
  return (
    <section className="w-full bg-white py-16 sm:py-24 lg:py-28">
      {/* Aligned with standard layout container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          {/* Eyebrow Subtitle */}
          <span className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-[#0d2861] uppercase mb-4 sm:mb-6 block">
            Real Shipments, Real Stories.
          </span>

          {/* Main Two-Tone Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.12] mb-6">
            <span className="text-[#0a192f]">Real </span>
            <span className="text-[#0d2861]">Shipments.</span>
            <span className="text-[#0a192f]"> Real </span>
            <br className="hidden sm:inline" />
            <span className="text-[#0d2861]">Transportation</span>
            <span className="text-[#0a192f]"> Stories.</span>
          </h1>

          {/* Subtext */}
          <p className="text-sm sm:text-base md:text-[17px] text-slate-500 font-normal leading-relaxed max-w-2xl">
            Explore real shipments handled by Car Carrier Group, from vehicle transportation
            and freight to equipment and specialty moves.
          </p>

        </div>
      </div>
    </section>
  )
}