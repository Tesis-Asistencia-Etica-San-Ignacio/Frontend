// src/hooks/useDeleteEvaluationHook.ts
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { deleteEvaluation } from "@/services/evaluationService";

const useDeleteEvaluationHook = () => {
  const [loading, setLoading] = useState(false);

  const deleteEvaluationHandler = useCallback(async (evaluationId: string) => {
    setLoading(true);
    try {
      await deleteEvaluation(evaluationId);
      toast.success("Evaluación eliminada correctamente");
    } catch (error) {
      console.error("Error al eliminar la evaluación:", error);
      toast.error("Error al eliminar la evaluación", { closeButton: true });
    }
    setLoading(false);
  }, []);

  return { deleteEvaluation: deleteEvaluationHandler, loading };
};

export default useDeleteEvaluationHook;
