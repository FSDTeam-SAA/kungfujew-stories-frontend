import { fetchAllPublishedStories } from "@/lib/api/story-response"
import { API_BASE } from "@/lib/api/base";
import CallToActionSection from "@/components/home/CallToActionSection";
import CompanyTrustSection from "@/components/home/CompanyTrustSection";
import Footer from "@/components/home/Footer";
import ShipmentStoriesSection from "@/components/home/ShipmentStoriesSection";
import StatsBar from "@/components/home/StatsBar";
import WhyStoriesMatterSection from "@/components/home/WhyStoriesMatterSection";
import HeroSection from "@/shared/HeroSection";

async function getPublishedStories() {
  try {
    const stories = await fetchAllPublishedStories(`${API_BASE}/api/v1/real-shipment-stories`, { cache: "no-store" });
    return { stories, failed: false };
  } catch {
    return { stories: [], failed: true };
  }
}

export default async function Home() {
  const { stories, failed } = await getPublishedStories();

  return (
    <div>
      <HeroSection />
      <StatsBar />
      <ShipmentStoriesSection initialStories={stories} initialLoadError={failed} />
      <WhyStoriesMatterSection />
      <CallToActionSection />
      <CompanyTrustSection />
      {/* <GoogleReviewsSection /> */}
      <Footer />
    </div>
  );
}

