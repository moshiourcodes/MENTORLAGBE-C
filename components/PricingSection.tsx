"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, CheckCircle2, Crown, Sparkles } from "lucide-react"
import { toast } from "sonner"

import { authClient } from "@/lib/auth-client"
import { useCheckout } from "@/hooks/use-checkout"

const starterFeatures = [
  "Up to 2 tuition posts (Tutor)",
  "Up to 2 tuition bookmarks (Student)",
  "Up to 2 tuition applications (Student)",
  "Basic profile & search filters",
]

const proFeatures = [
  "Unlimited tuition posts & bookmarks",
  "Unlimited tuition applications",
  "Golden PRO verification badge",
  "Priority listing in search & category filters",
  "Priority applicant notifications & reviews",
]

export default function PricingSection() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()
  const { startCheckout, isLoading } = useCheckout()

  const user = session?.user as
    | (NonNullable<typeof session>["user"] & {
        role?: unknown
        plan?: unknown
      })
    | undefined

  const role = user?.role === "student" || user?.role === "tutor" ? user.role : null
  const isPro = user?.plan === "pro"

  const handleUpgrade = async () => {
    if (!user) {
      toast.error("Please sign in before upgrading.")
      router.push("/sign-in?next=/pricing")
      return
    }

    if (!role) {
      toast.error("Pro subscriptions are for students and tutors only.")
      return
    }

    if (isPro) {
      toast.success("You're already on MentorLagbe Pro.")
      router.push("/dashboard")
      return
    }

    await startCheckout()
  }

  let ctaLabel = "Sign In to Upgrade"
  if (user && !role) ctaLabel = "Not Available for Admin"
  else if (isPro) ctaLabel = "You're on Pro"
  else if (role === "student") ctaLabel = "Upgrade to Student Pro · $10/mo"
  else if (role === "tutor") ctaLabel = "Upgrade to Tutor Pro · $15/mo"

  return (
    <section className="w-full bg-[#F8FAFA] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 dark:bg-[#0B1220]">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-9 text-center">
          <span className="inline-flex items-center rounded-full bg-[#E7F4F2] px-3 py-1 text-xs font-semibold tracking-wide text-[#399B98] dark:bg-[#399B98]/15 dark:text-[#5FD3C9]">
            PRICING
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#17202D] sm:text-4xl dark:text-foreground">
            Choose Your Plan
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-[#858B94] sm:text-lg dark:text-slate-400">
            Simple, transparent plans designed for committed students and
            ambitious academic tutors.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 items-stretch gap-7 md:grid-cols-2">
          {/* Starter Plan */}
          <div className="flex flex-col rounded-2xl border border-[#E5E7EB] bg-white p-7 shadow-sm sm:p-8 dark:border-[#1E2C42] dark:bg-[#111C2E]">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-[#17202D] dark:text-foreground">
                Starter Plan
              </h2>

              <span className="rounded-full bg-[#F5F6F7] px-3 py-1 text-xs font-medium whitespace-nowrap text-[#737984] dark:bg-[#111C2E] dark:text-slate-300">
                Free Forever
              </span>
            </div>

            <p className="mt-4 min-h-12 text-sm leading-6 text-[#858B94] dark:text-slate-400">
              Perfect for students and tutors looking to test the platform.
            </p>

            <div className="mt-5 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-[#111827] dark:text-slate-100">
                $0
              </span>

              <span className="text-sm text-[#9CA3AF] dark:text-slate-400">
                / month
              </span>
            </div>

            <ul className="mt-7 flex-1 space-y-4">
              {starterFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckCircle2
                    size={17}
                    className="mt-0.5 shrink-0 text-[#8BB9B5]"
                  />

                  <span className="text-sm leading-5 text-[#858B94] dark:text-slate-400">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-gray-100 pt-5 dark:border-[#1E2C42]">
              <Link
                href="/sign-up?plan=free"
                className="flex h-11 w-full items-center justify-center rounded-xl border border-[#DDE1E4] bg-white text-sm font-semibold text-[#17202D] transition hover:border-[#399B98] hover:bg-[#F5FAF9] dark:border-[#1E2C42] dark:bg-[#111C2E] dark:text-foreground dark:hover:bg-[#17253C]"
              >
                Get Started Free
              </Link>
            </div>
          </div>

          {/* PRO Plan */}
          <div className="relative mt-2 flex flex-col rounded-2xl border-2 border-[#65AAA5] bg-white p-7 shadow-[0_8px_30px_rgba(57,155,152,0.07)] sm:p-8 dark:bg-[#111C2E]">
            <div className="absolute -top-4 right-6 flex items-center gap-1.5 rounded-full bg-[#399B98] px-4 py-1.5 text-xs font-bold text-white shadow-sm">
              <Sparkles size={13} />
              RECOMMENDED
            </div>

            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-[#17202D] dark:text-foreground">
                MentorLagbe PRO
              </h2>

              <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF5E5] px-3 py-1 text-xs font-medium whitespace-nowrap text-[#B58A45] dark:bg-[#C98A2B]/15 dark:text-[#E4C99A]">
                <Crown size={12} />
                PRO Badge
              </span>
            </div>

            <p className="mt-4 min-h-12 text-sm leading-6 text-[#858B94] dark:text-slate-400">
              Unlimited reach, verified credential badges, and priority
              matching.
            </p>

            <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <div className={role === "tutor" ? "" : "opacity-70"}>
                <span
                  className={
                    role === "tutor"
                      ? "text-4xl font-bold text-[#399B98] dark:text-[#5FD3C9]"
                      : "text-2xl font-bold text-[#17202D] dark:text-foreground"
                  }
                >
                  $15
                </span>

                <p className="mt-0.5 text-xs text-[#858B94] dark:text-slate-400">
                  /mo for Tutors
                </p>
              </div>

              <span className="text-sm text-[#9CA3AF] dark:text-slate-400">
                or
              </span>

              <div className={role === "student" ? "" : "opacity-70"}>
                <span
                  className={
                    role === "student"
                      ? "text-4xl font-bold text-[#399B98] dark:text-[#5FD3C9]"
                      : "text-2xl font-bold text-[#17202D] dark:text-foreground"
                  }
                >
                  $10
                </span>

                <p className="mt-0.5 text-xs text-[#858B94] dark:text-slate-400">
                  /mo for Students
                </p>
              </div>
            </div>

            <ul className="mt-7 flex-1 space-y-4">
              {proFeatures.map((feature, index) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckCircle2
                    size={17}
                    className="mt-0.5 shrink-0 text-[#8BB9B5]"
                  />

                  <span
                    className={`text-sm leading-5 ${
                      index === 0
                        ? "font-medium text-[#17202D] dark:text-foreground"
                        : "text-[#858B94] dark:text-slate-400"
                    }`}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-gray-100 pt-5 dark:border-[#1E2C42]">
              <button
                type="button"
                onClick={() => void handleUpgrade()}
                disabled={isLoading || isPending || isPro || Boolean(user && !role)}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#399B98] text-sm font-semibold text-white transition hover:bg-[#2D8582] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Opening Stripe Checkout..." : ctaLabel}
                {!isLoading ? <ArrowRight size={17} /> : null}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
