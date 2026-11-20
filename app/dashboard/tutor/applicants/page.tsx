import Link from "next/link"
import { Users } from "lucide-react"

import { EmptyState } from "@/components/dashboard/EmptyState"
import {
  formatDashboardDate,
  getTutorApplications,
  requireDashboardRole,
} from "@/lib/dashboard"

const statusStyles: Record<string, string> = {
  pending:
    "border-[#F1E1C3] bg-[#FDF4E5] text-[#A16A18] dark:border-[#C98A2B]/30 dark:bg-[#C98A2B]/15 dark:text-[#F0C57E]",
  accepted:
    "border-[#CDEAE2] bg-[#EAF7F3] text-[#2F8481] dark:border-[#399B98]/30 dark:bg-[#399B98]/15 dark:text-[#5FD3C9]",
  rejected:
    "border-[#F5D5D5] bg-[#FDECEC] text-[#C24B4B] dark:border-[#D45B5B]/30 dark:bg-[#D45B5B]/15 dark:text-[#F0A3A3]",
}

export default async function TutorApplicantsPage() {
  const user = await requireDashboardRole("tutor")
  const applications = await getTutorApplications(user.email)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Applicants
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Review students who applied to your tuition posts.
        </p>
      </div>

      {applications.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No applicants yet"
          description="Once your approved tuitions go live, student applications will appear here."
          action={{ label: "Manage My Tuitions", href: "/dashboard/tutor/my-tuitions" }}
        />
      ) : (
        <div className="space-y-3">
          {applications.map((application) => (
            <article
              key={application.id}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-bold text-foreground">
                    {application.studentName || application.studentEmail}
                  </h3>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {application.studentEmail}
                    {application.studentPhone
                      ? ` · ${application.studentPhone}`
                      : ""}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold capitalize ${
                    statusStyles[application.status] ?? statusStyles.pending
                  }`}
                >
                  {application.status}
                </span>
              </div>

              <div className="mt-4 grid gap-3 text-xs sm:grid-cols-2">
                <div>
                  <p className="text-muted-foreground">Tuition</p>
                  <p className="mt-0.5 font-semibold text-foreground">
                    {application.tuitionTitle}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Preferred Schedule</p>
                  <p className="mt-0.5 font-semibold text-foreground">
                    {application.preferredSchedule || "Not specified"}
                  </p>
                </div>
              </div>

              {application.studentNote ? (
                <p className="mt-3 rounded-lg bg-muted/50 px-3 py-2 text-xs leading-5 text-muted-foreground">
                  {application.studentNote}
                </p>
              ) : null}

              <p className="mt-3 text-[11px] text-muted-foreground">
                Applied {formatDashboardDate(application.appliedAt)}
              </p>
            </article>
          ))}
        </div>
      )}

      <Link
        href="/dashboard/tutor"
        className="inline-flex text-xs font-semibold text-[#399B98] hover:underline"
      >
        ← Back to overview
      </Link>
    </div>
  )
}
