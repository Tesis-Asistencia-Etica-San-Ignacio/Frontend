import { useCallback } from "react";
import { updatePromptText } from "@/services/promptService";
import type { UpdatePromptTextParams } from "@/types/promptType";

const useUpdatePromptText = () => {
  const updatePromptTextHandler = useCallback(
    async (id: string, data: UpdatePromptTextParams) => {
      await updatePromptText(id, data);
    },
    []
  );

  return { updatePromptText: updatePromptTextHandler };
};

export default useUpdatePromptText;
