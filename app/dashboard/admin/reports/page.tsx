import Link from "next/link"
import {
  BarChart3,
  ClipboardList,
  FileText,
  TrendingUp,
  Users,
  UsersRound,
  Wallet,
} from "lucide-react"

import { StatCard } from "@/components/dashboard/StatCard"
import { getAdminStats, requireDashboardRole } from "@/lib/dashboard"

export default async function AdminReportsPage() {
  await requireDashboardRole("admin")
  const stats = await getAdminStats()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Reports
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          A snapshot of platform growth, content, and revenue.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Users"
          value={stats.totalUsers}
          hint="All registered accounts"
          icon={UsersRound}
        />
        <StatCard
          label="Total Tutors"
          value={stats.totalTutors}
          hint="Tutor accounts"
          icon={Users}
        />
        <StatCard
          label="Total Tuitions"
          value={stats.totalTuitions}
          hint="All tuition posts"
          icon={ClipboardList}
        />
        <StatCard
          label="Applications"
          value={stats.totalApplications}
          hint="Student applications"
          icon={FileText}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard
          label="Stripe Revenue"
          value={`৳${stats.revenue.toLocaleString("en-US")}`}
          hint="Total paid transactions"
          icon={Wallet}
          iconClassName="bg-[#FDF3E2] text-[#C98A2B] dark:bg-[#C98A2B]/15 dark:text-[#F0C57E]"
        />
        <StatCard
          label="Pending Approvals"
          value={stats.pendingApprovals}
          hint="Tuitions waiting for review"
          icon={TrendingUp}
        />
      </div>

      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF6F5] text-[#399B98] dark:bg-[#399B98]/15 dark:text-[#5FD3C9]">
            <BarChart3 size={19} />
          </span>

          <div>
            <h3 className="text-sm font-bold text-foreground">
              Revenue analytics
            </h3>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Revenue is aggregated from the <code>payments</code> collection.
              Detailed charts will appear once Stripe checkout and webhook
              records are available.
            </p>
          </div>
        </div>
      </section>

      <Link
        href="/dashboard/admin"
        className="inline-flex text-xs font-semibold text-[#399B98] hover:underline dark:text-[#5FD3C9]"
      >
        ← Back to overview
      </Link>
    </div>
  )
}
