import { useState, useCallback } from "react";
import { updateEthicalNorm } from "@/services/ethicalNormService";
import type { UpdateEthicalRuleParams } from "@/types/ethicalNormTypes";
import { useNotify } from "@/hooks/useNotify";

const useUpdateEthicalNormHook = () => {
  const [loading, setLoading] = useState(false);
  const { notifySuccess, notifyError } = useNotify();

  const updateEthicalNormHandler = useCallback(
    async (normId: string, updateData: UpdateEthicalRuleParams) => {
      setLoading(true);
      try {
        await updateEthicalNorm(normId, updateData);
        notifySuccess({
          title: "Norma ética actualizada",
          description: "Se guardaron los cambios correctamente.",
          closeButton: true,
        });
      } catch (error: any) {
        console.error("Error al actualizar la norma ética:", error);
        notifyError({
          title: "Error al actualizar norma ética",
          description: error?.message,
          closeButton: true,
        });
      } finally {
        setLoading(false);
      }
    },
    [notifySuccess, notifyError]
  );

  return { updateEthicalNorm: updateEthicalNormHandler, loading };
};

export default useUpdateEthicalNormHook;
