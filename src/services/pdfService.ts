import { requestsApi } from '../lib/api/requestsApi';

export const generatePdfByEvaluationId = async (
  evaluationId: string
): Promise<Blob> => {
  const response = await requestsApi.post(
    `/pdf/generate`,
    { evaluationId },
    { responseType: "blob" }
  );
  return response.data;
};

  export const generatePdfInvestigator = async (
    data: any
  ): Promise<Blob> => {
    const response = await requestsApi.post(
      `/pdf/generate-investigator`,
      { data },
      { responseType: "blob" }
    );
    return response.data;
  };