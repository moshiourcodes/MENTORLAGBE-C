import Link from "next/link"
import { Crown, Sparkles } from "lucide-react"

import { InfoBanner } from "@/components/dashboard/InfoBanner"
import { getTutorStats, requireDashboardRole } from "@/lib/dashboard"

import { PostTuitionForm } from "./post-tuition-form"

const FREE_TUITION_LIMIT = 2

export default async function PostTuitionPage() {
  const user = await requireDashboardRole("tutor")
  const stats = await getTutorStats(user.email)

  const isPro = user.plan === "pro"
  const limitReached = !isPro && stats.totalTuitions >= FREE_TUITION_LIMIT

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Post a Tuition
          </h2>
          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted-foreground">
            Create a new tuition batch or one-on-one mentorship. Every post is
            reviewed by an admin before it appears publicly.
          </p>
        </div>

        <Link
          href="/dashboard/tutor/my-tuitions"
          className="inline-flex h-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background px-4 text-sm font-semibold text-foreground transition hover:bg-muted"
        >
          View My Tuitions
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span className="rounded-full bg-muted px-3 py-1 font-semibold text-foreground">
          {isPro
            ? "Pro plan · Unlimited posts"
            : `Free plan · ${stats.totalTuitions}/${FREE_TUITION_LIMIT} posts used`}
        </span>
        <span>Posts stay pending until an admin approves them.</span>
      </div>

      {limitReached ? (
        <InfoBanner
          tone="pro"
          icon={Sparkles}
          title="Free plan limit reached"
          description={`You have used all ${FREE_TUITION_LIMIT} free tuition posts. Upgrade to Pro for unlimited listings, a featured badge, and priority ranking.`}
          action={{ label: "View Pro Pricing", href: "/pricing", icon: Crown }}
        />
      ) : (
        <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
          <PostTuitionForm />
        </section>
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
