export function reviewSummary(value: unknown): { rating: number | null; total: number | null } {
  if (!value || typeof value !== "object") return { rating: null, total: null }
  const rating = "rating" in value ? value.rating : undefined
  const total = "total" in value ? value.total : undefined
  return {
    rating: typeof rating === "number" && Number.isFinite(rating) && rating >= 0 && rating <= 5 ? rating : null,
    total: typeof total === "number" && Number.isSafeInteger(total) && total >= 0 ? total : null,
  }
}
