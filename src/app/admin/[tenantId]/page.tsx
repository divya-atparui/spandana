"use client"

// import { AdminBreadcrumb } from "@/components/admin/breadcrumb"
import {
  IconCalendar,
  IconStethoscope,
  IconUsers,
  IconBuildingHospital,
  IconArrowUp,
  IconArrowDown,
} from "@tabler/icons-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { cn } from "@/lib/utils"

// Mock data for the dashboard
const stats = [
  {
    name: "Total Appointments",
    value: "245",
    icon: IconCalendar,
    change: "+4.75%",
    changeType: "increase",
    trend: IconArrowUp,
  },
  {
    name: "Active Doctors",
    value: "12",
    icon: IconStethoscope,
    change: "0%",
    changeType: "neutral",
    trend: IconArrowUp,
  },
  {
    name: "Total Patients",
    value: "573",
    icon: IconUsers,
    change: "+12.5%",
    changeType: "increase",
    trend: IconArrowUp,
  },
  {
    name: "Departments",
    value: "8",
    icon: IconBuildingHospital,
    change: "-2.5%",
    changeType: "decrease",
    trend: IconArrowDown,
  },
]

// Mock data for the chart
const appointmentData = [
  { name: "Jan", appointments: 65 },
  { name: "Feb", appointments: 59 },
  { name: "Mar", appointments: 80 },
  { name: "Apr", appointments: 81 },
  { name: "May", appointments: 56 },
  { name: "Jun", appointments: 55 },
  { name: "Jul", appointments: 40 },
]

export default function TenantDashboard() {
  return (
    <div className="space-y-6">
      {/* <AdminBreadcrumb /> */}
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          const Trend = stat.trend
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
                <div className="flex items-center text-xs">
                  <Trend
                    className={cn("h-4 w-4 mr-1", {
                      "text-green-500": stat.changeType === "increase",
                      "text-red-500": stat.changeType === "decrease",
                      "text-gray-500": stat.changeType === "neutral",
                    })}
                  />
                  <span
                    className={cn({
                      "text-green-500": stat.changeType === "increase",
                      "text-red-500": stat.changeType === "decrease",
                      "text-gray-500": stat.changeType === "neutral",
                    })}
                  >
                    {stat.change} from last month
                  </span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appointments Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={appointmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="appointments"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}