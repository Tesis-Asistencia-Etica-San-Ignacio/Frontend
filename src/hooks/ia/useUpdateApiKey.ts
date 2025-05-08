import { useState, useCallback } from "react";
import { updateApiKey as updateApiKeyService } from "@/services/iaService";
import { useNotify } from "@/hooks/useNotify";

const useUpdateApiKey = () => {
    const [loading, setLoading] = useState(false);
    const { notifySuccess, notifyError } = useNotify();

    const updateApiKey = useCallback(
        async (newApiKey: string) => {
            setLoading(true);
            try {
                await updateApiKeyService({ apiKey: newApiKey });
                notifySuccess({
                    title: "API Key actualizada",
                    closeButton: true,
                    icon: "✅",
                });
            } catch (error: any) {
                console.error("Error al actualizar API Key:", error);
                notifyError({
                    title: "Error al actualizar API Key",
                    description: error?.response?.data?.message ?? "No se pudo actualizar la API Key.",
                    closeButton: true,
                    icon: "🚫",
                });
            } finally {
                setLoading(false);
            }
        },
        [notifySuccess, notifyError]
    );

    return { updateApiKey, loading };
};

export default useUpdateApiKey;
