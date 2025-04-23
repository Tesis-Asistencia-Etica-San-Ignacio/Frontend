import { useRef, useEffect, useState } from "react";
import { DynamicFormHandles } from "@/components/molecules/Dynamic-form";
import PromptsTemplate from "@/components/templates/settings/PromptsTemplate";
import useGetMyPrompts from "@/hooks/prompts/useGetPromptsByEvaluatorHook";
import useUpdatePromptText from "@/hooks/prompts/useUpdatePromptHook";
import useRefreshPrompts from "@/hooks/prompts/useRefreshPromptsHook";
import type { FormField } from "@/types/formTypes";
import { ConfirmDialogProps } from "@/components/organisms/dialogs/ConfirmDialog";

export default function PromptsScreen() {
    const formRef = useRef<DynamicFormHandles>(null);

    const { prompts, fetchPrompts } = useGetMyPrompts();
    const { updatePromptText } = useUpdatePromptText();
    const { refreshPrompts } = useRefreshPrompts();

    /* ----- construir campos e initialData ----- */
    const [fields, setFields] = useState<FormField[][]>([]);
    const [initialValues, setInitialValues] = useState<Record<string, string>>({});

    useEffect(() => {
        fetchPrompts();
    }, []);

    useEffect(() => {
        const init: Record<string, string> = {};
        prompts.forEach((p) => (init[p.id] = p.texto));
        setInitialValues(init);

        const rows: FormField[][] = [];
        for (let i = 0; i < prompts.length; i += 2) {
            rows.push(
                prompts.slice(i, i + 2).map((p) => ({
                    type: "textarea",
                    key: p.id,
                    placeholder: "",
                    required: false,
                }))
            );
        }
        setFields(rows);
    }, [prompts]);

    /* ---- toasts ---- */
    const updateSuccessToast: ConfirmDialogProps["successToast"] = {
        title: "Prompts actualizados",
        description: "Se guardaron los cambios.",
        icon: "✅",
        closeButton: true,
    };
    const updateErrorToast: ConfirmDialogProps["errorToast"] = {
        title: "Error de actualización",
        description: "Uno o más prompts no pudieron guardarse.",
        icon: "🚫",
        closeButton: true,
    };
    const resetSuccessToast: ConfirmDialogProps["successToast"] = {
        title: "Prompts reiniciados",
        description: "Se restauraron los prompts al estado base.",
        icon: "✅",
        closeButton: true,
    };
    const resetErrorToast: ConfirmDialogProps["errorToast"] = {
        title: "Error al reiniciar",
        description: "No se pudieron reiniciar los prompts.",
        icon: "🚫",
        closeButton: true,
    };

    return (
        <PromptsTemplate
            title="Prompts"
            desc="Modifica los prompts de la plataforma."
            fields={fields}
            formRef={formRef}
            initialValues={initialValues}
            onUpdatePrompt={(id, texto) => updatePromptText(id, { texto })}
            onResetPrompts={refreshPrompts}
            confirmUpdateToast={{ success: updateSuccessToast, error: updateErrorToast }}
            confirmResetToast={{ success: resetSuccessToast, error: resetErrorToast }}
        />
    );
}
