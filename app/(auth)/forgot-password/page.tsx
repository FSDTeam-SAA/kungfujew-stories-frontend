"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  ArrowLeft,
  AlertCircle,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  Send,
} from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError("Please provide your email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/v1/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmittedEmail(trimmedEmail);
      } else {
        setError(
          data?.message ||
            "Unable to request password reset. Please verify your email and try again."
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
        {/* Top Logo & Header */}
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
            <span>Admin Recovery</span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {submittedEmail ? "Check Your Inbox" : "Forgot Password?"}
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
            {submittedEmail
              ? `We have dispatched a secure password reset link to your email.`
              : "Enter your registered email address and we will send you a secure link to reset your password."}
          </p>
        </div>

        {/* Confirmation State */}
        {submittedEmail ? (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">
                  Reset link sent to
                </p>
                <p className="text-sm font-bold text-slate-900">
                  {submittedEmail}
                </p>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-200/60">
                The link is valid for <strong>1 hour</strong>. If you do not see
                the message in your inbox within a few minutes, please check your
                spam or junk folder.
              </p>
            </div>

            <div className="space-y-3">
              <Link
                href="/login"
                className="w-full py-3 px-4 bg-[#0d2861] hover:bg-[#081b43] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Sign In</span>
              </Link>

              <button
                type="button"
                onClick={() => {
                  setSubmittedEmail(null);
                  setEmail("");
                  setError(null);
                }}
                className="w-full py-2.5 px-4 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Need to try another email address?
              </button>
            </div>
          </div>
        ) : (
          /* Form State */
          <div>
            {/* Error Banner */}
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3 animate-in fade-in">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="leading-snug">{error}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Administrator Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@carcarriergroup.com"
                    autoFocus
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d2861] focus:bg-white transition-all"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5">
                  We will send a single-use secure reset link to this address.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 px-4 bg-[#0d2861] hover:bg-[#081b43] active:scale-[0.99] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer text-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying and sending link...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Password Reset Link</span>
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
                <span>Back to Sign In</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

