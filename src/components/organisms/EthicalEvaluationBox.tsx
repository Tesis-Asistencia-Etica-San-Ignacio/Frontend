import React from "react";
import { Button } from "../atoms/ui/button";
import ModalForm from "./dialogs/ModalForm";
import type { FormField } from "@/types/formTypes";

interface EthicalEvaluationBoxProps {
  readonly selectedTask?: {
    cita?: string;
    justification?: string;
  } | null;
  modalFormFields?: FormField[] | FormField[][];
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
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
}

export default function EthicalEvaluationBox({
  open,
  onOpenChange,
  selectedTask,
  modalFormFields,
  onModalSubmit,
  modalSuccessToast,
  modalErrorToast,
}: EthicalEvaluationBoxProps) {
  return (
    <div className="flex flex-col h-full bg-[#5DA9E9]">
      
      {/* 2) Contenedor de las dos cajas: flex-col, ocupa resto, con gap */}
      <div className="flex flex-col flex-1 min-h-0 gap-y-4">
        
        {/* 3) CITA: flex-basis 30%, puede hacer scroll */}
        <div className="basis-[30%]  overflow-y-auto border p-4 rounded-md">
          <h2 className="font-semibold mb-2">Cita</h2>
          {selectedTask?.cita ? (
            <p>{selectedTask.cita}</p>
          ) : (
            <p className="text-muted-foreground">
              Selecciona una fila para ver la cita.
            </p>
          )}
        </div>
        
        {/* 4) JUSTIFICACIÓN: flex-basis 70%, puede hacer scroll */}
        <div className="basis-[30%]  overflow-y-auto border p-4 rounded-md">
          <h2 className="font-semibold mb-2">Justificación</h2>
          {selectedTask?.justification ? (
            <p>{selectedTask.justification}</p>
          ) : (
            <p className="text-muted-foreground">
              Selecciona una fila para ver la justificación.
            </p>
          )}
        </div>
      </div>


      {/* Botón para abrir el modal de envío de correo */}
      <div className="flex justify-end mt-4">
        <Button onClick={() => onOpenChange(true)}>Enviar resultado</Button>
      </div>

      {/* ModalForm */}
      {modalFormFields && onModalSubmit && (
        <ModalForm
          open={open}
          onOpenChange={onOpenChange}
          title={{ text: "Enviar resultado de la evaluación", align: "left" }}
          formDataConfig={modalFormFields}
          onSubmit={onModalSubmit}
          submitButtonText="Enviar resultado"
          width="70%"
          height="80%"
          successToast={modalSuccessToast}
          errorToast={modalErrorToast}
        />
      )}
    </div>
  );
}
