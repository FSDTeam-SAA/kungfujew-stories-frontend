import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { QuoteLink } from "@/components/shared/QuoteLink"
import { getResourceBySlug, resources } from "@/lib/content"

interface Props {
  params: Promise<{ resource: string }>
}

export function generateStaticParams() {
  return resources.map(({ slug }) => ({ resource: slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resource = getResourceBySlug((await params).resource)
  if (!resource) return { title: "Resource not found" }
  return {
    title: resource.title,
    description: resource.description,
    alternates: { canonical: `/resources/${resource.slug}` },
    openGraph: {
      title: `${resource.title} | Car Carrier Group Stories`,
      description: resource.description,
      url: `/resources/${resource.slug}`,
      images: ["/logo.jpeg"],
    },
  }
}

export default async function ResourcePage({ params }: Props) {
  const resource = getResourceBySlug((await params).resource)
  if (!resource) notFound()

  const faqSchema = resource.slug === "shipping-faq" ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: resource.sections.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  } : null

  return (
    <article className="bg-white py-16 sm:py-24">
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#0d2861]">Transportation resource</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-[#0a192f] sm:text-5xl">{resource.title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-slate-600">{resource.intro}</p>
        <div className="mt-12 space-y-8">
          {resource.sections.map(([heading, body]) => (
            <section key={heading}>
              <h2 className="text-2xl font-bold text-[#0a192f]">{heading}</h2>
              <p className="mt-3 leading-relaxed text-slate-600">{body}</p>
            </section>
          ))}
        </div>
        <QuoteLink
          placement={`resource-${resource.slug}`}
          className="mt-12 inline-flex rounded-lg bg-[#0d2861] px-6 py-3 font-semibold text-white hover:bg-[#091b42] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d2861]"
        >
          Request a quote from Car Carrier Group
        </QuoteLink>
      </div>
    </article>
  )
}
