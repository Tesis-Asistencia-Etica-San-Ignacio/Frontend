// src/services/ethicalNormService.ts
import { requestsApi } from "@/lib/api/requestsApi"; // Puedes usar la misma instancia o crear otra si lo requieres
import { EthicalNormResponseDto, UpdateEthicalRuleParams } from "@/types/ethicalNormTypes";


export const updateEthicalNorm = async (
    normId: string,
    updateData: UpdateEthicalRuleParams
  ): Promise<void> => {
    console.log("Updating ethical norm with data:", updateData);
    await requestsApi.patch(`/norma-etica/${normId}`, updateData, {
      headers: { "Content-Type": "application/json" },
    });
  };

export const getEthicalNormsByEvaluationId = async (
    evaluationId: string
  ): Promise<EthicalNormResponseDto[]> => {
    const response = await requestsApi.get(`/ethicalRules/evaluation/${evaluationId}`);
    return response.data;
  };