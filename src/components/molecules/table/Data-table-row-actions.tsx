import React from "react"
import { Row } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/atoms/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/atoms/ui/dropdown-menu"

type RadioGroupConfig = {
  name: string
  valueKey: string            // p.e. "label"
  options: { value: string; label: string }[]
}

type ActionItem = {
  label: string
  shortcut?: string
  onClick?: (rowData: any) => void
  subMenu?: {
    radioGroup?: RadioGroupConfig
  }[]
}

interface DataTableRowActionsProps<TData> {
  readonly row: Row<TData>
  readonly actionItems?: ReadonlyArray<ActionItem>
}

export function DataTableRowActions<TData>({
  row,
  actionItems = [],
}: DataTableRowActionsProps<TData>) {
  // Si no hay items, no se muestra nada
  if (!actionItems.length) {
    return null
  }

  const rowData = row.original

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[160px]">
        {actionItems.map((action, idx) => {
          // Si tiene subMenu
          if (action.subMenu && action.subMenu.length > 0) {
            return (
              <React.Fragment key={idx}>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    {action.label}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {action.subMenu.map((sub, sIdx) => {
                      if (sub.radioGroup) {
                        // Ejemplo: sub.radioGroup => { name, valueKey, options[] }
                        const currentValue = (rowData as any)[sub.radioGroup.valueKey]
                        return (
                          <DropdownMenuRadioGroup
                            key={sIdx}
                            value={currentValue}
                          >
                            {sub.radioGroup.options.map((opt) => (
                              <DropdownMenuRadioItem 
                                key={opt.value} 
                                value={opt.value}
                                onSelect={() => {
                                  // Lógica de click en cada radio
                                  console.log(`Selected ${opt.value} for ${sub.radioGroup?.name}`)
                                }}
                              >
                                {opt.label}
                              </DropdownMenuRadioItem>
                            ))}
                          </DropdownMenuRadioGroup>
                        )
                      }
                      // Caso sub-ítems “normales”, si quisieras
                      return (
                        <DropdownMenuItem key={sIdx}>
                          {action.label} sub item
                        </DropdownMenuItem>
                      )
                    })}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
              </React.Fragment>
            )
          }
          // Item normal (sin subMenu)
          return (
            <DropdownMenuItem
              key={idx}
              onClick={() => {
                if (action.onClick) {
                  action.onClick(rowData)
                }
              }}
            >
              {action.label}
              {action.shortcut && (
                <DropdownMenuShortcut>{action.shortcut}</DropdownMenuShortcut>
              )}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
