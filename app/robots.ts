import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/stories", "/services", "/resources"],
      disallow: ["/dashboard", "/login", "/request-a-quote", "/blog", "/shipment-stories", "/shipments"],
    },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  }
}
