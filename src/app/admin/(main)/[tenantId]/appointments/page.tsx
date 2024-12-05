"use client"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  IconEdit,
  IconTrash,
  IconCheck,
  IconX,
} from "@tabler/icons-react"

// Temporary mock data
const appointments = [
  {
    id: 1,
    patientName: "John Doe",
    doctorName: "Dr. Rajesh Kumar",
    date: "2024-03-20",
    time: "10:00 AM",
    status: "Scheduled",
    type: "Regular Checkup",
  },
  {
    id: 2,
    patientName: "Jane Smith",
    doctorName: "Dr. Priya Sharma",
    date: "2024-03-20",
    time: "11:30 AM",
    status: "Completed",
    type: "Follow-up",
  },
]

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Appointments</h2>
        <p className="text-muted-foreground">
          View and manage patient appointments
        </p>
      </div>

      <div className="flex gap-4">
        <Button variant="outline">Today</Button>
        <Button variant="outline">Tomorrow</Button>
        <Button variant="outline">This Week</Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell className="font-medium">
                  {appointment.patientName}
                </TableCell>
                <TableCell>{appointment.doctorName}</TableCell>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>{appointment.type}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      appointment.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <IconCheck className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <IconX className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <IconEdit className="w-4 h-4" />
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
