import { useState, useCallback } from "react";
import { updateEvaluation } from "@/services/evaluationService";
import type { UpdateEvaluationParams } from "@/types/evaluationType";
import { useNotify } from "@/hooks/useNotify";

const useUpdateEvaluationHook = () => {
  const [loading, setLoading] = useState(false);
  const { notifySuccess, notifyError } = useNotify();

  const updateEvaluationHandler = useCallback(
    async (evaluationId: string, updateData: UpdateEvaluationParams) => {
      setLoading(true);
      try {
        await updateEvaluation(evaluationId, updateData);
        notifySuccess({ title: "Evaluación actualizada", description: "Cambios guardados correctamente.", closeButton: true, icon: "✅" });
      } catch (error: any) {
        console.error("Error al actualizar la evaluación:", error);
        notifyError({ title: "Error actualizando evaluación", description: error?.message, closeButton: true, });
      }
      setLoading(false);
    },
    [notifySuccess, notifyError]
  );

  return { updateEvaluation: updateEvaluationHandler, loading };
};

export default useUpdateEvaluationHook;
