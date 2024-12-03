"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IconBuilding, IconPlus } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

import React from 'react'
import { useGetAllHospitals } from "@/api/hospitals/use-get-all-hospitals"

const SuperAdminDashboard = () => {
    const { data: hospitalsResponse, isLoading, isError } = useGetAllHospitals()
    const hospitals = hospitalsResponse?.data || []
  
    if (isLoading) {
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
              <Button className="flex items-center gap-2" disabled>
                <IconPlus className="w-4 h-4" />
                Add Organization
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="hover:bg-muted/50 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                    <IconBuilding className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-muted animate-pulse rounded" />
                      <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                    </div>
                    <div className="flex gap-4 mt-4">
                      <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                      <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )
    }
  
    if (isError) {
      return (
        <div className="flex items-center justify-center min-h-[400px] text-destructive">
          Error loading hospitals. Please try again later.
        </div>
      )
    }
  
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
            <Link href="/admin/hospitals/create">
              <Button className="flex items-center gap-2">
                <IconPlus className="w-4 h-4" />
                Add Organization
              </Button>
            </Link>
          </div>
  
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {hospitals.map((hospital) => (
              <Link href={`/admin/${hospital.tenantId}?hospitalId=${hospital.id}`} key={hospital.id}>
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="font-medium">{hospital.hospitalName}</CardTitle>
                    <IconBuilding className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground mb-4">
                      {hospital.hospitalAddress}
                    </div>
                    <div className="flex gap-4 text-sm">
                      <div>
                        <span className="font-medium">{hospital.contactNumber}</span>
                      </div>
                      <div>
                        <span className="font-medium text-muted-foreground">{hospital.tenantId}</span>
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

export default SuperAdminDashboard