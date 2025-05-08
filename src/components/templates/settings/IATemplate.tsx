import React, { useState } from "react";
import ContentSection from "@/components/molecules/ContentSection";
import { DynamicForm, DynamicFormHandles } from "@/components/molecules/Dynamic-form";
import { Button } from "@/components/atoms/ui/button";
import ConfirmDialog from "@/components/organisms/dialogs/ConfirmDialog";
import { TriangleAlert } from "lucide-react";
import { Label } from "@/components/atoms/ui/label";
import { Input } from "@/components/atoms/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/atoms/ui/alert";
import type { FormField } from "@/types/formTypes";

interface IATemplateProps {
    title: string;
    desc: string;
    // API Key
    apiKeyFields: FormField[];
    apiKeyFormRef: React.RefObject<DynamicFormHandles | null>;
    onConfirmApiKey: (newKey: string) => Promise<void>;
    // Prompts
    promptsFields: FormField[][];
    promptsFormRef: React.RefObject<DynamicFormHandles | null>;
    initialValuesPrompts: Record<string, string>;
    onConfirmUpdatePrompts: (data: Record<string, string>) => Promise<void>;
    onConfirmResetPrompts: () => Promise<void>;
}

export default function IATemplate({
    title,
    desc,
    apiKeyFields,
    apiKeyFormRef,
    onConfirmApiKey,
    promptsFields,
    promptsFormRef,
    initialValuesPrompts,
    onConfirmUpdatePrompts,
    onConfirmResetPrompts,
}: IATemplateProps) {
    const [openApiKey, setOpenApiKey] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openReset, setOpenReset] = useState(false);
    const [confirmValue, setConfirmValue] = useState("");

    const dynamicKey = Object.keys(initialValuesPrompts).join("|");

    return (
        <div className="flex flex-col w-full">
            <ContentSection title="API Key" desc="Cambiar la API Key puede afectar el funcionamiento de la plataforma.">
                <div className="lg:max-w-xl space-y-4">
                    <DynamicForm
                        ref={apiKeyFormRef}
                        formDataConfig={apiKeyFields}
                        initialData={{}}
                        containerClassName="flex flex-col gap-4"
                    />
                    <Button onClick={() => setOpenApiKey(true)}>Actualizar API Key</Button>
                </div>
                <ConfirmDialog
                    open={openApiKey}
                    onOpenChange={setOpenApiKey}
                    handleConfirm={async () => {
                        await onConfirmResetPrompts();
                        setOpenReset(false);
                        setConfirmValue("");
                    }}
                    disabled={confirmValue.trim() !== "CAMBIAR API KEY"}
                    destructive
                    title={
                        <span className="text-destructive">
                            <TriangleAlert size={18} className="inline-block mr-1" />
                            Cambiar API Key
                        </span>
                    }
                    description={
                        <div className="space-y-4">
                            <p>
                                Esto cambiara la API Key de la plataforma.
                                Para confirmar, escribe <code>CAMBIAR API KEY</code>
                            </p>
                            <Label>
                                <Input
                                    value={confirmValue}
                                    onChange={(e) => setConfirmValue(e.target.value)}
                                    placeholder="CAMBIAR API KEY"
                                />
                            </Label>
                            <Alert variant="destructive">
                                <AlertTitle>¡Atención!</AlertTitle>
                                <AlertDescription>Esta acción podria cambiar el funcionamiento de la plataforma.</AlertDescription>
                            </Alert>
                        </div>
                    }
                    confirmText="Reiniciar"
                />
            </ContentSection>

            <ContentSection title={title} desc={desc}>
                <>
                    <DynamicForm
                        key={dynamicKey}
                        ref={promptsFormRef}
                        formDataConfig={promptsFields}
                        initialData={initialValuesPrompts}
                        containerClassName="flex flex-col gap-4"
                    />

                    <div className="flex gap-2 mt-4">
                        <Button onClick={() => setOpenUpdate(true)}>Actualizar Prompts</Button>
                        <Button variant="destructive" onClick={() => setOpenReset(true)}>
                            Reiniciar Prompts
                        </Button>
                    </div>

                    <ConfirmDialog
                        open={openUpdate}
                        onOpenChange={setOpenUpdate}
                        handleConfirm={() =>
                            promptsFormRef.current?.handleSubmit(async (data) => {
                                await onConfirmUpdatePrompts(data);
                                setOpenUpdate(false);
                            })()
                        }
                        title="¿Actualizar prompts?"
                        description="Sólo se guardarán los prompts modificados."
                        confirmText="Sí, actualizar"
                    />

                    <ConfirmDialog
                        open={openReset}
                        onOpenChange={setOpenReset}
                        handleConfirm={async () => {
                            await onConfirmResetPrompts();
                            setOpenReset(false);
                            setConfirmValue("");
                        }}
                        disabled={confirmValue.trim() !== "REINICIAR"}
                        destructive
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
        </div>
    );
}
