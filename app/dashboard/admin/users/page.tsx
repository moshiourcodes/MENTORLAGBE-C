import Link from "next/link"
import { Users } from "lucide-react"

import { EmptyState } from "@/components/dashboard/EmptyState"
import {
  formatDashboardDate,
  getAllUsers,
  requireDashboardRole,
} from "@/lib/dashboard"

const roleStyles: Record<string, string> = {
  student:
    "border-[#CFE0FA] bg-[#EAF1FB] text-[#3B82C4] dark:border-[#3B82C4]/30 dark:bg-[#3B82C4]/15 dark:text-[#8EC3EE]",
  tutor:
    "border-[#CDEAE2] bg-[#EAF7F3] text-[#2F8481] dark:border-[#399B98]/30 dark:bg-[#399B98]/15 dark:text-[#5FD3C9]",
  admin:
    "border-[#E4D8FA] bg-[#F3EEFC] text-[#7C5CD6] dark:border-[#7C5CD6]/30 dark:bg-[#7C5CD6]/15 dark:text-[#B9A6F0]",
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("")
}

export default async function AdminUsersPage() {
  await requireDashboardRole("admin")
  const users = await getAllUsers()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Manage Users
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Every registered account across the platform.
        </p>
      </div>

      {users.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No users found"
          description="Registered accounts will appear here."
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-muted/50 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                <tr>
                  <th className="px-5 py-3">User</th>
                  <th className="px-5 py-3">Role</th>
                  <th className="px-5 py-3">Plan</th>
                  <th className="px-5 py-3">Joined</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#399B98] text-[11px] font-semibold text-white">
                          {getInitials(user.name)}
                        </span>

                        <div className="min-w-0">
                          <p className="truncate font-semibold text-foreground">
                            {user.name}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold capitalize ${
                          roleStyles[user.role] ?? roleStyles.student
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="text-xs font-semibold text-foreground uppercase">
                        {user.plan}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {formatDashboardDate(user.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Role changes are intentionally restricted to server-side admin tooling.
      </p>

      <Link
        href="/dashboard/admin"
        className="inline-flex text-xs font-semibold text-[#399B98] hover:underline dark:text-[#5FD3C9]"
      >
        ← Back to overview
      </Link>
    </div>
  )
}
