import { useState } from "react";
import { Button } from "../atoms/ui/button";
import ModalForm from "../organisms/ModalForm";
import type { FormField } from "@/types/formTypes";

interface EthicalEvaluationBoxProps {
  readonly selectedTask?: { readonly ethicsLaw?: string } | null;
  modalFormFields?: FormField[] | FormField[][];
  onModalSubmit?: (data: any) => Promise<void> | void;
}

export default function EthicalEvaluationBox({
  selectedTask,
  modalFormFields,
  onModalSubmit,
}: EthicalEvaluationBoxProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-3 flex flex-col flex-1 min-h-0">
      <div className="space-y-4 flex flex-col flex-1 min-h-0">
        <div className="border p-4 rounded-md flex-1 flex flex-col min-h-0">
          <h2 className="font-semibold mb-2">Extracto documento</h2>
          {selectedTask?.ethicsLaw ? (
            <p>{selectedTask.ethicsLaw}</p>
          ) : (
            <p className="text-muted-foreground">
              Selecciona una fila para ver el extracto.
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline">Descargar resultado</Button>
        <Button onClick={() => setModalOpen(true)}>Enviar resultado</Button>
      </div>
      {modalFormFields && onModalSubmit && (
        <ModalForm
          open={modalOpen}
          onOpenChange={setModalOpen}
          title={{ text: "Enviar resultado de la evaluación", align: "left" }}
          formDataConfig={modalFormFields}
          onSubmit={onModalSubmit}
          submitButtonText="Enviar resultado"
          width="70%"
          successContent={
            <div className="p-4 flex flex-col items-center justify-center h-full">
              <h3 className="text-lg font-semibold mb-2">¡Enviado exitosamente!</h3>
              <Button onClick={() => setModalOpen(false)}>Cerrar</Button>
            </div>
          }
        />
      )}
    </div>
  );
}
