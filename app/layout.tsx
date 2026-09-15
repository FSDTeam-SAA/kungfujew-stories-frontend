import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/providers/SessionProvider";
import { GoogleAnalytics } from "@/components/shared/GoogleAnalytics";
import { siteConfig } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Car Carrier Group Stories",
    template: "%s | Car Carrier Group Stories",
  },
  description: "Shipment stories, transportation resources, and service information from Car Carrier Group.",
  openGraph: {
    type: "website",
    siteName: "Car Carrier Group Stories",
    images: [{ url: "/logo.jpeg", alt: "Car Carrier Group" }],
  },
  icons: {
    icon: "/logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: siteConfig.organizationName,
        url: "https://www.carcarriergroup.com/",
        logo: `${siteConfig.siteUrl}/logo.jpeg`,
      },
      {
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.siteUrl,
        publisher: { "@type": "Organization", name: siteConfig.organizationName },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} font-sans h-full antialiased`}
    >
      <body className={`${inter.className} min-h-full flex flex-col font-sans bg-background text-foreground`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <SessionProvider>
          {children}
        </SessionProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
