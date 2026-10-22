import { cache } from "react"
import { API_BASE } from "@/lib/api/base"
import type { ShipmentStory, ShipmentStorySummary } from "@/types/shipmentStory"
import type { ServiceLine } from "@/lib/site"
import { fetchStoryResponse, parsePublishedStory, parsePublishedStoryList } from "./story-response"
import type { StoryQuery } from "@/lib/story-query"

export async function getPublishedStoryPage(query: StoryQuery) {
  const params = new URLSearchParams({ isPublished: "true", summary: "true", limit: "9", page: String(query.page) })
  if (query.search) params.set("search", query.search)
  if (query.serviceLine !== "all") params.set("serviceLine", query.serviceLine)
  const body = await fetchStoryResponse(`${API_BASE}/api/v1/real-shipment-stories?${params}`, { cache: "no-store" })
  const result = parsePublishedStoryList(body)
  if (result.pagination.page !== query.page) throw new Error("Invalid story pagination")
  return result
}

export const getStoryBySlug = cache(async (slug: string): Promise<ShipmentStory | null> => {
  if (!slug) return null
  const body = await fetchStoryResponse(`${API_BASE}/api/v1/real-shipment-stories/slug/${encodeURIComponent(slug)}`, { next: { revalidate: 60 } })
  if (body === null) return null
  if (typeof body !== "object" || !("success" in body) || body.success !== true || !("data" in body))
    throw new Error("Invalid shipment story response")
  return parsePublishedStory(body.data)
})

export async function getRecentStories(excludeSlug?: string, limit = 3, serviceLine?: ServiceLine): Promise<ShipmentStorySummary[]> {
  try {
    const params = new URLSearchParams({ isPublished: "true", summary: "true", limit: String(limit + 2) })
    if (serviceLine) params.set("serviceLine", serviceLine)
    const body = await fetchStoryResponse(`${API_BASE}/api/v1/real-shipment-stories?${params}`, { next: { revalidate: 60 } })
    const { data } = parsePublishedStoryList(body)
    return data.filter((story) => story.slug !== excludeSlug && story._id !== excludeSlug).slice(0, limit)
  } catch {
    return []
  }
}
