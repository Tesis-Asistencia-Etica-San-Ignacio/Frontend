import { useRef, useEffect, useState } from "react";
import { DynamicFormHandles } from "@/components/molecules/Dynamic-form";
import IATemplate from "@/components/templates/settings/IATemplate";
import useGetMyPrompts from "@/hooks/prompts/useGetPromptsByEvaluator";
import useUpdatePromptText from "@/hooks/prompts/useUpdatePrompt";
import useRefreshPrompts from "@/hooks/prompts/useRefreshPrompts";
import type { FormField } from "@/types/formTypes";
import { useNotify } from "@/hooks/useNotify";
import useUpdateApiKey from "@/hooks/ia/useUpdateApiKey";
import useGetModels from '@/hooks/ia/useGetModels';

export default function IAScreen() {
    const apiKeyFormRef = useRef<DynamicFormHandles>(null);
    const promptsFormRef = useRef<DynamicFormHandles>(null);
    const modelFormRef = useRef<DynamicFormHandles>(null);

    const { data: models = [], isLoading: loadingModels } = useGetModels();
    const { updateApiKey } = useUpdateApiKey();
    const { prompts, fetchPrompts } = useGetMyPrompts();
    const { updatePromptText } = useUpdatePromptText();
    const { refreshPrompts } = useRefreshPrompts();
    const { notifyInfo } = useNotify();

    const [fieldsPrompts, setFieldsPrompts] = useState<FormField[][]>([]);
    const [initialValuesPrompts, setInitialValuesPrompts] = useState<Record<string, string>>({});
    const [idToNamePrompts, setIdToNamePrompts] = useState<Record<string, string>>({});

    useEffect(() => {
        fetchPrompts();
    }, [fetchPrompts]);

    useEffect(() => {
        const sorted = [...prompts].sort((a, b) => {
            console.log("Sorting prompts:", a, b);
            const na = parseFloat(a.codigo.replace(/^Q/, "")) || 0;
            const nb = parseFloat(b.codigo.replace(/^Q/, "")) || 0;
            return na - nb;
        });


        const init: Record<string, string> = {};
        const nameMap: Record<string, string> = {};
        const rows: FormField[][] = [];

        sorted.forEach((p, i) => {
            init[p.id] = p.texto;
            nameMap[p.id] = p.nombre ?? "";
            if (i % 2 === 0) rows.push([]);
            rows[rows.length - 1].push({
                type: "textarea",
                key: p.id,
                placeholder: p.nombre ?? `Prompt ${i + 1}`,
                required: false,
            });
        });

        setInitialValuesPrompts(init);
        setFieldsPrompts(rows);
        setIdToNamePrompts(nameMap);
    }, [prompts]);

    const handleConfirmApiKey = async (newKey: string) => {
        await updateApiKey(newKey);
    };

    const handleConfirmModel = async () => {
    };

    const handleConfirmUpdatePrompts = async (formData: Record<string, string>) => {
        const changed = Object.entries(formData).filter(
            ([id, txt]) => txt !== initialValuesPrompts[id]
        ) as [string, string][];
        if (changed.length === 0) {
            notifyInfo({ title: "Sin cambios", description: "No hay prompts modificados.", closeButton: true });
            return;
        }
        for (const [id, texto] of changed) {
            const nombre = idToNamePrompts[id] ?? id;
            await updatePromptText(id, { texto }, nombre);
        }
        fetchPrompts();
    };

    const handleConfirmResetPrompts = async () => {
        await refreshPrompts();
        fetchPrompts();
    };

    const apiKeyFields: FormField[] = [
        { type: "password", key: "apiKey", placeholder: "Nueva API Key", maxLength: 100 },
    ];

    const modelFields: FormField[] = [
        {
            type: 'select',
            key: 'model',
            placeholder: loadingModels ? 'Cargando...' : 'Selecciona el modelo',
            required: true,
            options: models.map((m) => ({ value: m, label: m })),
        },
    ];

    return (
        <IATemplate
            titleSection1="API Key"
            descSection1="Cambiar la API Key puede afectar el funcionamiento de la plataforma."
            apiKeyFields={apiKeyFields}
            apiKeyFormRef={apiKeyFormRef}
            onConfirmApiKey={handleConfirmApiKey}

            titleSection2="Prompts"
            descSection2="Modifica los prompts de la plataforma."
            modelFields={modelFields}
            modelFormRef={modelFormRef}
            onConfirmModel={handleConfirmModel}


            titleSection3="Prompts"
            descSection3="Modifica los prompts de la plataforma."
            promptsFields={fieldsPrompts}
            promptsFormRef={promptsFormRef}
            initialValuesPrompts={initialValuesPrompts}
            onConfirmUpdatePrompts={handleConfirmUpdatePrompts}
            onConfirmResetPrompts={handleConfirmResetPrompts}
        />
    );
}
