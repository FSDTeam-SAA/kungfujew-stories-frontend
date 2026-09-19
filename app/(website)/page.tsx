import CallToActionSection from "@/components/home/CallToActionSection";
import CompanyTrustSection from "@/components/home/CompanyTrustSection";
import Footer from "@/components/home/Footer";
import GoogleReviewsSection from "@/components/home/GoogleReviewsSection";
import ShipmentStoriesSection from "@/components/home/ShipmentStoriesSection";
import StatsBar from "@/components/home/StatsBar";
import WhyStoriesMatterSection from "@/components/home/WhyStoriesMatterSection";
import HeroSection from "@/shared/HeroSection";

async function getPublishedStories() {
  const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "");
  try {
    const res = await fetch(`${API_BASE}/api/v1/real-shipment-stories?isPublished=true&limit=30`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.success && Array.isArray(json.data) ? json.data : [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const stories = await getPublishedStories();

  return (
    <div>
      <HeroSection />
      <StatsBar />
      <ShipmentStoriesSection initialStories={stories} />
      <WhyStoriesMatterSection />
      <CallToActionSection />
      <CompanyTrustSection />
      {/* <GoogleReviewsSection /> */}
      <Footer />
    </div>
  );
}

