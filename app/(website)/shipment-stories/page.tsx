import ShipmentFilterBar from "@/components/blog/ShipmentFilterBar";
import StoriesHero from "@/components/blog/StoriesHero";
import WorkBehindTheMoveSection from "@/components/blog/WorkBehindTheMoveSection";
import CallToActionSection from "@/components/home/CallToActionSection";
import Footer from "@/components/home/Footer";
import React from "react";

export default function ShipmentStoriesPage() {
  return (
    <div>
      <StoriesHero />
      <ShipmentFilterBar />
      <WorkBehindTheMoveSection />
      <CallToActionSection />
      <Footer />
    </div>
  );
}
