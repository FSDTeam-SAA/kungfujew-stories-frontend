export interface StoryQuery {
  page: number
  search: string
  serviceLine: "all" | "vehicle" | "freight" | "heavy-equipment"
}

export function parseStoryQuery(params: Record<string, string | string[] | undefined>): StoryQuery {
  const value = (key: string) => typeof params[key] === "string" ? params[key] : ""
  const page = Number(value("page") || 1)
  const line = value("serviceLine")
  return {
    page: Number.isSafeInteger(page) && page >= 1 ? Math.min(page, 1000000) : 1,
    search: value("search").trim().slice(0, 200),
    serviceLine: line === "vehicle" || line === "freight" || line === "heavy-equipment" ? line : "all",
  }
}

export function storyPageHref(query: StoryQuery, page = query.page): string {
  const params = new URLSearchParams()
  if (query.search) params.set("search", query.search)
  if (query.serviceLine !== "all") params.set("serviceLine", query.serviceLine)
  if (page > 1) params.set("page", String(page))
  return `/stories${params.size ? `?${params}` : ""}`
}
