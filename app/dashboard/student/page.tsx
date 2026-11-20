import Link from "next/link"
import {
  Bookmark,
  CheckCircle2,
  Clock,
  Crown,
  FileText,
  Search,
  TrendingUp,
} from "lucide-react"

import { EmptyState } from "@/components/dashboard/EmptyState"
import { InfoBanner } from "@/components/dashboard/InfoBanner"
import { QuickAction } from "@/components/dashboard/QuickAction"
import { StatCard } from "@/components/dashboard/StatCard"
import {
  getStudentApplications,
  getStudentStats,
  requireDashboardRole,
} from "@/lib/dashboard"

export default async function StudentDashboardPage() {
  const user = await requireDashboardRole("student")
  const [stats, applications] = await Promise.all([
    getStudentStats(user.email),
    getStudentApplications(user.email),
  ])

  const firstName = user.name.split(/\s+/)[0] || user.name
  const planLabel = user.plan === "pro" ? "PRO" : "FREE"

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Welcome back, {firstName}! 👋
          </h2>
          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted-foreground">
            Track your tuition applications, tutor responses, and learning
            journey.
          </p>
        </div>

        <Link
          href="/tuitions"
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#399B98] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2F8481]"
        >
          <Search size={16} />
          Browse Tuitions
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Applied"
          value={stats.totalApplied}
          hint="Total tuition posts applied for"
          icon={FileText}
        />
        <StatCard
          label="Accepted"
          value={stats.accepted}
          hint="Approved applications by tutors"
          icon={CheckCircle2}
        />
        <StatCard
          label="Pending"
          value={stats.pending}
          hint="Awaiting tutor review and confirmation"
          icon={Clock}
        />
        <StatCard
          label="Current Plan"
          value={planLabel}
          hint="Upgrade to Pro for priority perks"
          icon={Crown}
          iconClassName="bg-[#FDF3E2] text-[#C98A2B] dark:bg-[#C98A2B]/15 dark:text-[#F0C57E]"
        />
      </div>

      {/* Quick Actions */}
      <section className="rounded-2xl border border-border bg-card p-5">
        <h3 className="text-base font-bold text-foreground">Quick Actions</h3>

        <div className="mt-4 space-y-2.5">
          <QuickAction
            href="/dashboard/student/my-applications"
            title="My Applications"
            description="Track and manage submissions"
            icon={FileText}
            tone="teal"
          />
          <QuickAction
            href="/dashboard/student/saved-tuitions"
            title="Saved Tuitions"
            description="Your bookmarked subjects"
            icon={Bookmark}
            tone="amber"
          />
          <QuickAction
            href="/tuitions"
            title="Explore Mentors"
            description="Find experienced tutors"
            icon={Search}
            tone="teal"
          />
        </div>
      </section>

      {/* Applications preview */}
      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-bold text-foreground">
            Recent Applications
          </h3>

          <Link
            href="/dashboard/student/my-applications"
            className="text-xs font-semibold text-[#399B98] hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="mt-4">
          {applications.length === 0 ? (
            <EmptyState
              icon={FileText}
              title="No applications yet"
              description="Browse available tuitions and apply to start your learning journey."
              action={{ label: "Browse Tuitions", href: "/tuitions" }}
            />
          ) : (
            <ul className="divide-y divide-border">
              {applications.slice(0, 4).map((application) => (
                <li
                  key={application.id}
                  className="flex items-center justify-between gap-3 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {application.tuitionTitle}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {application.subject || "Tuition"} ·{" "}
                      {application.tutorEmail}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold capitalize text-muted-foreground">
                    {application.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Boost */}
      <InfoBanner
        icon={TrendingUp}
        title="Boost your success rate"
        description="Keep your student profile and contact details up-to-date so mentors can contact you quickly."
        action={{ label: "Update Profile", href: "/dashboard/profile" }}
      />
    </div>
  )
}
