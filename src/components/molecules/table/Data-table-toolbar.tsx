import { Table } from "@tanstack/react-table"
import { X } from "lucide-react"

import { Button } from "../../atoms/ui/button"
import { Input } from "../../atoms/ui/input-form"
import { DataTableViewOptions } from "./Data-table-view-options"
import { DataTableFacetedFilter } from "./Data-table-faceted-filter"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getState().columnFilters.length > 0 ||
    !!table.getState().globalFilter

  // Valor actual del globalFilter
  const globalFilterValue = table.getState().globalFilter

  // Columns que tienen "items" => generamos facetedFilter
  const facetedColumns = table
    .getAllLeafColumns()
    .filter((col) => {
      const def = col.columnDef
      // Si la col tiene def.items => lo usamos
      return Array.isArray((def as any).items)
    })

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        {/* Input => globalFilter */}
        <Input
          placeholder="Buscar..."
          value={String(globalFilterValue || "")}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {/* Facet filters dinámicos */}
        <div className='flex gap-x-2'>
          {facetedColumns.map((col) => {
            const items = (col.columnDef as any).items
            return (
              <DataTableFacetedFilter
                key={col.id}
                column={col}
                title={String(col.id).charAt(0).toUpperCase() + String(col.id).slice(1).toLowerCase()}
                options={items}
              />
            )
          })}
        </div>

        {/* Botón reset si hay algo filtrado */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetGlobalFilter()
              table.resetColumnFilters()
            }}
            className="h-8 px-2 lg:px-3"
          >
            Borrar filtros
            <X />
          </Button>
        )}
      </div>
      {/* Opcional: view options */}
      <DataTableViewOptions table={table} />
    </div>
  )
}
