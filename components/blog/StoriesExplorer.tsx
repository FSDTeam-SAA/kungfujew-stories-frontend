"use client"

import { useEffect, useRef, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import ShipmentFilterBar from "@/components/blog/ShipmentFilterBar"
import { storyPageHref, type StoryQuery } from "@/lib/story-query"

export function StoriesExplorer({ query }: { query: StoryQuery }) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState(query.search)
  const desired = useRef(query)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const requested = useRef(new Set<string>())
  const [pending, startTransition] = useTransition()

  const cancelSearch = () => {
    if (timer.current !== null) clearTimeout(timer.current)
    timer.current = null
  }

  useEffect(() => {
    // An older acknowledgement must not replace text typed since that request.
    if (requested.current.delete(storyPageHref(query))) return
    if (timer.current !== null) clearTimeout(timer.current)
    timer.current = null
    desired.current = query
    setSearchQuery(query.search)
  }, [query])

  useEffect(() => {
    const resetPending = () => {
      requested.current.clear()
      if (timer.current !== null) clearTimeout(timer.current)
      timer.current = null
    }
    window.addEventListener("popstate", resetPending)
    return () => {
      resetPending()
      window.removeEventListener("popstate", resetPending)
    }
  }, [])

  const navigate = (next: StoryQuery, push: boolean) => {
    const href = storyPageHref(next)
    // Aborted navigations may never acknowledge; keep this bookkeeping bounded.
    if (requested.current.size >= 32) requested.current.clear()
    requested.current.add(href)
    startTransition(() => {
      if (push) router.push(href, { scroll: false })
      else router.replace(href, { scroll: false })
    })
  }

  return (
    <div aria-busy={pending}>
      <ShipmentFilterBar
        activeServiceLine={query.serviceLine}
        searchQuery={searchQuery}
        onServiceLineChange={(serviceLine) => {
          cancelSearch()
          desired.current = { ...desired.current, serviceLine, page: 1 }
          navigate(desired.current, true)
        }}
        onSearchChange={(search) => {
          setSearchQuery(search)
          cancelSearch()
          desired.current = { ...desired.current, search: search.trim(), page: 1 }
          timer.current = setTimeout(() => {
            timer.current = null
            navigate(desired.current, false)
          }, 300)
        }}
      />
      <p role="status" className="sr-only">{pending ? "Updating story results…" : ""}</p>
    </div>
  )
}
