import Link from "next/link"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type EmptyStateProps = {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    href: string
  }
  className?: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 px-6 py-14 text-center",
        className
      )}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF6F5] text-[#399B98] dark:bg-[#399B98]/15 dark:text-[#5FD3C9]">
        <Icon size={22} />
      </span>

      <p className="mt-4 text-sm font-semibold text-foreground">{title}</p>

      <p className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">
        {description}
      </p>

      {action ? (
        <Link
          href={action.href}
          className="mt-5 inline-flex items-center justify-center rounded-lg bg-[#399B98] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#2F8481]"
        >
          {action.label}
        </Link>
      ) : null}
    </div>
  )
}
