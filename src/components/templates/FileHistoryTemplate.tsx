import { ColumnConfig } from "@/types/table"
import { DynamicDataTable } from "../organisms/DynamicDataTable"

interface FileHistoryTemplateProps {
  readonly data: any[]
  readonly columnsConfig: ColumnConfig[]  
}

export default function FileHistoryTemplate({data, columnsConfig}: FileHistoryTemplateProps) {
  return (
    <div className="flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Historial de Archivos</h2>
          <p className="text-muted-foreground">
            Aqui esta una lista de todos los archivos evaluados previamente
          </p>
        </div>
      </div>

      <DynamicDataTable data={data} columnsConfig={columnsConfig} />
    </div>
  )
}
