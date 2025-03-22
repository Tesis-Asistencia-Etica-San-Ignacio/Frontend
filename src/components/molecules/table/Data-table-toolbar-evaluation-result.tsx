"use client"

import { Table } from "@tanstack/react-table"
import { X } from "lucide-react"

import { Button } from "../../atoms/ui/button"
import { Input } from "../../atoms/ui/input"
import { DataTableViewOptions } from "./Data-table-view-options"

import { priorities } from "../../screens/dataForTableExample/data"
import { DataTableFacetedFilter } from "./Data-table-faceted-filter"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

const statusOptions = [
    { label: "Aprobado", value: "Aprobado" },
    { label: "No aprobado", value: "No aprobado" },
  ]

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Buscar..."
          value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("id")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
          column={table.getColumn("status")}
          title="Estado"
          options={statusOptions}
        />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
