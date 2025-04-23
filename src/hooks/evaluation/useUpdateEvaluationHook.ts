// src/hooks/useUpdateEvaluationHook.ts
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { updateEvaluation } from "@/services/evaluationService";
import type { UpdateEvaluationParams } from "@/types/evaluationType";

const useUpdateEvaluationHook = () => {
  const [loading, setLoading] = useState(false);

  const updateEvaluationHandler = useCallback(
    async (evaluationId: string, updateData: UpdateEvaluationParams) => {
      setLoading(true);
      try {
        await updateEvaluation(evaluationId, updateData);
        toast.success("Evaluación actualizada correctamente");
      } catch (error) {
        console.error("Error al actualizar la evaluación:", error);
        toast.error("Error al actualizar la evaluación", { closeButton: true });
      }
      setLoading(false);
    },
    []
  );

  return { updateEvaluation: updateEvaluationHandler, loading };
};

export default useUpdateEvaluationHook;
