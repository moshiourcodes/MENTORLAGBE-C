import { redirect } from "next/navigation"

import {
  dashboardPathForRole,
  getDashboardUser,
} from "@/lib/dashboard"

export default async function DashboardIndexPage() {
  const user = await getDashboardUser()

  if (!user) {
    redirect("/sign-in")
  }

  redirect(dashboardPathForRole(user.role))
}
