import { useState, useCallback } from "react";
import { getEthicalNormsByEvaluationId } from "@/services/ethicalNormService";
import type { EthicalNormResponseDto } from "@/types/ethicalNormTypes";
import { useNotify } from "@/hooks/useNotify";

const useGetEthicalRulesByEvaluationId = (evaluationId: string) => {
  const [norms, setNorms] = useState<EthicalNormResponseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { notifyError } = useNotify();

  const fetchNorms = useCallback(async () => {
    if (!evaluationId) return;
    setLoading(true);
    try {
      const data = await getEthicalNormsByEvaluationId(evaluationId);
      setNorms(data);
    } catch (error: any) {
      console.error("Error al obtener las normas éticas:", error);
      notifyError({
        title: "Error al obtener normas éticas",
        description: error?.message,
        closeButton: true,
      });
    } finally {
      setLoading(false);
    }
  }, [evaluationId, notifyError]);

  return { norms, fetchNorms, loading };
};

export default useGetEthicalRulesByEvaluationId;
