import { EvaluationHeader } from "../molecules/Evaluation-header";
import React from "react"
import { DynamicDataTable } from "../organisms/DynamicDataTable"
import { ColumnConfig } from "@/types/table"
import EthicalEvaluationBox from "../organisms/EthicalEvaluationBox";
import { FormField } from "@/types/formTypes";

interface EvaluationResultTemplateProps {
  readonly data: any[];
  readonly columnsConfig: ColumnConfig[];
  modalFormFields: FormField[][];
  onModalSubmit?: (data: any) => Promise<void> | void;
}

export default function EvaluationResultTemplate({ data, columnsConfig, modalFormFields, onModalSubmit }: EvaluationResultTemplateProps) {
  const [selectedTask, setSelectedTask] = React.useState<any | null>(null)

  const handleRowClick = (data: any) => {
    // Si se vuelve a hacer clic en la misma fila, se deselecciona
    if (selectedTask && selectedTask.id === data.id) {
      setSelectedTask(null)
    } else {
      setSelectedTask(data)
    }
  };

  return (
    <section className=" pb-8 space-y-4">
      <EvaluationHeader title="Resultado de la evaluación:" />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <DynamicDataTable data={data} columnsConfig={columnsConfig} onRowClick={handleRowClick}
            selectedRowId={selectedTask?.id} />
        </div>
        <EthicalEvaluationBox
          selectedTask={selectedTask}
          modalFormFields={modalFormFields}
          onModalSubmit={onModalSubmit}
        />
      </div>
    </section>
  );
}
