import { useState, useCallback } from "react";
import { useNotify } from "@/hooks/useNotify";
import { createCase } from "@/services/caseService";

const useCreateCaseHook = () => {
  const [loading, setLoading] = useState(false);
  const { notifySuccess, notifyError } = useNotify();

  const createCaseHandler = useCallback(
    async (caseData: Record<string, any>) => {
      setLoading(true);
      try {
        await createCase(caseData);
        notifySuccess({
          title: "Caso guardado",
          description: "El caso ha sido guardado en el historial correctamente.",
          closeButton: true,
          icon: "✅",
        });
      } catch (error: any) {
        console.error("Error al crear el caso:", error);
        notifyError({
          title: "Error guardando el caso",
          description: error?.message || "Ocurrió un error al guardar el caso.",
          closeButton: true,
        });
      } finally {
        setLoading(false);
      }
    },
    [notifySuccess, notifyError]
  );

  return { createCase: createCaseHandler, loading };
};

export default useCreateCaseHook;
