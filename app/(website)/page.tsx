import CallToActionSection from "@/components/home/CallToActionSection";
import Footer from "@/components/home/Footer";
import MoreResourcesSection from "@/components/home/MoreResourcesSection";
import ShipmentStoriesSection from "@/components/home/ShipmentStoriesSection";
import StatsBar from "@/components/home/StatsBar";
import WhyStoriesMatterSection from "@/components/home/WhyStoriesMatterSection";
import HeroSection from "@/shared/HeroSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <StatsBar />
      <ShipmentStoriesSection />
      <WhyStoriesMatterSection />
      <CallToActionSection />
      <MoreResourcesSection />
      <Footer />
    </div>
  );
}

