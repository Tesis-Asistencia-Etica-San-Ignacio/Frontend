import React from "react";
import { EvaluationHeader } from "../molecules/Evaluation-header";
import { DynamicDataTable } from "../organisms/DynamicDataTable";
import EthicalEvaluationBox from "../organisms/EthicalEvaluationBox";
import type { ColumnConfig } from "@/types/table";
import type { FormField } from "@/types/formTypes";
import ModalForm from "../organisms/dialogs/ModalForm";

interface EvaluationResultTemplateProps {
  readonly data: any[];
  readonly columnsConfig: ColumnConfig[];

  //CORREO
  modalFormFields: FormField[][];
  onModalSubmit?: (data: any) => Promise<void> | void;
  modalSuccessToast: {
    title: string;
    description: string;
    icon: React.ReactNode;
    closeButton?: boolean;
  };
  modalErrorToast: {
    title: string;
    description: string;
    icon: React.ReactNode;
    closeButton?: boolean;
  };
  readonly modalOpen: boolean;
  readonly onModalOpenChange: (open: boolean) => void;

  //EDITAR
  editModalFormFields: FormField[][];
  onEditModalSubmit?: (data: any) => Promise<void> | void;
  editModalSuccessToast: {
    title: string;
    description: string;
    icon: React.ReactNode;
    closeButton?: boolean;
  };
  editModalErrorToast: {
    title: string;
    description: string;
    icon: React.ReactNode;
    closeButton?: boolean;
  };
  editModalOpen: boolean;
  onEditModalOpenChange: (open: boolean) => void;
}

export default function EvaluationResultTemplate({
  data,
  columnsConfig,
  // CORREO
  modalFormFields,
  onModalSubmit,
  modalSuccessToast,
  modalErrorToast,
  modalOpen,
  onModalOpenChange,
  // EDITAR
  editModalFormFields,
  onEditModalSubmit,
  editModalSuccessToast,
  editModalErrorToast,
  editModalOpen,
  onEditModalOpenChange,
}: Readonly<EvaluationResultTemplateProps>) {
  const [selectedTask, setSelectedTask] = React.useState<any | null>(null);

  const handleRowClick = (rowData: any) => {
    if (selectedTask && selectedTask.id === rowData.id) {
      setSelectedTask(null);
    } else {
      setSelectedTask(rowData);
    }
  };

  return (
    <section className="pb-8 space-y-4">
      <EvaluationHeader title="Resultado de la evaluación:" />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <DynamicDataTable
            data={data}
            columnsConfig={columnsConfig}
            onRowClick={handleRowClick}
            selectedRowId={selectedTask?.id}
          />
        </div>
        <EthicalEvaluationBox
          open={modalOpen}
          onOpenChange={onModalOpenChange}
          selectedTask={selectedTask}
          modalFormFields={modalFormFields}
          onModalSubmit={onModalSubmit}
          modalSuccessToast={modalSuccessToast}
          modalErrorToast={modalErrorToast}
        />
        {modalFormFields && onEditModalSubmit && (
        <ModalForm
          open={editModalOpen}
          onOpenChange={onEditModalOpenChange}
          title={{ text: "Editar la evaluación de una norma ética", align: "left" }}
          formDataConfig={editModalFormFields}
          onSubmit={onEditModalSubmit}
          submitButtonText="Guardar cambios"
          width="40%"
          successToast={editModalSuccessToast}
          errorToast={editModalErrorToast}
        />
      )}
      </div>
    </section>
  );
}
