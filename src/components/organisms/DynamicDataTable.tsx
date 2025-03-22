"use client"

import React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "./Data-table"
import { Checkbox } from "@/components/atoms/ui/checkbox"
import { Badge } from "@/components/atoms/ui/badge"
import { DataTableRowActions } from "@/components/molecules/table/Data-table-row-actions"
import { DataTableColumnHeader } from "@/components/molecules/table/Data-table-column-header"
import { ColumnConfig } from "@/types/table"


interface DynamicDataTableProps<TData extends object> {
    columnsConfig: ColumnConfig[]
    data: TData[]
}

// ---------------------------
// El componente principal
// ---------------------------
export function DynamicDataTable<TData extends object>({
    columnsConfig,
    data,
}: DynamicDataTableProps<TData>) {
    // 1) Determinar llaves que no tienen config para “adivinarlas”
    const dataKeys = Object.keys(data?.[0] || {})
    const alreadyDefined = columnsConfig.map((c) => c.accessorKey).filter(Boolean)
    const missingKeys = dataKeys.filter((key) => !alreadyDefined.includes(key))

    // 2) Convertir columnsConfig => array de ColumnDef
    const mainColumnDefs: ColumnDef<TData>[] = columnsConfig.map((col) => {
        // Columna de selección
        if (col.type === "selection") {
            return {
                id: col.id,
                header: ({ table }) => (
                    <Checkbox
                        checked={
                            table.getIsAllPageRowsSelected() ||
                            (table.getIsSomePageRowsSelected() && "indeterminate")
                        }
                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all"
                        className="translate-y-[2px]"
                    />
                ),
                cell: ({ row }) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                        className="translate-y-[2px]"
                    />
                ),
                enableSorting: false,
                enableHiding: false,
            }
        }

        // Columna de acciones
        if (col.type === "actions") {
            return {
                id: col.id,
                
                cell: ({ row }) => (
                    <DataTableRowActions
                        row={row}
                        actionItems={col.actionItems ?? []}
                    />
                ),
                enableSorting: false,
                enableHiding: false,
            }
        }

        // Columna “normal”
        const accessorKey = col.accessorKey ?? col.id
        return {
            id: col.id,
            accessorKey,
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={col.headerLabel || col.id} />
            ),
            // (Z) Si la columna es "title" (o la que sea un array),
            // define un filterFn que busque coincidencias en item.text
            filterFn: (row, id, filterValue) => {
                const rawValue = row.getValue(id)
                // Si es array (badgeWithText), buscamos coincidencia en .text
                if (Array.isArray(rawValue)) {
                    return rawValue.some((item) =>
                        String(item?.text ?? "")
                            .toLowerCase()
                            .includes(String(filterValue ?? "").toLowerCase())
                    )
                }
                // Si es string u otro tipo, busca coincidencia simple
                return String(rawValue ?? "")
                    .toLowerCase()
                    .includes(String(filterValue ?? "").toLowerCase())
            },
            cell: ({ row }) => {
                const value = row.getValue(accessorKey)

                // (A) “badgeWithText”
                if (col.renderType === "badgeWithText") {
                    if (Array.isArray(value)) {
                        return (
                            <div className="flex space-x-2">
                                {value.map((item: any, i: number) => (
                                    <React.Fragment key={i}>
                                        {item[col.badgeKey ?? "label"] && (
                                            <Badge className="whitespace-nowrap" variant="outline">
                                                {item[col.badgeKey ?? "label"]}
                                            </Badge>
                                        )}
                                        <span className="max-w-[500px] truncate font-medium">
                                            {item[col.textKey ?? "text"]}
                                        </span>
                                    </React.Fragment>
                                ))}
                            </div>
                        )
                    }
                    return <span>{String(value ?? "")}</span>
                }

                // (B) items: para valores con iconos/labels
                if (col.items && Array.isArray(col.items)) {
                    const found = col.items.find((it) => it.value === value)
                    if (!found) {
                        return <span>{String(value ?? "")}</span>
                    }
                    const Icon = found.icon
                    return (
                        <div className="flex items-center">
                            {Icon && <Icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                            <span>{found.label}</span>
                        </div>
                    )
                }

                // (C) Render por defecto (texto plano)
                return <span>{String(value ?? "")}</span>
            },
        }
    })


    // 3) Columnas “adivinadas”
    const guessedColumnDefs: ColumnDef<TData>[] = missingKeys.map((key) => ({
        id: key,
        accessorKey: key,
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title={key} />
        ),
        cell: ({ row }) => {
            const val = row.getValue(key)
            return <span>{String(val ?? "")}</span>
        },
    }))

    // 4) Juntamos todo
    const allColumnDefs = [...mainColumnDefs, ...guessedColumnDefs]

    return (
        <DataTable
            columns={allColumnDefs}
            data={data}
        />
    )
}
