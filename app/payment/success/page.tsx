import Link from "next/link";
import { CheckCircle2, Clock3, ShieldCheck } from "lucide-react";

import { getDashboardUser } from "@/lib/dashboard";
import { getStripe } from "@/lib/stripe";

type Status = "confirmed" | "pending" | "invalid";

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const user = await getDashboardUser();

  let status: Status = "invalid";

  if (session_id && user) {
    try {
      const checkout = await getStripe().checkout.sessions.retrieve(
        session_id
      );

      if (
        checkout.payment_status === "paid" &&
        checkout.client_reference_id === user.id
      ) {
        status = "confirmed";
      } else if (checkout.client_reference_id === user.id) {
        status = "pending";
      }
    } catch {
      status = "invalid";
    }
  }

  const copy: Record<
    Status,
    { title: string; description: string; icon: typeof CheckCircle2 }
  > = {
    confirmed: {
      title: "Payment Successful!",
      description:
        "Stripe has confirmed your subscription. Your Pro benefits are being applied to your account now.",
      icon: CheckCircle2,
    },
    pending: {
      title: "Payment is still being confirmed",
      description:
        "Stripe has not confirmed the payment yet. Your Pro access will be activated automatically once the webhook arrives — you do not need to reload or pay again.",
      icon: Clock3,
    },
    invalid: {
      title: user ? "We couldn't verify that payment" : "Please sign in",
      description: user
        ? "This checkout session is invalid or does not belong to your account. If you completed a payment, contact support with your receipt."
        : "Sign in to view the status of your subscription.",
      icon: ShieldCheck,
    },
  };

  const { title, description, icon: Icon } = copy[status];

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAFA] px-4 dark:bg-[#0B1220]">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-[#111C2E]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
          <Icon size={30} />
        </div>

        <h1 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white">
          {title}
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
          {description}
        </p>

        <div className="mt-7 flex flex-col gap-2">
          <Link
            href={user ? "/dashboard" : "/sign-in"}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-[#399B98] px-6 text-sm font-semibold text-white transition hover:bg-[#287F7C]"
          >
            {user ? "Go to Dashboard" : "Sign In"}
          </Link>

          <Link
            href="/pricing"
            className="inline-flex h-10 items-center justify-center text-xs font-semibold text-[#399B98] hover:underline dark:text-[#5FD3C9]"
          >
            Back to pricing
          </Link>
        </div>
      </div>
    </main>
  );
}
