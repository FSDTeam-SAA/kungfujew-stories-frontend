import { API_BASE } from "@/lib/api/base";
import type { MetadataRoute } from "next"
import { resources, services } from "@/lib/content"
import { siteConfig } from "@/lib/site"
import { fetchAllPublishedStories } from "@/lib/api/story-response"

async function getPublishedStoryUrls() {
  try {
    const stories = await fetchAllPublishedStories(`${API_BASE}/api/v1/real-shipment-stories`, { next: { revalidate: 3600 } })
    return stories.map((story) => ({
      url: `${siteConfig.siteUrl}/stories/${encodeURIComponent(story.slug)}`,
      lastModified: story.updatedAt && Number.isFinite(Date.parse(story.updatedAt)) ? new Date(story.updatedAt) : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.siteUrl}/stories`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.siteUrl}/services`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.siteUrl}/resources`, changeFrequency: "monthly", priority: 0.8 },
    ...services.map((service) => ({ url: `${siteConfig.siteUrl}/services/${service.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...resources.map((resource) => ({ url: `${siteConfig.siteUrl}/resources/${resource.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ]

  return [...staticRoutes, ...(await getPublishedStoryUrls())]
}
