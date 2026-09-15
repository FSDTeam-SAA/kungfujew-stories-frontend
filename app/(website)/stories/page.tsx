import type { Metadata } from "next"
import StoriesHero from "@/components/blog/StoriesHero"
import { StoriesExplorer } from "@/components/blog/StoriesExplorer"
import CallToActionSection from "@/components/home/CallToActionSection"
import Footer from "@/components/home/Footer"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Shipment stories",
  description: "Published shipment stories and transportation context from Car Carrier Group.",
  alternates: { canonical: "/stories" },
}

export default function StoriesPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Car Carrier Group shipment stories",
    description: "Published shipment stories and transportation context from Car Carrier Group.",
    url: `${siteConfig.siteUrl}/stories`,
  }

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <StoriesHero />
      <StoriesExplorer />
      <CallToActionSection />
      <Footer />
    </div>
  )
}
