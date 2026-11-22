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

  if (user.roleSelected === false) {
    redirect("/select-role")
  }

  redirect(dashboardPathForRole(user.role))
}
