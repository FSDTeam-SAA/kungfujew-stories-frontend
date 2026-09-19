import type { ServiceLine } from "@/lib/site"

export const services = [
  {
    slug: "vehicle-shipping",
    serviceLine: "vehicle" as const,
    title: "Vehicle shipping",
    summary: "Plan a vehicle move with clear pickup, delivery, and condition details.",
    description:
      "Use Car Carrier Group's quote process to discuss the vehicle, route, timing, and access at each location before arranging transport.",
    steps: ["Request a quote", "Confirm pickup details", "Review the vehicle at pickup", "Inspect at delivery"],
  },
  {
    slug: "freight",
    serviceLine: "freight" as const,
    title: "Freight",
    summary: "Coordinate freight around the shipment, facilities, and delivery requirements.",
    description:
      "Share the commodity, dimensions, timing, and site access details in Car Carrier Group's quote form so the transportation conversation starts with the right information.",
    steps: ["Request a quote", "Confirm shipment details", "Coordinate pickup access", "Review delivery"],
  },
  {
    slug: "heavy-equipment",
    serviceLine: "heavy-equipment" as const,
    title: "Heavy equipment",
    summary: "Prepare the equipment and site details needed to plan a safe move.",
    description:
      "Provide equipment dimensions, operating condition, pickup and delivery access, and timing to Car Carrier Group before transportation is arranged.",
    steps: ["Request a quote", "Confirm equipment details", "Prepare pickup access", "Inspect at delivery"],
  },
] as const

export type ServiceContent = (typeof services)[number]

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug)
}

export const resources = [
  {
    slug: "shipment-process",
    title: "Shipment process",
    description: "A plain-language overview from quote request through delivery.",
    intro: "Every move is different, but a well-documented process makes the handoff points easier to understand.",
    sections: [
      ["Request a quote", "Start with the shipment type, origin, destination, timing, and relevant condition or access details."],
      ["Confirm pickup", "Before pickup, confirm the locations, contacts, access instructions, and the details that matter for the shipment."],
      ["Transit and updates", "Use the communication method agreed during booking for status questions or changes."],
      ["Inspection and delivery", "Review the shipment at delivery and document any concerns while the relevant parties are present."],
    ],
  },
  {
    slug: "shipping-faq",
    title: "Shipping FAQ",
    description: "Questions to clarify before requesting transportation.",
    intro: "The quote conversation is the right place to confirm details specific to your shipment.",
    sections: [
      ["What information helps with a quote?", "The shipment type, route, timing, condition, dimensions when relevant, and pickup and delivery access details."],
      ["When should I prepare for pickup?", "Follow the pickup instructions you receive and make sure the vehicle, freight, or equipment is accessible at the agreed time."],
      ["What should happen at delivery?", "Review the shipment and keep a record of the inspection or delivery documentation for your files."],
    ],
  },
  {
    slug: "vehicle-preparation",
    title: "Vehicle preparation",
    description: "A practical checklist for preparing a vehicle before pickup.",
    intro: "Confirm the exact preparation requirements for your shipment during the booking process.",
    sections: [
      ["Document the condition", "Take clear photos and note the vehicle's visible condition before pickup."],
      ["Share operating details", "Tell the coordinator about non-running status, modifications, clearance issues, or other relevant handling details."],
      ["Make pickup accessible", "Ensure the pickup contact, keys, and vehicle location are ready at the agreed time."],
    ],
  },
  {
    slug: "shipment-documentation-and-inspection",
    title: "Shipment documentation and inspection",
    description: "Keep the condition and delivery record organized at every handoff.",
    intro: "Documentation helps everyone refer to the same shipment details during pickup and delivery.",
    sections: [
      ["Before pickup", "Keep the booking details, contact information, and any required shipment documents together."],
      ["At pickup", "Review the available condition record and confirm the shipment being released."],
      ["At delivery", "Inspect before completing the final delivery paperwork and raise questions through the agreed contact path."],
    ],
  },
] as const

export function getResourceBySlug(slug: string) {
  return resources.find((resource) => resource.slug === slug)
}

export function isServiceLine(value: string | undefined): value is ServiceLine {
  return value === "vehicle" || value === "freight" || value === "heavy-equipment"
}
