import { EvaluationHeader } from "../organisms/Evaluation-header"
// import { TextArea } from "../atoms/ui/text-area"
import { Button } from "../atoms/ui/button"
import tasks from "../screens/dataForTableExample/evaluation.json"
import { evaluationColumns } from "../molecules/table/Columns-evaluation-result"
import { DataTable } from "../organisms/Data-table-evaluation"
import React from "react"
import { Task } from "../screens/dataForTableExample/schema-evaluation"

export default function EvaluationResultTemplate () {
  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null)

  const handleRowClick = (task: Task) => {
    // Si se vuelve a hacer clic en la misma fila, se deselecciona
    if (selectedTask && selectedTask.id === task.id) {
      setSelectedTask(null)
    } else {
      setSelectedTask(task)
    }
  }

  return (
    <div className="space-y-4">
      <EvaluationHeader title="Resultado de la evaluación:" />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <DataTable
            data={tasks}
            columns={evaluationColumns}
            onRowClick={handleRowClick}
            selectedRowId={selectedTask?.id}
          />
        </div>
        <div className="border p-4 rounded-md">
          <h2 className="font-semibold mb-2">Extracto documento</h2>
          {selectedTask ? (
            <p>{selectedTask.title}</p>
          ) : (
            <p className="text-muted-foreground">
              Selecciona una fila para ver el extracto.
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline">Descargar resultado</Button>
        <Button>Enviar resultado</Button>
      </div>
    </div>
  )
}