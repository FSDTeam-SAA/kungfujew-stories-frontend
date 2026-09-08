import { Activity, Search, Globe } from "lucide-react"

const features = [
  {
    icon: Activity,
    title: "Real-world experience",
    description:
      "See the decisions and attention that sit behind shipment coordination.",
  },
  {
    icon: Search,
    title: "Practical transportation insight",
    description:
      "Understand the questions that help shape a transportation solution.",
  },
  {
    icon: Globe,
    title: "Nationwide capability",
    description:
      "Explore the range of transportation needs CCG helps coordinate across the country.",
  },
]

export default function WhyStoriesMatterSection() {
  return (
    <section className="w-full bg-[#f8fafc] py-16 sm:py-20 lg:py-24">
      {/* Aligned with Navbar container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className=" mb-12 sm:mb-14">
          <span className="text-xs sm:text-[13px] font-bold tracking-widest text-[#0d2861] uppercase block mb-3">
            Why These Stories Matter
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0a192f] tracking-tight leading-[1.15]">
            See How Real Transportation Gets Done
          </h2>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200/80 p-7 sm:p-8 flex flex-col justify-start shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow"
              >
                {/* Orange Icon */}
                <div className="mb-6">
                  <Icon className="w-7 h-7 text-[#c25e19] stroke-[2]" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#0a192f] tracking-tight mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-[15px] text-slate-500 font-normal leading-relaxed">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}