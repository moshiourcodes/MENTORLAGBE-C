import Link from "next/link"
import { Bookmark } from "lucide-react"

import { EmptyState } from "@/components/dashboard/EmptyState"
import { requireDashboardRole } from "@/lib/dashboard"

export default async function SavedTuitionsPage() {
  await requireDashboardRole("student")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Saved Tuitions
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Keep your favourite tuition listings in one place for quick access.
        </p>
      </div>

      <EmptyState
        icon={Bookmark}
        title="No saved tuitions yet"
        description="Bookmark tuition listings while browsing so you can compare and apply later."
        action={{ label: "Browse Tuitions", href: "/tuitions" }}
      />

      <Link
        href="/dashboard/student"
        className="inline-flex text-xs font-semibold text-[#399B98] hover:underline dark:text-[#5FD3C9]"
      >
        ← Back to overview
      </Link>
    </div>
  )
}
