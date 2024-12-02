"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { IconEdit, IconTrash, IconPlus } from "@tabler/icons-react"

// Temporary mock data
const doctors = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    specialization: "Cardiology",
    experience: "15 years",
    availability: "Mon, Wed, Fri",
    status: "Active",
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    specialization: "Pediatrics",
    experience: "10 years",
    availability: "Tue, Thu, Sat",
    status: "Active",
  },
]

export default function DoctorsPage() {
  const [selectedDoctor, setSelectedDoctor] = useState(null)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Doctors</h2>
          <p className="text-muted-foreground">
            Manage hospital doctors and their schedules
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <IconPlus className="w-4 h-4" />
          Add Doctor
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell className="font-medium">{doctor.name}</TableCell>
                <TableCell>{doctor.specialization}</TableCell>
                <TableCell>{doctor.experience}</TableCell>
                <TableCell>{doctor.availability}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {doctor.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <IconEdit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <IconTrash className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
