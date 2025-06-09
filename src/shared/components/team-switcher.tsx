import * as React from "react"
import { ChevronsUpDown } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/shared/components/ui/sidebar"
import type { Cuenta } from "../data/menu"
import { firstLetter } from "../utils/formatters"

export function TeamSwitcher({ cuentas }: { cuentas: Cuenta[] }) {
  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = React.useState(cuentas[0])

  if (!activeTeam) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center">
                <img
                  src="/images/logo_dinet.png"
                  alt="Dinet Logo"
                  className="w-full h-full object-cover"
                  draggable={false}
                  loading="lazy"
                />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-bold text-secondary">
                  EMS-Dinet
                </span>
                <span className="truncate text-xs">{activeTeam.nombre}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-40 max-w-48 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Cuentas
            </DropdownMenuLabel>
            {cuentas.map((cuenta) => (
              <DropdownMenuItem
                key={cuenta.nombre}
                onClick={() => setActiveTeam(cuenta)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center text-base justify-center rounded-full border">
                  <span className="mt-[-3px] text-black/70 font-medium dark:text-white/70">
                    {firstLetter(cuenta.nombre) || "?"}
                  </span>
                </div>
                {cuenta.nombre}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
