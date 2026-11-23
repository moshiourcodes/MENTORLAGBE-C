import Link from "next/link"
import { ClipboardList } from "lucide-react"

import { EmptyState } from "@/components/dashboard/EmptyState"
import {
  formatDashboardDate,
  getAllTuitions,
  requireDashboardRole,
} from "@/lib/dashboard"

import { updateTuitionStatus } from "./actions"

const statusStyles: Record<string, string> = {
  pending:
    "border-[#F1E1C3] bg-[#FDF4E5] text-[#A16A18] dark:border-[#C98A2B]/30 dark:bg-[#C98A2B]/15 dark:text-[#F0C57E]",
  approved:
    "border-[#CDEAE2] bg-[#EAF7F3] text-[#2F8481] dark:border-[#399B98]/30 dark:bg-[#399B98]/15 dark:text-[#5FD3C9]",
  rejected:
    "border-[#F5D5D5] bg-[#FDECEC] text-[#C24B4B] dark:border-[#D45B5B]/30 dark:bg-[#D45B5B]/15 dark:text-[#F0A3A3]",
}

export default async function AdminTuitionsPage() {
  await requireDashboardRole("admin")
  const tuitions = await getAllTuitions()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Manage Tuitions
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Approve or reject tuition posts submitted by tutors. Only approved and
          active posts appear publicly.
        </p>
      </div>

      {tuitions.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title="No tuition posts yet"
          description="Tutor submissions will appear here for review."
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-225 text-left text-sm">
              <thead className="bg-muted/50 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                <tr>
                  <th className="px-5 py-3">Tuition</th>
                  <th className="px-5 py-3">Tutor</th>
                  <th className="px-5 py-3">Fee</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Created</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {tuitions.map((tuition) => (
                  <tr key={tuition.id}>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-foreground">
                        {tuition.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {tuition.subject} · {tuition.classLevel} ·{" "}
                        {tuition.mode}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-xs font-medium text-foreground">
                        {tuition.tutorName || "Tutor"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {tuition.tutorEmail}
                      </p>
                    </td>

                    <td className="px-5 py-4 font-medium text-foreground">
                      ৳{tuition.monthlyFee}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold capitalize ${
                          statusStyles[tuition.approvalStatus] ??
                          statusStyles.pending
                        }`}
                      >
                        {tuition.approvalStatus}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {formatDashboardDate(tuition.createdAt)}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {tuition.approvalStatus !== "approved" ? (
                          <form action={updateTuitionStatus}>
                            <input type="hidden" name="id" value={tuition.id} />
                            <input
                              type="hidden"
                              name="status"
                              value="approved"
                            />
                            <button
                              type="submit"
                              className="rounded-lg border border-[#CDEAE2] px-3 py-1.5 text-xs font-semibold text-[#2F8481] transition hover:bg-[#EAF7F3] dark:border-[#399B98]/30 dark:hover:bg-[#399B98]/10 dark:text-[#5FD3C9]"
                            >
                              Approve
                            </button>
                          </form>
                        ) : null}

                        {tuition.approvalStatus !== "rejected" ? (
                          <form action={updateTuitionStatus}>
                            <input type="hidden" name="id" value={tuition.id} />
                            <input
                              type="hidden"
                              name="status"
                              value="rejected"
                            />
                            <button
                              type="submit"
                              className="rounded-lg border border-[#F5D5D5] px-3 py-1.5 text-xs font-semibold text-[#C24B4B] transition hover:bg-[#FDECEC] dark:border-[#D45B5B]/30 dark:hover:bg-[#D45B5B]/10 dark:text-[#F0A3A3]"
                            >
                              Reject
                            </button>
                          </form>
                        ) : null}
                      </div>
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
