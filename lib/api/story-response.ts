import type { ShipmentStory, ShipmentStorySummary } from "@/types/shipmentStory"

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

export function safeStoryImage(value: unknown): string | undefined {
  if (typeof value !== "string" || !value.trim()) return undefined
  const source = value.trim()
  if (source.startsWith("/") && !source.startsWith("//") && !source.includes("\\")) return source
  try {
    const url = new URL(source)
    return url.protocol === "https:" && !url.username && !url.password ? url.href : undefined
  } catch { return undefined }
}

export function parsePublishedStorySummary(value: unknown): ShipmentStorySummary {
  if (!record(value)) throw new Error("Invalid shipment story response")
  const text = (key: string): string => {
    const field = value[key]
    if (typeof field !== "string" || !field.trim()) throw new Error("Invalid shipment story response")
    return field
  }
  const serviceLine = value.serviceLine
  if (value.isPublished !== true || (serviceLine !== "vehicle" && serviceLine !== "freight" && serviceLine !== "heavy-equipment"))
    throw new Error("Invalid published story response")
  const position = value.coverPosition === undefined ? { x: 50, y: 50 } : value.coverPosition
  if (!record(position) || ![position.x, position.y].every((coordinate) => typeof coordinate === "number" && Number.isFinite(coordinate) && coordinate >= 0 && coordinate <= 100))
    throw new Error("Invalid cover position")
  return {
    _id: text("_id"), title: text("title"), slug: text("slug"),
    metaDescription: text("metaDescription"),
    pickupLocation: text("pickupLocation"), destination: text("destination"),
    shipmentType: text("shipmentType"), shipmentStatus: text("shipmentStatus"),
    createdAt: text("createdAt"), updatedAt: typeof value.updatedAt === "string" ? value.updatedAt : undefined,
    serviceLine, isPublished: true,
    image: safeStoryImage(value.image),
    imageAlt: typeof value.imageAlt === "string" ? value.imageAlt : undefined,
    coverPosition: { x: position.x as number, y: position.y as number },
  }
}

export function parsePublishedStory(value: unknown): ShipmentStory {
  const summary = parsePublishedStorySummary(value)
  if (!record(value) || typeof value.content !== "string" || !value.content.trim())
    throw new Error("Invalid story content")
  const faqs: unknown = value.faqs ?? []
  if (!Array.isArray(faqs)) throw new Error("Invalid story FAQs")
  return { ...summary, content: value.content, faqs: faqs.map((faq: unknown) => {
    if (!record(faq) || typeof faq.question !== "string" || typeof faq.answer !== "string")
      throw new Error("Invalid story FAQs")
    return { question: faq.question, answer: faq.answer }
  }) }
}

export function parsePublishedStoryList(value: unknown) {
  if (!record(value) || value.success !== true || !Array.isArray(value.data) || !record(value.pagination))
    throw new Error("Invalid story list response")
  const pagination = value.pagination
  for (const key of ["page", "limit", "total", "totalPages"])
    if (typeof pagination[key] !== "number" || !Number.isSafeInteger(pagination[key]) || pagination[key] < 0)
      throw new Error("Invalid story pagination")
  if ((pagination.page as number) < 1 || (pagination.limit as number) < 1)
    throw new Error("Invalid story pagination")
  return {
    data: value.data.map(parsePublishedStorySummary),
    pagination: { page: pagination.page as number, limit: pagination.limit as number, total: pagination.total as number, totalPages: pagination.totalPages as number },
  }
}

type StoryFetchOptions = RequestInit & { next?: { revalidate: number } }

export async function fetchAllPublishedStories(url: string, options: StoryFetchOptions = {}): Promise<ShipmentStorySummary[]> {
  const params = new URLSearchParams({ isPublished: "true", summary: "true", limit: "50" })
  const stories = new Map<string, ShipmentStorySummary>()
  let totalPages = 1
  for (let page = 1; page <= totalPages; page++) {
    options.signal?.throwIfAborted()
    params.set("page", String(page))
    const body = await fetchStoryResponse(`${url}?${params}`, options)
    options.signal?.throwIfAborted()
    const result = parsePublishedStoryList(body)
    if (result.pagination.page !== page)
      throw new Error("Invalid story pagination")
    totalPages = result.pagination.totalPages
    for (const story of result.data) stories.set(story._id, story)
  }
  return [...stories.values()]
}

export async function fetchStoryResponse(url: string, options: StoryFetchOptions = {}): Promise<unknown | null> {
  const controller = new AbortController()
  const abort = () => controller.abort()
  if (options.signal?.aborted) controller.abort()
  options.signal?.addEventListener("abort", abort, { once: true })
  const timer = setTimeout(abort, 10000)
  try {
    const response = await fetch(url, { ...options, signal: controller.signal })
    if (response.status === 404) return null
    if (!response.ok) throw new Error("Shipment stories are temporarily unavailable. Please try again.")
    return await response.json()
  } finally {
    clearTimeout(timer)
    options.signal?.removeEventListener("abort", abort)
  }
}
