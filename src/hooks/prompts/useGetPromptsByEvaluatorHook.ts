import { useState, useCallback } from "react";
import { toast } from "sonner";
import { getPromptsByEvaluator } from "@/services/promptService";
import type { Prompt } from "@/types/promptType";

const useGetPromptsByEvaluator = (evaluatorId: string) => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPrompts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPromptsByEvaluator(evaluatorId);
      setPrompts(data);
    } catch (error) {
      console.error("Error al obtener prompts del evaluador:", error);
      toast.error("Error al obtener prompts");
    } finally {
      setLoading(false);
    }
  }, [evaluatorId]);

  return { prompts, fetchPrompts, loading };
};

export default useGetPromptsByEvaluator;
