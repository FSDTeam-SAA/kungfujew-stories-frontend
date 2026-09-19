export interface FAQ {
  question: string
  answer: string
}

export interface ShipmentStory {
  _id: string
  title: string
  slug: string
  metaDescription: string
  content: string
  pickupLocation: string
  destination: string
  shipmentType: string
  serviceLine?: "vehicle" | "freight" | "heavy-equipment"
  shipmentStatus: "pending" | "in_transit" | "delivered" | "cancelled" | string
  image?: string
  imageAlt?: string
  faqs?: FAQ[]
  isPublished?: boolean
  createdAt: string
  updatedAt?: string
}
