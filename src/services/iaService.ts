import { requestsApi } from "@/lib/api/requestsApi";

export const generateEvaluation = async (evaluationId: string): Promise<void> => {
    await requestsApi.post(`/ia/analisis`, { evaluationId }
    );
};