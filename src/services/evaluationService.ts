import { requestsApi } from "@/lib/api/requestsApi";
import type { FileItem } from "@/types/fileType";
import type { UpdateEvaluationParams } from "@/types/evaluationType";


export const getEvaluationsByUser = async (): Promise<FileItem[]> => {
  const response = await requestsApi.get("/evaluacion/my");
  const evaluations = response.data;
  return evaluations;
};

export const deleteEvaluation = async (evaluationId: string): Promise<void> => {
  await requestsApi.delete(`/evaluacion/${evaluationId}`);
};


export const uploadFile = async (formData: FormData): Promise<void> => {
  console.log("Uploading file with formData:", formData);
  await requestsApi.post("/files/upload", formData);
};

export const updateEvaluation = async (
  evaluationId: string,
  updateData: UpdateEvaluationParams
): Promise<void> => {
  console.log("Updating evaluation with data:", updateData);
  await requestsApi.patch(`/evaluacion/${evaluationId}`, updateData, {
    headers: { "Content-Type": "application/json" },
  });
};
