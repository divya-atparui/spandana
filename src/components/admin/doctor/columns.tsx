"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react"

export const columns: ColumnDef<Doctor>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => `${row.original.firstName} ${row.original.lastName}`,
  },
  {
    accessorKey: "specialty",
    header: "Specialty",
  },
  {
    accessorKey: "experienceYears",
    header: "Experience",
    cell: ({ row }) => `${row.original.experienceYears} years`,
  },
  {
    accessorKey: "contact",
    header: "Contact Info",
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original.email}</div>
        <div className="text-sm text-muted-foreground">
          {row.original.contactNumber}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "departments",
    header: "Department",
    cell: ({ row }) => row.original.departments.map(d => d.departmentName).join(", "),
  },
  {
    accessorKey: "profileStatus",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.profileStatus ? "success" : "secondary"}>
        {row.original.profileStatus ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const doctor = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <IconDotsVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(doctor.id.toString())}
            >
              Copy doctor ID
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconEdit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <IconTrash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]