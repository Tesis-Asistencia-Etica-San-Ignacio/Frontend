import { useState, useCallback } from "react";
import { useNotify } from "@/hooks/useNotify";
import { getCasesByUser } from "@/services/caseService";

const useGetCasesByUserHook = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { notifyError } = useNotify();

  const getFilesByUser = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCasesByUser();
      setFiles(data);
    } catch (error: any) {
      console.error("Error al obtener los archivos del usuario:", error);
      notifyError({ title: "Error cargando casos", description: error?.message, closeButton: true, });
    }
    setLoading(false);
  }, [notifyError]);

  return { files, getFilesByUser, loading };
};

export default useGetCasesByUserHook;
