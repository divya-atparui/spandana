"use client"

import {
  IconCalendar,
  IconStethoscope,
  IconUsers,
  IconBuildingHospital,
} from "@tabler/icons-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for a single organization
const mockOrgData = {
  id: "spandana-main",
  name: "Spandana Main Hospital",
  stats: [
    {
      name: "Total Appointments",
      value: "245",
      icon: IconCalendar,
      change: "+4.75%",
      changeType: "positive",
    },
    {
      name: "Active Doctors",
      value: "12",
      icon: IconStethoscope,
      change: "0%",
      changeType: "neutral",
    },
    {
      name: "Total Patients",
      value: "573",
      icon: IconUsers,
      change: "+12.5%",
      changeType: "positive",
    },
    {
      name: "Departments",
      value: "8",
      icon: IconBuildingHospital,
      change: "+1",
      changeType: "positive",
    },
  ],
}

export default function IndividualOrgDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{mockOrgData.name}</h2>
        <p className="text-muted-foreground">
          Overview of your hospital's performance
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mockOrgData.stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.name}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p
                  className={`text-xs ${
                    stat.changeType === "positive"
                      ? "text-green-500"
                      : stat.changeType === "negative"
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}