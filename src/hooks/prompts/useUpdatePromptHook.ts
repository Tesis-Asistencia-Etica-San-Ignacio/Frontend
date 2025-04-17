// src/hooks/useUpdatePromptText.ts
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { updatePromptText } from "@/services/promptService";
import type { UpdatePromptTextParams } from "@/types/promptType";

const useUpdatePromptText = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const updatePromptTextHandler = useCallback(
    async (promptId: string, updateData: UpdatePromptTextParams) => {
      setLoading(true);
      try {
        await updatePromptText(promptId, updateData);
        toast.success("Prompt actualizado correctamente");
      } catch (error) {
        console.error("Error al actualizar prompt:", error);
        toast.error("Error al actualizar prompt");
      }
      setLoading(false);
    },
    []
  );

  return { updatePromptText: updatePromptTextHandler, loading };
};

export default useUpdatePromptText;
