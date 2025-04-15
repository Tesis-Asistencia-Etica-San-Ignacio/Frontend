// src/hooks/useGetFilesByUserHook.ts
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { getFilesByUser } from "@/services/evaluationService";

const useGetEvaluationsByUserHook = () => {
  // Si necesitas almacenar los archivos, puedes descomentar y usar useState.
  // const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);

  const getFilesByUserCallback = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getFilesByUser();
      console.log("Evaluaciones del usuario:", data);

      // Si la respuesta contiene evaluaciones que deben transformarse,
      // por ejemplo:
      // const userFiles = data.map((evaluation: any) => evaluation.file);
      // setFiles(userFiles);
    } catch (error) {
      console.error("Error al obtener los archivos del usuario:", error);
      toast.error("Error al obtener los archivos del usuario");
    }
    setLoading(false);
  }, []);

  return { getFilesByUser: getFilesByUserCallback, loading };
};

export default useGetEvaluationsByUserHook;
