import React, { useState } from "react";
import ContentSection from "@/components/molecules/ContentSection";
import {
    DynamicForm,
    DynamicFormHandles,
} from "@/components/molecules/Dynamic-form";
import { Button } from "@/components/atoms/ui/button";
import ConfirmDialog, {
    ConfirmDialogProps,
} from "@/components/organisms/dialogs/ConfirmDialog";
import { TriangleAlert } from "lucide-react";
import { Label } from "@/components/atoms/ui/label";
import { Input } from "@/components/atoms/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/atoms/ui/alert";
import type { FormField } from "@/types/formTypes";
import { useNotify } from "@/hooks/useNotify";

interface PromptsTemplateProps {
    title: string;
    desc: string;
    fields: FormField[][];
    formRef: React.RefObject<DynamicFormHandles | null>;
    initialValues: Record<string, string>;
    onUpdatePrompt: (id: string, texto: string) => Promise<void>;
    onResetPrompts: () => Promise<void>;
    confirmUpdateToast: {
        success: ConfirmDialogProps["successToast"];
        error: ConfirmDialogProps["errorToast"];
    };
    confirmResetToast: {
        success: ConfirmDialogProps["successToast"];
        error: ConfirmDialogProps["errorToast"];
    };
}

export default function PromptsTemplate({
    title,
    desc,
    fields,
    formRef,
    initialValues,
    onUpdatePrompt,
    onResetPrompts,
    confirmUpdateToast,
    confirmResetToast,
}: PromptsTemplateProps) {
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openReset, setOpenReset] = useState(false);
    const [confirmValue, setConfirmValue] = useState("");
    const { notifySuccess, notifyError, notifyInfo } = useNotify();

    const handleConfirmUpdate = () => {
        formRef.current?.handleSubmit(async (data) => {
            const changed = Object.entries(data).filter(
                ([id, txt]) => txt !== initialValues[id]
            ) as [string, string][];

            if (!changed.length) {
                notifyInfo({
                    title: "Sin cambios",
                    description: "No hay prompts modificados.",
                });
                return;
            }

            try {
                for (const [id, texto] of changed) {
                    try {
                        await onUpdatePrompt(id, texto);
                        notifySuccess({
                            title: "Prompt actualizado",
                            description: `Prompt ${id} guardado correctamente.`,
                            icon: "✅",
                            closeButton: true,
                        });
                    } catch (e: any) {
                        notifyError({
                            title: "Error al actualizar",
                            description:
                                e?.response?.data?.message ??
                                `No se pudo actualizar el prompt ${id}.`,
                            icon: "🚫",
                            closeButton: true,
                        });
                    }
                }
                setOpenUpdate(false);
            } catch {
                // fallo global
            }
        })();
    };

    const handleConfirmReset = async () => {
        try {
            await onResetPrompts();
            notifySuccess(confirmResetToast.success);
        } catch (e: any) {
            notifyError({
                ...confirmResetToast.error,
                description:
                    e?.response?.data?.message ?? confirmResetToast.error.description,
            });
        } finally {
            setOpenReset(false);
            setConfirmValue("");
        }
    };

    return (
        <ContentSection title={title} desc={desc}>
            <>
                <DynamicForm
                    ref={formRef}
                    formDataConfig={fields}
                    containerClassName="flex flex-col gap-4"
                    initialData={initialValues}
                />

                <div className="flex gap-2 mt-4">
                    <Button onClick={() => setOpenUpdate(true)}>Actualizar Prompts</Button>
                    <Button variant="destructive" onClick={() => setOpenReset(true)}>
                        Reiniciar Prompts
                    </Button>
                </div>

                {/* diálogo actualizar */}
                <ConfirmDialog
                    open={openUpdate}
                    onOpenChange={setOpenUpdate}
                    handleConfirm={handleConfirmUpdate}
                    successToast={confirmUpdateToast.success}
                    errorToast={confirmUpdateToast.error}
                    title="¿Actualizar prompts?"
                    description="Se guardarán solamente los prompts que hayas modificado."
                    confirmText="Sí, actualizar"
                />

                {/* diálogo reset */}
                <ConfirmDialog
                    open={openReset}
                    onOpenChange={setOpenReset}
                    handleConfirm={handleConfirmReset}
                    disabled={confirmValue.trim() !== "REINICIAR"}
                    destructive
                    successToast={confirmResetToast.success}
                    errorToast={confirmResetToast.error}
                    title={
                        <span className="text-destructive">
                            <TriangleAlert size={18} className="inline-block mr-1" />
                            Reiniciar Prompts
                        </span>
                    }
                    description={
                        <div className="space-y-4">
                            <p>
                                Esta acción borrará y restaurará <strong>todos</strong> los
                                prompts al estado base. Para confirmar, escribe{" "}
                                <code>REINICIAR</code>:
                            </p>
                            <Label>
                                <Input
                                    value={confirmValue}
                                    onChange={(e) => setConfirmValue(e.target.value)}
                                    placeholder="REINICIAR"
                                />
                            </Label>
                            <Alert variant="destructive">
                                <AlertTitle>¡Atención!</AlertTitle>
                                <AlertDescription>
                                    Esta acción no se puede deshacer.
                                </AlertDescription>
                            </Alert>
                        </div>
                    }
                    confirmText="Reiniciar"
                />
            </>
        </ContentSection>
    );
}
