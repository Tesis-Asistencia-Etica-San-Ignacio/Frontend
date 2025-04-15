// src/hooks/useDeleteFileHook.ts
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { deleteFile } from "@/services/fileService";

const useDeleteFileHook = () => {
  const [loading, setLoading] = useState(false);

  const deleteFileCallback = useCallback(async (id: string) => {
    setLoading(true);
    try {
      await deleteFile(id);
      toast.success("Archivo eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el archivo:", error);
      toast.error("Error al eliminar el archivo");
    }
    setLoading(false);
  }, []);

  return { deleteFile: deleteFileCallback, loading };
};

export default useDeleteFileHook;
