import { useState, useCallback } from "react";
import { useNotify } from "@/hooks/useNotify";
import { updateCase } from "@/services/caseService";
import { UpdateCaseParams } from "@/types/caseType";

const useUpdateCasesHook = () => {
  const [loading, setLoading] = useState(false);
  const { notifySuccess, notifyError } = useNotify();

  const updateCasesHandler = useCallback(
    async (caseId: string, updateData: UpdateCaseParams) => {
      setLoading(true);
      try {
        await updateCase(caseId, updateData);
        notifySuccess({ title: "Caso actualizado", description: "Cambios guardados correctamente.", closeButton: true, icon: "✅" });
      } catch (error: any) {
        console.error("Error al actualizar el caso:", error);
        notifyError({ title: "Error actualizando el caso", description: error?.message, closeButton: true, });
      }
      setLoading(false);
    },
    [notifySuccess, notifyError]
  );

  return { updateCase: updateCasesHandler, loading };
};

export default useUpdateCasesHook;
