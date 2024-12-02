"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { IconChevronRight } from "@tabler/icons-react"

// Mock data for organizations (this should match your admin page data)
const organizations = {
  "spandana-main": "Spandana Main Hospital",
  "spandana-branch1": "Spandana Branch - Secunderabad",
  "spandana-branch2": "Spandana Branch - Kukatpally",
}

const routeNames: Record<string, string> = {
  doctors: "Doctors",
  appointments: "Appointments",
  departments: "Departments",
  settings: "Settings",
}

export function AdminBreadcrumb() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  // Don't show breadcrumbs on the main admin page
  if (segments.length <= 1) return null

  const breadcrumbs = segments.map((segment, index) => {
    const isLast = index === segments.length - 1
    let href = `/${segments.slice(0, index + 1).join('/')}`
    let name = segment

    // Handle organization names
    if (index === 1 && organizations[segment]) {
      name = organizations[segment]
    }
    // Handle route names
    else if (routeNames[segment]) {
      name = routeNames[segment]
    }
    // Handle other cases
    else {
      name = name.charAt(0).toUpperCase() + name.slice(1)
    }

    return (
      <div key={href} className="flex items-center">
        {index > 0 && (
          <IconChevronRight className="w-4 h-4 mx-2 text-muted-foreground" />
        )}
        {!isLast ? (
          <Link
            href={href}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            {name}
          </Link>
        ) : (
          <span className="text-sm font-medium">{name}</span>
        )}
      </div>
    )
  })

  return (
    <div className="flex items-center py-4">
      {breadcrumbs}
    </div>
  )
}
