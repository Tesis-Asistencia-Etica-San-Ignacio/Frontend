import { requestsApi } from "@/lib/api/requestsApi";
import type { FileItem } from "@/types/fileType";
import type { UpdateEvaluationParams } from "@/types/evaluationType";
import { AxiosProgressEvent } from "axios";
import { UpdateCaseParams } from "@/types/caseType";


export const getCasesByUser = async (): Promise<FileItem[]> => {
  const response = await requestsApi.get("/cases/my");
  const evaluations = response.data;
  return evaluations;
};

export const deleteCase = async (caseId: string): Promise<void> => {
  await requestsApi.delete(`/cases/${caseId}`);
};

export const createCase = async (caseData: Record<string, any>): Promise<void> => {
  await requestsApi.post("/cases", caseData, {
    headers: { "Content-Type": "application/json" },
  });
};


/*export const uploadFile = async (
  formData: FormData,
  onProgress?: (event: AxiosProgressEvent) => void
): Promise<void> => {
  await requestsApi.post("/files/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: onProgress,
  })
}*/

export const updateCase = async (
    caseId: string,
  updateData: UpdateCaseParams
): Promise<void> => {
  console.log("Updating case with data:", updateData);
  await requestsApi.patch(`/cases/${caseId}`, updateData, {
    headers: { "Content-Type": "application/json" },
  });
};
