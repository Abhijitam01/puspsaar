'use client'

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import {
  LayoutDashboard, ShoppingCart,Users,Truck, Settings, HelpCircle, User,Bell,LogOut,  UserPlus, ChevronDown,
  Warehouse, BarChart3, ShoppingBag, Building2,
  Calculator,  Zap, Gift,
  Command
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Types for menu structure
interface MenuItem {
  label: string
  href?: string
  icon: React.ElementType
  badge?: string | number
  urgent?: boolean
  roles?: string[]
  permissions?: string[]
  description?: string
  children?: MenuItem[]
  subItems?: SubMenuItem[]
}

interface SubMenuItem {
  label: string
  href: string
  icon?: React.ElementType
  count?: string
  badge?: string
  urgent?: boolean
}

// Badge component for menu items
function MenuBadge({ badge, urgent }: { badge?: string | number; urgent?: boolean }) {
  if (!badge) return null
  
  return (
    <Badge 
      variant={urgent ? "destructive" : "secondary"} 
      className={cn(
        "ml-auto text-xs",
        urgent && "bg-red-100 text-red-800 animate-pulse"
      )}
    >
      {badge}
    </Badge>
  )
}

const navigationMenu: MenuItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    roles: ["SUPER_ADMIN", "ADMIN"],
    description: "Overview of sales, inventory, and business metrics"
  },
  {
    label: "Orders",
    href: "/admin/order",
    icon: ShoppingBag,
    roles: ["SUPER_ADMIN", "ADMIN"],
    badge: "live"
  },
  {
    label: "Products",
    href: "/admin/product",
    icon: ShoppingCart,
  },
  {
    label: "Inventory",
    href: "/admin/inventory",
    icon: Warehouse,
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    label: "Site Settings",
    href: "/admin/settings",
    icon: Settings,
    roles: ["SUPER_ADMIN", "ADMIN"],
  }
]

const profileMenuItems = [
  { label: "Sign Out", action: "logout", icon: LogOut }
]

// Recursive menu item component
function MenuItemComponent({ item, level = 0 }: { item: MenuItem; level?: number }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)
  const hasChildren = item.children && item.children.length > 0
  const hasSubItems = item.subItems && item.subItems.length > 0
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

  React.useEffect(() => {
    if (isActive && hasChildren) {
      setIsOpen(true)
    }
  }, [isActive, hasChildren])

  if (hasChildren) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              className={cn(
                "w-full",
                isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
              <MenuBadge badge={item.badge} urgent={item.urgent} />
              <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.children?.map((child, index) => (
                <MenuItemComponent key={index} item={child} level={level + 1} />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    )
  }

  if (hasSubItems) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              className={cn(
                "w-full",
                isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
              <MenuBadge badge={item.badge} urgent={item.urgent} />
              <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.subItems?.map((subItem, index) => (
                <SidebarMenuSubItem key={index}>
                  <SidebarMenuSubButton asChild>
                    <Link href={subItem.href} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {subItem.icon && <subItem.icon className="h-3 w-3" />}
                        <span>{subItem.label}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {subItem.count && (
                          <span className="text-xs text-muted-foreground">({subItem.count})</span>
                        )}
                        <MenuBadge badge={subItem.badge} urgent={subItem.urgent} />
                      </div>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    )
  }

  const MenuContent = (
    <>
      <item.icon className="h-4 w-4" />
      <span>{item.label}</span>
      <MenuBadge badge={item.badge} urgent={item.urgent} />
    </>
  )

  if (level > 0) {
    return (
      <SidebarMenuSubItem>
        <SidebarMenuSubButton asChild>
          <Link href={item.href!} className={cn(isActive && "bg-sidebar-accent text-sidebar-accent-foreground")}>
            {MenuContent}
          </Link>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    )
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link href={item.href!} className={cn(isActive && "bg-sidebar-accent text-sidebar-accent-foreground")}>
          {MenuContent}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export function AdminSidebarModern() {
  const { data: session } = useSession()
  const adminName = session?.user?.name ?? 'Admin'
  const adminEmail = session?.user?.email ?? ''

  return (
    <Sidebar variant="inset" className=" border-r">
      <SidebarHeader className=" py-4">
        <SidebarMenu>
          <SidebarMenuItem className=" p-1 ">
            <SidebarMenuButton size="lg" asChild className="py-y ">
             
              <Link href="/admin">
                <div className="flex aspect-square size-8 items-center justify-center gap-4 bg-[#C6A969] rounded-lg ">
                  <span className="text-black font-bold text-lg" style={{ fontFamily: 'Georgia, serif' }}>P</span>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight ">
                  <span className="truncate font-semibold" style={{ fontFamily: 'Georgia, serif' }}>Puspsaar</span>
                  <span className="truncate text-xs text-muted-foreground">Admin Portal</span>
                </div>
              </Link>
              
            </SidebarMenuButton>
            
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
         
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationMenu.map((item, index) => (
                <MenuItemComponent key={index} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Collapsible className="group/collapsible">
              <CollapsibleTrigger asChild>
                <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <User className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{adminName}</span>
                    <span className="truncate text-xs">{adminEmail}</span>
                  </div>
                  <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {profileMenuItems.map((item, index) => (
                    <SidebarMenuSubItem key={index}>
                      <SidebarMenuSubButton asChild>
                        <button
                          onClick={() => signOut({ callbackUrl: '/admin/login' })}
                          className="w-full justify-start"
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </button>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  )
}