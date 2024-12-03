"use client"

import { IconAlertTriangle, IconDatabaseOff, IconLoader2 } from "@tabler/icons-react"

interface StateComponentProps {
  message?: string
}

export function LoadingComponent({ message = "Loading..." }: StateComponentProps) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] w-full">
      <IconLoader2 className="w-10 h-10 animate-spin text-primary" />
      <p className="mt-4 text-lg text-muted-foreground">{message}</p>
    </div>
  )
}

export function ErrorComponent({ message = "Something went wrong" }: StateComponentProps) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] w-full">
      <IconAlertTriangle className="w-10 h-10 text-destructive" />
      <p className="mt-4 text-lg text-muted-foreground">{message}</p>
    </div>
  )
}

export function NoDataComponent({ message = "No data available" }: StateComponentProps) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] w-full">
      <IconDatabaseOff className="w-10 h-10 text-muted-foreground" />
      <p className="mt-4 text-lg text-muted-foreground">{message}</p>
    </div>
  )
}
