// screens/PromptsScreen.tsx
import { useRef, useEffect, useState } from "react";
import { DynamicFormHandles } from "@/components/molecules/Dynamic-form";
import PromptsTemplate from "@/components/templates/settings/PromptsTemplate";
import useGetMyPrompts from "@/hooks/prompts/useGetPromptsByEvaluatorHook";
import useUpdatePromptText from "@/hooks/prompts/useUpdatePromptHook";
import useRefreshPrompts from "@/hooks/prompts/useRefreshPromptsHook";
import type { FormField } from "@/types/formTypes";
import { ConfirmDialogProps } from "@/components/organisms/dialogs/ConfirmDialog";
import { useNotify } from "@/hooks/useNotify";

export default function PromptsScreen() {
    const formRef = useRef<DynamicFormHandles>(null);
    const { prompts, fetchPrompts } = useGetMyPrompts();
    const { updatePromptText } = useUpdatePromptText();
    const { refreshPrompts } = useRefreshPrompts();
    const { notifySuccess, notifyError, notifyInfo } = useNotify();

    const [fields, setFields] = useState<FormField[][]>([]);
    const [initialValues, setInitialValues] = useState<Record<string, string>>({});

    useEffect(() => {
        fetchPrompts();
    }, []);

    useEffect(() => {
        const init: Record<string, string> = {};
        const rows: FormField[][] = [];
        prompts.forEach((p, i) => {
            init[p.id] = p.texto;
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
    }, [prompts]);

    /* toasts solo para reset */
    const resetSuccessToast: ConfirmDialogProps["successToast"] = {
        title: "Prompts reiniciados",
        description: "Se restauraron al estado base.",
        icon: "✅",
        closeButton: true,
    };
    const resetErrorToast: ConfirmDialogProps["errorToast"] = {
        title: "Error al reiniciar",
        description: "No se pudieron reiniciar los prompts.",
        icon: "🚫",
        closeButton: true,
    };

    const handleConfirmUpdate = async (formData: Record<string, string>) => {
        const changed = Object.entries(formData).filter(
            ([id, txt]) => txt !== initialValues[id]
        ) as [string, string][];

        if (!changed.length) {
            notifyInfo({
                title: "Sin cambios",
                description: "No hay prompts modificados.",
                closeButton: true,
            });
            return;
        }

        for (const [id, texto] of changed) {
            try {
                await updatePromptText(id, { texto });
                notifySuccess({
                    title: "Prompt actualizado",
                    description: `Prompt ${id} guardado correctamente.`,
                    icon: "✅",
                    closeButton: true,
                });
            } catch (e: any) {
                notifyError({
                    title: `Error en prompt ${id}`,
                    description: e?.response?.data?.message ?? "No se pudo guardar el prompt.",
                    icon: "🚫",
                    closeButton: true,
                });
            }
        }

        fetchPrompts();
    };

    const handleConfirmReset = async () => {
        try {
            await refreshPrompts();
            notifySuccess(resetSuccessToast);
            fetchPrompts();
        } catch (e: any) {
            notifyError({
                ...resetErrorToast,
                description: e?.response?.data?.message ?? resetErrorToast.description,
            });
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
            /* no pasamos confirmUpdateToast -> no habrá toast del dialog */
            confirmResetToast={{ success: resetSuccessToast, error: resetErrorToast }}
        />
    );
}
