import { ShipmentStory } from "@/types/shipmentStory"
import { siteConfig } from "@/lib/site"

interface Props {
  story: ShipmentStory
}

export function StoryJsonLd({ story }: Props) {
  const siteUrl = siteConfig.siteUrl
  const storyUrl = `${siteUrl}/stories/${story.slug}`

  // 1. Article / BlogPosting Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: story.title,
    description: story.metaDescription,
    image: story.image ? [story.image] : [],
    datePublished: story.createdAt,
    dateModified: story.updatedAt || story.createdAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": storyUrl,
    },
    author: {
      "@type": "Organization",
      name: "Car Carrier Group",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Car Carrier Group",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.jpeg`,
      },
    },
    about: {
      "@type": "Thing",
      name: story.shipmentType,
      description: `Shipment from ${story.pickupLocation} to ${story.destination}`,
    },
  }

  // 2. Breadcrumbs Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shipment Stories",
        item: `${siteUrl}/stories`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: story.title,
        item: storyUrl,
      },
    ],
  }

  // 3. FAQ Schema (if FAQs exist)
  const faqSchema =
    Array.isArray(story.faqs) && story.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: story.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  )
}
