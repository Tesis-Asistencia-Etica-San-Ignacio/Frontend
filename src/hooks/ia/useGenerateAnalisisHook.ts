import { useState, useCallback } from "react";
import { toast } from "sonner";
import { generateEvaluation } from "@/services/iaService";

function useGenerateEvaluation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const generate = useCallback(async (evaluationId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await generateEvaluation(evaluationId);
      toast.success("Evaluación generada correctamente");
      return true;
    } catch (err) {
      console.error("Error al generar la evaluación:", err);
      setError(err instanceof Error ? err : new Error("Error desconocido"));
      toast.error("Error al generar la evaluación", { closeButton: true });
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { generate, loading, error };
}

export default useGenerateEvaluation;