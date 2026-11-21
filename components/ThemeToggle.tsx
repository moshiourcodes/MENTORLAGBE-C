"use client"

import { useEffect, useState } from "react"

import { Moon, Sun } from "lucide-react"

import { useTheme } from "@/components/theme-provider"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

type ThemeToggleProps = {
  className?: string
  /** `md` matches the public navbar, `sm` matches the dashboard header. */
  size?: "sm" | "md"
}

/**
 * Global light/dark switch.
 *
 * The icons and the tooltip copy are chosen with CSS (`dark:` variants)
 * instead of JS so the server and the first client render always agree —
 * no hydration mismatch, and the correct icon shows before React hydrates.
 *
 * `resolvedTheme` only becomes trustworthy after hydration, so it is gated
 * behind a mounted flag: the server never knows the resolved theme, and
 * reading it during the first client render would mismatch the SSR markup.
 */
export function ThemeToggle({ className, size = "md" }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const isDark = isMounted && resolvedTheme === "dark"

  const handleToggle = () => {
    const currentlyDark = document.documentElement.classList.contains("dark")
    setTheme(currentlyDark ? "light" : "dark")
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          render={
            <button
              type="button"
              onClick={handleToggle}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              aria-pressed={isDark}
              className={cn(
                "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[#CFE8E5] bg-white text-[#399B98] transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-[#399B98] hover:bg-[#EAF6F5] hover:shadow-md active:translate-y-0 active:scale-95 focus-visible:ring-3 focus-visible:ring-[#399B98]/40 focus-visible:outline-none dark:border-[#399B98]/30 dark:bg-[#111C2E] dark:text-[#5FD3C9] dark:hover:bg-[#399B98]/15 dark:hover:shadow-none",
                size === "md" ? "h-11 w-11" : "h-9 w-9",
                className
              )}
            >
              <Sun
                className="dark:hidden"
                size={size === "md" ? 20 : 17}
                aria-hidden="true"
              />
              <Moon
                className="hidden dark:block"
                size={size === "md" ? 20 : 17}
                aria-hidden="true"
              />
            </button>
          }
        />

        <TooltipContent side="bottom" align="center">
          <span className="dark:hidden">Switch to Dark Mode</span>
          <span className="hidden dark:block">Switch to Light Mode</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default ThemeToggle
