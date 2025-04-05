import { ColumnConfig } from "@/types/table"
import { DynamicDataTable } from "../organisms/DynamicDataTable"

interface FileHistoryTemplateProps {
  readonly data: any[]
  readonly columnsConfig: ColumnConfig[]
}

export default function FileHistoryTemplate({ data, columnsConfig }: FileHistoryTemplateProps) {
  return (
    <section>
      <div className="mb-4 flex flex-col ">
        <h2 className="text-2xl font-bold tracking-tight">Historial de Archivos</h2>
        <p className="text-muted-foreground">
          Aqui esta una lista de todos los archivos evaluados previamente
        </p>
      </div>

      <DynamicDataTable data={data} columnsConfig={columnsConfig} />
    </section>
  )
}
