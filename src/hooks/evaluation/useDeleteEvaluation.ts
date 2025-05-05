import { useState, useCallback } from "react";
import { deleteEvaluation } from "@/services/evaluationService";
import { useNotify } from "@/hooks/useNotify";

const useDeleteEvaluationHook = () => {
  const [loading, setLoading] = useState(false);
  const { notifySuccess, notifyError } = useNotify();

  const deleteEvaluationHandler = useCallback(async (evaluationId: string) => {
    setLoading(true);
    try {
      await deleteEvaluation(evaluationId);
      notifySuccess({ title: "Evaluación eliminada", description: "Se eliminó correctamente.", closeButton: true, icon: "✅" });
    } catch (error: any) {
      console.error("Error al eliminar la evaluación:", error);
      notifyError({ title: "Error eliminando evaluación", description: error?.message, closeButton: true });
    }
    setLoading(false);
  }, [notifySuccess, notifyError]);

  return { deleteEvaluation: deleteEvaluationHandler, loading };
};

export default useDeleteEvaluationHook;
