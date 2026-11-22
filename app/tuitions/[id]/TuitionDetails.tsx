









"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  Globe,
  MapPin,
  UserRound,
  Share2,
  Bookmark,
  Star,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

interface Tuition {
  _id: string;
  title: string;
  subject: string;
  classLevel: string;
  mode: "online" | "offline";
  location?: string;
  bannerImage: string;
  tutorName: string;
  tutorEmail?: string;
  monthlyFee: number;
  daysPerWeek: number;
  description?: string;
  approvalStatus: string;
  isActive: boolean;
  createdAt?: string;
}

interface Props {
  tuition: Tuition;
  userRole: string | null;
  isLoggedIn: boolean;
}

export default function TuitionDetails({
  tuition,
  userRole,
  isLoggedIn,
}: Props) {
  const router = useRouter();

  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const isOnline = tuition.mode === "online";
  const isStudent = isLoggedIn && userRole === "student";

  const postedDate = tuition.createdAt
    ? new Date(tuition.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently";

  // Submit tuition application
  const handleApply = async () => {
    if (!isLoggedIn) {
      toast.error("Please sign in to apply.");
      router.push("/sign-in");
      return;
    }

    if (userRole !== "student") {
      toast.error("Only students can apply for tuitions.");
      return;
    }

    if (applied || applying) {
      return;
    }

    try {
      setApplying(true);

      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tuitionId: tuition._id,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to submit your application."
        );
      }

      setApplied(true);

      toast.success(
        result.message || "Application submitted successfully!"
      );

      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong while applying."
      );
    } finally {
      setApplying(false);
    }
  };

  // Share tuition
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: tuition.title,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied successfully!");
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        toast.error("Unable to share tuition.");
      }
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-8 dark:bg-[#0B1220] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Back Button */}
        <Link
          href="/tuitions"
          className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#399B98] dark:text-slate-400"
        >
          <ArrowLeft size={16} />
          Back to All Tuitions
        </Link>

        <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* LEFT CONTENT */}
          <div className="space-y-7">
            {/* Tuition Image */}
            <div className="relative h-[300px] overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-800 sm:h-[420px]">
              {tuition.bannerImage ? (
                <div
                  role="img"
                  aria-label={tuition.title}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url("${tuition.bannerImage.replace(/"/g, '\\"')}")`,
                  }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                  <UserRound size={60} />
                </div>
              )}

              {/* Online / Offline Badge */}
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-[#17202D]/90 px-4 py-2 text-xs font-semibold text-white">
                {isOnline ? (
                  <Globe size={15} className="text-[#50C5BD]" />
                ) : (
                  <MapPin size={15} className="text-[#50C5BD]" />
                )}
                {isOnline ? "Online Session" : "Offline Session"}
              </div>

              {/* Share and Bookmark */}
              <div className="absolute right-4 top-4 flex gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  aria-label="Share tuition"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-700 shadow-md transition hover:bg-slate-100"
                >
                  <Share2 size={17} />
                </button>

                <button
                  type="button"
                  onClick={() => setBookmarked((previous) => !previous)}
                  aria-label="Bookmark tuition"
                  aria-pressed={bookmarked}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-700 shadow-md transition hover:bg-slate-100"
                >
                  <Bookmark
                    size={17}
                    className={
                      bookmarked
                        ? "fill-[#399B98] text-[#399B98]"
                        : ""
                    }
                  />
                </button>
              </div>
            </div>

            {/* Tuition Title and Information */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#111C2E] sm:p-8">
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-md border border-[#C8EBE7] bg-[#EDF8F6] px-3 py-1 text-xs font-semibold text-[#16877F] dark:border-[#399B98]/30 dark:bg-[#399B98]/15 dark:text-[#5FD3C9]">
                  {tuition.subject}
                </span>

                <span className="rounded-md bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {tuition.classLevel}
                </span>
              </div>

              <h1 className="text-2xl font-bold leading-tight tracking-tight text-[#17202D] dark:text-white sm:text-3xl">
                {tuition.title}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-slate-100 pt-5 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <UserRound size={16} className="text-[#399B98]" />
                  Mentor:
                  <strong className="text-slate-800 dark:text-slate-200">
                    {tuition.tutorName}
                  </strong>
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays size={16} className="text-[#399B98]" />
                  Schedule:
                  <strong className="text-slate-800 dark:text-slate-200">
                    {tuition.daysPerWeek} days / week
                  </strong>
                </div>

                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  Posted: {postedDate}
                </div>
              </div>
            </section>

            {/* About This Tuition */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#111C2E] sm:p-8">
              <h2 className="text-lg font-bold text-[#17202D] dark:text-white">
                About This Tuition
              </h2>

              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600 dark:text-slate-400">
                {tuition.description ||
                  "No additional description has been provided for this tuition."}
              </p>
            </section>

            {/* Student Reviews */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#111C2E] sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-[#17202D] dark:text-white">
                    Student Reviews & Feedback
                  </h2>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Real experiences from accepted tuition attendees.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-[#17202D] dark:text-white">
                    0.0
                  </span>

                  <div>
                    <div className="flex gap-0.5 text-slate-300">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={14} />
                      ))}
                    </div>

                    <p className="text-[10px] text-slate-500">
                      0 reviews
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex min-h-[120px] items-center justify-center border-t border-slate-100 text-center dark:border-slate-800">
                <p className="max-w-md text-xs leading-6 text-slate-500 dark:text-slate-400">
                  No reviews yet. Accepted students will be able to
                  share feedback after their classes.
                </p>
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-800 dark:bg-[#111C2E] lg:sticky lg:top-24">
            {/* Monthly Fee */}
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Monthly Tuition Fee
              </p>

              <p className="mt-1 text-3xl font-bold tracking-tight text-[#17202D] dark:text-white">
                ৳ {Number(tuition.monthlyFee || 0).toLocaleString("en-BD")}
                <span className="ml-1 text-xs font-normal text-slate-500">
                  / month
                </span>
              </p>
            </div>

            {/* Tuition Details */}
            <div className="mt-5">
              <InfoRow label="Subject" value={tuition.subject} />

              <InfoRow label="Class Level" value={tuition.classLevel} />

              <InfoRow
                label="Delivery Mode"
                value={isOnline ? "Online" : "Offline"}
                highlight
              />

              <InfoRow
                label="Location"
                value={
                  isOnline ? "Online" : tuition.location || "Not specified"
                }
              />

              <InfoRow
                label="Weekly Classes"
                value={`${tuition.daysPerWeek} days / week`}
              />

              <InfoRow
                label="Status"
                value={tuition.approvalStatus}
                highlight
              />
            </div>

            {/* Mentor */}
            <div className="mt-6 border-t border-slate-100 pt-5 dark:border-slate-800">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Tuition Mentor
              </p>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0D9488] text-lg font-bold text-white">
                  {tuition.tutorName?.charAt(0).toUpperCase() || "T"}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-[#17202D] dark:text-white">
                    {tuition.tutorName}
                  </p>

                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                    {tuition.tutorEmail || "Tuition Mentor"}
                  </p>
                </div>
              </div>
            </div>

            {/* Apply Permission */}
            <div className="mt-7">
              {isStudent ? (
                <button
                  type="button"
                  onClick={handleApply}
                  disabled={applying || applied}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#399B98] text-sm font-semibold text-white transition hover:bg-[#287F7C] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {applying ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      Applying...
                    </>
                  ) : applied ? (
                    <>
                      <CheckCircle2 size={17} />
                      Application Submitted
                    </>
                  ) : (
                    <>
                      Apply for This Tuition
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>
              ) : (
                <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-center dark:border-orange-500/20 dark:bg-orange-500/10">
                  <p className="text-xs leading-5 text-orange-700 dark:text-orange-300">
                    {isLoggedIn
                      ? "Only students can apply for tuitions."
                      : "Please sign in as a student to apply for tuitions."}
                  </p>

                  {!isLoggedIn && (
                    <Link
                      href="/sign-in"
                      className="mt-3 inline-flex text-xs font-semibold text-[#16877F] hover:underline dark:text-[#5FD3C9]"
                    >
                      Sign In
                    </Link>
                  )}
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

// Reusable information row
function InfoRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-100 py-3 text-sm dark:border-slate-800">
      <span className="text-slate-500 dark:text-slate-400">
        {label}
      </span>

      <span
        className={
          highlight
            ? "text-right font-medium capitalize text-[#0D9488] dark:text-[#5FD3C9]"
            : "text-right font-semibold text-[#17202D] dark:text-slate-200"
        }
      >
        {value}
      </span>
    </div>
  );
}
