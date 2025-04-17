import { useState, useCallback } from "react";
import { toast } from "sonner";
import { resetPrompts } from "@/services/promptService";

const useRefreshPrompts = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const refreshPrompts = useCallback(
    async (evaluatorId: string) => {
      setLoading(true);
      try {
        await resetPrompts(evaluatorId);
        toast.success("Prompts reinicializados correctamente");
      } catch (error) {
        console.error("Error al reinicializar prompts:", error);
        toast.error("Error al reinicializar prompts");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { refreshPrompts, loading };
};

export default useRefreshPrompts;