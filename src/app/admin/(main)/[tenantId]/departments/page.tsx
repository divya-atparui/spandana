"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { IconEdit, IconTrash, IconPlus, IconUsers } from "@tabler/icons-react"

// Temporary mock data
const departments = [
  {
    id: 1,
    name: "Cardiology",
    head: "Dr. Rajesh Kumar",
    doctors: 5,
    description:
      "Specializes in diagnosing and treating heart diseases and conditions",
  },
  {
    id: 2,
    name: "Pediatrics",
    head: "Dr. Priya Sharma",
    doctors: 4,
    description: "Provides medical care for infants, children, and adolescents",
  },
  {
    id: 3,
    name: "Orthopedics",
    head: "Dr. Suresh Patel",
    doctors: 3,
    description:
      "Focuses on injuries and diseases of the musculoskeletal system",
  },
]

export default function DepartmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Departments</h2>
          <p className="text-muted-foreground">
            Manage hospital departments and their staff
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <IconPlus className="w-4 h-4" />
          Add Department
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {departments.map((department) => (
          <Card key={department.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle>{department.name}</CardTitle>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <IconEdit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <IconTrash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>Head: {department.head}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{department.description}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <IconUsers className="w-4 h-4 mr-2" />
                {department.doctors} Doctors
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
