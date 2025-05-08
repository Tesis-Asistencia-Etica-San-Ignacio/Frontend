import { requestsApi } from "@/lib/api/requestsApi";

export const generateEvaluation = async (evaluationId: string): Promise<void> => {
    await requestsApi.post(`/ia/evaluate`, { evaluationId }
    );
};

export const reEvaluateEvaluation = async (evaluationId: string): Promise<void> =>
    requestsApi.post("/ia/re-evaluate", { evaluationId });

export const updateApiKey = async (payload: { apiKey: string }): Promise<void> => {
    await requestsApi.patch('/ia/apiKey', payload);
};

export async function updateModel(payload: { model: string }) {
    return requestsApi.patch('/config/model', payload)
}

export const getModels = async (): Promise<string[]> => {
    const { data } = await requestsApi.get<string[]>('/config/models');
    return data;
};