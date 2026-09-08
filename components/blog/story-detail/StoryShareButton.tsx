"use client"

import * as React from "react"
import { Share2, Check } from "lucide-react"

export function StoryShareButton({ title }: { title?: string }) {
  const [copied, setCopied] = React.useState(false)

  const handleShare = async () => {
    if (typeof window === "undefined") return

    // If native Web Share API is supported on mobile, offer native share
    if (navigator.share && /Mobi|Android/i.test(navigator.userAgent)) {
      try {
        await navigator.share({
          title: title || document.title,
          url: window.location.href,
        })
        return
      } catch {
        // User cancelled or share failed, fallback to copy
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch (err) {
      console.error("Failed to copy link:", err)
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-sm transition-all cursor-pointer"
      title="Share story link"
      aria-label="Share story link"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-600" />
          <span className="text-emerald-700 font-bold">Link Copied!</span>
        </>
      ) : (
        <>
          <Share2 className="w-3.5 h-3.5 text-slate-500" />
          <span>Share</span>
        </>
      )}
    </button>
  )
}

