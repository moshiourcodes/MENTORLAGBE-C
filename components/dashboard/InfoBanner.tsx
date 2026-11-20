import Link from "next/link"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type InfoBannerProps = {
  tone?: "success" | "pro"
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    href: string
    icon?: LucideIcon
  }
  className?: string
}

export function InfoBanner({
  tone = "success",
  icon: Icon,
  title,
  description,
  action,
  className,
}: InfoBannerProps) {
  const isPro = tone === "pro"

  return (
    <div
      className={cn(
        "rounded-2xl border p-5",
        isPro
          ? "border-[#F1E1C3] bg-gradient-to-r from-[#FDF4E5] via-[#FEF8EE] to-[#FDF4E5] dark:border-[#C98A2B]/30 dark:from-[#C98A2B]/10 dark:via-[#C98A2B]/5 dark:to-[#C98A2B]/10"
          : "border-[#CDEAE2] bg-[#EAF7F3] dark:border-[#399B98]/30 dark:bg-[#399B98]/10",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
            isPro
              ? "bg-[#F8E4BF] text-[#B7791F] dark:bg-[#C98A2B]/20 dark:text-[#F0C57E]"
              : "bg-white/70 text-[#2F8481] dark:bg-[#399B98]/20 dark:text-[#5FD3C9]"
          )}
        >
          <Icon size={18} />
        </span>

        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "text-sm font-bold",
              isPro ? "text-[#8A5A12] dark:text-[#F0C57E]" : "text-[#1F6F6B] dark:text-[#9BE3DC]"
            )}
          >
            {title}
          </p>

          <p
            className={cn(
              "mt-1 text-xs leading-5",
              isPro ? "text-[#9A7433] dark:text-[#E4C99A]" : "text-[#3F7C78] dark:text-[#A9D9D4]"
            )}
          >
            {description}
          </p>

          {action ? (
            <Link
              href={action.href}
              className={cn(
                "mt-3 inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition",
                isPro
                  ? "bg-[#E8A52B] text-white hover:bg-[#D8941C]"
                  : "bg-[#399B98] text-white hover:bg-[#2F8481]"
              )}
            >
              {action.icon ? <action.icon size={14} /> : null}
              {action.label}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  )
}
