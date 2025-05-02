import { requestsApi } from "@/lib/api/requestsApi";

export const generateEvaluation = async (evaluationId: string): Promise<void> => {
    await requestsApi.post(`/ia/evaluate`, { evaluationId }
    );
};

export const reEvaluateEvaluation = async (evaluationId: string): Promise<void> =>
    requestsApi.post("/ia/re-evaluate", { evaluationId });