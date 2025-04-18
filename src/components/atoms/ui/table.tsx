import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/atoms/ui/tooltip"

export function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      {/* Solo envolvemos al <table> en el provider, 
          así el wrapper <div> sigue idéntico al original */}
      <TooltipProvider delayDuration={2000}>
        <table
          data-slot="table"
          className={cn("w-full caption-bottom text-sm", className)}
          {...props}
        />
      </TooltipProvider>
    </div>
  )
}

export function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

export function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

export function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

export function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-selected-item-table border-b transition-colors",
        className
      )}
      {...props}
    />
  )
}

export function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-muted-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

export function TableCell({ className, children, ...props }: React.ComponentProps<"td">) {
  const spanRef = React.useRef<HTMLSpanElement>(null)
  const [isOverflow, setIsOverflow] = React.useState(false)

  const checkOverflow = React.useCallback(() => {
    const el = spanRef.current
    if (el) setIsOverflow(el.scrollWidth > el.clientWidth)
  }, [])

  React.useLayoutEffect(checkOverflow, [children, checkOverflow])

  React.useEffect(() => {
    const el = spanRef.current
    if (!el || typeof ResizeObserver === "undefined") return

    const ro = new ResizeObserver(checkOverflow)
    ro.observe(el)
    return () => ro.disconnect()
  }, [checkOverflow])

  const innerSpan = (
    <span
      ref={spanRef}
      className="truncate align-middle max-w-[250px]"
    >
      {children}
    </span>
  )

  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap truncate max-w-[250px] [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    >
      {isOverflow ? (
        <Tooltip>
          <TooltipTrigger asChild>{innerSpan}</TooltipTrigger>
          <TooltipContent side="top" align="center">
            {children}
          </TooltipContent>
        </Tooltip>
      ) : (
        innerSpan
      )}
    </td>
  )
}

export function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  )
}
