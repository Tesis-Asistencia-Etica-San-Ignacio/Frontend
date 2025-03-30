import { useState } from "react";
import { Button } from "../atoms/ui/button";
import { SubmissionForm } from "../organisms/Submission-form"; // Replace with the correct path to SubmissionForm
import { PopoverForm } from "../atoms/popover-form"; // Replace with the correct path to PopoverForm

interface EthicalEvaluationBoxProps {
  readonly selectedTask?: { readonly ethicsLaw?: string } | null;
}

// Estado para controlar la visibilidad del PopoverForm
// Estado opcional para manejar la visualización de un mensaje de éxito
//

// Función que se ejecuta al presionar "Enviar resultado"

export default function EthicalEvaluationBox({
  selectedTask,
}: EthicalEvaluationBoxProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const handleEnviarResultado = () => {
    // Aquí puedes incluir la lógica necesaria antes de abrir el popover
    setPopoverOpen(true);
    setShowSuccess(false);
  };

  const handleSuccess = () => {
    console.log("Submission successful!");
    setShowSuccess(true);
  };

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
        <Button onClick={handleEnviarResultado}>Enviar resultado</Button>
      </div>
      {popoverOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm">
          <PopoverForm
            open={popoverOpen}
            setOpen={setPopoverOpen}
            title="Enviar resultado de la evaluación"
            width="800px" // Ancho mayor
            height="600px" // Alto mayorP
            // El contenido completo va en openChild:
            openChild={
              <SubmissionForm
                selectedTask={
                  selectedTask
                    ? { documentPreviewUrl: selectedTask.ethicsLaw }
                    : null
                }
                onSuccess={handleSuccess}
              />
            }
            // Contenido opcional de éxito
            showSuccess={showSuccess}
            successChild={
              <div className="p-4 flex flex-col items-center justify-center h-full">
                <h3 className="text-lg font-semibold mb-2">
                  ¡Enviado exitosamente!
                </h3>
                <Button onClick={() => setPopoverOpen(false)}>Cerrar</Button>
              </div>
            }
          />
        </div>
      )}
    </div>
  );
}
