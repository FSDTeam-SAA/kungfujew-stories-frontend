export default function ServicesPage() {
  const services = [
    {
      title: "Vehicle Shipping",
      description: "Reliable door-to-door transport for sedans, SUVs, trucks, and everything in between.",
    },
    {
      title: "Classic & Exotic",
      description: "Enclosed, winch-based transport with extra care for high-value and collectible vehicles.",
    },
    {
      title: "Freight & Logistics",
      description: "Scalable freight solutions for business logistics, equipment, and bulk shipments.",
    },
    {
      title: "Heavy Equipment",
      description: "Specialized hauling for construction and heavy machinery with the right equipment on site.",
    },
    {
      title: "Auction Transportation",
      description: "Coordinated pickup and delivery for auctions, dealerships, and inventory transfers.",
    },
    {
      title: "International Shipping",
      description: "Cross-border and port-to-door coordination for overseas vehicle movements.",
    },
  ];

  return (
    <div>
      <section className="w-full bg-white py-16 sm:py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-[#0d2861] uppercase mb-4 sm:mb-6 block">
              Our Services
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.12] mb-6">
              <span className="text-[#0a192f]">How </span>
              <span className="text-[#0d2861]">we</span>
              <span className="text-[#0a192f]"> can </span>
              <br className="hidden sm:inline" />
              <span className="text-[#0d2861]">help</span>
              <span className="text-[#0a192f]"> you.</span>
            </h1>
            <p className="text-sm sm:text-base md:text-[17px] text-slate-500 font-normal leading-relaxed max-w-2xl">
              From delicate classic-car transport to large-scale freight, Car Carrier Group delivers
              safe, transparent, and professional logistics.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#f8fafc] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((s) => (
              <div key={s.title} className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
