"use client"

import React from "react"
import { ColumnDef, FilterFn } from "@tanstack/react-table"
import { DataTable } from "./Data-table"
import { Checkbox } from "@/components/atoms/ui/checkbox"
import { Badge } from "@/components/atoms/ui/badge"
import { DataTableRowActions } from "@/components/molecules/table/Data-table-row-actions"
import { DataTableColumnHeader } from "@/components/molecules/table/Data-table-column-header"
import { ColumnConfig } from "@/types/table"

/**
 * Filtro local por columna (p.e. setFilterValue).
 */
function localCellFilterFn(row: any, columnId: string, filterValue: any) {
    if (
        !filterValue ||
        (Array.isArray(filterValue) && filterValue.length === 0)
    ) {
        return true
    }

    const rowValue = row.getValue(columnId)

    // Si el filtro es un array (por ejemplo, faceted filters)
    if (Array.isArray(filterValue)) {
        if (Array.isArray(rowValue)) {
            return rowValue.some((item) => {
                const label = String(item?.label ?? "").toLowerCase()
                return filterValue.includes(label)
            })
        } else {
            const value = String(rowValue ?? "").toLowerCase()
            return filterValue.includes(value)
        }
    }

    // Si el filtro es un string (globalFilter manual o search)
    const filterStr = String(filterValue).toLowerCase()

    if (Array.isArray(rowValue)) {
        return rowValue.some((item) => {
            const text = String(item?.text ?? "").toLowerCase()
            return text.includes(filterStr)
        })
    }

    const value = String(rowValue ?? "").toLowerCase()
    return value.includes(filterStr)
}



/**
 * Crea un filterFn global que revisa SÓLO las columnas
 * definidas como "searchable: true" en columnsConfig.
 */
function createGlobalFilterFn(columnsConfigMap: Record<string, ColumnConfig>): FilterFn<any> {
    return (row, _columnId, filterValue) => {
        if (!filterValue) return true

        const filterText = String(filterValue).toLowerCase()

        for (const col of Object.values(columnsConfigMap)) {
            if (!col.searchable) continue

            const cellValue = row.getValue(col.id)

            // Si es un array, buscamos coincidencia en sus campos
            if (Array.isArray(cellValue)) {
                const match = cellValue.some((item) => {
                    const t = item?.text ?? ""
                    const l = item?.label ?? ""
                    return `${t} ${l}`.toLowerCase().includes(filterText)
                })
                if (match) return true
            } else {
                const cellText = String(cellValue ?? "").toLowerCase()
                if (cellText.includes(filterText)) return true
            }
        }

        return false
    }
}


interface DynamicDataTableProps<TData extends object> {
    data: TData[]
    columnsConfig: ColumnConfig[]
}

export function DynamicDataTable<TData extends object>({
    data,
    columnsConfig,
}: DynamicDataTableProps<TData>) {
    // Column "actions" si existe, la sacamos aparte
    const actionsColumn = columnsConfig.find((col) => col.type === "actions")
    const nonActionsCols = columnsConfig.filter((col) => col.type !== "actions")

    // “adivinar” columnas faltantes
    const dataKeys = Object.keys(data?.[0] || {})
    const alreadyDefined = nonActionsCols.map((c) => c.accessorKey).filter(Boolean)
    const missingKeys = dataKeys.filter((key) => !alreadyDefined.includes(key))

    //  Mapeamos las columnas definidas
    const mainColumnDefs: ColumnDef<TData>[] = nonActionsCols.map((col) => {
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
                    />
                ),
                cell: ({ row }) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                    />
                ),
                enableSorting: false,
                enableHiding: false,
            }
        }

        const accessorKey = col.accessorKey ?? col.id
        return {
            id: col.id,
            accessorKey,
            items: col.items,
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={col.headerLabel || col.id} />
            ),
            filterFn: localCellFilterFn,
            cell: ({ row }) => {
                const value = row.getValue(accessorKey)

                //  badgeWithText
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

                //  items => dibujamos icon + label
                if (col.items && Array.isArray(col.items)) {
                    const found = col.items.find((it) => it.value === value)
                    if (!found) return <span>{String(value ?? "")}</span>
                    const Icon = found.icon
                    return (
                        <div className="flex items-center">
                            {Icon && <Icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                            <span>{found.label}</span>
                        </div>
                    )
                }

                //  Por defecto => string
                return <span>{String(value ?? "")}</span>
            },
        }
    })

    //  Columnas “adivinadas”
    const guessedColumnDefs: ColumnDef<TData>[] = missingKeys.map((key) => ({
        id: key,
        accessorKey: key,
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title={key} />
        ),
        filterFn: localCellFilterFn,
        cell: ({ row }) => {
            const val = row.getValue(key)
            return <span>{String(val ?? "")}</span>
        },
    }))

    //  Columna de acciones => al final
    let actionsColumnDef: ColumnDef<TData> | undefined
    if (actionsColumn) {
        actionsColumnDef = {
            id: actionsColumn.id,
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="" />
            ),
            cell: ({ row }) => (
                <DataTableRowActions
                    row={row}
                    actionItems={actionsColumn.actionItems ?? []}
                />
            ),
            enableSorting: false,
            enableHiding: false,
        }
    }

    // Juntamos
    const allColumnDefs = [...mainColumnDefs, ...guessedColumnDefs]
    if (actionsColumnDef) {
        allColumnDefs.push(actionsColumnDef)
    }

    // Diccionario colId -> ColumnConfig (para globalFilterFn)
    const columnsConfigMap: Record<string, ColumnConfig> = {}
    columnsConfig.forEach((cc) => {
        columnsConfigMap[cc.id] = cc
    })

    // Creamos la función globalFilter en base a columnsConfigMap
    const theGlobalFilterFn = React.useMemo(
        () => createGlobalFilterFn(columnsConfigMap),
        [columnsConfigMap]
    )

    // Render <DataTable> con meta y globalFilterFn
    return (
        <DataTable
            columns={allColumnDefs}
            data={data}
            tableMeta={{ columnsConfigMap }}
            globalFilterFn={theGlobalFilterFn}
        />
    )
}
