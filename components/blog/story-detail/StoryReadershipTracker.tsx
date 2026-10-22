"use client"

import { useEffect, useRef } from "react"
import { advanceEngagement, articleProgress } from "@/lib/story-engagement"

export function StoryReadershipTracker({ storyId }: { storyId: string }) {
  const visit = useRef<{ storyId: string; viewId: string } | null>(null)

  useEffect(() => {
    if (!crypto.randomUUID) return
    const article = document.querySelector<HTMLElement>("[data-story-article]")
    if (!article) return
    if (visit.current?.storyId !== storyId) visit.current = { storyId, viewId: crypto.randomUUID() }
    const { viewId } = visit.current
    let state = { activeSeconds: 0, progress: 0 }
    let previousTime = performance.now()
    let previouslyActive = false
    const sent = new Set<string>()
    const pending = new Set<string>()
    const attempts = new Map<string, number>()
    const send = (event: "open" | "engaged" | "complete") => {
      if (sent.has(event) || pending.has(event) || (attempts.get(event) ?? 0) >= 2) return
      pending.add(event)
      attempts.set(event, (attempts.get(event) ?? 0) + 1)
      void fetch("/api/story-events", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ storyId, viewId, event, ...state }), keepalive: true,
      }).then((response) => { if (response.ok) sent.add(event) }).catch(() => {
        // Reading stays independent of best-effort telemetry delivery.
      }).finally(() => pending.delete(event))
    }
    const tick = () => {
      const now = performance.now()
      const rect = article.getBoundingClientRect()
      const visibleTop = Math.max(0, document.querySelector("header")?.getBoundingClientRect().bottom ?? 0)
      const active = document.visibilityState === "visible" && rect.top < innerHeight && rect.bottom > visibleTop
      const elapsed = Math.min(2, Math.max(0, (now - previousTime) / 1000))
      state = advanceEngagement(state, previouslyActive ? elapsed : 0, active, articleProgress(rect, innerHeight))
      previousTime = now
      previouslyActive = active
      send("open")
      if (state.activeSeconds >= 30) send("engaged")
      if (state.activeSeconds >= 30 && state.progress >= 90) send("complete")
    }
    tick()
    const interval = window.setInterval(tick, 1000)
    document.addEventListener("visibilitychange", tick)
    return () => {
      window.clearInterval(interval)
      document.removeEventListener("visibilitychange", tick)
    }
  }, [storyId])

  return null
}
