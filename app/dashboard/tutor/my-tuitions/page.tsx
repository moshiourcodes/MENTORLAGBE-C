import Link from "next/link"
import { BookOpen, Plus } from "lucide-react"

import { EmptyState } from "@/components/dashboard/EmptyState"
import {
  formatDashboardDate,
  getTutorTuitions,
  requireDashboardRole,
} from "@/lib/dashboard"

const statusStyles: Record<string, string> = {
  pending:
    "border-[#F1E1C3] bg-[#FDF4E5] text-[#A16A18] dark:border-[#C98A2B]/30 dark:bg-[#C98A2B]/15 dark:text-[#F0C57E]",
  approved:
    "border-[#CDEAE2] bg-[#EAF7F3] text-[#2F8481] dark:border-[#399B98]/30 dark:bg-[#399B98]/15 dark:text-[#5FD3C9]",
  rejected:
    "border-[#F5D5D5] bg-[#FDECEC] text-[#C24B4B] dark:border-[#D45B5B]/30 dark:bg-[#D45B5B]/15 dark:text-[#F0A3A3]",
}

export default async function MyTuitionsPage() {
  const user = await requireDashboardRole("tutor")
  const tuitions = await getTutorTuitions(user.email)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            My Tuitions
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Review the tuition posts you have created and their approval status.
          </p>
        </div>

        <Link
          href="/dashboard/tutor/post-tuition"
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#399B98] px-4 text-sm font-semibold text-white transition hover:bg-[#2F8481]"
        >
          <Plus size={16} />
          Post New Tuition
        </Link>
      </div>

      {tuitions.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="You have not posted any tuitions yet"
          description="Create your first tuition listing to start receiving student applications."
          action={{ label: "Post a Tuition", href: "/dashboard/tutor/post-tuition" }}
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {tuitions.map((tuition) => (
            <article
              key={tuition.id}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate text-base font-bold text-foreground">
                    {tuition.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {tuition.subject} · {tuition.classLevel} · {tuition.mode}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold capitalize ${
                    statusStyles[tuition.approvalStatus] ?? statusStyles.pending
                  }`}
                >
                  {tuition.approvalStatus}
                </span>
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <dt className="text-muted-foreground">Monthly Fee</dt>
                  <dd className="mt-0.5 font-semibold text-foreground">
                    ৳{tuition.monthlyFee}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Days / Week</dt>
                  <dd className="mt-0.5 font-semibold text-foreground">
                    {tuition.daysPerWeek}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Location</dt>
                  <dd className="mt-0.5 truncate font-semibold text-foreground">
                    {tuition.location || tuition.mode}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Created</dt>
                  <dd className="mt-0.5 font-semibold text-foreground">
                    {formatDashboardDate(tuition.createdAt)}
                  </dd>
                </div>
              </dl>

              <div className="mt-4 flex items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                    tuition.isActive
                      ? "bg-[#EAF7F3] text-[#2F8481] dark:bg-[#399B98]/15 dark:text-[#5FD3C9]"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {tuition.isActive ? "Active" : "Closed"}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

      <Link
        href="/dashboard/tutor"
        className="inline-flex text-xs font-semibold text-[#399B98] hover:underline dark:text-[#5FD3C9]"
      >
        ← Back to overview
      </Link>
    </div>
  )
}
