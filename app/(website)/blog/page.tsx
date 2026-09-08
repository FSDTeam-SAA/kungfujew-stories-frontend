import ShipmentFilterBar from "@/components/blog/ShipmentFilterBar";
import StoriesHero from "@/components/blog/StoriesHero";
import WorkBehindTheMoveSection from "@/components/blog/WorkBehindTheMoveSection";
import CallToActionSection from "@/components/home/CallToActionSection";
// import MoreResourcesSection from "@/components/home/MoreResourcesSection";
import Footer from "@/components/home/Footer";
import React from "react";

export default function BlogPage() {
  return (
    <div>
      <StoriesHero />
      <ShipmentFilterBar />
      <WorkBehindTheMoveSection />
      {/* <MoreResourcesSection /> */}
      <CallToActionSection/>
      <Footer />
    </div>
  );
}

