import { useState, useCallback } from "react";
import { toast } from "sonner";
import { uploadFile } from "@/services/evaluationService";
import type { FileWithUrl } from "@/types/fileType";

function useCreateEvaluationHook() {
  const [loading, setLoading] = useState(false);

  const uploadFiles = useCallback(async (files: FileWithUrl[]) => {
    setLoading(true);
    for (const fileObj of files) {
      // Evita subir archivos con error de validación.
      if (fileObj.error) continue;
      console.log("Enviando archivo:", fileObj.file);

      const formData = new FormData();
      formData.append("file", fileObj.file);

      try {
        await uploadFile(formData);
        toast.success(`Archivo ${fileObj.name} subido correctamente`);
      } catch (error) {
        console.error("Error al subir el archivo:", error);
        toast.error(`Error al subir ${fileObj.name}`, { closeButton: true });
      }
    }
    setLoading(false);
  }, []);

  return { uploadFiles, loading };
}

export default useCreateEvaluationHook;
