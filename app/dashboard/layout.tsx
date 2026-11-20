import type { ReactNode } from "react"
import { redirect } from "next/navigation"

import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/app/components/DashboardSidebar"
import { getDashboardUser } from "@/lib/dashboard"

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const user = await getDashboardUser()

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <SidebarProvider>
      <DashboardSidebar user={user} />

      <SidebarInset className="min-w-0 bg-[#F6F8FA] dark:bg-background">
        <DashboardHeader user={user} />

        <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
