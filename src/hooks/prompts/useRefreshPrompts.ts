import { useState, useCallback } from "react";
import { resetMyPrompts } from "@/services/promptService";
import { useNotify } from "@/hooks/useNotify";

const useRefreshPrompts = () => {
  const [loading, setLoading] = useState(false);
  const { notifySuccess, notifyError } = useNotify();

  const refreshPrompts = useCallback(async () => {
    setLoading(true);
    try {
      await resetMyPrompts();
      notifySuccess({
        title: "Prompts reiniciados",
        description: "Se restauraron al estado base.",
        closeButton: true,
        icon: "✅"
      });
    } catch (error: any) {
      console.error("Error al reiniciar prompts:", error);
      notifyError({
        title: "Error al reiniciar prompts",
        description: error.message ?? "No se pudieron reiniciar los prompts.",
        closeButton: true,
      });
    } finally {
      setLoading(false);
    }
  }, [notifySuccess, notifyError]);

  return { refreshPrompts, loading };
};

export default useRefreshPrompts;
