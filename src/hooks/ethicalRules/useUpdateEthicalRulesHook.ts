// src/hooks/useUpdateEthicalNormHook.ts
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { updateEthicalNorm } from "@/services/ethicalNormService";
import type { UpdateEthicalRuleParams } from "@/types/ethicalNormTypes";

const useUpdateEthicalNormHook = () => {
  const [loading, setLoading] = useState(false);

  const updateEthicalNormHandler = useCallback(
    async (normId: string, updateData: UpdateEthicalRuleParams) => {
      setLoading(true);
      try {
        await updateEthicalNorm(normId, updateData);
        toast.success("Norma ética actualizada correctamente");
      } catch (error) {
        console.error("Error al actualizar la norma ética:", error);
        toast.error("Error al actualizar la norma ética");
      }
      setLoading(false);
    },
    []
  );

  return { updateEthicalNorm: updateEthicalNormHandler, loading };
};

export default useUpdateEthicalNormHook;
