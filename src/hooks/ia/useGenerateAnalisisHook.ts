import { useState, useCallback } from "react";
import { generateEvaluation } from "@/services/iaService";
import { useNotify } from "@/hooks/useNotify";

function useGenerateEvaluation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { notifySuccess, notifyError } = useNotify();

  const generate = useCallback(async (evaluationId: string) => {
    setLoading(true);
    setError(null);

    try {
      await generateEvaluation(evaluationId);
      notifySuccess({ title: "Evaluación generada correctamente", closeButton: true, icon: "✅" });
      return true;
    } catch (err: any) {
      const e = err instanceof Error ? err : new Error("Error desconocido");
      setError(e);
      notifyError({ title: "Error al generar la evaluación", description: e.message, closeButton: true, });
      return false;
    } finally {
      setLoading(false);
    }
  }, [notifySuccess, notifyError]);

  return { generate, loading, error };
}

export default useGenerateEvaluation;
