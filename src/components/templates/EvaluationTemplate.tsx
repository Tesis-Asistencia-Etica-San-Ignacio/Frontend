import React from "react";
import { DynamicDataTable } from "../organisms/DynamicDataTable";
import EthicalEvaluationBox from "../organisms/EthicalEvaluationBox";
import type { ColumnConfig } from "@/types/table";
import type { FormField } from "@/types/formTypes";
import ModalForm from "../organisms/dialogs/ModalForm";

interface EvaluationResultTemplateProps { 
  // Tabla
  readonly data: any[];
  readonly columnsConfig: ColumnConfig[];
  onRowClick?: (row: any) => void;
  DataSelectedRow?: { [key: string]: any };

  //Modal CORREO
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
  readonly onMailModalOpenChange: (open: boolean) => void;

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
  editInitialData?: { [key: string]: any };
}

export default function EvaluationResultTemplate({
  data,
  columnsConfig,

  // Tabla
  onRowClick,
  DataSelectedRow,
  // CORREO
  modalFormFields,
  onModalSubmit,
  modalSuccessToast,
  modalErrorToast,
  modalOpen,
  onMailModalOpenChange,
  // EDITAR
  editModalFormFields,
  onEditModalSubmit,
  editModalSuccessToast,
  editModalErrorToast,
  editModalOpen,
  onEditModalOpenChange,
  editInitialData

}: Readonly<EvaluationResultTemplateProps>) {

  return (
    <section className="pb-8 space-y-4">
      <div className="mb-4 flex flex-col">
        <h2 className="text-2xl font-bold tracking-tight">Resultado de la evaluación</h2>
        <p className="text-muted-foreground">
          Aquí está una lista de todas las normas éticas evaluadas previamente
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4 h-full">
        <div className="col-span-2">

          <DynamicDataTable
            data={data}
            columnsConfig={columnsConfig}
            selectedRowId={DataSelectedRow?.id}
            onRowClick={onRowClick}
          />
        </div>
        <EthicalEvaluationBox
          open={modalOpen}
          onOpenChange={onMailModalOpenChange}
          selectedTask={DataSelectedRow || null}
          modalFormFields={modalFormFields}
          onModalSubmit={onModalSubmit}
          modalSuccessToast={modalSuccessToast}
          modalErrorToast={modalErrorToast}
        />
      </div>
      {modalFormFields && onEditModalSubmit && (
        <ModalForm
          open={editModalOpen}
          onOpenChange={onEditModalOpenChange}
          title={{ text: "Editar norma ética" + " - " + DataSelectedRow?.codeNumber, align: "left" }}
          formDataConfig={editModalFormFields}
          onSubmit={onEditModalSubmit}
          submitButtonText="Guardar cambios"
          width="40%"
          height="60%"
          successToast={editModalSuccessToast}
          errorToast={editModalErrorToast}
          initialData={editInitialData}
        />
      )}
    </section>
  );
}
