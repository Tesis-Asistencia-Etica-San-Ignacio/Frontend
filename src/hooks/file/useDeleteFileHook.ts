import { useState, useCallback } from "react";
import { toast } from "sonner";

const useDeleteFileHook = () => {
  const [loading, setLoading] = useState(false);

  const deleteFile = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/files/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        toast.success("Archivo eliminado correctamente");
      } else {
        toast.error("Error al eliminar el archivo");
      }
    } catch (error) {
      console.error("Error al eliminar el archivo:", error);
      toast.error("Error al eliminar el archivo");
    }
    setLoading(false);
  }, []);

  return { deleteFile, loading };
};

export default useDeleteFileHook;
