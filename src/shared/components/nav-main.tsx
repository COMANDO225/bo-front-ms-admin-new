import * as React from "react"
import { ChevronRight } from "lucide-react"
import { Link, useLocation } from "@tanstack/react-router"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/shared/components/ui/sidebar"
import { type MenuItem } from "@/shared/data/menu-items"
import { cn } from "../lib/utils"

interface NavMainProps {
  items: MenuItem[]
}

export function NavMain({ items }: NavMainProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        <div className="">
          Menú
        </div>
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

function NavItem({ item }: { item: MenuItem }) {
  const location = useLocation()
  const hasChildren = item.items && item.items.length > 0

  // Verificar si algún hijo está activo
  const isChildActive = React.useMemo(() => {
    if (!hasChildren) return false

    const checkActive = (items: MenuItem[]): boolean => {
      return items.some(child => {
        if (child.url && location.pathname === child.url) return true
        if (child.items) return checkActive(child.items)
        return false
      })
    }

    return checkActive(item.items!)
  }, [hasChildren, item.items, location.pathname])

  const isActive = (item.url ? location.pathname === item.url : false) || isChildActive
  const shouldOpen = isActive || isChildActive

  // Si no tiene hijos, renderizar como link simple
  if (!hasChildren) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={isActive}>
          <Link to={item.url || "#"}>
            {item.icon && <item.icon className="h-4 w-4" />}
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  // Si tiene hijos, renderizar como collapsible
  return (
    <SidebarMenuItem>
      <Collapsible
        defaultOpen={shouldOpen}
        className="group/collapsible"
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            tooltip={item.title}
            isActive={isActive}
            className={cn(
              "[&[data-state=open]>svg:last-child]:rotate-90 h-10",
              "group-data-[state=open]/collapsible:sticky"
            )}
          >
            {item.icon && <item.icon className="h-4 w-4" />}
            <span>{item.title}</span>
            <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <NavSubItems items={item.items ?? []} />
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  )
}

function NavSubItems({ items }: { items: MenuItem[] }) {
  return (
    <SidebarMenuSub>
      {items.map((item) => (
        <NavSubItem key={item.title} item={item} />
      ))}
    </SidebarMenuSub>
  )
}

function NavSubItem({ item }: { item: MenuItem }) {
  const location = useLocation()
  const hasChildren = item.items && item.items.length > 0

  // Verificar si algún hijo está activo
  const isChildActive = React.useMemo(() => {
    if (!hasChildren) return false

    const checkActive = (items: MenuItem[]): boolean => {
      return items.some(child => {
        if (child.url && location.pathname === child.url) return true
        if (child.items) return checkActive(child.items)
        return false
      })
    }

    return checkActive(item.items!)
  }, [hasChildren, item.items, location.pathname])

  const isActive = (item.url ? location.pathname === item.url : false) || isChildActive
  const shouldOpen = isActive || isChildActive

  // Si no tiene hijos, renderizar como link simple
  if (!hasChildren) {
    return (
      <SidebarMenuSubItem>
        <SidebarMenuSubButton asChild isActive={isActive}>
          <Link to={item.url || "#"}>
            {item.icon && <item.icon className="h-3 w-3" />}
            <span>{item.title}</span>
          </Link>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    )
  }

  // Si tiene hijos, renderizar como collapsible anidado
  return (
    <SidebarMenuSubItem>
      <Collapsible defaultOpen={shouldOpen}>
        <CollapsibleTrigger asChild>
          <SidebarMenuSubButton
            isActive={isActive}
            className="[&[data-state=open]>svg:last-child]:rotate-90"
          >
            {item.icon && <item.icon className="mr-2 h-3 w-3" />}
            <span>{item.title}</span>
            <ChevronRight className="ml-auto h-3 w-3 transition-transform duration-200" />
          </SidebarMenuSubButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <NavSubItems items={item.items ?? []} />
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuSubItem>
  )
}