"use client"

import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IconUser, IconChevronLeft } from "@tabler/icons-react"
import Link from "next/link"

// Mock data for organizations (this should match your admin page data)
const organizations = {
  "spandana-main": "Spandana Main Hospital",
  "spandana-branch1": "Spandana Branch - Secunderabad",
  "spandana-branch2": "Spandana Branch - Kukatpally",
}

export function TopNav() {
  const pathname = usePathname()
  const tenantId = pathname.split('/')[2]
  const isInTenantContext = pathname.startsWith('/admin/') && tenantId && tenantId !== 'settings'
  const orgName = isInTenantContext ? organizations[tenantId as keyof typeof organizations] : null

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex-1 flex items-center gap-4">
          {isInTenantContext && (
            <Link href="/admin">
              <Button variant="ghost" size="icon">
                <IconChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
          )}
          <h1 className="text-xl font-semibold">
            {isInTenantContext ? orgName : "Spandana Admin"}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <IconUser className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
