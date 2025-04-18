import { useState, useCallback } from "react";
import { toast } from "sonner";
import { getAllPrompts } from "@/services/promptService";
import type { Prompt } from "@/types/promptType";

const useGetAllPrompts = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPrompts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllPrompts();
      setPrompts(data);
    } catch (error) {
      console.error("Error al obtener prompts:", error);
      toast.error("Error al obtener prompts");
    } finally {
      setLoading(false);
    }
  }, []);

  return { prompts, fetchPrompts, loading };
};

export default useGetAllPrompts;
