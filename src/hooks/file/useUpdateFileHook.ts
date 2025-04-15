// src/hooks/useUpdateFileHook.ts
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { updateFile } from "@/services/fileService";
import type { UpdateFileParams } from "@/types/fileType";

const useUpdateFileHook = () => {
  const [loading, setLoading] = useState(false);

  const updateFileCallback = useCallback(async (params: UpdateFileParams) => {
    setLoading(true);
    try {
      await updateFile(params);
      toast.success("Archivo actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar el archivo:", error);
      toast.error("Error al actualizar el archivo");
    }
    setLoading(false);
  }, []);

  return { updateFile: updateFileCallback, loading };
};

export default useUpdateFileHook;
