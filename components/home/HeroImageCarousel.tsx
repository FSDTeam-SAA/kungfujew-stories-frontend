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
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) {
      return
    }

    const intervalId = window.setInterval(() => {
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
          setIsPaused(false)
        }
      }}
      onFocusCapture={() => setIsPaused(true)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {slides.map((slide, index) => {
        const isActive = index === activeSlide

        return (
          <div
            key={slide.src}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              isActive ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <Image
              src={slide.src}
              alt={isActive ? slide.alt : ""}
              fill
              priority={index === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        )
      })}

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((slide, index) => {
          const isActive = index === activeSlide

          return (
            <button
              key={slide.src}
              aria-label={`Show photo ${index + 1} of ${slides.length}`}
              aria-current={isActive ? "true" : undefined}
              className={`h-2.5 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                isActive ? "w-6 bg-white" : "w-2.5 bg-white/70 hover:bg-white"
              }`}
              type="button"
              onClick={() => setActiveSlide(index)}
            >
              <span className="sr-only">{slide.alt}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
