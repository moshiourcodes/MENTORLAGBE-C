// "use client"

// import Link from "next/link"
// import { usePathname, useRouter } from "next/navigation"
// import type { LucideIcon } from "lucide-react"
// import {
//   BarChart3,
//   Bookmark,
//   BookOpen,
//   ClipboardList,
//   FileText,
//   GraduationCap,
//   LayoutDashboard,
//   LogOut,
//   PanelLeftClose,
//   PanelLeftOpen,
//   Plus,
//   Settings,
//   ShieldCheck,
//   UserRound,
//   Users,
// } from "lucide-react"
// import { toast } from "sonner"

// import { authClient } from "@/lib/auth-client"
// import type { DashboardRole, DashboardUser } from "@/lib/dashboard"
// import { cn } from "@/lib/utils"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   useSidebar,
// } from "@/components/ui/sidebar"
// import { TooltipProvider } from "@/components/ui/tooltip"

// type DashboardMenuItem = {
//   id: string
//   name: string
//   url: string
//   icon: LucideIcon
// }

// const mainMenuByRole: Record<DashboardRole, DashboardMenuItem[]> = {
//   student: [
//     {
//       id: "student-overview",
//       name: "Overview",
//       url: "/dashboard/student",
//       icon: LayoutDashboard,
//     },
//     {
//       id: "student-applications",
//       name: "My Applications",
//       url: "/dashboard/student/my-applications",
//       icon: FileText,
//     },
//     {
//       id: "student-saved",
//       name: "Saved Tuitions",
//       url: "/dashboard/student/saved-tuitions",
//       icon: Bookmark,
//     },
//   ],
//   tutor: [
//     {
//       id: "tutor-overview",
//       name: "Overview",
//       url: "/dashboard/tutor",
//       icon: LayoutDashboard,
//     },
//     {
//       id: "tutor-post",
//       name: "Post Tuition",
//       url: "/dashboard/tutor/post-tuition",
//       icon: Plus,
//     },
//     {
//       id: "tutor-tuitions",
//       name: "My Tuitions",
//       url: "/dashboard/tutor/my-tuitions",
//       icon: BookOpen,
//     },
//     {
//       id: "tutor-applicants",
//       name: "Applicants",
//       url: "/dashboard/tutor/applicants",
//       icon: Users,
//     },
//   ],
//   admin: [
//     {
//       id: "admin-overview",
//       name: "Overview",
//       url: "/dashboard/admin",
//       icon: LayoutDashboard,
//     },
//     {
//       id: "admin-users",
//       name: "Manage Users",
//       url: "/dashboard/admin/users",
//       icon: Users,
//     },
//     {
//       id: "admin-tuitions",
//       name: "Manage Tuitions",
//       url: "/dashboard/admin/tuitions",
//       icon: ClipboardList,
//     },
//     {
//       id: "admin-applications",
//       name: "Manage Applications",
//       url: "/dashboard/admin/applications",
//       icon: FileText,
//     },
//     {
//       id: "admin-reports",
//       name: "Reports",
//       url: "/dashboard/admin/reports",
//       icon: BarChart3,
//     },
//     {
//       id: "admin-settings",
//       name: "Settings",
//       url: "/dashboard/admin/settings",
//       icon: Settings,
//     },
//   ],
// }

// const preferenceMenuByRole: Partial<
//   Record<DashboardRole, DashboardMenuItem[]>
// > = {
//   student: [
//     {
//       id: "student-profile",
//       name: "Update Profile",
//       url: "/dashboard/profile",
//       icon: Settings,
//     },
//   ],
//   tutor: [
//     {
//       id: "tutor-profile",
//       name: "Update Profile",
//       url: "/dashboard/profile",
//       icon: Settings,
//     },
//   ],
//   admin: [
//     {
//       id: "admin-profile",
//       name: "Update Profile",
//       url: "/dashboard/profile",
//       icon: UserRound,
//     },
//   ],
// }

// const roleMeta: Record<
//   DashboardRole,
//   { label: string; icon: LucideIcon; className: string }
// > = {
//   student: {
//     label: "Student",
//     icon: GraduationCap,
//     className:
//       "border-[#CFE0FA] bg-[#EAF1FB] text-[#3B82C4] dark:border-[#3B82C4]/30 dark:bg-[#3B82C4]/15 dark:text-[#8EC3EE]",
//   },
//   tutor: {
//     label: "Tutor",
//     icon: BookOpen,
//     className:
//       "border-[#CDEAE2] bg-[#EAF7F3] text-[#2F8481] dark:border-[#399B98]/30 dark:bg-[#399B98]/15 dark:text-[#5FD3C9]",
//   },
//   admin: {
//     label: "Admin",
//     icon: ShieldCheck,
//     className:
//       "border-[#E4D8FA] bg-[#F3EEFC] text-[#7C5CD6] dark:border-[#7C5CD6]/30 dark:bg-[#7C5CD6]/15 dark:text-[#B9A6F0]",
//   },
// }

// function getInitials(name: string) {
//   return name
//     .trim()
//     .split(/\s+/)
//     .slice(0, 2)
//     .map((part) => part[0]?.toUpperCase() || "")
//     .join("")
// }

// function RoleBadge({ role }: { role: DashboardRole }) {
//   const meta = roleMeta[role]
//   const Icon = meta.icon

//   return (
//     <span
//       className={cn(
//         "mt-1 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold",
//         meta.className
//       )}
//     >
//       <Icon size={11} />
//       {meta.label}
//     </span>
//   )
// }

// function MenuSection({
//   label,
//   items,
//   pathname,
//   role,
// }: {
//   label: string
//   items: DashboardMenuItem[]
//   pathname: string
//   role: DashboardRole
// }) {
//   const isItemActive = (url: string) => {
//     if (url === `/dashboard/${role}`) {
//       return pathname === url
//     }

//     return pathname === url || pathname.startsWith(`${url}/`)
//   }

//   return (
//     <SidebarGroup className="px-3 py-2">
//       <SidebarGroupLabel className="h-7 px-2 text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
//         {label}
//       </SidebarGroupLabel>

//       <SidebarGroupContent>
//         <SidebarMenu className="gap-1">
//           {items.map((item) => (
//             <SidebarMenuItem key={item.id}>
//               <SidebarMenuButton
//                 render={<Link href={item.url} />}
//                 isActive={isItemActive(item.url)}
//                 tooltip={item.name}
//                 className="h-10 rounded-lg px-2.5 text-sm font-medium text-muted-foreground data-active:font-semibold"
//               >
//                 <item.icon />
//                 <span>{item.name}</span>
//               </SidebarMenuButton>
//             </SidebarMenuItem>
//           ))}
//         </SidebarMenu>
//       </SidebarGroupContent>
//     </SidebarGroup>
//   )
// }

// export function DashboardSidebar({ user }: { user: DashboardUser }) {
//   const pathname = usePathname()
//   const router = useRouter()
//   const { state, toggleSidebar } = useSidebar()

//   const mainItems = mainMenuByRole[user.role]
//   const preferenceItems = preferenceMenuByRole[user.role] ?? []

//   const handleSignOut = async () => {
//     try {
//       const { error } = await authClient.signOut()

//       if (error) {
//         throw new Error(error.message || "Unable to sign out.")
//       }

//       toast.success("Signed out successfully")
//       router.push("/sign-in")
//       router.refresh()
//     } catch (error) {
//       toast.error(
//         error instanceof Error ? error.message : "Unable to sign out."
//       )
//     }
//   }

//   return (
//     <TooltipProvider>
//       <Sidebar
//         collapsible="icon"
//         className="[--sidebar-accent-foreground:#0F766E] [--sidebar-accent:#EAF6F5] dark:[--sidebar-accent-foreground:#5FD3C9] dark:[--sidebar-accent:rgba(57,155,152,0.15)]"
//       >
//         <SidebarHeader className="gap-0 border-b border-sidebar-border p-0">
//           <Link
//             href="/"
//             className="flex h-16 items-center gap-2.5 px-4"
//             aria-label="MentorLagbe home"
//           >
//             <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#399B98] text-sm font-bold text-white shadow-sm">
//               ML
//             </span>

//             <span className="truncate text-lg font-bold tracking-tight text-foreground group-data-[collapsible=icon]:hidden">
//               Mentor<span className="text-[#399B98] dark:text-[#5FD3C9]">Lagbe</span>
//             </span>
//           </Link>

//           <div className="mx-3 mb-3 flex items-center gap-3 rounded-xl border border-border bg-muted/30 px-3 py-2.5 group-data-[collapsible=icon]:hidden">
//             <Avatar className="size-9">
//               {user.image ? (
//                 <AvatarImage src={user.image} alt={user.name} />
//               ) : null}
//               <AvatarFallback className="bg-[#399B98] text-[11px] font-semibold text-white">
//                 {getInitials(user.name)}
//               </AvatarFallback>
//             </Avatar>

//             <div className="min-w-0">
//               <p className="truncate text-sm font-semibold text-foreground">
//                 {user.name}
//               </p>
//               <RoleBadge role={user.role} />
//             </div>
//           </div>
//         </SidebarHeader>

//         <SidebarContent className="py-2">
//           <MenuSection
//             label="Main Menu"
//             items={mainItems}
//             pathname={pathname}
//             role={user.role}
//           />

//           {preferenceItems.length > 0 ? (
//             <MenuSection
//               label="Preferences"
//               items={preferenceItems}
//               pathname={pathname}
//               role={user.role}
//             />
//           ) : null}
//         </SidebarContent>

//         <SidebarFooter className="gap-1 border-t border-sidebar-border p-3">
//           <button
//             type="button"
//             onClick={handleSignOut}
//             className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10"
//           >
//             <LogOut size={18} className="shrink-0" />
//             <span className="truncate group-data-[collapsible=icon]:hidden">
//               Sign Out
//             </span>
//           </button>

//           <button
//             type="button"
//             onClick={toggleSidebar}
//             aria-label={
//               state === "collapsed" ? "Expand sidebar" : "Collapse sidebar"
//             }
//             className="hidden w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground md:flex"
//           >
//             {state === "collapsed" ? (
//               <PanelLeftOpen size={18} className="shrink-0" />
//             ) : (
//               <PanelLeftClose size={18} className="shrink-0" />
//             )}
//             <span className="truncate group-data-[collapsible=icon]:hidden">
//               Collapse
//             </span>
//           </button>
//         </SidebarFooter>
//       </Sidebar>
//     </TooltipProvider>
//   )
// }























"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { LucideIcon } from "lucide-react";

import {
  BarChart3,
  Bookmark,
  BookOpen,
  ClipboardList,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Settings,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";

import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import type { DashboardRole, DashboardUser } from "@/lib/dashboard";
import { cn } from "@/lib/utils";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { TooltipProvider } from "@/components/ui/tooltip";

type DashboardMenuItem = {
  id: string;
  name: string;
  url: string;
  icon: LucideIcon;
};

const mainMenuByRole: Record<DashboardRole, DashboardMenuItem[]> = {
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
      icon: FileText,
    },
    {
      id: "student-saved",
      name: "Saved Tuitions",
      url: "/dashboard/student/saved-tuitions",
      icon: Bookmark,
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
      id: "tutor-post",
      name: "Post Tuition",
      url: "/dashboard/tutor/post-tuition",
      icon: Plus,
    },
    {
      id: "tutor-tuitions",
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
      name: "Manage Users",
      url: "/dashboard/admin/users",
      icon: Users,
    },
    {
      id: "admin-tuitions",
      name: "Manage Tuitions",
      url: "/dashboard/admin/tuitions",
      icon: ClipboardList,
    },
    {
      id: "admin-applications",
      name: "Manage Applications",
      url: "/dashboard/admin/applications",
      icon: FileText,
    },
    {
      id: "admin-reports",
      name: "Reports",
      url: "/dashboard/admin/reports",
      icon: BarChart3,
    },
    {
      id: "admin-settings",
      name: "Settings",
      url: "/dashboard/admin/settings",
      icon: Settings,
    },
  ],
};

const preferenceMenuByRole: Partial<
  Record<DashboardRole, DashboardMenuItem[]>
> = {
  student: [
    {
      id: "student-profile",
      name: "Update Profile",
      url: "/dashboard/profile",
      icon: Settings,
    },
  ],

  tutor: [
    {
      id: "tutor-profile",
      name: "Update Profile",
      url: "/dashboard/profile",
      icon: Settings,
    },
  ],

  admin: [
    {
      id: "admin-profile",
      name: "Update Profile",
      url: "/dashboard/profile",
      icon: UserRound,
    },
  ],
};

const roleMeta: Record<
  DashboardRole,
  { label: string; icon: LucideIcon; className: string }
> = {
  student: {
    label: "Student",
    icon: GraduationCap,
    className:
      "border-[#CFE0FA] bg-[#EAF1FB] text-[#3B82C4] dark:border-[#3B82C4]/30 dark:bg-[#3B82C4]/15 dark:text-[#8EC3EE]",
  },

  tutor: {
    label: "Tutor",
    icon: BookOpen,
    className:
      "border-[#CDEAE2] bg-[#EAF7F3] text-[#2F8481] dark:border-[#399B98]/30 dark:bg-[#399B98]/15 dark:text-[#5FD3C9]",
  },

  admin: {
    label: "Admin",
    icon: ShieldCheck,
    className:
      "border-[#E4D8FA] bg-[#F3EEFC] text-[#7C5CD6] dark:border-[#7C5CD6]/30 dark:bg-[#7C5CD6]/15 dark:text-[#B9A6F0]",
  },
};

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

function RoleBadge({ role }: { role: DashboardRole }) {
  const meta = roleMeta[role];
  const Icon = meta.icon;

  return (
    <span
      className={cn(
        "mt-1 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold",
        meta.className
      )}
    >
      <Icon size={11} />
      {meta.label}
    </span>
  );
}

function MenuSection({
  label,
  items,
  pathname,
  role,
}: {
  label: string;
  items: DashboardMenuItem[];
  pathname: string;
  role: DashboardRole;
}) {
  const isItemActive = (url: string) => {
    if (url === `/dashboard/${role}`) {
      return pathname === url;
    }

    return pathname === url || pathname.startsWith(`${url}/`);
  };

  return (
    <SidebarGroup className="px-3 py-2">
      <SidebarGroupLabel className="h-7 px-2 text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
        {label}
      </SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu className="gap-1">
          {items.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                render={<Link href={item.url} />}
                isActive={isItemActive(item.url)}
                tooltip={item.name}
                className="h-10 rounded-lg px-2.5 text-sm font-medium text-muted-foreground data-active:font-semibold"
              >
                <item.icon />
                <span>{item.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function DashboardSidebar({ user }: { user: DashboardUser }) {
  const pathname = usePathname();
  const router = useRouter();
  const { state, toggleSidebar } = useSidebar();

  const mainItems = mainMenuByRole[user.role];
  const preferenceItems = preferenceMenuByRole[user.role] ?? [];

  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        throw new Error(error.message || "Unable to sign out.");
      }

      toast.success("Signed out successfully");
      router.push("/sign-in");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to sign out."
      );
    }
  };

  return (
    <TooltipProvider>
      <Sidebar
        collapsible="icon"
        className="[--sidebar-accent-foreground:#0F766E] [--sidebar-accent:#EAF6F5] dark:[--sidebar-accent-foreground:#5FD3C9] dark:[--sidebar-accent:rgba(57,155,152,0.15)]"
      >
        <SidebarHeader className="gap-0 border-b border-sidebar-border p-0">
          <Link
            href="/"
            className="flex h-16 items-center gap-2.5 px-4"
            aria-label="MentorLagbe home"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#399B98] text-sm font-bold text-white shadow-sm">
              ML
            </span>

            <span className="truncate text-lg font-bold tracking-tight text-foreground group-data-[collapsible=icon]:hidden">
              Mentor
              <span className="text-[#399B98] dark:text-[#5FD3C9]">
                Lagbe
              </span>
            </span>
          </Link>

          <div className="mx-3 mb-3 flex items-center gap-3 rounded-xl border border-border bg-muted/30 px-3 py-2.5 group-data-[collapsible=icon]:hidden">
            <Avatar className="size-9">
              {user.image ? (
                <AvatarImage src={user.image} alt={user.name} />
              ) : null}

              <AvatarFallback className="bg-[#399B98] text-[11px] font-semibold text-white">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                {user.name}
              </p>

              <RoleBadge role={user.role} />
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="py-2">
          <MenuSection
            label="Main Menu"
            items={mainItems}
            pathname={pathname}
            role={user.role}
          />

          {preferenceItems.length > 0 ? (
            <MenuSection
              label="Preferences"
              items={preferenceItems}
              pathname={pathname}
              role={user.role}
            />
          ) : null}
        </SidebarContent>

        <SidebarFooter className="gap-1 border-t border-sidebar-border p-3">
          <button
            type="button"
            onClick={handleSignOut}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10"
          >
            <LogOut size={18} className="shrink-0" />

            <span className="truncate group-data-[collapsible=icon]:hidden">
              Sign Out
            </span>
          </button>

          <button
            type="button"
            onClick={toggleSidebar}
            aria-label={
              state === "collapsed" ? "Expand sidebar" : "Collapse sidebar"
            }
            className="hidden w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground md:flex"
          >
            {state === "collapsed" ? (
              <PanelLeftOpen size={18} className="shrink-0" />
            ) : (
              <PanelLeftClose size={18} className="shrink-0" />
            )}

            <span className="truncate group-data-[collapsible=icon]:hidden">
              Collapse
            </span>
          </button>
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  );
}

