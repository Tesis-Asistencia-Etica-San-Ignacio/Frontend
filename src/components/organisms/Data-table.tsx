import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  useReactTable,
  TableOptions,
  FilterFn,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../atoms/ui/table"

import { DataTablePagination } from "../molecules/table/Data-table-pagination"
import { DataTableToolbar } from "../molecules/table/Data-table-toolbar"

/**
 * Props de la tabla.
 * columns: definición de columnas.
 * data: arreglo de filas.
 * tableMeta, globalFilterFn: props opcionales para personalizar.
 * onRowClick: callback cuando se hace click en una fila.
 * selectedRowId: (opcional) id de la fila seleccionada.
 */
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  tableMeta?: TableOptions<TData>["meta"]
  globalFilterFn?: FilterFn<TData>
  onRowClick?: (rowData: TData) => void
  selectedRowId?: string
}

/**
 * DataTable: crea la instancia de la tabla y la renderiza.
 */
export function DataTable<TData, TValue>({
  columns,
  data,
  tableMeta,
  globalFilterFn,
  onRowClick,
  selectedRowId,
}: DataTableProps<TData, TValue>) {
  // 1) Estados internos para la tabla.
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = React.useState("")

  // 2) Crear la instancia de la tabla con useReactTable.
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
    },
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    enableRowSelection: true,
    globalFilterFn: globalFilterFn,
    meta: tableMeta,
  })

  // 3) Verificar si existe la columna "select" (checkbox de selección).
  const hasSelectionColumn = columns.some((col) => col.id === "select")

  // 4) Render: Toolbar, tabla y paginación.
  return (
    <div className="space-y-4">
      {/* Toolbar: búsqueda global, filtros, etc. */}
      <DataTableToolbar table={table} />
      <div className="rounded-md border">
        <Table>
          {/* Header */}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          {/* Body */}
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                const isSelected = row.getIsSelected()
                return (
                  <TableRow
                    key={row.id}
                    // Al hacer clic:
                    // - Si existe columna "select": alterna selección múltiple.
                    // - Sino: fuerza selección única.
                    onClick={() => {
                      if (hasSelectionColumn) {
                        row.toggleSelected(!isSelected)
                      } else {
                        table.setRowSelection({ [row.id]: true })
                      }
                      if (onRowClick) {
                        onRowClick(row.original)
                      }
                    }}
                    // Resalta la fila si está seleccionada.
                    className={`cursor-pointer transition-colors duration-200 hover:bg-gray-100 ${isSelected ? "bg-blue-50" : ""}`}
                    data-state={isSelected && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })
            ) : (
              // Si no hay filas.
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Paginación */}
      <DataTablePagination table={table} />
    </div>
  )
}
