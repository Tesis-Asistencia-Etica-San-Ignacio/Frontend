import { pdfApi } from '../lib/api/pdfApi';

export const generatePdfByEvaluationId = async (
    evaluationId: string
  ): Promise<Blob> => {
    const response = await pdfApi.post(
      `/pdf/generate`,
      { evaluationId },
      { responseType: "blob" }
    );
    return response.data;
  };