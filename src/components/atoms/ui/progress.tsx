import React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  isError?: boolean
}

export function Progress({ value = 0, isError, className, ...props }: ProgressProps) {
  // Aseguramos que el valor esté entre 0 y 100
  const clamped = Math.min(Math.max(value, 0), 100)

  const progressColor = isError
    ? "bg-red-500"
    : clamped === 100
      ? "bg-green-500"
      : "bg-blue-500"

  return (
    <div className={cn("relative h-2 w-full rounded bg-gray-200", className)} {...props}>
      <div
        className={cn("absolute left-0 top-0 h-full rounded transition-all duration-300", progressColor)}
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}
