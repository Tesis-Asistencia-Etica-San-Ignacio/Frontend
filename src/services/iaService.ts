import { requestsApi } from "@/lib/api/requestsApi";

export interface IaProvider {
    provider: string
    models: string[]
}

export const generateEvaluation = async (evaluationId: string): Promise<void> => {
    await requestsApi.post(`/ia/evaluate`, { evaluationId }
    );
};

export const reEvaluateEvaluation = async (evaluationId: string): Promise<void> =>
    requestsApi.post("/ia/re-evaluate", { evaluationId });


export async function updateModel(payload: { model: string }) {
    return requestsApi.patch('/config/model', payload)
}
export const updateApiKey = async (payload: { provider: string; apiKey: string }) => {
    await requestsApi.post('/config/api-key', payload)
}

export const getIaProviders = async (): Promise<IaProvider[]> => {
    const { data } = await requestsApi.get<IaProvider[]>('/ia/providers')
    return data
}

export const staticIaProviders: IaProvider[] = [
    {
        provider: 'groq',
        models: [
            'meta-llama/llama-4-scout-17b-16e-instruct',
            'llama-3.3-70b-versatile',
            'llama-3.1-8b-instant',
            'deepseek-r1-distill-llama-70b',
            'meta-llama/llama-4-maverick-17b-128e-instruct',
            'mistral-saba-24b',
        ],
    },
    {
        provider: 'gemini',
        models: [
            'gemini-1.5-8b',
            'gemini-1.5-16b',
            'gemini-1.5-32b',
        ],
    },
]