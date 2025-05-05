import { useState, useCallback } from "react";
import { useNotify } from "@/hooks/useNotify";
import { deleteCase } from "@/services/caseService";

const useDeleteCasesHook = () => {
  const [loading, setLoading] = useState(false);
  const { notifySuccess, notifyError } = useNotify();

  const deleteCaseHandler = useCallback(async (caseId: string) => {
    setLoading(true);
    try {
      await deleteCase(caseId);
      notifySuccess({ title: "Caso eliminada", description: "Se eliminó correctamente.", closeButton: true, icon: "✅" });
    } catch (error: any) {
      console.error("Error al eliminar la caso:", error);
      notifyError({ title: "Error eliminando caso", description: error?.message, closeButton: true });
    }
    setLoading(false);
  }, [notifySuccess, notifyError]);

  return { deleteCase: deleteCaseHandler, loading };
};

export default useDeleteCasesHook;
