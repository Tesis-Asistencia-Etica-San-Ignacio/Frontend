// /src/components/atoms/ui/textarea.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoAdjust?: boolean
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, autoAdjust, ...props }, ref) => {
    const finalClass = cn(
      "border-border placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-transparent  flex min-h-16 w-full rounded-md border  px-3 py-2 text-base transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      autoAdjust ? "" : "resize-none", 
      className
    )

    return <textarea ref={ref} className={finalClass} {...props} />
  }
)

Textarea.displayName = "Textarea"
