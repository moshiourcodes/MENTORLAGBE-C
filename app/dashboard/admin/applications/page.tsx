import Link from "next/link"
import { FileText } from "lucide-react"

import { EmptyState } from "@/components/dashboard/EmptyState"
import {
  formatDashboardDate,
  getAllApplications,
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

export default async function AdminApplicationsPage() {
  await requireDashboardRole("admin")
  const applications = await getAllApplications()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Manage Applications
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Monitor every student application submitted across the platform.
        </p>
      </div>

      {applications.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No applications yet"
          description="Student applications will appear here once tuitions are live."
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead className="bg-muted/50 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                <tr>
                  <th className="px-5 py-3">Student</th>
                  <th className="px-5 py-3">Tuition</th>
                  <th className="px-5 py-3">Tutor</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Applied</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {applications.map((application) => (
                  <tr key={application.id}>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-foreground">
                        {application.studentName || "Student"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {application.studentEmail}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-foreground">
                      {application.tuitionTitle}
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {application.tutorEmail}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold capitalize ${
                          statusStyles[application.status] ??
                          statusStyles.pending
                        }`}
                      >
                        {application.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {formatDashboardDate(application.appliedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Link
        href="/dashboard/admin"
        className="inline-flex text-xs font-semibold text-[#399B98] hover:underline dark:text-[#5FD3C9]"
      >
        ← Back to overview
      </Link>
    </div>
  )
}
