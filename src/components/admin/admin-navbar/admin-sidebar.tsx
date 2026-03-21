'use client'

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, Users, Settings, HelpCircle, User,Bell,LogOut,  UserPlus, ChevronDown,
  Warehouse, BarChart3, ShoppingBag, Building2,
  Calculator,  Zap, Gift,
  Command, Car, Gauge
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

// Main navigation menu data
const navigationMenu: MenuItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    roles: ["SUPER_ADMIN", "ADMIN"],
    description: "Used-car KPIs, live alerts, and actions"
  },
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    roles: ["SUPER_ADMIN", "ADMIN"]
  },
  {
    label: "User Management",
    href: "/admin/user",
    icon: Users,
    roles: ["SUPER_ADMIN", "ADMIN"],
    permissions: ["users:read"]
  },
  {
    label: "Vehicle Listings",
    href: "/admin/product",
    icon: Car,
    description: "Certified vehicles, pricing, and readiness",
  },
  {
    label: "Inventory Lifecycle",
    href: "/admin/inventory",
    icon: Warehouse,
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    label: "Test Drives",
    href: "/admin/delivery",
    icon: Gauge,
    roles: ["SUPER_ADMIN", "ADMIN"]
  },
  {
    label: "Lead Pipeline",
    href: "/admin/order",
    icon: ShoppingBag,
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    label: "Pricing & Finance",
    href: "/admin/finance",
    icon: Calculator,
    roles: ["SUPER_ADMIN", "ADMIN"]
  },
  {
    label: "Vendor Network",
    href: "/admin/vendor",
    icon: Building2,
    roles: ["SUPER_ADMIN", "ADMIN"]
  },
  {
    label: "Employees",
    href: "/admin/employee",
    icon: UserPlus,
    roles: ["SUPER_ADMIN", "ADMIN"],
    permissions: ["employees:read"],
    
  },
  {
    label: "Marketing",
    href: "/admin/marketing",
    icon: Zap,
    roles: ["SUPER_ADMIN", "ADMIN"],
    children: [
      { label: "Coupons", href: "/admin/marketing/coupon", icon: Gift }
    ]
  },
 
  {
    label: "System",
    href: "/admin/system",
    icon: Settings,
    roles: ["SUPER_ADMIN", "ADMIN"],
    permissions: ["settings:read"]
  },
  {
    label: "Support",
    href: "/admin/support",
    icon: HelpCircle,
    roles: ["SUPER_ADMIN", "ADMIN"]
  }
]

// User profile menu
const userProfileData = {
  user: {
    name: "Admin User",
    email: "admin@dpbazaar.com",
    role: "Super Admin",
    avatar: "/avatars/admin.jpg"
  },
  menuItems: [
    { label: "Profile Settings", href: "/admin/profile", icon: User },
    { label: "Notifications", href: "/admin/notifications", icon: Bell, badge: "5" },
    { label: "Preferences", href: "/admin/preferences", icon: Settings },
    { label: "Sign Out", action: "logout", icon: LogOut }
  ]
}

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
  return (
    <Sidebar variant="inset" className=" border-r">
      <SidebarHeader className=" py-4">
        <SidebarMenu>
          <SidebarMenuItem className=" p-1 ">
            <SidebarMenuButton size="lg" asChild className="py-y ">
             
              <Link href="/admin">
                <div className="flex aspect-square size-8 items-center justify-center gap-4 bg-black rounded-lg ">
                  <Command className="size-4 text-white " />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight ">
                  <span className="truncate font-semibold">Velaire House</span>
                  <span className="truncate text-xs">Admin Console</span>
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
                    <span className="truncate font-semibold">{userProfileData.user.name}</span>
                    <span className="truncate text-xs">{userProfileData.user.email}</span>
                  </div>
                  <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {userProfileData.menuItems.map((item, index) => (
                    <SidebarMenuSubItem key={index}>
                      <SidebarMenuSubButton asChild>
                        {item.action === "logout" ? (
                          <button onClick={() => console.log("Logout")} className="w-full justify-start">
                            <item.icon className="h-4 w-4" />
                            <span>{item.label}</span>
                          </button>
                        ) : (
                          <Link href={item.href!}>
                            <item.icon className="h-4 w-4" />
                            <span>{item.label}</span>
                            {item.badge && <MenuBadge badge={item.badge} />}
                          </Link>
                        )}
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