// components/templates/settings/PromptsTemplate.tsx
import React, { useState } from "react";
import ContentSection from "@/components/molecules/ContentSection";
import { DynamicForm, DynamicFormHandles } from "@/components/molecules/Dynamic-form";
import { Button } from "@/components/atoms/ui/button";
import ConfirmDialog, { ConfirmDialogProps } from "@/components/organisms/dialogs/ConfirmDialog";
import { TriangleAlert } from "lucide-react";
import { Label } from "@/components/atoms/ui/label";
import { Input } from "@/components/atoms/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/atoms/ui/alert";
import type { FormField } from "@/types/formTypes";

interface PromptsTemplateProps {
    title: string;
    desc: string;
    fields: FormField[][];
    formRef: React.RefObject<DynamicFormHandles | null>;
    initialValues: Record<string, string>;
    onConfirmUpdate: (data: Record<string, string>) => Promise<void>;
    onConfirmReset: () => Promise<void>;
    /* update es opcional; reset requerido */
    confirmUpdateToast?: {
        success?: ConfirmDialogProps["successToast"];
        error?: ConfirmDialogProps["errorToast"];
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
    onConfirmUpdate,
    onConfirmReset,
    confirmUpdateToast,
    confirmResetToast,
}: PromptsTemplateProps) {
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openReset, setOpenReset] = useState(false);
    const [confirmValue, setConfirmValue] = useState("");

    const dynamicKey = Object.keys(initialValues).join("|");

    return (
        <ContentSection title={title} desc={desc}>
            <>
                <DynamicForm
                    key={dynamicKey}
                    ref={formRef}
                    formDataConfig={fields}
                    initialData={initialValues}
                    containerClassName="flex flex-col gap-4"
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
                    handleConfirm={() =>
                        formRef.current?.handleSubmit(async (data) => {
                            await onConfirmUpdate(data);
                            setOpenUpdate(false);
                        })()
                    }
                    successToast={confirmUpdateToast?.success}
                    errorToast={confirmUpdateToast?.error}
                    title="¿Actualizar prompts?"
                    description="Sólo se guardarán los prompts modificados."
                    confirmText="Sí, actualizar"
                />

                {/* diálogo reset */}
                <ConfirmDialog
                    open={openReset}
                    onOpenChange={setOpenReset}
                    handleConfirm={async () => {
                        await onConfirmReset();
                        setOpenReset(false);
                        setConfirmValue("");
                    }}
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
                                Esto borrará y restaurará <strong>todos</strong> los prompts al estado base.
                                Para confirmar, escribe <code>REINICIAR</code>:
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
                                <AlertDescription>Esta acción no se puede deshacer.</AlertDescription>
                            </Alert>
                        </div>
                    }
                    confirmText="Reiniciar"
                />
            </>
        </ContentSection>
    );
}
