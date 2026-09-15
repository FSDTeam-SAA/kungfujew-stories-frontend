import type { Metadata } from "next"
import { StoryDetailPage } from "@/components/blog/story-detail/StoryDetailPage"
import { getStoryBySlug } from "@/lib/api/stories"
import { siteConfig } from "@/lib/site"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const story = await getStoryBySlug((await params).slug)
  if (!story) {
    return {
      title: "Shipment story not found",
      description: "The requested shipment story could not be found.",
      robots: { index: false, follow: false },
    }
  }

  const canonicalUrl = `${siteConfig.siteUrl}/stories/${story.slug}`
  const imageUrl = story.image || `${siteConfig.siteUrl}/logo.jpeg`

  return {
    title: story.title,
    description: story.metaDescription,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: story.title,
      description: story.metaDescription,
      url: canonicalUrl,
      siteName: siteConfig.name,
      type: "article",
      publishedTime: story.createdAt,
      modifiedTime: story.updatedAt || story.createdAt,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: story.imageAlt || story.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: story.title,
      description: story.metaDescription,
      images: [imageUrl],
    },
    robots: { index: story.isPublished !== false, follow: story.isPublished !== false },
  }
}

export default async function StoryPage({ params }: Props) {
  return <StoryDetailPage slug={(await params).slug} />
}
