import { useState, useCallback } from "react";
import { toast } from "sonner";
import { authApi } from "@/lib/api/authApi";

export interface FileItem {
  id: string;
  name: string;
  size: number;
  url: string;
  // Puedes agregar otros campos según lo requiera tu API
}

const useGetFilesHook = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);

  const getFiles = useCallback(async () => {
    setLoading(true);
    try {
      const response = await authApi.get("/files");
      setFiles(response.data);
    } catch (error) {
      console.error("Error al obtener archivos:", error);
      toast.error("Error al obtener los archivos");
    }
    setLoading(false);
  }, []);

  return { files, getFiles, loading };
};

export default useGetFilesHook;
