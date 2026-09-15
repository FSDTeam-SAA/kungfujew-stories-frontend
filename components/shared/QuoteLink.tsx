"use client"

import * as React from "react"
import { getQuoteUrl, type ServiceLine } from "@/lib/site"

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, parameters: Record<string, string | undefined>) => void
  }
}

interface QuoteLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  placement: string
  serviceLine?: ServiceLine
  storySlug?: string
}

export function QuoteLink({
  children,
  placement,
  serviceLine,
  storySlug,
  onClick,
  ...props
}: QuoteLinkProps) {
  const href = getQuoteUrl({ placement, serviceLine, storySlug })

  return (
    <a
      {...props}
      href={href}
      onClick={(event) => {
        window.gtag?.("event", "quote_cta_clicked", {
          placement,
          service_line: serviceLine,
          story_slug: storySlug,
        })
        onClick?.(event)
      }}
    >
      {children}
    </a>
  )
}
