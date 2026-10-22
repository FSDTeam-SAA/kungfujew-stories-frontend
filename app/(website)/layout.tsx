import Navbar from "@/shared/navbar";
import React from "react";
import { SectionReveals } from "@/components/shared/SectionReveals";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <SectionReveals />
      <main className="flex-1">{children}</main>
    </div>
  );
}

