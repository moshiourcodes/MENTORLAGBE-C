'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,

  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import type { LucideIcon } from "lucide-react"
import {
  BookOpen,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  PlusCircle,
  ShieldCheck,
  UserRound,
  Users,
  UsersRound,
} from "lucide-react"

type UserRole = "student" | "tutor" | "admin"

type DashboardMenuItem = {
  id: string
  name: string
  url: string
  icon: LucideIcon
}

const menuItemByRole: Record<UserRole, DashboardMenuItem[]> = {
  student: [
    {
      id: "student-overview",
      name: "Overview",
      url: "/dashboard/student",
      icon: LayoutDashboard,
    },
    {
      id: "student-applications",
      name: "My Applications",
      url: "/dashboard/student/my-applications",
      icon: ClipboardList,
    },
    {
      id: "student-profile",
      name: "Update Profile",
      url: "/dashboard/profile",
      icon: UserRound,
    },
  ],
  tutor: [
    {
      id: "tutor-overview",
      name: "Overview",
      url: "/dashboard/tutor",
      icon: LayoutDashboard,
    },
    {
      id: "tutor-post-tuition",
      name: "Post a Tuition",
      url: "/dashboard/tutor/post-tuition",
      icon: PlusCircle,
    },
    {
      id: "tutor-my-tuitions",
      name: "My Tuitions",
      url: "/dashboard/tutor/my-tuitions",
      icon: BookOpen,
    },
    {
      id: "tutor-applicants",
      name: "Applicants",
      url: "/dashboard/tutor/applicants",
      icon: Users,
    },
    {
      id: "tutor-profile",
      name: "Update Profile",
      url: "/dashboard/profile",
      icon: UserRound,
    },
  ],
  admin: [
    {
      id: "admin-overview",
      name: "Overview",
      url: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      id: "admin-users",
      name: "User Management",
      url: "/dashboard/admin/users",
      icon: UsersRound,
    },
    {
      id: "admin-tuitions",
      name: "Tuition Approvals",
      url: "/dashboard/admin/tuitions",
      icon: ShieldCheck,
    },
    {
      id: "admin-transactions",
      name: "Transactions",
      url: "/dashboard/admin/transactions",
      icon: CreditCard,
    },
    {
      id: "admin-profile",
      name: "Update Profile",
      url: "/dashboard/profile",
      icon: UserRound,
    },
  ],
}

function isUserRole(value: unknown): value is UserRole {
  return value === "student" || value === "tutor" || value === "admin"
}

export function DashboardSidebar() {
  const { data: session, isPending } = useSession()
  const role: UserRole = isUserRole(session?.user.role)
    ? session.user.role
    : "student"

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup>
          <SidebarMenu>
            {!isPending &&
              menuItemByRole[role].map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton render={<a href={item.url} />}>
                    <item.icon />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
