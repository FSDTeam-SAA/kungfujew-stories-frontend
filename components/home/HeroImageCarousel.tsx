"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

const slides = [
  {
    src: "/ccg2.png",
    alt: "Red sports car secured inside an enclosed car carrier",
  },
  {
    src: "/ccg3.png",
    alt: "Two cars secured on an open vehicle transport trailer",
  },
  {
    src: "/ccg4.png",
    alt: "Silver sports car being loaded into an enclosed car carrier",
  },
  {
    src: "/ccg1.png",
    alt: "White sports car being loaded onto a car carrier",
  }, {
    src: "/ccg5.png",
    alt: "White sports car being loaded onto a car carrier",
  }, {
    src: "/ccg6.png",
    alt: "White sports car being loaded onto a car carrier",
  }, {
    src: "/ccg7.png",
    alt: "White sports car being loaded onto a car carrier",
  },
]

const AUTO_ADVANCE_MS = 5_000

export function HeroImageCarousel() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [instantSelection, setInstantSelection] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [pauseRequested, setPauseRequested] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(true)
  const isPaused = hovered || focused || pauseRequested || reducedMotion

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    if (isPaused) {
      return
    }

    const intervalId = window.setInterval(() => {
      setInstantSelection(false)
      setActiveSlide((currentSlide) => (currentSlide + 1) % slides.length)
    }, AUTO_ADVANCE_MS)

    return () => window.clearInterval(intervalId)
  }, [isPaused])

  return (
    <div
      aria-label="Car Carrier Group shipment photos"
      aria-roledescription="carousel"
      className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl shadow-sm"
      role="region"
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFocused(false)
        }
      }}
      onFocusCapture={() => setFocused(true)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {slides.map((slide, index) => {
        const isActive = index === activeSlide

        return (
          <div
            key={slide.src}
            aria-hidden={!isActive}
            className={`absolute inset-0 motion-reduce:transition-none ${instantSelection ? "transition-none" : "transition-opacity duration-[240ms] ease-[cubic-bezier(0.23,1,0.32,1)]"} ${
              isActive ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <Image
              src={slide.src}
              alt={isActive ? slide.alt : ""}
              fill
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        )
      })}

      <button type="button" disabled={reducedMotion} onClick={() => setPauseRequested((paused) => !paused)} aria-pressed={pauseRequested} className="absolute right-3 top-3 rounded-lg bg-black/70 px-3 py-2 text-xs font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-70">{reducedMotion ? "Autoplay off" : pauseRequested ? "Resume slideshow" : "Pause slideshow"}</button>
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
        {slides.map((slide, index) => {
          const isActive = index === activeSlide

          return (
            <button
              key={slide.src}
              aria-label={`Show photo ${index + 1} of ${slides.length}`}
              aria-current={isActive ? "true" : undefined}
              className="flex h-10 w-8 items-center justify-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              type="button"
              onClick={(event) => { setInstantSelection(event.detail === 0); setActiveSlide(index) }}
            >
              <span aria-hidden="true" className={`h-2.5 rounded-full ${isActive ? "w-6 bg-white" : "w-2.5 bg-white/70"}`} />
              <span className="sr-only">{slide.alt}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
