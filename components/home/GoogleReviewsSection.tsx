"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Star, ChevronLeft, ChevronRight, ExternalLink, MapPin } from "lucide-react"

export const GOOGLE_REVIEWS_URL = "https://g.page/car-carrier-group/review?rc"

export interface GoogleReviewItem {
  id: string
  authorName: string
  authorAvatar?: string
  date: string
  rating: number
  reviewText: string
  verified: boolean
}

export default function GoogleReviewsSection() {
  const [reviews, setReviews] = useState<GoogleReviewItem[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCards, setVisibleCards] = useState(3)
  const [isPaused, setIsPaused] = useState(false)
  const [overallRating, setOverallRating] = useState<number>(5.0)
  const [totalRatings, setTotalRatings] = useState<number | null>(null)

  // Fetch live reviews directly from the Google API route
  useEffect(() => {
    let ignore = false
    setLoading(true)

    fetch("/api/google-reviews")
      .then((res) => res.json())
      .then((data) => {
        if (ignore) return
        if (data.success && Array.isArray(data.reviews)) {
          setReviews(data.reviews)
          if (data.rating) setOverallRating(data.rating)
          if (data.total) setTotalRatings(data.total)
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!ignore) setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [])

  // Responsive screen calculation for visible carousel cards
  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1)
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2)
      } else {
        setVisibleCards(3)
      }
    }
    updateVisible()
    window.addEventListener("resize", updateVisible)
    return () => window.removeEventListener("resize", updateVisible)
  }, [])

  const hasMultipleReviews = reviews.length > 1
  const isSingle = reviews.length === 1
  const maxIndex = Math.max(0, reviews.length - visibleCards)

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex)
    }
  }, [currentIndex, maxIndex])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex))
  }

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0))
  }, [maxIndex])

  // Auto-slide every 5 seconds if multiple cards are available
  useEffect(() => {
    if (isPaused || maxIndex <= 0) return
    const interval = setInterval(() => {
      handleNext()
    }, 5000)
    return () => clearInterval(interval)
  }, [isPaused, maxIndex, handleNext])

  return (
    <section className="w-full bg-[#f8fafc] py-14 sm:py-18 lg:py-20 border-b border-slate-200/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Simple & Clean Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            {/* Google Rating Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-3">
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <div className="flex items-center gap-0.5 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 stroke-amber-500" />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-700">
                {overallRating.toFixed(1)} Star Rating
                {totalRatings ? ` (${totalRatings}+ Reviews)` : ""}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0a192f] tracking-tight">
              Real Customer Reviews on Google
            </h2>
          </div>

          {/* Action Links & Slider Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm font-bold text-[#0d2861] hover:text-[#091b42] inline-flex items-center gap-1.5 transition-colors mr-2"
            >
              <span>View on Google Maps</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            {hasMultipleReviews && (
              <>
                <button
                  onClick={handlePrev}
                  aria-label="Previous review"
                  className="h-10 w-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-[#0d2861] hover:border-slate-300 hover:bg-slate-50 transition-all shadow-xs"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next review"
                  className="h-10 w-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-[#0d2861] hover:border-slate-300 hover:bg-slate-50 transition-all shadow-xs"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Loading State: 3 Skeleton Cards */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-64 rounded-2xl border border-slate-200/80 bg-white p-6 animate-pulse flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="h-4 w-24 bg-slate-200 rounded-md" />
                  <div className="h-3 w-full bg-slate-100 rounded-md" />
                  <div className="h-3 w-5/6 bg-slate-100 rounded-md" />
                  <div className="h-3 w-3/4 bg-slate-100 rounded-md" />
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="h-10 w-10 rounded-full bg-slate-200" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-3.5 w-28 bg-slate-200 rounded-md" />
                    <div className="h-2.5 w-16 bg-slate-100 rounded-md" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State when no API key / no live reviews returned */}
        {!loading && reviews.length === 0 && (
          <div className="rounded-2xl border border-slate-200/90 bg-white p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-xs">
            <div className="h-12 w-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-4 text-[#0d2861]">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#0a192f] mb-2">
              Live Google Reviews Stream
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Reviews in this section stream live directly from Google via the Google Places API. Add your Google Places API Key in <code className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-800 font-mono text-xs">.env</code> to stream real-time client reviews.
            </p>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0d2861] hover:bg-[#091b42] text-white px-5 py-3 font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all duration-200"
            >
              <span>View Reviews on Google Maps</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        )}

        {/* Single Review Display */}
        {!loading && isSingle && (
          <div className="max-w-2xl mx-auto">
            <article className="rounded-2xl border border-slate-200/90 bg-white p-7 sm:p-9 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(reviews[0].rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 stroke-amber-500" />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                    Verified Google Review
                  </span>
                  <svg className="h-4 w-4 shrink-0 opacity-80" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                </div>
              </div>

              <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-normal mb-6">
                &ldquo;{reviews[0].reviewText}&rdquo;
              </p>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {reviews[0].authorAvatar ? (
                    <div className="relative h-11 w-11 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                      <Image
                        src={reviews[0].authorAvatar}
                        alt={reviews[0].authorName}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-11 w-11 rounded-full bg-[#0d2861] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {reviews[0].authorName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                  )}

                  <div>
                    <div className="text-sm sm:text-base font-bold text-[#0a192f]">
                      {reviews[0].authorName}
                    </div>
                    <div className="text-xs text-slate-500 font-medium">
                      {reviews[0].date} · Verified Shipper
                    </div>
                  </div>
                </div>

                <a
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#0d2861] hover:underline inline-flex items-center gap-1"
                >
                  View on Google
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </article>
          </div>
        )}

        {/* Multi-Card Carousel Slider */}
        {!loading && hasMultipleReviews && (
          <>
            <div
              className="relative overflow-hidden"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div
                className="flex transition-transform duration-500 ease-in-out -mx-3"
                style={{
                  transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
                }}
              >
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-3"
                  >
                    <div className="h-full flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow">
                      <div>
                        {/* Top: 5 Stars + Google G Logo */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-1 text-amber-400">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-amber-400 stroke-amber-500" />
                            ))}
                          </div>
                          <svg className="h-4 w-4 shrink-0 opacity-80" viewBox="0 0 24 24" aria-hidden="true">
                            <path
                              fill="#4285F4"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="#34A853"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                            />
                            <path
                              fill="#EA4335"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                            />
                          </svg>
                        </div>

                        {/* Review Text Body */}
                        <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed font-normal mb-6 min-h-[96px]">
                          &ldquo;{review.reviewText}&rdquo;
                        </p>
                      </div>

                      {/* Reviewer Profile Footer */}
                      <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                        {review.authorAvatar ? (
                          <div className="relative h-10 w-10 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                            <Image
                              src={review.authorAvatar}
                              alt={review.authorName}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-[#0d2861] text-white flex items-center justify-center font-bold text-xs shrink-0">
                            {review.authorName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </div>
                        )}

                        <div className="min-w-0">
                          <div className="text-sm font-bold text-[#0a192f] truncate">
                            {review.authorName}
                          </div>
                          <div className="text-xs text-slate-500 font-medium">
                            {review.date} · <span className="text-emerald-700 font-semibold">Verified</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Dot Indicators */}
            {maxIndex > 0 && (
              <div className="flex items-center justify-center gap-1.5 mt-8">
                {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === idx
                        ? "w-6 bg-[#0d2861]"
                        : "w-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </section>
  )
}
