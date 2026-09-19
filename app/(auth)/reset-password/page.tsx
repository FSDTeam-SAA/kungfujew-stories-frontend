"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Lock,
  Eye,
  EyeOff,
  Check,
  CheckCircle2,
  AlertCircle,
  Loader2,
  KeyRound,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const isMinLength = newPassword.length >= 6;
  const isMatching = newPassword.length > 0 && newPassword === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("Reset token is missing. Please request a new password reset link.");
      return;
    }

    if (!newPassword || !confirmPassword) {
      setError("Please fill out all password fields.");
      return;
    }

    if (!isMinLength) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (!isMatching) {
      setError("The passwords you entered do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/v1/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess(true);
      } else {
        setError(
          data?.message ||
            "Failed to reset password. The link may have expired or already been used."
        );
      }
    } catch (err: any) {
      setError(
        err?.message ||
          "Network error communicating with authentication server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-8 sm:p-10">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image
              src="/logo.jpeg"
              alt="Car Carrier Group"
              width={140}
              height={70}
              priority
              className="h-16 w-auto object-contain"
            />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0d2861]/10 text-[#0d2861] text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Account Security</span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {success ? "Password Updated" : "Set New Password"}
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
            {success
              ? "Your password has been successfully reset. You can now sign in with your new credentials."
              : "Choose a secure password for your Car Carrier Group administrator account."}
          </p>
        </div>

        {/* 1. Missing Token State */}
        {!token && !success ? (
          <div className="space-y-6 text-center">
            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-3">
              <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
              <h3 className="text-base font-bold">Invalid or Missing Token</h3>
              <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                This password reset link is invalid or incomplete. If you copied the link from an email, ensure you copied the entire address.
              </p>
            </div>

            <Link
              href="/forgot-password"
              className="w-full py-3 px-4 bg-[#0d2861] hover:bg-[#081b43] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
            >
              <KeyRound className="w-4 h-4" />
              <span>Request New Reset Link</span>
            </Link>
          </div>
        ) : success ? (
          /* 2. Success State */
          <div className="space-y-6 text-center">
            <div className="p-6 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                All Set!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                Your password change is confirmed. Your previous reset link has expired and your account is secure.
              </p>
            </div>

            <Link
              href="/login"
              className="w-full py-3 px-4 bg-[#0d2861] hover:bg-[#081b43] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
            >
              <span>Proceed to Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* 3. Form State */
          <div>
            {/* Error Notification */}
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3 animate-in fade-in">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="leading-snug space-y-2">
                  <div>{error}</div>
                  {error.includes("expired") || error.includes("already been used") ? (
                    <Link
                      href="/forgot-password"
                      className="inline-flex items-center gap-1 text-xs font-bold text-red-800 underline hover:text-red-900"
                    >
                      <span>Request a fresh reset link</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  ) : null}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* New Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showNewPass ? "text" : "password"}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    autoFocus
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d2861] focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
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
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Confirm New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showConfirmPass ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your new password"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d2861] focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showConfirmPass ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Requirements Checklist */}
              <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
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

                <div className="flex items-center gap-2">
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

              <button
                type="submit"
                disabled={loading || !isMinLength || !isMatching}
                className="w-full mt-2 py-3 px-4 bg-[#0d2861] hover:bg-[#081b43] active:scale-[0.99] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Updating password...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Save & Update Password</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center border-t border-slate-100 pt-6">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0d2861] hover:text-[#081b43] hover:underline transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Cancel and return to Sign In</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-xl mx-auto p-12 bg-white rounded-2xl shadow-xl border border-slate-200/80 flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-[#0d2861]" />
          <p className="text-sm font-semibold text-slate-600">
            Validating security token...
          </p>
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}

