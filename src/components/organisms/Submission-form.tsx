import { useState } from "react";
import { Button } from "../atoms/ui/button";

interface SubmissionFormProps {
  selectedTask?: {
    documentPreviewUrl?: string;
  } | null;
  onSuccess: () => void;
}

export function SubmissionForm({ selectedTask, onSuccess }: SubmissionFormProps) {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de envío
    onSuccess();
  };

  return (
    // Usamos w-full y h-full para ocupar todo el espacio del pop-up
    <div className="w-full h-full flex flex-col bg-white rounded-lg shadow-md overflow-auto">
      <h2 className="text-2xl font-semibold mb-4 p-6">Resultado de la evaluación</h2>
      
      {/* Ajustamos el form para que se extienda y permita scroll si es muy grande */}
      <form onSubmit={handleSubmit} className="flex flex-col flex-1 px-6 pb-6 gap-6">
        {/* Fila con dos campos */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Correo de destino</label>
            <input
              type="email"
              placeholder="Ingrese el correo del destinatario"
              className="border border-gray-300 rounded p-2 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Motivo del correo</label>
            <select
              className="border border-gray-300 rounded p-2 w-full"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            >
              <option value="">Seleccione una opción</option>
              <option value="Opción 1">Incompleto</option>
              <option value="Opción 2">Ortografía</option>
              <option value="Opción 3">Coherencia</option>
              <option value="Opción 4">Aprobación</option>
            </select>
          </div>
        </div>

        {/* Document preview a la izquierda, textarea a la derecha */}
        <div className="grid grid-cols-2 gap-4 flex-1">
          <div>
            <label className="block mb-1 font-medium">Vista previa del documento</label>
            {selectedTask?.documentPreviewUrl ? (
              <img
                src={selectedTask.documentPreviewUrl}
                alt="Document preview"
                className="w-full h-auto max-h-64 object-cover border border-gray-300 rounded"
              />
            ) : (
              <div className="text-muted-foreground italic">
                No hay vista previa disponible
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <label className="block mb-1 font-medium">Mensaje adicional</label>
            <textarea
              placeholder="Type your message here..."
              className="border border-gray-300 rounded p-2 w-full flex-1"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>

        {/* Botón de envío alineado a la derecha */}
        <div className="flex justify-end">
          <Button type="submit" className="px-6 py-2 text-base">
            Enviar resultado
          </Button>
        </div>
      </form>
    </div>
  );
}
