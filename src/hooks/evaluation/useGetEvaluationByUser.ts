import { useState, useCallback } from "react";
import { getEvaluationsByUser } from "@/services/evaluationService";
import { useNotify } from "@/hooks/useNotify";

const useGetEvaluationsByUserHook = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { notifyError } = useNotify();

  const getFilesByUser = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getEvaluationsByUser();
      setFiles(data);
    } catch (error: any) {
      console.error("Error al obtener los archivos del usuario:", error);
      notifyError({ title: "Error cargando evaluaciones", description: error?.message, closeButton: true, });
    }
    setLoading(false);
  }, [notifyError]);

  return { files, getFilesByUser, loading };
};

export default useGetEvaluationsByUserHook;
