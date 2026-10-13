"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import ShipmentFilterBar from "@/components/blog/ShipmentFilterBar"
import WorkBehindTheMoveSection from "@/components/blog/WorkBehindTheMoveSection"
import type { ServiceLine } from "@/lib/site"

export function StoriesExplorer() {
  const params = useSearchParams()
  const search = (params.get("search") ?? "").slice(0, 200)
  const line = params.get("serviceLine")
  const serviceLine: ServiceLine | "all" = line === "vehicle" || line === "freight" || line === "heavy-equipment" ? line : "all"
  const rawPage = Number(params.get("page") || 1)
  const page = Number.isSafeInteger(rawPage) && rawPage >= 1 ? Math.min(rawPage, 1000000) : 1
  const [searchQuery, setSearchQuery] = useState(search)
  const [previousSearch, setPreviousSearch] = useState(search)
  if (previousSearch !== search) { setPreviousSearch(search); setSearchQuery(search) }
  const updateUrl = (changes: Record<string, string | undefined>, push = false) => {
    const url = new URL(window.location.href)
    for (const [key, value] of Object.entries(changes)) {
      if (value) url.searchParams.set(key, value)
      else url.searchParams.delete(key)
    }
    if (push) window.history.pushState(null, "", url)
    else window.history.replaceState(null, "", url)
  }
  useEffect(() => {
    if (searchQuery.trim() === search) return
    const timer = window.setTimeout(() => {
      const url = new URL(window.location.href)
      if (searchQuery.trim()) url.searchParams.set("search", searchQuery.trim())
      else url.searchParams.delete("search")
      url.searchParams.delete("page")
      window.history.replaceState(null, "", url)
    }, 300)
    return () => window.clearTimeout(timer)
  }, [searchQuery, search])

  return (
    <>
      <ShipmentFilterBar
        activeServiceLine={serviceLine}
        searchQuery={searchQuery}
        onServiceLineChange={(value) => updateUrl({ serviceLine: value === "all" ? undefined : value, page: undefined }, true)}
        onSearchChange={setSearchQuery}
      />
      <WorkBehindTheMoveSection
        serviceLine={serviceLine === "all" ? undefined : serviceLine}
        searchQuery={search}
        page={page}
        onPageChange={(value) => updateUrl({ page: value === 1 ? undefined : String(value) }, true)}
      />
    </>
  )
}
