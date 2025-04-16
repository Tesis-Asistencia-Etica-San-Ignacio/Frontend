import { useState, useCallback } from "react";
import { toast } from "sonner";
import { getEvaluationsByUser } from "@/services/evaluationService";

const useGetEvaluationsByUserHook = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const getEvaluationsByUserCallback = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getEvaluationsByUser();
      console.log("Evaluaciones del usuario:", data);
      setFiles(data);
    } catch (error) {
      console.error("Error al obtener los archivos del usuario:", error);
      toast.error("Error al obtener los archivos del usuario");
    }
    setLoading(false);
  }, []);

  return { files, getFilesByUser: getEvaluationsByUserCallback, loading };
};

export default useGetEvaluationsByUserHook;
