import { authApi } from "@/lib/api/authApi";
import type { FileItem } from "@/types/fileType";

export const getFilesByUser = async (): Promise<FileItem[]> => {
    const response = await authApi.get("/evaluacion/my");
    const evaluations = response.data;
    // Extrae el objeto "file" de cada evaluación
    //const userFiles: FileItem[] = evaluations.map((evaluation: any) => evaluation.file);
    return evaluations;
  };