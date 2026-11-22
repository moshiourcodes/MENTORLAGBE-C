"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  UserRound,
} from "lucide-react"
import { toast } from "sonner"

import { authClient } from "@/lib/auth-client"
import type { DashboardUser } from "@/lib/dashboard"
import { ProBadge } from "@/components/ProBadge"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"

const workspaceTitles: Record<DashboardUser["role"], string> = {
  student: "Student Workspace",
  tutor: "Tutor Workspace",
  admin: "Admin Workspace",
}

const dashboardPaths: Record<DashboardUser["role"], string> = {
  student: "/dashboard/student",
  tutor: "/dashboard/tutor",
  admin: "/dashboard/admin",
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("")
}

export function DashboardHeader({ user }: { user: DashboardUser }) {
  const router = useRouter()

  const firstName = user.name.split(/\s+/)[0] || user.name

  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut()

      if (error) {
        throw new Error(error.message || "Unable to sign out.")
      }

      toast.success("Signed out successfully")
      router.push("/sign-in")
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to sign out."
      )
    }
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-3 border-b border-border bg-card/95 px-4 backdrop-blur sm:px-6">
      <div className="flex min-w-0 items-center gap-2">
        <SidebarTrigger className="md:hidden" />

        <h1 className="truncate text-base font-bold text-foreground sm:text-lg">
          {workspaceTitles[user.role]}
        </h1>

        <ProBadge plan={user.plan} compact />
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <ThemeToggle size="sm" />

        <div className="hidden h-8 w-px bg-border sm:block" />

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                className="flex items-center gap-2 rounded-full border border-border bg-background py-1 pr-2 pl-1 transition hover:bg-muted"
              >
                <Avatar>
                  {user.image ? (
                    <AvatarImage src={user.image} alt={user.name} />
                  ) : null}
                  <AvatarFallback className="bg-[#399B98] text-[11px] font-semibold text-white">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>

                <span className="hidden max-w-32 truncate text-sm font-semibold text-foreground sm:block">
                  {firstName}
                </span>

                <ChevronDown
                  size={15}
                  className="hidden text-muted-foreground sm:block"
                />
              </button>
            }
          />

          <DropdownMenuContent align="end" className="w-60">
            <DropdownMenuLabel className="px-2 py-1.5">
              <span className="block truncate text-sm font-semibold text-foreground">
                {user.name}
              </span>
              <span className="mt-0.5 block truncate text-xs font-normal text-muted-foreground">
                {user.email}
              </span>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem render={<Link href={dashboardPaths[user.role]} />}>
              <LayoutDashboard />
              Dashboard
            </DropdownMenuItem>

            <DropdownMenuItem render={<Link href="/dashboard/profile" />}>
              <UserRound />
              Update Profile
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem variant="destructive" onClick={handleSignOut}>
              <LogOut />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
