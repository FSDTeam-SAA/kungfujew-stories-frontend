const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL

const siteUrl = configuredSiteUrl || "https://stories.carcarriergroup.com"

try {
  new URL(siteUrl)
} catch {
  throw new Error("NEXT_PUBLIC_SITE_URL must be a valid absolute URL")
}

export const siteConfig = {
  name: "Car Carrier Group Stories",
  organizationName: "Car Carrier Group",
  siteUrl,
  quoteUrl:
    process.env.NEXT_PUBLIC_CCG_QUOTE_URL ||
    "https://www.carcarriergroup.com/car-shipping-quote",
} as const

export type ServiceLine = "vehicle" | "freight" | "heavy-equipment"

export function getQuoteUrl({
  placement,
  serviceLine,
  storySlug,
}: {
  placement: string
  serviceLine?: ServiceLine
  storySlug?: string
}) {
  const url = new URL(siteConfig.quoteUrl)
  url.searchParams.set("utm_source", "ccg-stories")
  url.searchParams.set("utm_medium", "referral")
  url.searchParams.set("utm_campaign", placement)

  if (serviceLine) url.searchParams.set("utm_content", serviceLine)
  if (storySlug) url.searchParams.set("story", storySlug)

  return url.toString()
}
