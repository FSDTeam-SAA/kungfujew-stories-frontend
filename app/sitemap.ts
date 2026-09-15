import type { MetadataRoute } from "next"
import { resources, services } from "@/lib/content"
import { siteConfig } from "@/lib/site"

const apiBase = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "")

async function getPublishedStoryUrls() {
  try {
    const storyUrls: MetadataRoute.Sitemap = []
    let page = 1
    let totalPages = 1

    while (page <= totalPages) {
      const response = await fetch(
        `${apiBase}/api/v1/real-shipment-stories?isPublished=true&limit=50&page=${page}`,
        { next: { revalidate: 3600 } }
      )
      if (!response.ok) break
      const body = await response.json()
      if (!body.success || !Array.isArray(body.data)) break

      storyUrls.push(
        ...body.data
          .filter((story: { isPublished?: boolean; slug?: string }) => story.isPublished !== false && story.slug)
          .map((story: { slug: string; updatedAt?: string }) => ({
            url: `${siteConfig.siteUrl}/stories/${story.slug}`,
            lastModified: story.updatedAt ? new Date(story.updatedAt) : undefined,
            changeFrequency: "monthly" as const,
            priority: 0.7,
          }))
      )
      totalPages = Number(body.pagination?.totalPages) || 1
      page += 1
    }

    return storyUrls
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
