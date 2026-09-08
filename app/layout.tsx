import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/providers/SessionProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Car Carrier Group | Auto Transport & Real Shipment Stories",
  description: "Car Carrier Group official website and real shipment stories.",
  icons: {
    icon: "/logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} font-sans h-full antialiased`}
    >
      <body className={`${inter.className} min-h-full flex flex-col font-sans bg-background text-foreground`}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
