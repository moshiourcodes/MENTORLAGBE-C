import type { Metadata } from "next"
import TuitionCardGrid from "./TuitionCardGrid"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: "Browse Tuitions | MentorLagbe",
  description:
    "Explore approved tuition batches and mentorship programmes on MentorLagbe.",
}

export default function TuitionsPage() {
  return (
    <>
      <main className="min-h-[calc(100vh-68px)] bg-[#F8FAFA] px-4 py-16 sm:px-6 lg:px-8 dark:bg-background">
        <div className="mx-auto max-w-6xl">
          {/* Page Header */}
          <div className="mb-10">
            <span className="inline-flex items-center rounded-full bg-[#E7F4F2] px-3 py-1 text-xs font-semibold tracking-wide text-[#399B98] dark:bg-[#399B98]/15 dark:text-[#5FD3C9]">
              BROWSE
            </span>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#17202D] sm:text-4xl dark:text-foreground">
              Browse Tuitions
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6B7280] sm:text-base dark:text-muted-foreground">
              Find approved tuition batches and one-on-one mentorship programmes
              from verified tutors.
            </p>
          </div>

          {/* All Approved Tuition Listings */}
          <TuitionCardGrid />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}
