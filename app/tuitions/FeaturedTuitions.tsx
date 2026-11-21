
import Link from "next/link";
import TuitionCardGrid from "./TuitionCardGrid";

export default function FeaturedTuitions() {
  return (
    <section className="bg-[#F8FAFA] px-4 py-16 dark:bg-background sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex rounded-full bg-[#E5F4F2] px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[#218C87] dark:bg-[#399B98]/15 dark:text-[#5FD3C9]">
              Featured Tuitions
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#17202D] dark:text-foreground sm:text-4xl">
              Latest Approved Tuitions
            </h2>

            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 dark:text-muted-foreground">
              Discover top-rated home and online tuition opportunities
              verified by academic administrators.
            </p>
          </div>

          <Link
            href="/tuitions"
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-[#218C87] transition hover:gap-3 dark:text-[#5FD3C9]"
          >
            Browse All Tuitions
            <span>→</span>
          </Link>
        </div>

        <TuitionCardGrid limit={6} />

      </div>
    </section>
  );
}
