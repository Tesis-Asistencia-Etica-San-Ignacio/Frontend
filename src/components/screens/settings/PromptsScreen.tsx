import { useRef, useEffect, useState } from "react";
import { DynamicFormHandles } from "@/components/molecules/Dynamic-form";
import PromptsTemplate from "@/components/templates/settings/PromptsTemplate";
import useGetMyPrompts from "@/hooks/prompts/useGetPromptsByEvaluator";
import useUpdatePromptText from "@/hooks/prompts/useUpdatePrompt";
import useRefreshPrompts from "@/hooks/prompts/useRefreshPrompts";
import type { FormField } from "@/types/formTypes";
import { useNotify } from "@/hooks/useNotify";

export default function PromptsScreen() {
    const formRef = useRef<DynamicFormHandles>(null);
    const { prompts, fetchPrompts } = useGetMyPrompts();
    const { updatePromptText } = useUpdatePromptText();
    const { refreshPrompts } = useRefreshPrompts();
    const { notifyInfo } = useNotify();

    const [fields, setFields] = useState<FormField[][]>([]);
    const [initialValues, setInitialValues] = useState<Record<string, string>>({});
    const [idToName, setIdToName] = useState<Record<string, string>>({});

    useEffect(() => {
        fetchPrompts();
    }, [fetchPrompts]);

    useEffect(() => {
        const init: Record<string, string> = {};
        const nameMap: Record<string, string> = {};
        const rows: FormField[][] = [];

        prompts.forEach((p, i) => {
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

        setInitialValues(init);
        setFields(rows);
        setIdToName(nameMap);
    }, [prompts]);

    const handleConfirmUpdate = async (formData: Record<string, string>) => {
        const changed = Object.entries(formData).filter(
            ([id, txt]) => txt !== initialValues[id]
        ) as [string, string][];
        if (changed.length === 0) {
            notifyInfo({ title: "Sin cambios", description: "No hay prompts modificados.", closeButton: true });
            return;
        }
        for (const [id, texto] of changed) {
            const nombre = idToName[id] ?? id;
            try {
                await updatePromptText(id, { texto }, nombre);
            } catch {
            }
        }
        fetchPrompts();
    };

    const handleConfirmReset = async () => {
        try {
            await refreshPrompts();
            fetchPrompts();
        } catch {
        }
    };

    return (
        <PromptsTemplate
            title="Prompts"
            desc="Modifica los prompts de la plataforma."
            fields={fields}
            formRef={formRef}
            initialValues={initialValues}
            onConfirmUpdate={handleConfirmUpdate}
            onConfirmReset={handleConfirmReset}
        />
    );
}
