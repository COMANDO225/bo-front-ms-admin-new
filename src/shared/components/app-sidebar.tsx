import type { ComponentProps } from "react"

import { NavMain } from "@/shared/components/nav-main"
import { NavUser } from "@/shared/components/nav-user"
import { TeamSwitcher } from "@/shared/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/shared/components/ui/sidebar"
import { menuItems } from "../data/menu-items"
import { cuentasData } from "../data/cuentas"
import { userData } from "../data/user"

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher cuentas={cuentasData} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menuItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
