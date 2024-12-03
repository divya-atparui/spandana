"use client"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import {
  IconCalendar,
  IconDashboard,
  IconStethoscope,
  IconBuildingHospital,
  IconSettings,
  IconBuilding,
} from "@tabler/icons-react"
import { cn } from "@/lib/utils"

// Navigation for the main admin dashboard
const mainNavigation = [
  { name: "Organizations", href: "/admin", icon: IconBuilding },
  { name: "Settings", href: "/admin/settings", icon: IconSettings },
]

// Navigation for tenant-specific pages
const tenantNavigation = [
  { name: "Dashboard", href: "", icon: IconDashboard }, // Empty href for root
  { name: "Doctors", href: "/doctors", icon: IconStethoscope },
  { name: "Appointments", href: "/appointments", icon: IconCalendar },
  { name: "Departments", href: "/departments", icon: IconBuildingHospital },
  { name: "Settings", href: "/settings", icon: IconSettings },
]

export function SideNav() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  // Check if we're in a tenant context
  const tenantId = pathname.split('/')[2]
  const hospitalId = searchParams.get('hospitalId')
  const isInTenantContext = pathname.startsWith('/admin/') && tenantId && tenantId !== 'settings'
  
  // Choose which navigation to show
  const navigation = isInTenantContext
    ? tenantNavigation.map(item => ({
        ...item,
        // For dashboard (empty href), just use the tenant root path
        href: `/admin/${tenantId}${item.href}${hospitalId ? `?hospitalId=${hospitalId}` : ''}`,
      }))
    : mainNavigation

  return (
    <nav className="flex flex-col w-64 min-h-[90vh] p-4 border-r">
      <div className="space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = isInTenantContext
            ? pathname === item.href || // Exact match
              (item.href === `/admin/${tenantId}` && pathname === `/admin/${tenantId}`) || // Dashboard
              (item.href !== `/admin/${tenantId}` && pathname.startsWith(item.href)) // Other pages
            : pathname === item.href
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-2 text-sm font-medium rounded-md",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
