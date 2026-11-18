
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  ArrowRight,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Star,
  Plus,
} from "lucide-react";

const stats = [
  {
    value: "2,700+",
    label: "Verified Tutors",
  },
  {
    value: "17,000+",
    label: "Active Students",
  },
  {
    value: "98.9%",
    label: "Satisfaction",
  },
];

export default function Hero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = searchQuery.trim();

    if (query) {
      router.push(`/tuitions?q=${encodeURIComponent(query)}`);
    } else {
      router.push("/tuitions");
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="relative mx-auto grid min-h-120 max-w-360 grid-cols-1 items-center gap-12 overflow-hidden px-6 py-16 sm:px-10 lg:grid-cols-2 lg:px-16 lg:py-20">

        {/* Background Decorations */}
        <div className="pointer-events-none absolute -left-40 top-0 h-112.5 w-112.5 rounded-full bg-[#E9F7F6]/60 blur-[100px]" />

        <div className="pointer-events-none absolute right-0 top-0 h-100 w-125 rounded-full bg-[#E9F6F5]/70 blur-[100px]" />

        {/* LEFT CONTENT */}
        <div className="relative z-10 max-w-155">

          {/* Top Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D5EAE8] bg-[#EAF7F6] px-3 py-1.5">
            <Sparkles size={12} className="text-[#3D9996]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#438D8B]">
              Bangladesh&apos;s Premier Tuition Marketplace
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-[38px] font-extrabold leading-[1.12] tracking-[-1.5px] text-[#111827] sm:text-[48px] lg:text-[52px]">
            Find The Rifght Tutor{" "}
            <span className="text-[#399B98]">
              For Your Learning Journey
            </span>{" "}
            Today
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-135 text-[14px] leading-7 text-[#7A8492] sm:text-[15px]">
            Connect with verified tutors for personalized learning
            in Mathematics, Physics, Programming, IELTS & more
            across Bangladesh.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="mt-7 flex h-12 w-full max-w-110 items-center rounded-xl border border-[#E5E9EA] bg-white p-1 shadow-[0_3px_10px_rgba(0,0,0,0.07)] transition-all focus-within:border-[#399B98] focus-within:ring-2 focus-within:ring-[#399B98]/10"
          >
            <Search
              size={17}
              className="ml-3 shrink-0 text-[#55A5A1]"
            />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by subject, class level, or keyword..."
              className="h-full min-w-0 flex-1 bg-transparent px-3 text-[12px] text-[#263238] outline-none placeholder:text-[#A0A8B0] sm:text-[13px]"
              aria-label="Search by subject, class level, or keyword"
            />

            <button
              type="submit"
              className="flex h-10 shrink-0 items-center gap-2 rounded-[9px] bg-[#399B98] px-4 text-[12px] font-semibold text-white transition-all hover:bg-[#287F7C] sm:px-5"
            >
              Search Tuitions
              <ArrowRight size={14} />
            </button>
          </form>

          {/* Statistics */}
          <div className="mt-8 grid max-w-110 grid-cols-3 border-t border-[#EDF0F0] pt-5">

            {stats.map((stat) => (
              <div key={stat.label}>
                <h3 className="text-[21px] font-extrabold tracking-tight text-[#17202D] sm:text-[23px]">
                  {stat.value}
                </h3>

                <p className="mt-1 text-[10px] font-medium text-[#89929D] sm:text-[11px]">
                  {stat.label}
                </p>
              </div>
            ))}

          </div>
        </div>

        {/* RIGHT ILLUSTRATION */}
        <div className="relative mx-auto flex h-87.5 w-full max-w-117.5 items-center justify-center lg:h-100">

          {/* Background Circle */}
          <div className="absolute left-1/2 top-1/2 h-72.5 w-72.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#DDECEB] bg-linear-to-br from-[#F0FAF9] to-[#E5F4F2] sm:h-82.5 sm:w-82.5" />

          {/* Decorative Plus */}
          <div className="absolute right-[14%] top-[27%] z-20 flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF9C9] shadow-sm">
            <Plus size={17} className="text-[#263238]" />
          </div>

          {/* Small Decorative Dot */}
          <div className="absolute left-[12%] bottom-[20%] h-3 w-3 rounded-full bg-[#B6E4DF]" />

          {/* Tutor Profile Card */}
          <div className="relative z-10 w-68.75 rounded-[22px] border border-[#EDF0F0] bg-white p-5 shadow-[0_20px_50px_rgba(36,83,82,0.13)] sm:w-73.75">

            {/* Tutor Header */}
            <div className="flex items-center gap-3">

              {/* Icon */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#399B98] shadow-sm">
                <GraduationCap
                  size={25}
                  className="text-white"
                />
              </div>

              {/* Tutor Details */}
              <div className="min-w-0">
                <h3 className="text-[13px] font-bold text-[#263238]">
                  Top Rated Mentor
                </h3>

                <p className="mt-0.5 text-[10px] font-medium text-[#5A9F9B]">
                  Verified BUET Graduate
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="my-4 h-px bg-[#F0F2F2]" />

            {/* Tutor Information */}
            <div className="space-y-3">

              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] text-[#9099A1]">
                  Subjects
                </span>

                <span className="text-[11px] font-semibold text-[#35404A]">
                  Math & Physics
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] text-[#9099A1]">
                  Class Level
                </span>

                <span className="text-[11px] font-semibold text-[#35404A]">
                  HSC / A-Level
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] text-[#9099A1]">
                  Batch Rate
                </span>

                <span className="text-[11px] font-bold text-[#399B98]">
                  $120 / month
                </span>
              </div>
            </div>

            {/* Rating and Approval */}
            <div className="mt-5 flex items-center justify-between">

              <div className="flex items-center gap-1">
                <div className="flex items-center text-[#F4BD45]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={13}
                      fill="currentColor"
                      strokeWidth={1}
                    />
                  ))}
                </div>

                <span className="text-[10px] font-semibold text-[#59616A]">
                  5.0
                </span>
              </div>

              <div className="flex items-center gap-1 rounded-full bg-[#EAF7F3] px-2.5 py-1">
                <CheckCircle2
                  size={10}
                  className="text-[#469D86]"
                />

                <span className="text-[9px] font-semibold text-[#469D86]">
                  Approved
                </span>
              </div>
            </div>
          </div>

          {/* Floating Notification */}
          <div className="absolute bottom-[2%] left-[7%] z-20 flex items-center gap-2 rounded-full border border-[#F0F0F0] bg-white px-5 py-3 shadow-[0_8px_25px_rgba(0,0,0,0.08)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#55B8A5] opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#399B98]" />
            </span>

            <span className="text-[10px] font-semibold text-[#46515A]">
              New requests live
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
