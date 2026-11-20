import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type StatCardProps = {
  label: string
  value: string | number
  hint?: string
  icon: LucideIcon
  iconClassName?: string
  badge?: string
}

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  iconClassName,
  badge,
}: StatCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>

        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF6F5] text-[#399B98] dark:bg-[#399B98]/15 dark:text-[#5FD3C9]",
            iconClassName
          )}
        >
          <Icon size={19} />
        </span>
      </div>

      <div className="mt-4 flex items-end justify-between gap-3">
        <p className="text-3xl leading-none font-bold tracking-tight text-foreground">
          {value}
        </p>

        {badge ? (
          <span className="rounded-full bg-[#EAF6F5] px-2.5 py-1 text-[11px] font-semibold text-[#2F8481] dark:bg-[#399B98]/15 dark:text-[#5FD3C9]">
            {badge}
          </span>
        ) : null}
      </div>

      {hint ? (
        <p className="mt-2 text-xs leading-5 text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  )
}
