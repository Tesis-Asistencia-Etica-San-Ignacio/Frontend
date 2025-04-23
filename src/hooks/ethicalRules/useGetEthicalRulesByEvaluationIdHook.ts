import { useState, useCallback } from "react";
import { toast } from "sonner";
import { getEthicalNormsByEvaluationId } from "@/services/ethicalNormService";
import type { EthicalNormResponseDto } from "@/types/ethicalNormTypes";

const useGetEthicalRulesByEvaluationId = (evaluationId: string) => {
  const [norms, setNorms] = useState<EthicalNormResponseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchNorms = useCallback(async () => {
    if (!evaluationId) return;
    setLoading(true);
    try {
      const data = await getEthicalNormsByEvaluationId(evaluationId);
      setNorms(data);
    } catch (error) {
      console.error("Error al obtener las normas éticas:", error);
      toast.error("Error al obtener las normas éticas", { closeButton: true });
    } finally {
      setLoading(false);
    }
  }, [evaluationId]);

  return { norms, fetchNorms, loading };
};

export default useGetEthicalRulesByEvaluationId;
