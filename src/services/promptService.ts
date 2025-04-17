// src/services/promptsService.ts
import { requestsApi } from "@/lib/api/requestsApi"; // Cambia esto por la instancia de API que estés usando
import type { Prompt, UpdatePromptTextParams  } from "@/types/promptType";


export const getAllPrompts = async (): Promise<Prompt[]> => {
  const response = await requestsApi.get("/prompts");
  return response.data;
};

export const updatePromptText = async (
    promptId: string,
    updateData: UpdatePromptTextParams
  ): Promise<void> => {
    await requestsApi.patch(`/prompts/${promptId}`, updateData, {
      headers: { "Content-Type": "application/json" },
    });
  };


  /**
 * Obtiene todos los prompts asociados a un evaluador dado.
 */
export const getPromptsByEvaluator = async (
    evaluatorId: string
  ): Promise<Prompt[]> => {
    const response = await requestsApi.get(
      `/prompts/user/${evaluatorId}`
    );
    return response.data;
  };
  
  /**
   * Reinicializa los prompts de un evaluador: borra y recrea desde la semilla.
   */
  export const resetPrompts = async (
    evaluatorId: string
  ): Promise<void> => {
    await requestsApi.post(
      `/prompts/user/${evaluatorId}/reset-prompts`
    );
  };
  