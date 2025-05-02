import { useState, useCallback } from "react";
import { reEvaluateEvaluation } from "@/services/iaService";
import { useNotify } from "@/hooks/useNotify";

export default function useReEvaluateEvaluation() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const { notifySuccess, notifyError } = useNotify();

    const reEvaluate = useCallback(async (evaluationId: string) => {
        setLoading(true);
        setError(null);
        try {
            await reEvaluateEvaluation(evaluationId);
            notifySuccess({
                title: "Re-evaluación iniciada",
                description: "La evaluación está corriendo de nuevo",
                closeButton: true,
                icon: "🔄",
            });
            return true;
        } catch (err: any) {
            const e = err instanceof Error ? err : new Error("Error desconocido");
            setError(e);
            notifyError({
                title: "Error al re-evaluar",
                description: e.message,
                closeButton: true,
            });
            return false;
        } finally {
            setLoading(false);
        }
    }, [notifySuccess, notifyError]);

    return { reEvaluate, loading, error };
}
