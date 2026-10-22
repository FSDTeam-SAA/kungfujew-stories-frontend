import { serializeJsonLd } from "@/lib/json-ld"
import type { Metadata } from "next"
import { Suspense } from "react"
import StoriesHero from "@/components/blog/StoriesHero"
import { StoriesExplorer } from "@/components/blog/StoriesExplorer"
import WhyStoriesMatterSection from "@/components/home/WhyStoriesMatterSection"
import CallToActionSection from "@/components/home/CallToActionSection"
import CompanyTrustSection from "@/components/home/CompanyTrustSection"
import GoogleReviewsSection from "@/components/home/GoogleReviewsSection"
import Footer from "@/components/home/Footer"
import { siteConfig } from "@/lib/site"
import { getPublishedStoryPage } from "@/lib/api/stories"
import { parseStoryQuery, type StoryQuery } from "@/lib/story-query"
import WorkBehindTheMoveSection from "@/components/blog/WorkBehindTheMoveSection"

export const metadata: Metadata = {
  title: "Shipment stories",
  description: "Published shipment stories and transportation context from Car Carrier Group.",
  alternates: { canonical: "/stories" },
}

async function StoryResults({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = parseStoryQuery(await searchParams)
  return <><StoriesExplorer query={query} /><PublishedResults query={query} /></>
}

async function PublishedResults({ query }: { query: StoryQuery }) {
  let result: Awaited<ReturnType<typeof getPublishedStoryPage>> | null = null
  try {
    result = await getPublishedStoryPage(query)
  } catch {
    // Keep transport failures distinct from a successful empty collection.
  }
  return <WorkBehindTheMoveSection stories={result?.data ?? []} query={query} totalPages={result?.pagination.totalPages} loadError={result === null} />
}

export default function StoriesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Car Carrier Group shipment stories",
    description: "Published shipment stories and transportation context from Car Carrier Group.",
    url: `${siteConfig.siteUrl}/stories`,
  }

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(collectionSchema) }} />
      <StoriesHero />
      <Suspense fallback={<WorkBehindTheMoveSection stories={[]} query={{ page: 1, search: "", serviceLine: "all" }} loading />}><StoryResults searchParams={searchParams} /></Suspense>
      <WhyStoriesMatterSection />
      <CallToActionSection />
      <CompanyTrustSection />
      <GoogleReviewsSection />
      <Footer />
    </div>
  )
}
