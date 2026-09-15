export default function ResourcesPage() {
  const resources = [
    {
      title: "Getting Started Guide",
      description: "Learn how to book your first shipment and what to expect at pickup.",
    },
    {
      title: "Shipping FAQ",
      description: "Answers to the most common questions about costs, timelines, and preparation.",
    },
    {
      title: "Real Shipment Stories",
      description: "Read verified stories of real transportation we've handled.",
    },
    {
      title: "Vehicle Prep Checklist",
      description: "Prepare your vehicle for a safe and smooth transport experience.",
    },
  ];

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
              Helpful guides, checklists, and verified stories to make your move stress-free.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#f8fafc] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {resources.map((r) => (
              <div key={r.title} className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{r.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{r.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
