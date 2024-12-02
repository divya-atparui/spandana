"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IconBuilding, IconPlus } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import IndividualOrgDashboard from '@/components/admin/individual-org-dashboard'
import React from 'react'

// Mock data for organizations
const organizations = [
  {
    id: "spandana-main",
    name: "Spandana Main Hospital",
    location: "Hyderabad",
    doctors: 12,
    patients: 573,
  },
  {
    id: "spandana-branch1",
    name: "Spandana Branch - Secunderabad",
    location: "Secunderabad",
    doctors: 8,
    patients: 342,
  },
  {
    id: "spandana-branch2",
    name: "Spandana Branch - Kukatpally",
    location: "Kukatpally",
    doctors: 6,
    patients: 245,
  },
]

const OrgDashboardPage = () => {
  return (
    <div>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Organizations</h2>
            <p className="text-muted-foreground">
              Manage all your hospital branches
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <IconPlus className="w-4 h-4" />
            Add Organization
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {organizations.map((org) => (
            <Link href={`/admin/${org.id}`} key={org.id}>
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="font-medium">{org.name}</CardTitle>
                  <IconBuilding className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground mb-4">
                    {org.location}
                  </div>
                  <div className="flex gap-4 text-sm">
                    <div>
                      <span className="font-medium">{org.doctors}</span> Doctors
                    </div>
                    <div>
                      <span className="font-medium">{org.patients}</span> Patients
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      
    </div>
  )
}

export default OrgDashboardPage