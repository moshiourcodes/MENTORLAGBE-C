import Link from "next/link"
import { ArrowRight, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type QuickActionTone = "teal" | "blue" | "amber" | "purple" | "rose"

const toneClasses: Record<QuickActionTone, string> = {
  teal: "bg-[#EAF6F5] text-[#399B98] dark:bg-[#399B98]/15 dark:text-[#5FD3C9]",
  blue: "bg-[#EAF1FB] text-[#3B82C4] dark:bg-[#3B82C4]/15 dark:text-[#8EC3EE]",
  amber: "bg-[#FDF3E2] text-[#C98A2B] dark:bg-[#C98A2B]/15 dark:text-[#F0C57E]",
  purple: "bg-[#F1EDFC] text-[#7C5CD6] dark:bg-[#7C5CD6]/15 dark:text-[#B9A6F0]",
  rose: "bg-[#FDECEC] text-[#D45B5B] dark:bg-[#D45B5B]/15 dark:text-[#F0A3A3]",
}

type QuickActionProps = {
  href: string
  title: string
  description: string
  icon: LucideIcon
  tone?: QuickActionTone
}

export function QuickAction({
  href,
  title,
  description,
  icon: Icon,
  tone = "teal",
}: QuickActionProps) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-3.5 text-card-foreground transition hover:border-[#399B98]/40 hover:bg-[#F7FBFB] dark:hover:bg-muted/40"
    >
      <span
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
          toneClasses[tone]
        )}
      >
        <Icon size={18} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-foreground">
          {title}
        </span>
        <span className="mt-0.5 block truncate text-xs text-muted-foreground">
          {description}
        </span>
      </span>

      <ArrowRight
        size={18}
        className="shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-[#399B98] dark:group-hover:text-[#5FD3C9]"
      />
    </Link>
  )
}
