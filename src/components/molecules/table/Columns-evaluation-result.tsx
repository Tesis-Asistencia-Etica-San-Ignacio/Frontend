"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Task } from "../../screens/dataForTableExample/schema-evaluation"

function mapStatusToResultado(status: string) {
  if (status === "Aprobado") return "Aprobado"
  return "No aprobado"
}

export const evaluationColumns: ColumnDef<Task>[] = [
  {
    accessorKey: "id",
    header: "Ley Ética",
    cell: ({ row }) => {
      return (
        <span>
          {row.getValue("id")}
        </span>
      ) 
    },
  },
  
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const statusValue = row.getValue("status") as string
      const resultado = mapStatusToResultado(statusValue)
      const colorClass =
        resultado === "Aprobado"
          ? "text-green-600 font-semibold"
          : "text-red-600 font-semibold"
      return <span className={colorClass}>{resultado}</span>
    },
    // Función de filtrado que usa el valor mapeado
    filterFn: (row, columnId, filterValue: string[]) => {
      const originalStatus = row.getValue<string>(columnId)
      const mappedStatus = mapStatusToResultado(originalStatus)
      return filterValue.includes(mappedStatus)
    },
  },
  
  // {
  //   accessorKey: "title",
  //   header: "Extracto documento",
  //   cell: ({ row }) => {
  //     const titleValue = row.getValue("title") as string
  //     // Podrías truncar o mostrarlo completo
  //     return (
  //       <p className="line-clamp-2">
  //         {titleValue}
  //       </p>
  //     )
  //   },
  // },
]
