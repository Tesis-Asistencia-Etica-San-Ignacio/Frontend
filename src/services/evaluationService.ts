import { evaluationsApi } from "@/lib/api/evaluationsApi"
import type { FileItem } from "@/types/fileType";

export const getEvaluationsByUser = async (): Promise<FileItem[]> => {
    const response = await evaluationsApi.get("/evaluacion/my");
    const evaluations = response.data;
    return evaluations;
  };