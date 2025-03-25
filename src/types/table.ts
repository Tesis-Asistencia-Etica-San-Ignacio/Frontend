
import React from "react"

export interface ColumnItem {
    value: string
    label: string
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
    badgeVariant?: string
}

export interface ActionItem {
    label: string
    shortcut?: string
    onClick?: (rowData: any) => void
    subMenu?: {
        radioGroup?: {
            name: string
            valueKey: string
            options: { value: string; label: string }[]
        }
    }[]
}

export interface ColumnConfig {
    id: string
    type?: "selection" | "actions" | "badgeWithText" | string
    accessorKey?: string
    headerLabel?: string
    renderType?: string
    badgeKey?: string
    textKey?: string
    items?: ColumnItem[]
    actionItems?: ActionItem[]
    searchable?: boolean
    badgeVariant?: string
}
