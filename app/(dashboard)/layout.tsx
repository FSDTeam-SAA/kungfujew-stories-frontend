"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutGrid,
  Settings,
  LogOut,
  Loader2,
  ExternalLink,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    } else if (status === "authenticated" && session?.user?.role !== "admin") {
      router.replace("/login");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#0c2340] mx-auto" />
          <p className="text-sm font-medium text-slate-600">
            Checking authorization...
          </p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated" || session?.user?.role !== "admin") {
    return null;
  }

  const userName = session?.user?.name || "Demo Name";
  const userRole = session?.user?.role === "admin" ? "Super Admin" : "User";
  const userInitials = userName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase() || "SA";

  const isSettingsPage = pathname.startsWith("/dashboard/settings");

  return (
    <div className="min-h-screen flex bg-[#f8fafc]">
      {/* 1. Left Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between shrink-0 min-h-screen sticky top-0 h-screen">
        <div>
          {/* Brand Logo Section */}
          <div className="h-20 px-6 flex items-center border-b border-slate-100">
            <Link href="/dashboard" className="flex items-center">
              <Image
                src="/logo.jpeg"
                alt="Car Carrier Group"
                width={130}
                height={55}
                priority
                className="h-12 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="px-4 py-6">
            <nav className="space-y-1.5">
              <Link
                href="/dashboard"
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  pathname === "/dashboard" || pathname.startsWith("/dashboard/real-shipment-stories")
                    ? "bg-[#0c2340] text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <LayoutGrid className="w-4 h-4 shrink-0 text-blue-300" />
                <span className="truncate">Real Shipment Stories</span>
              </Link>

              <Link
                href="/dashboard/settings"
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  isSettingsPage
                    ? "bg-[#0c2340] text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Settings className="w-4 h-4 shrink-0 text-blue-300" />
                <span className="truncate">Settings</span>
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom User Profile & Logout Section */}
        <div className="p-5 border-t border-slate-100 space-y-4">
          {/* User Profile Card */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 border border-slate-300 overflow-hidden flex items-center justify-center font-bold text-xs text-slate-700 shrink-0">
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt={userName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{userInitials}</span>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate leading-tight">
                {userName}
              </p>
              <p className="text-xs text-slate-400 font-medium leading-tight mt-0.5">
                {userRole}
              </p>
            </div>
          </div>

          {/* Red-outlined Log out button */}
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full py-2 px-3 border border-red-200/80 hover:bg-red-50 text-red-500 rounded-lg font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar / Header */}
        <header className="h-20 bg-white border-b border-slate-200/80 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {isSettingsPage ? "Account Settings" : "Real Shipment Stories"}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {isSettingsPage
                ? "Manage your administrator profile details and security credentials."
                : "Manage and publish CCG's real transportation stories."}
            </p>
          </div>

          {/* Right-side Top Avatar & Website Link */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mr-2"
            >
              <span>View Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <div className="w-10 h-10 rounded-full bg-slate-200 border border-slate-300 overflow-hidden flex items-center justify-center font-bold text-xs text-slate-700 shadow-xs">
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt={userName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{userInitials}</span>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Body - Spacious & Full Width */}
        <main className="flex-1 p-6 sm:p-8 w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
