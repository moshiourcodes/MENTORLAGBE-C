import Link from "next/link"
import { Crown, Settings, ShieldCheck, UserRound } from "lucide-react"

import { requireDashboardRole } from "@/lib/dashboard"

export default async function AdminSettingsPage() {
  const user = await requireDashboardRole("admin")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Settings
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Manage your admin account and platform preferences.
        </p>
      </div>

      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#399B98] text-sm font-semibold text-white">
            {user.name
              .trim()
              .split(/\s+/)
              .slice(0, 2)
              .map((part) => part[0]?.toUpperCase() || "")
              .join("")}
          </span>

          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-foreground">
              {user.name}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>

        <dl className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-muted/40 px-4 py-3">
            <dt className="text-xs text-muted-foreground">Account role</dt>
            <dd className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground capitalize">
              <ShieldCheck size={15} className="text-[#7C5CD6]" />
              {user.role}
            </dd>
          </div>

          <div className="rounded-xl bg-muted/40 px-4 py-3">
            <dt className="text-xs text-muted-foreground">Subscription plan</dt>
            <dd className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground uppercase">
              <Crown size={15} className="text-[#C98A2B]" />
              {user.plan}
            </dd>
          </div>
        </dl>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        <Link
          href="/dashboard/profile"
          className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-4 transition hover:border-[#399B98]/40 hover:bg-[#F7FBFB] dark:hover:bg-muted/40"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF6F5] text-[#399B98] dark:bg-[#399B98]/15 dark:text-[#5FD3C9]">
            <UserRound size={18} />
          </span>
          <span>
            <span className="block text-sm font-semibold text-foreground">
              Update Profile
            </span>
            <span className="block text-xs text-muted-foreground">
              Name, avatar, and contact details
            </span>
          </span>
        </Link>

        <Link
          href="/pricing"
          className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-4 transition hover:border-[#399B98]/40 hover:bg-[#F7FBFB] dark:hover:bg-muted/40"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FDF3E2] text-[#C98A2B] dark:bg-[#C98A2B]/15 dark:text-[#F0C57E]">
            <Settings size={18} />
          </span>
          <span>
            <span className="block text-sm font-semibold text-foreground">
              Plans &amp; Pricing
            </span>
            <span className="block text-xs text-muted-foreground">
              Review Free and Pro plan details
            </span>
          </span>
        </Link>
      </section>

      <Link
        href="/dashboard/admin"
        className="inline-flex text-xs font-semibold text-[#399B98] hover:underline"
      >
        ← Back to overview
      </Link>
    </div>
  )
}
