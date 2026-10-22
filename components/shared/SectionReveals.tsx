"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function SectionReveals() {
  const pathname = usePathname()
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (media.matches || !window.IntersectionObserver) return
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-section-reveal]"))
    const revealAll = () => {
      observer.disconnect()
      for (const element of elements) element.removeAttribute("data-reveal-state")
    }
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.setAttribute("data-reveal-state", "visible")
        observer.unobserve(entry.target)
      }
    }, { threshold: 0.05 })
    for (const element of elements) {
      if (element.getBoundingClientRect().top < innerHeight) continue
      element.setAttribute("data-reveal-state", "waiting")
      observer.observe(element)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (["Tab", "ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) revealAll()
    }
    const onMotionChange = () => { if (media.matches) revealAll() }
    document.addEventListener("keydown", onKeyDown, true)
    media.addEventListener("change", onMotionChange)
    return () => {
      revealAll()
      document.removeEventListener("keydown", onKeyDown, true)
      media.removeEventListener("change", onMotionChange)
    }
  }, [pathname])
  return null
}
