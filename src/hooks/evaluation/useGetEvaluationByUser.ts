// src/hooks/useGetFilesByUserHook.ts
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { getEvaluationsByUser } from "@/services/evaluationService";

const useGetEvaluationsByUserHook = () => {
  // Si necesitas almacenar los archivos, puedes descomentar y usar useState.
  // const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);

  const getEvaluationsByUserCallback = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getEvaluationsByUser();
      console.log("Evaluaciones del usuario:", data);
    } catch (error) {
      console.error("Error al obtener los archivos del usuario:", error);
      toast.error("Error al obtener los archivos del usuario");
    }
    setLoading(false);
  }, []);

  return { getFilesByUser: getEvaluationsByUserCallback, loading };
};

export default useGetEvaluationsByUserHook;
