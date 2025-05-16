import { requestsApi } from "@/lib/api/requestsApi";
import type { FileItem } from "@/types/fileType";


export const getCasesByUser = async (): Promise<FileItem[]> => {
  const response = await requestsApi.get("/cases/my");
  const cases = response.data;
  return cases;
};

export const deleteCase = async (caseId: string): Promise<void> => {
  await requestsApi.delete(`/cases/${caseId}`);
};

export const createCase = async (caseData: Record<string, any>): Promise<void> => {
  await requestsApi.post("/pdf/save-investigator", caseData, {
    headers: { "Content-Type": "application/json" },
  });
};

export const getCasePdf = async (filename: string): Promise<Blob> => {
  // llama a tu endpoint que sirve el PDF
  const response = await requestsApi.get(`/files/pdf/${filename}`, {
    responseType: "blob"
  });
  return response.data;
};
