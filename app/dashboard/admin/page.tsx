import Link from "next/link"
import {
  BarChart3,
  ClipboardList,
  Clock,
  FileText,
  LayoutDashboard,
  Users,
  UsersRound,
} from "lucide-react"

import { EmptyState } from "@/components/dashboard/EmptyState"
import { QuickAction } from "@/components/dashboard/QuickAction"
import { StatCard } from "@/components/dashboard/StatCard"
import {
  formatDashboardDate,
  getAdminStats,
  getRecentApplications,
  getRecentTuitions,
  getRecentUsers,
  requireDashboardRole,
} from "@/lib/dashboard"

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("")
}

const roleStyles: Record<string, string> = {
  student:
    "border-[#CFE0FA] bg-[#EAF1FB] text-[#3B82C4] dark:border-[#3B82C4]/30 dark:bg-[#3B82C4]/15 dark:text-[#8EC3EE]",
  tutor:
    "border-[#CDEAE2] bg-[#EAF7F3] text-[#2F8481] dark:border-[#399B98]/30 dark:bg-[#399B98]/15 dark:text-[#5FD3C9]",
  admin:
    "border-[#E4D8FA] bg-[#F3EEFC] text-[#7C5CD6] dark:border-[#7C5CD6]/30 dark:bg-[#7C5CD6]/15 dark:text-[#B9A6F0]",
}

export default async function AdminDashboardPage() {
  await requireDashboardRole("admin")

  const [stats, recentUsers, recentTuitions, recentApplications] =
    await Promise.all([
      getAdminStats(),
      getRecentUsers(5),
      getRecentTuitions(5),
      getRecentApplications(5),
    ])

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Admin Dashboard
          </h2>
          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted-foreground">
            Monitor platform activity, moderate tuition posts, and keep the
            marketplace healthy.
          </p>
        </div>

        <Link
          href="/dashboard/admin/tuitions"
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#399B98] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2F8481]"
        >
          <ClipboardList size={16} />
          Review Tuitions
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          label="Total Users"
          value={stats.totalUsers}
          hint="All registered accounts"
          icon={UsersRound}
        />
        <StatCard
          label="Total Students"
          value={stats.totalStudents}
          hint="Student accounts"
          icon={Users}
        />
        <StatCard
          label="Total Tutors"
          value={stats.totalTutors}
          hint="Tutor accounts"
          icon={Users}
        />
        <StatCard
          label="Tuition Posts"
          value={stats.totalTuitions}
          hint="All tuition listings"
          icon={ClipboardList}
        />
        <StatCard
          label="Pending Approvals"
          value={stats.pendingApprovals}
          hint="Awaiting admin review"
          icon={Clock}
          iconClassName="bg-[#FDF3E2] text-[#C98A2B] dark:bg-[#C98A2B]/15 dark:text-[#F0C57E]"
        />
      </div>

      {/* Management */}
      <section className="rounded-2xl border border-border bg-card p-5">
        <h3 className="text-base font-bold text-foreground">
          Management Shortcuts
        </h3>

        <div className="mt-4 grid gap-2.5 lg:grid-cols-2">
          <QuickAction
            href="/dashboard/admin/users"
            title="Manage Users"
            description="Review accounts and roles"
            icon={Users}
            tone="blue"
          />
          <QuickAction
            href="/dashboard/admin/tuitions"
            title="Manage Tuitions"
            description="Approve or reject listings"
            icon={ClipboardList}
            tone="teal"
          />
          <QuickAction
            href="/dashboard/admin/applications"
            title="Manage Applications"
            description="Monitor student applications"
            icon={FileText}
            tone="purple"
          />
          <QuickAction
            href="/dashboard/admin/reports"
            title="Reports"
            description="Platform and revenue insights"
            icon={BarChart3}
            tone="amber"
          />
        </div>
      </section>

      {/* Recent activity */}
      <div className="grid gap-6 xl:grid-cols-2">
        {/* Recent users */}
        <section className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-base font-bold text-foreground">Recent Users</h3>
            <Link
              href="/dashboard/admin/users"
              className="text-xs font-semibold text-[#399B98] hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="mt-4">
            {recentUsers.length === 0 ? (
              <EmptyState
                icon={Users}
                title="No users found"
                description="New registrations will appear here."
              />
            ) : (
              <ul className="divide-y divide-border">
                {recentUsers.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#399B98] text-[11px] font-semibold text-white">
                      {getInitials(item.name)}
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {item.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {item.email}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold capitalize ${
                        roleStyles[item.role] ?? roleStyles.student
                      }`}
                    >
                      {item.role}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Recent tuitions */}
        <section className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-base font-bold text-foreground">
              Recent Tuition Posts
            </h3>
            <Link
              href="/dashboard/admin/tuitions"
              className="text-xs font-semibold text-[#399B98] hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="mt-4">
            {recentTuitions.length === 0 ? (
              <EmptyState
                icon={ClipboardList}
                title="No tuition posts yet"
                description="Tutor submissions will appear here for review."
              />
            ) : (
              <ul className="divide-y divide-border">
                {recentTuitions.map((tuition) => (
                  <li
                    key={tuition.id}
                    className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {tuition.title}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {tuition.tutorName || tuition.tutorEmail} ·{" "}
                        {formatDashboardDate(tuition.createdAt)}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold capitalize text-muted-foreground">
                      {tuition.approvalStatus}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>

      {/* Recent applications */}
      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-bold text-foreground">
            Recent Applications
          </h3>
          <Link
            href="/dashboard/admin/applications"
            className="text-xs font-semibold text-[#399B98] hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="mt-4">
          {recentApplications.length === 0 ? (
            <EmptyState
              icon={FileText}
              title="No applications yet"
              description="Student applications will appear here once tuitions are live."
            />
          ) : (
            <ul className="divide-y divide-border">
              {recentApplications.map((application) => (
                <li
                  key={application.id}
                  className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {application.studentName || application.studentEmail}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {application.tuitionTitle} ·{" "}
                      {formatDashboardDate(application.appliedAt)}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold capitalize text-muted-foreground">
                    {application.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <LayoutDashboard size={14} />
        Platform statistics are read directly from MongoDB.
      </p>
    </div>
  )
}
