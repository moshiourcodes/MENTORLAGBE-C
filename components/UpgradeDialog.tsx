"use client";

import Link from "next/link";
import { CheckCircle2, Crown, LoaderCircle, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCheckout } from "@/hooks/use-checkout";
import {
  FREE_LIMITS,
  planPriceCents,
  type BillingRole,
  type UpgradeLimit,
} from "@/lib/payments";

type UpgradeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: BillingRole;
  limit: UpgradeLimit;
  currentPlan?: "free" | "pro";
};

const messages: Record<
  BillingRole,
  Partial<Record<UpgradeLimit, { title: string; description: string }>>
> = {
  student: {
    applications: {
      title: "Free application limit reached",
      description: `You've used all ${FREE_LIMITS.applications} free tuition applications. Upgrade to Student Pro to apply to unlimited tuitions.`,
    },
    bookmarks: {
      title: "Free bookmark limit reached",
      description: `You've saved the maximum of ${FREE_LIMITS.bookmarks} free tuitions. Upgrade to Student Pro to bookmark unlimited listings.`,
    },
  },
  tutor: {
    tuitions: {
      title: "Free tuition-post limit reached",
      description: `You've created all ${FREE_LIMITS.tuitions} free tuition posts. Upgrade to Tutor Pro for unlimited listings and priority visibility.`,
    },
  },
};

export function UpgradeDialog({
  open,
  onOpenChange,
  role,
  limit,
  currentPlan = "free",
}: UpgradeDialogProps) {
  const { startCheckout, isLoading } = useCheckout();
  const message =
    messages[role][limit] ?? {
      title: "Free plan limit reached",
      description: "Upgrade to Pro to keep going without limits.",
    };

  const price = `$${planPriceCents(role) / 100}`;
  const roleLabel = role === "student" ? "Student" : "Tutor";

  const benefits =
    role === "student"
      ? ["Unlimited tuition applications", "Unlimited bookmarked tuitions", "PRO verification badge"]
      : ["Unlimited tuition posts", "Priority search visibility", "PRO verification badge"];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md gap-0 overflow-hidden p-0">
        <div className="bg-gradient-to-br from-[#399B98]/15 via-transparent to-[#399B98]/5 p-6 dark:from-[#399B98]/20">
          <DialogHeader>
            <span className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full border border-[#C98A2B]/40 bg-[#FFF5E2] px-2.5 py-1 text-[11px] font-semibold text-[#B7791F] dark:bg-[#C98A2B]/15 dark:text-[#F0C57E]">
              <Crown size={12} />
              Current plan: {currentPlan === "pro" ? "PRO" : "FREE"}
            </span>

            <DialogTitle className="flex items-center gap-2 text-lg font-bold text-foreground">
              <Sparkles size={18} className="text-[#399B98] dark:text-[#5FD3C9]" />
              {message.title}
            </DialogTitle>

            <DialogDescription className="mt-1 leading-6">
              {message.description}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 py-5">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            With MentorLagbe {roleLabel} Pro
          </p>

          <ul className="mt-3 space-y-2.5">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2.5 text-sm">
                <CheckCircle2
                  size={16}
                  className="mt-0.5 shrink-0 text-[#399B98] dark:text-[#5FD3C9]"
                />
                <span className="text-foreground">{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-baseline gap-1 rounded-xl border border-border bg-muted/40 px-4 py-3">
            <span className="text-2xl font-bold text-foreground">{price}</span>
            <span className="text-sm text-muted-foreground">/ month</span>
          </div>

          <Link
            href="/pricing"
            onClick={() => onOpenChange(false)}
            className="mt-3 inline-block text-xs font-semibold text-[#399B98] hover:underline dark:text-[#5FD3C9]"
          >
            Compare Free and Pro plans
          </Link>
        </div>

        <DialogFooter className="gap-2 px-6 py-4">
          <DialogClose render={<Button type="button" variant="outline" />}>
            Maybe Later
          </DialogClose>

          <Button
            type="button"
            disabled={isLoading}
            onClick={() => void startCheckout()}
            className="bg-[#399B98] text-white hover:bg-[#2F8481]"
          >
            {isLoading ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              <Crown size={16} />
            )}
            {isLoading ? "Opening Checkout..." : `Upgrade to ${roleLabel} Pro`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
