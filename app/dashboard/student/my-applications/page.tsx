import Link from "next/link"
import { FileText } from "lucide-react"

import { EmptyState } from "@/components/dashboard/EmptyState"
import {
  formatDashboardDate,
  getStudentApplications,
  requireDashboardRole,
} from "@/lib/dashboard"

import { cancelApplication } from "./actions"

const statusStyles: Record<string, string> = {
  pending:
    "border-[#F1E1C3] bg-[#FDF4E5] text-[#A16A18] dark:border-[#C98A2B]/30 dark:bg-[#C98A2B]/15 dark:text-[#F0C57E]",
  accepted:
    "border-[#CDEAE2] bg-[#EAF7F3] text-[#2F8481] dark:border-[#399B98]/30 dark:bg-[#399B98]/15 dark:text-[#5FD3C9]",
  rejected:
    "border-[#F5D5D5] bg-[#FDECEC] text-[#C24B4B] dark:border-[#D45B5B]/30 dark:bg-[#D45B5B]/15 dark:text-[#F0A3A3]",
}

export default async function MyApplicationsPage() {
  const user = await requireDashboardRole("student")
  const applications = await getStudentApplications(user.email)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          My Applications
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Track every tuition you have applied for and manage pending requests.
        </p>
      </div>

      {applications.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="You have not applied to any tuitions yet"
          description="Browse approved tuition listings and submit your first application."
          action={{ label: "Browse Tuitions", href: "/tuitions" }}
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-muted/50 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                <tr>
                  <th className="px-5 py-3">Tuition</th>
                  <th className="px-5 py-3">Tutor</th>
                  <th className="px-5 py-3">Fee</th>
                  <th className="px-5 py-3">Applied</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {applications.map((application) => (
                  <tr key={application.id}>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-foreground">
                        {application.tuitionTitle}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {application.subject || "Tuition"}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {application.tutorEmail}
                    </td>
                    <td className="px-5 py-4 font-medium text-foreground">
                      ৳{application.monthlyFee}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {formatDashboardDate(application.appliedAt)}
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
                    <td className="px-5 py-4 text-right">
                      {application.status === "pending" ? (
                        <form action={cancelApplication}>
                          <input
                            type="hidden"
                            name="id"
                            value={application.id}
                          />
                          <button
                            type="submit"
                            className="rounded-lg border border-[#F5D5D5] px-3 py-1.5 text-xs font-semibold text-[#C24B4B] transition hover:bg-[#FDECEC] dark:border-[#D45B5B]/30 dark:hover:bg-[#D45B5B]/10 dark:text-[#F0A3A3]"
                          >
                            Cancel
                          </button>
                        </form>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Link
        href="/dashboard/student"
        className="inline-flex text-xs font-semibold text-[#399B98] hover:underline dark:text-[#5FD3C9]"
      >
        ← Back to overview
      </Link>
    </div>
  )
}
