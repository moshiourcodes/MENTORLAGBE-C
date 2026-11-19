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
import { Plus } from "lucide-react"

const menuItemByRole = {
    student:[

    ],
    tutor:[

    ],
    admin:[

    ]
}

export function DashboardSidebar() {
    const {data:session,isPending}= useSession();
    const role = session?.user.role || 'student';
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup>
                <SidebarMenu>
  {
//   menuItemByRole[role].map((project) => (
//     <SidebarMenuItem key={project.name}>
//       <SidebarMenuButton render={<a href={project.url} />}>
//         <project.icon />
//         <span>{project.name}</span>
//       </SidebarMenuButton>
//     </SidebarMenuItem>
//   ))
  }
</SidebarMenu>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
