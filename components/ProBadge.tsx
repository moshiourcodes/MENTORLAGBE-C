import { Crown } from "lucide-react";

import { cn } from "@/lib/utils";

type ProBadgeProps = {
  plan: unknown;
  className?: string;
  compact?: boolean;
};

/** Consistent PRO verification badge sourced from the real user plan. */
export function ProBadge({ plan, className, compact = false }: ProBadgeProps) {
  if (plan !== "pro") return null;

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-full border border-[#F4DCA8] bg-[#FFF5E2] font-semibold text-[#B7791F] dark:border-[#C98A2B]/40 dark:bg-[#C98A2B]/15 dark:text-[#F0C57E]",
        compact ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-0.5 text-[11px]",
        className
      )}
    >
      <Crown size={compact ? 10 : 12} />
      PRO
    </span>
  );
}
