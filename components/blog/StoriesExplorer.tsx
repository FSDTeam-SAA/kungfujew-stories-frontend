"use client"

import { useDeferredValue, useState } from "react"
import ShipmentFilterBar from "@/components/blog/ShipmentFilterBar"
import WorkBehindTheMoveSection from "@/components/blog/WorkBehindTheMoveSection"
import type { ServiceLine } from "@/lib/site"

export function StoriesExplorer() {
  const [serviceLine, setServiceLine] = useState<ServiceLine | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const deferredSearch = useDeferredValue(searchQuery)

  return (
    <>
      <ShipmentFilterBar
        activeServiceLine={serviceLine}
        searchQuery={searchQuery}
        onServiceLineChange={setServiceLine}
        onSearchChange={setSearchQuery}
      />
      <WorkBehindTheMoveSection
        serviceLine={serviceLine === "all" ? undefined : serviceLine}
        searchQuery={deferredSearch}
      />
    </>
  )
}
