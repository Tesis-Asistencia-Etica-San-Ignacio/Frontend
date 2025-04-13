import { useState, useCallback } from "react";
import { toast } from "sonner";

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
      const response = await fetch("http://localhost:3000/api/files", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setFiles(data);
      } else {
        toast.error("Error al obtener los archivos");
      }
    } catch (error) {
      console.error("Error al obtener archivos:", error);
      toast.error("Error al obtener los archivos");
    }
    setLoading(false);
  }, []);

  return { files, getFiles, loading };
};

export default useGetFilesHook;
