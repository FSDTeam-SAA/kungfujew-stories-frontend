import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getStoryBySlug, getRecentStories } from "@/lib/api/stories"
import CallToActionSection from "@/components/home/CallToActionSection"
import Footer from "@/components/home/Footer"
import { StoryBreadcrumbBar } from "@/components/blog/story-detail/StoryBreadcrumbBar"
import { StoryHeroSection } from "@/components/blog/story-detail/StoryHeroSection"
import { StoryStatsBar } from "@/components/blog/story-detail/StoryStatsBar"
import { StoryRouteBanner } from "@/components/blog/story-detail/StoryRouteBanner"
import { StoryContent } from "@/components/blog/story-detail/StoryContent"
import { StorySnapshotSidebar } from "@/components/blog/story-detail/StorySnapshotSidebar"
import { StoryTrustBar } from "@/components/blog/story-detail/StoryTrustBar"
import { MoreRealShipments } from "@/components/blog/story-detail/MoreRealShipments"
import { StoryFaqs } from "@/components/blog/story-detail/StoryFaqs"
import { StoryJsonLd } from "@/components/blog/story-detail/StoryJsonLd"

interface Props {
  params: Promise<{ slug: string }>
}

/**
 * Dynamic SEO Metadata Generation for Search Engines & Social Crawlers
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const story = await getStoryBySlug(slug)

  if (!story) {
    return {
      title: "Shipment Story Not Found | Car Carrier Group",
      description: "The requested shipment story could not be found.",
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://carcarriergroup.com"
  const canonicalUrl = `${siteUrl}/blog/${story.slug}`
  const imageUrl = story.image || `${siteUrl}/logo.jpeg`

  return {
    title: `${story.title} | Car Carrier Group`,
    description: story.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${story.title} | Car Carrier Group`,
      description: story.metaDescription,
      url: canonicalUrl,
      siteName: "Car Carrier Group",
      locale: "en_US",
      type: "article",
      publishedTime: story.createdAt,
      modifiedTime: story.updatedAt || story.createdAt,
      authors: ["Car Carrier Group"],
      section: story.shipmentType,
      tags: [
        story.shipmentType,
        story.pickupLocation,
        story.destination,
        "Auto Transport",
        "Vehicle Shipping",
        "Car Shipping",
        "Nationwide Logistics",
      ],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: story.imageAlt || story.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: story.title,
      description: story.metaDescription,
      images: [imageUrl],
      creator: "@CarCarrierGroup",
    },
    robots: {
      index: story.isPublished !== false,
      follow: story.isPublished !== false,
      googleBot: {
        index: story.isPublished !== false,
        follow: story.isPublished !== false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

/**
 * Server Component: Story Details Page
 * Designed following the high-converting CCG reference aesthetic
 */
export default async function StoryDetailPage({ params }: Props) {
  const { slug } = await params
  const story = await getStoryBySlug(slug)

  if (!story) {
    notFound()
  }

  // Fetch up to 3 recent stories excluding the active one for the bottom grid
  const recentStories = await getRecentStories(story.slug, 3)

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Search Engine Structured Data (JSON-LD) */}
      <StoryJsonLd story={story} />

      {/* Top Breadcrumbs & Back Navigation */}
      {/* <StoryBreadcrumbBar story={story} /> */}

      {/* Top Hero Section: Headline, Meta, and Featured Image */}
      <StoryHeroSection story={story} />

      {/* 4-Box Horizontal Stats / Route Bar */}
      <StoryStatsBar story={story} />

      {/* Main Content & Sticky Sidebar Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: The Route Banner, Rich Body Content, FAQs */}
          <div className="lg:col-span-8 flex flex-col space-y-6">
            <StoryRouteBanner story={story} />
            <StoryContent story={story} />
            {story.faqs && story.faqs.length > 0 && (
              <StoryFaqs faqs={story.faqs} />
            )}
          </div>

          {/* Right Column: Sticky Snapshot Sidebar */}
          <aside className="lg:col-span-4">
            <StorySnapshotSidebar story={story} />
          </aside>

        </div>
      </section>

      {/* Transportation Experience You Can Rely On (Trust Bar) */}
      <StoryTrustBar />

      {/* More Real Shipments (Bottom 3-Card Grid) */}
      {recentStories.length > 0 && (
        <MoreRealShipments stories={recentStories} />
      )}

      {/* Bottom CTA Banner */}
      <CallToActionSection />

      {/* Site Footer */}
      <Footer />
    </div>
  )
}
