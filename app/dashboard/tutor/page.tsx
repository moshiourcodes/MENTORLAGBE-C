import Link from "next/link"
import {
  BookOpen,
  CheckCircle2,
  Crown,
  Plus,
  Sparkles,
  Users,
} from "lucide-react"

import { InfoBanner } from "@/components/dashboard/InfoBanner"
import { QuickAction } from "@/components/dashboard/QuickAction"
import { StatCard } from "@/components/dashboard/StatCard"
import { getTutorStats, requireDashboardRole } from "@/lib/dashboard"

const FREE_TUITION_LIMIT = 2

export default async function TutorDashboardPage() {
  const user = await requireDashboardRole("tutor")
  const stats = await getTutorStats(user.email)

  const firstName = user.name.split(/\s+/)[0] || user.name
  const isPro = user.plan === "pro"
  const planLabel = isPro ? "PRO" : "FREE"
  const limitLabel = isPro
    ? "Unlimited"
    : `${stats.totalTuitions}/${FREE_TUITION_LIMIT} Free`

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Welcome back, {firstName}! 👋
          </h2>
          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted-foreground">
            Track your tuition listings, student applicants, and teaching
            activity from one place.
          </p>
        </div>

        <Link
          href="/dashboard/tutor/post-tuition"
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#399B98] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2F8481]"
        >
          <Plus size={16} />
          Post New Tuition
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Tuitions"
          value={stats.totalTuitions}
          hint={
            isPro
              ? "Unlimited posts on your Pro plan"
              : `Free tier limited to ${FREE_TUITION_LIMIT} posts`
          }
          icon={BookOpen}
          badge={limitLabel}
        />
        <StatCard
          label="Active & Approved"
          value={stats.activeApproved}
          hint="Publicly listed and accepting students"
          icon={CheckCircle2}
        />
        <StatCard
          label="Total Applicants"
          value={stats.totalApplicants}
          hint="Interested students applied across all posts"
          icon={Users}
        />
        <StatCard
          label="Current Plan"
          value={planLabel}
          hint="Upgrade to Pro for unlimited posts"
          icon={Crown}
          iconClassName="bg-[#FDF3E2] text-[#C98A2B] dark:bg-[#C98A2B]/15 dark:text-[#F0C57E]"
        />
      </div>

      {/* Tutor Controls */}
      <section className="rounded-2xl border border-border bg-card p-5">
        <h3 className="text-base font-bold text-foreground">Tutor Controls</h3>

        <div className="mt-4 space-y-2.5">
          <QuickAction
            href="/dashboard/tutor/post-tuition"
            title="Post New Tuition"
            description="Create a new course offering"
            icon={Plus}
            tone="teal"
          />
          <QuickAction
            href="/dashboard/tutor/my-tuitions"
            title="My Tuitions"
            description="Edit, activate, or delete posts"
            icon={BookOpen}
            tone="blue"
          />
          <QuickAction
            href="/dashboard/tutor/applicants"
            title="Manage Applicants"
            description="Accept or reject students"
            icon={Users}
            tone="purple"
          />
        </div>
      </section>

      {/* Pro upgrade */}
      {!isPro ? (
        <InfoBanner
          tone="pro"
          icon={Sparkles}
          title="Upgrade to Pro Plan"
          description={`Free tutors are restricted to ${FREE_TUITION_LIMIT} tuition posts. Go Pro for unlimited listings, a featured badge, and top search ranking.`}
          action={{
            label: "View Pro Pricing",
            href: "/pricing",
            icon: Crown,
          }}
        />
      ) : null}
    </div>
  )
}
