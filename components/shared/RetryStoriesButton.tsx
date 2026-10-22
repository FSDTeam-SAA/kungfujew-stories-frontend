"use client"

import { useRouter } from "next/navigation"
import { useTransition } from "react"

export function RetryStoriesButton() {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  return <button type="button" disabled={pending} onClick={() => startTransition(() => router.refresh())} className="mt-4 rounded-lg border px-4 py-3 font-semibold text-[#0d2861] focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60">{pending ? "Retrying…" : "Try again"}</button>
}
