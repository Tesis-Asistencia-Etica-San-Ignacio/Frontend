import tasks from "../screens/dataForTableExample/tasks.json"
import { columns } from "../molecules/table/Columns"
import { DataTable } from "../organisms/Data-table"

export default function TaskPage() {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Historial de Archivos</h2>
          <p className="text-muted-foreground">
            Aqui esta una lista de todos los archivos evaluados previamente
          </p>
        </div>
      </div>
      <DataTable data={tasks} columns={columns} />
    </div>
  )
}
