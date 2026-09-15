import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { QuoteLink } from "@/components/shared/QuoteLink"
import { getServiceBySlug, services } from "@/lib/content"
import { siteConfig } from "@/lib/site"

interface Props {
  params: Promise<{ service: string }>
}

export function generateStaticParams() {
  return services.map(({ slug }) => ({ service: slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getServiceBySlug((await params).service)
  if (!service) return { title: "Service not found" }

  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} | Car Carrier Group Stories`,
      description: service.summary,
      url: `/services/${service.slug}`,
      images: ["/logo.jpeg"],
    },
  }
}

export default async function ServicePage({ params }: Props) {
  const service = getServiceBySlug((await params).service)
  if (!service) notFound()

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: siteConfig.organizationName,
      url: siteConfig.siteUrl,
    },
    url: `${siteConfig.siteUrl}/services/${service.slug}`,
  }

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#0d2861]">Car Carrier Group service</p>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#0a192f] sm:text-5xl">{service.title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">{service.description}</p>
        </div>
      </section>
      <section className="bg-slate-50 py-14 sm:py-18">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#0a192f]">What to expect</h2>
          <ol className="mt-7 grid gap-4 sm:grid-cols-2">
            {service.steps.map((step, index) => (
              <li key={step} className="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
                <span className="mr-2 font-bold text-[#0d2861]">{index + 1}.</span>{step}
              </li>
            ))}
          </ol>
          <QuoteLink
            placement={`service-${service.slug}`}
            serviceLine={service.serviceLine}
            className="mt-10 inline-flex rounded-lg bg-[#0d2861] px-6 py-3 font-semibold text-white hover:bg-[#091b42] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d2861]"
          >
            Request a quote from Car Carrier Group
          </QuoteLink>
        </div>
      </section>
    </div>
  )
}
