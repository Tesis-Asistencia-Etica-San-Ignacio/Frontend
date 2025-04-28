import { useState, useCallback } from "react";
import { updatePromptText } from "@/services/promptService";
import type { UpdatePromptTextParams } from "@/types/promptType";
import { useNotify } from "@/hooks/useNotify";

const useUpdatePromptText = () => {
  const [loading, setLoading] = useState(false);
  const { notifySuccess, notifyError } = useNotify();

  const updatePromptTextHandler = useCallback(
    async (id: string, data: UpdatePromptTextParams) => {
      setLoading(true);
      try {
        await updatePromptText(id, data);
        notifySuccess({
          title: "Prompt actualizado",
          description: `Prompt ${id} guardado correctamente.`,
          closeButton: true,
        });
      } catch (error: any) {
        console.error("Error al actualizar prompt:", error);
        notifyError({
          title: `Error en prompt ${id}`,
          description: error.message ?? "No se pudo actualizar el prompt.",
          closeButton: true,
        });
      } finally {
        setLoading(false);
      }
    },
    [notifySuccess, notifyError]
  );

  return { updatePromptText: updatePromptTextHandler, loading };
};

export default useUpdatePromptText;
