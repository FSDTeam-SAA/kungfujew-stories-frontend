import { Calendar, Globe, Shield, Headphones } from "lucide-react"

const stats = [
  {
    icon: Calendar,
    title: "21+ Years",
    subtitle: "in transportation",
  },
  {
    icon: Globe,
    title: "Nationwide",
    subtitle: "transportation",
  },
  {
    icon: Shield,
    title: "Real Experience",
    subtitle: "shipment-led insight",
  },
  {
    icon: Headphones,
    title: "Seven Days",
    subtitle: "a week support",
  },
]

export default function StatsBar() {
  return (
    <section className="w-full bg-[#f8fafc] border-y border-slate-200">
      {/* Container aligned with Navbar & Hero */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
          {stats.map((item, index) => {
            const Icon = item.icon

            const alignmentClasses =
              index === 0
                ? "justify-start lg:justify-start lg:pr-4"
                : index === stats.length - 1
                ? "justify-start sm:justify-end lg:justify-end lg:pl-4"
                : index === 1
                ? "justify-start sm:justify-end lg:justify-center lg:px-4"
                : "justify-start sm:justify-start lg:justify-center lg:px-4"

            return (
              <div
                key={index}
                className={`flex items-center gap-3.5 py-5 sm:py-6 ${alignmentClasses}`}
              >
                {/* Blue Outline Icon */}
                <div className="flex-shrink-0 text-[#0d2861]">
                  <Icon className="w-6 h-6 stroke-[1.75]" />
                </div>

                {/* Text Content */}
                <div className="flex flex-col">
                  <span className="text-[17px] font-bold text-[#0a192f] leading-tight tracking-tight">
                    {item.title}
                  </span>
                  <span className="text-[13px] text-slate-500 font-normal leading-normal mt-0.5">
                    {item.subtitle}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}