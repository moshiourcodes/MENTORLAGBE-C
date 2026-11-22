import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAFA] px-4 dark:bg-[#0B1220]">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-[#111C2E]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400">
          <ArrowLeft size={28} />
        </div>

        <h1 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white">
          Checkout Cancelled
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
          No payment was made and your account is still on the Free plan. You
          can return to pricing at any time to upgrade to MentorLagbe Pro.
        </p>

        <div className="mt-7 flex flex-col gap-2">
          <Link
            href="/pricing"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-[#399B98] px-6 text-sm font-semibold text-white transition hover:bg-[#287F7C]"
          >
            Back to Pricing
          </Link>

          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center text-xs font-semibold text-[#399B98] hover:underline dark:text-[#5FD3C9]"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
