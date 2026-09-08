import { ShipmentStory } from "@/types/shipmentStory"

interface Props {
  story: ShipmentStory
}

export function StoryStatsBar({ story }: Props) {
  const statusFormatted = (() => {
    switch (story.shipmentStatus) {
      case "delivered":
        return "Delivered"
      case "in_transit":
        return "In Transit"
      case "cancelled":
        return "Cancelled"
      case "pending":
      default:
        return "Scheduled Transport"
    }
  })()

  const stats = [
    {
      title: "Pickup",
      subtitle: story.pickupLocation || "—",
    },
    {
      title: "Destination",
      subtitle: story.destination || "—",
    },
    {
      title: "Shipment",
      subtitle: story.shipmentType || "Vehicle Shipping",
    },
    {
      title: "Transport Type",
      subtitle: statusFormatted,
      isCapitalize: true,
    },
  ]

  return (
    <section className="w-full bg-[#f8fafc] border-y border-slate-200 py-4 sm:py-5 my-6 sm:my-8">
      {/* Container aligned with Navbar & Home StatsBar */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {stats.map((item, index) => {
            const alignmentClasses =
              index === 0
                ? "items-start text-left md:pr-6 md:pl-0"
                : index === stats.length - 1
                ? "items-start md:items-end text-left md:text-right md:pl-6 md:pr-0"
                : "items-start md:items-center text-left md:text-center md:px-6"

            return (
              <div
                key={item.title}
                className={`py-2.5 md:py-0 flex flex-col justify-center ${alignmentClasses}`}
              >
                <span className="text-sm sm:text-base font-bold text-[#0a192f] block leading-tight">
                  {item.title}
                </span>
                <span
                  className={`text-xs sm:text-[13px] text-slate-500 font-medium block mt-1 truncate max-w-full ${
                    item.isCapitalize ? "capitalize" : ""
                  }`}
                >
                  {item.subtitle}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
