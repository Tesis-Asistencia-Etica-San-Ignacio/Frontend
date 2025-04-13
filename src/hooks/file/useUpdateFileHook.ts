import { useState, useCallback } from "react";
import { toast } from "sonner";

export interface UpdateFileParams {
  id: string;
  name?: string;
  // Puedes agregar otros campos a actualizar según requieras
}

const useUpdateFileHook = () => {
  const [loading, setLoading] = useState(false);

  const updateFile = useCallback(async (params: UpdateFileParams) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/files/${params.id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      if (response.ok) {
        toast.success("Archivo actualizado correctamente");
      } else {
        toast.error("Error al actualizar el archivo");
      }
    } catch (error) {
      console.error("Error al actualizar el archivo:", error);
      toast.error("Error al actualizar el archivo");
    }
    setLoading(false);
  }, []);

  return { updateFile, loading };
};

export default useUpdateFileHook;
