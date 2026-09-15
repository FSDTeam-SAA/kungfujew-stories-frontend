import { notFound } from "next/navigation"
import { getRecentStories, getStoryBySlug } from "@/lib/api/stories"
import CallToActionSection from "@/components/home/CallToActionSection"
import Footer from "@/components/home/Footer"
import { StoryHeroSection } from "./StoryHeroSection"
import { StoryStatsBar } from "./StoryStatsBar"
import { StoryRouteBanner } from "./StoryRouteBanner"
import { StoryContent } from "./StoryContent"
import { StorySnapshotSidebar } from "./StorySnapshotSidebar"
import { StoryTrustBar } from "./StoryTrustBar"
import { MoreRealShipments } from "./MoreRealShipments"
import { StoryFaqs } from "./StoryFaqs"
import { StoryJsonLd } from "./StoryJsonLd"

export async function StoryDetailPage({ slug }: { slug: string }) {
  const story = await getStoryBySlug(slug)
  if (!story) notFound()

  const recentStories = await getRecentStories(story.slug, 3, story.serviceLine)

  return (
    <div className="min-h-screen w-full bg-white">
      <StoryJsonLd story={story} />
      <StoryHeroSection story={story} />
      <StoryStatsBar story={story} />
      <section className="container mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="flex flex-col space-y-6 lg:col-span-8">
            <StoryRouteBanner story={story} />
            <StoryContent story={story} />
            {story.faqs && story.faqs.length > 0 && <StoryFaqs faqs={story.faqs} />}
          </div>
          <aside className="lg:col-span-4"><StorySnapshotSidebar story={story} /></aside>
        </div>
      </section>
      <StoryTrustBar />
      {recentStories.length > 0 && <MoreRealShipments stories={recentStories} />}
      <CallToActionSection />
      <Footer />
    </div>
  )
}
