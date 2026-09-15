"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Save,
  KeyRound,
  Check,
  Building,
} from "lucide-react";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "");

export default function SettingsPage() {
  const { data: session } = useSession();
  const token = (session?.user as any)?.accessToken;

  // Profile Form States
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);

  // Password Form States
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Fetch initial profile data
  useEffect(() => {
    if (session?.user) {
      if (session.user.name) setFullName(session.user.name);
      if (session.user.email) setEmail(session.user.email);
    }

    if (!token) return;

    const fetchCurrentUserData = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/v1/auth`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await res.json();
        if (res.ok && json.success && json.data) {
          if (json.data.fullName) setFullName(json.data.fullName);
          if (json.data.email) setEmail(json.data.email);
        }
      } catch (err) {
        console.error("Error loading user profile:", err);
      }
    };

    fetchCurrentUserData();
  }, [token, session]);

  // Handle Profile Update
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError(null);
    setProfileSuccess(null);

    if (!fullName.trim() || !email.trim()) {
      setProfileError("Full Name and Email Address are required.");
      return;
    }

    setProfileLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/v1/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
        }),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setProfileSuccess("Profile information updated successfully!");
        setTimeout(() => setProfileSuccess(null), 4000);
      } else {
        setProfileError(json.message || "Failed to update profile.");
      }
    } catch (err: any) {
      setProfileError(err?.message || "Network error updating profile.");
    } finally {
      setProfileLoading(false);
    }
  };

  // Handle Password Update
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All password fields are required.");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password do not match.");
      return;
    }

    setPasswordLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/v1/auth/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setPasswordSuccess("Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => setPasswordSuccess(null), 4000);
      } else {
        setPasswordError(json.message || "Failed to update password.");
      }
    } catch (err: any) {
      setPasswordError(err?.message || "Network error updating password.");
    } finally {
      setPasswordLoading(false);
    }
  };

  // User initials
  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase() || "SA";

  const isMinLength = newPassword.length >= 6;
  const isMatching = newPassword.length > 0 && newPassword === confirmPassword;

  return (
    <div className="space-y-8 sm:space-y-10 w-full pb-12">
      {/* 1. Top Overview Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Banner Graphic Header */}
        <div className="h-36 sm:h-44 bg-gradient-to-r from-[#0c2340] via-[#163a69] to-[#0c2340] relative">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] [background-size:20px_20px]"></div>
        </div>

        {/* Profile Header Content with proper Avatar spacing */}
        <div className="px-6 sm:px-10 pb-8 pt-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            {/* Avatar and Identity */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-5">
              {/* Negative margin ONLY on avatar so text is not pulled onto banner */}
              <div className="relative -mt-16 sm:-mt-20 shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white p-1.5 shadow-xl border border-slate-200/80">
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#0c2340] to-[#1a4175] text-white flex items-center justify-center font-bold text-2xl sm:text-3xl shadow-inner tracking-wider">
                  {initials}
                </div>
              </div>

              <div className="space-y-1 pb-0.5">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    {fullName || "Administrator"}
                  </h2>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Active Session</span>
                  </span>
                </div>
                <p className="text-sm text-slate-500 font-medium">
                  {email || "admin@carcarriergroup.com"}
                </p>
              </div>
            </div>

            {/* Identity Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2 md:pt-0">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-[#0c2340]" />
                <span>Super Administrator</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs">
                <Building className="w-4 h-4 text-[#0c2340]" />
                <span>Car Carrier Group</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Section Header with clear breathing room */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Security & Account Configuration</h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Update your administrative profile credentials, contact email, and account password.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>SSL 256-bit Encrypted</span>
        </div>
      </div>

      {/* 3. Responsive Side-by-Side Cards (Spacious Gap, Balanced Height & Padding) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 w-full items-stretch">
        {/* Card 1: Profile Information */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between h-full">
          <div>
            {/* Card Header */}
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#0c2340]/10 text-[#0c2340] flex items-center justify-center shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">
                    Profile Information
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Update your full administrative name and email address.
                  </p>
                </div>
              </div>
            </div>

            {/* Card Form */}
            <form id="profileForm" onSubmit={handleUpdateProfile} className="p-8 space-y-6">
              {profileSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-3 animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="font-semibold">{profileSuccess}</span>
                </div>
              )}

              {profileError && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-3 animate-in fade-in">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                  <span>{profileError}</span>
                </div>
              )}

              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c2340] focus:bg-white transition-all font-medium"
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  Visible across the administrative dashboard and stories activity.
                </p>
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. admin@carcarriergroup.com"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c2340] focus:bg-white transition-all font-medium"
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  Used for administrator login and notifications.
                </p>
              </div>

              {/* Administrative Access & Security Summary Card */}
              <div className="p-4 bg-slate-50/80 border border-slate-200/80 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#0c2340]" />
                    <span className="text-xs font-bold text-slate-800">Administrative Privileges</span>
                  </div>
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full uppercase tracking-wider">
                    Full Access
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-200/60">
                  <div>
                    <span className="text-slate-400 text-[11px] block">Current Role</span>
                    <span className="font-semibold text-slate-700">Super Administrator</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Permission Scope</span>
                    <span className="font-semibold text-slate-700">All Modules & Settings</span>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Card Footer */}
          <div className="px-8 py-5 border-t border-slate-100 bg-slate-50/40 flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
              Changes apply across your active administrative session.
            </span>
            <button
              type="submit"
              form="profileForm"
              disabled={profileLoading}
              className="inline-flex items-center gap-2 bg-[#0c2340] hover:bg-[#081a33] text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-xl shadow-xs transition-all disabled:opacity-70 cursor-pointer ml-auto sm:ml-0"
            >
              {profileLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving changes...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Card 2: Change Password */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between h-full">
          <div>
            {/* Card Header */}
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#0c2340]/10 text-[#0c2340] flex items-center justify-center shrink-0">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">
                    Change Password
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Ensure your account is protected with a secure password.
                  </p>
                </div>
              </div>
            </div>

            {/* Card Form */}
            <form id="passwordForm" onSubmit={handleUpdatePassword} className="p-8 space-y-6">
              {passwordSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-3 animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="font-semibold">{passwordSuccess}</span>
                </div>
              )}

              {passwordError && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-3 animate-in fade-in">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                  <span>{passwordError}</span>
                </div>
              )}

              {/* Current Password */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Current Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showCurrentPass ? "text" : "password"}
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full pl-11 pr-11 py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c2340] focus:bg-white transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showCurrentPass ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showNewPass ? "text" : "password"}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full pl-11 pr-11 py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c2340] focus:bg-white transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showNewPass ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Confirm New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showConfirmPass ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-type new password"
                    className="w-full pl-11 pr-11 py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c2340] focus:bg-white transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showConfirmPass ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Password Requirements Checklist */}
              <div className="p-4 bg-slate-50/80 border border-slate-200/80 rounded-2xl space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                      isMinLength
                        ? "bg-emerald-100 text-emerald-700 font-bold"
                        : "bg-slate-200 text-slate-400"
                    }`}
                  >
                    {isMinLength ? <Check className="w-3 h-3" /> : "•"}
                  </div>
                  <span className={isMinLength ? "text-emerald-700 font-semibold" : "text-slate-500"}>
                    Minimum 6 characters
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                      isMatching
                        ? "bg-emerald-100 text-emerald-700 font-bold"
                        : "bg-slate-200 text-slate-400"
                    }`}
                  >
                    {isMatching ? <Check className="w-3 h-3" /> : "•"}
                  </div>
                  <span className={isMatching ? "text-emerald-700 font-semibold" : "text-slate-500"}>
                    Passwords match
                  </span>
                </div>
              </div>
            </form>
          </div>

          {/* Card Footer */}
          <div className="px-8 py-5 border-t border-slate-100 bg-slate-50/40 flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
              Requires your current password to confirm authorization.
            </span>
            <button
              type="submit"
              form="passwordForm"
              disabled={passwordLoading}
              className="inline-flex items-center gap-2 bg-[#0c2340] hover:bg-[#081a33] text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-xl shadow-xs transition-all disabled:opacity-70 cursor-pointer ml-auto sm:ml-0"
            >
              {passwordLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Updating password...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Update Password</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
