import { API_BASE } from "@/lib/api/base";
import { ShipmentStory } from "@/types/shipmentStory"
import type { ServiceLine } from "@/lib/site"

export async function getStoryBySlug(slug: string): Promise<ShipmentStory | null> {
  if (!slug) return null

  try {
    const encodedSlug = encodeURIComponent(slug)
    let res = await fetch(`${API_BASE}/api/v1/real-shipment-stories/slug/${encodedSlug}`, {
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      res = await fetch(`${API_BASE}/api/v1/real-shipment-stories/${encodedSlug}`, {
        next: { revalidate: 60 },
      })
    }

    if (!res.ok) {
      return null
    }

    const json = await res.json()
    if (json.success && json.data) {
      return json.data as ShipmentStory
    }

    return null
  } catch (error) {
    console.error("Error fetching shipment story by slug:", error)
    return null
  }
}

export async function getRecentStories(
  excludeSlug?: string,
  limit = 3,
  serviceLine?: ServiceLine
): Promise<ShipmentStory[]> {
  try {
    const params = new URLSearchParams({
      isPublished: "true",
      limit: String(limit + 2),
    })
    if (serviceLine) params.set("serviceLine", serviceLine)
    const res = await fetch(
      `${API_BASE}/api/v1/real-shipment-stories?${params}`,
      { next: { revalidate: 60 } }
    )
    if (!res.ok) return []

    const json = await res.json()
    if (json.success && Array.isArray(json.data)) {
      const all = json.data as ShipmentStory[]
      const filtered = excludeSlug
        ? all.filter((s) => s.slug !== excludeSlug && s._id !== excludeSlug)
        : all
      return filtered.slice(0, limit)
    }
    return []
  } catch (error) {
    console.error("Error fetching recent stories:", error)
    return []
  }
}
