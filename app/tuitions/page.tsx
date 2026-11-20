import { BookOpen } from "lucide-react"

import { EmptyState } from "@/components/dashboard/EmptyState"

export const metadata = {
  title: "Browse Tuitions | MentorLagbe",
  description:
    "Explore approved tuition batches and mentorship programmes on MentorLagbe.",
}

export default function TuitionsPage() {
  return (
    <main className="min-h-[calc(100vh-68px)] bg-[#F8FAFA] px-4 py-12 sm:px-6 lg:px-8 dark:bg-background">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <span className="inline-flex items-center rounded-full bg-[#E7F4F2] px-3 py-1 text-xs font-semibold tracking-wide text-[#399B98] dark:bg-[#399B98]/15 dark:text-[#5FD3C9]">
            BROWSE
          </span>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#17202D] dark:text-foreground">
            Browse Tuitions
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6B7280] dark:text-muted-foreground">
            Find approved tuition batches and one-on-one mentorship programmes
            from verified tutors.
          </p>
        </div>

        <EmptyState
          icon={BookOpen}
          title="No tuition listings are live yet"
          description="Once tutors publish tuitions and an admin approves them, they will appear here with search and filters."
          action={{ label: "Back to Home", href: "/" }}
        />
      </div>
    </main>
  )
}
