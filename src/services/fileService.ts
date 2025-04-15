// src/services/fileService.ts
import { authApi } from "@/lib/api/authApi";
import type { FileItem, UpdateFileParams } from "@/types/fileType";


export const getFiles = async (): Promise<FileItem[]> => {
  const response = await authApi.get("/files");
  return response.data;
};


export const deleteFile = async (id: string): Promise<void> => {
  await authApi.delete(`/files/${id}`);
};


export const updateFile = async (params: UpdateFileParams): Promise<void> => {
  await authApi.put(`/files/${params.id}`, params);
};


export const uploadFile = async (formData: FormData): Promise<void> => {
  console.log("Uploading file with formData:", formData);
  await authApi.post("/files/upload", formData);
};
