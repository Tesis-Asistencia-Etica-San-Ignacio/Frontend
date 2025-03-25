import React from "react"
import { ColumnDef, FilterFn } from "@tanstack/react-table"
import { DataTable } from "./Data-table"
import { Checkbox } from "@/components/atoms/ui/checkbox"
import { Badge } from "@/components/atoms/ui/badge"
import { DataTableRowActions } from "@/components/molecules/table/Data-table-row-actions"
import { DataTableColumnHeader } from "@/components/molecules/table/Data-table-column-header"
import { ColumnConfig } from "@/types/table"

/** 
 * Filtro local: filtra el valor de la celda según el filtro
 */
function localCellFilterFn(row: any, columnId: string, filterValue: any) {
    if (!filterValue || (Array.isArray(filterValue) && filterValue.length === 0)) {
        return true
    }
    const rowValue = row.getValue(columnId)

    // Si filterValue es array (faceted filters)
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

    // Si filterValue es string (substring search)
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
 * Filtro global: recorre solo columnas marcadas "searchable" en la config.
 */
function createGlobalFilterFn(columnsConfigMap: Record<string, ColumnConfig>): FilterFn<any> {
    return (row, _columnId, filterValue) => {
        if (!filterValue) return true
        const filterText = String(filterValue).toLowerCase()
        for (const col of Object.values(columnsConfigMap)) {
            if (!col.searchable) continue
            let cellValue = row.getValue(col.id)
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

/** Props del DynamicDataTable */
interface DynamicDataTableProps<TData extends object> {
    data: TData[]
    columnsConfig: ColumnConfig[]
    // Callback y estado para selección de fila por clic
    onRowClick?: (rowData: TData) => void
    selectedRowId?: string
}

/** Componente principal de la tabla dinámica */
export function DynamicDataTable<TData extends object>({
    data,
    columnsConfig,
    onRowClick,
    selectedRowId,
}: DynamicDataTableProps<TData>) {
    // 1. Separa la columna "actions" (para que siempre quede al final)
    const actionsColumn = columnsConfig.find((col) => col.type === "actions")
    const nonActionsCols = columnsConfig.filter((col) => col.type !== "actions")

    // 2. "Adivina" columnas no definidas en la config
    const dataKeys = Object.keys(data?.[0] || {})
    const alreadyDefined = nonActionsCols.map((c) => c.accessorKey).filter(Boolean)
    const missingKeys = dataKeys.filter((key) => !alreadyDefined.includes(key))

    // 3. Construye ColumnDefs para las columnas definidas
    const mainColumnDefs: ColumnDef<TData>[] = nonActionsCols.map((col) => {
        if (col.type === "selection") {
            // Checkbox de selección
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
        // Columna normal: define accessor, header, filtro y cell
        const accessorKey = col.accessorKey ?? col.id
        return {
            id: col.id,
            accessorKey,
            items: col.items, // Se pasa para faceted filters y badge rendering
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={col.headerLabel || col.id} />
            ),
            filterFn: localCellFilterFn,
            cell: ({ row }) => {
                const value = row.getValue(accessorKey)
                // Render para badgeWithText
                if (col.renderType === "badgeWithText") {
                    if (col.items && Array.isArray(col.items)) {
                        const foundItem = col.items.find(
                            (it) => it.value.toLowerCase() === String(value).toLowerCase()
                        )
                        if (foundItem) {
                            const Icon = foundItem.icon
                            const variant = foundItem.badgeVariant || col.badgeVariant || "outline"
                            return (
                                <div className="flex items-center space-x-2">
                                    {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
                                    <Badge variant={variant as "outline" | "default" | "secondary" | "destructive" | "approved" | "notapproved"}>
                                        {foundItem.label}
                                    </Badge>
                                </div>
                            )
                        }
                    }
                    if (Array.isArray(value)) {
                        return (
                            <div className="flex space-x-2">
                                {value.map((item: any, i: number) => (
                                    <React.Fragment key={i}>
                                        {item[col.badgeKey ?? "label"] && (
                                            <Badge variant={col.badgeVariant as "outline" | "default" | "secondary" | "destructive" | "approved" | "notapproved" || "outline"}>
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
                // Render si solo se usan items (sin renderType badgeWithText)
                if (col.items && Array.isArray(col.items)) {
                    const found = col.items.find(
                        (it) => it.value.toLowerCase() === String(value).toLowerCase()
                    )
                    if (!found) return <span>{String(value ?? "")}</span>
                    const Icon = found.icon
                    const variant = found.badgeVariant || col.badgeVariant || "outline"
                    return (
                        <div className="flex items-center space-x-2">
                            {Icon && <Icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                            <Badge variant={variant as "outline" | "default" | "secondary" | "destructive" | "approved" | "notapproved"}>
                                {found.label}
                            </Badge>
                        </div>
                    )
                }
                // Valor por defecto
                return <span>{String(value ?? "")}</span>
            },
        }
    })

    // 4. Columnas adivinadas (para props no definidas)
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

    // 5. Columna de acciones, se pone al final
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

    // 6. Unir todas las columnas definidas y adivinadas
    const allColumnDefs = [...mainColumnDefs, ...guessedColumnDefs]
    if (actionsColumnDef) {
        allColumnDefs.push(actionsColumnDef)
    }

    // 7. Crear diccionario de columnas para globalFilterFn
    const columnsConfigMap: Record<string, ColumnConfig> = {}
    columnsConfig.forEach((cc) => {
        columnsConfigMap[cc.id] = cc
    })

    // 8. Crear globalFilterFn memorizado
    const theGlobalFilterFn = React.useMemo(
        () => createGlobalFilterFn(columnsConfigMap),
        [columnsConfigMap]
    )

    // 9. Renderiza DataTable pasando callbacks para row click
    return (
        <DataTable
            columns={allColumnDefs}
            data={data}
            onRowClick={onRowClick}
            selectedRowId={selectedRowId}
            tableMeta={{
                columnsConfigMap,
            }}
            globalFilterFn={theGlobalFilterFn}
        />
    )
}