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
    // Provider
    providerTitle: string
    providerDesc: string
    providerFields: FormField[]
    providerFormRef: React.RefObject<DynamicFormHandles | null>
    onConfirmProvider: (provider: string) => Promise<void>

    // API Key
    titleSection1: string;
    descSection1: string;
    apiKeyFields: FormField[];
    apiKeyFormRef: React.RefObject<DynamicFormHandles | null>;
    onConfirmApiKey: (apiKey: string) => Promise<void>

    // API model
    titleSection2: string;
    descSection2: string;
    modelFields: FormField[];
    modelFormRef: React.RefObject<DynamicFormHandles | null>;
    onConfirmModel: (model: string) => Promise<void>;

    // Prompts
    titleSection3: string;
    descSection3: string;
    promptsFields: FormField[][];
    promptsFormRef: React.RefObject<DynamicFormHandles | null>;
    initialValuesPrompts: Record<string, string>;
    onConfirmUpdatePrompts: (data: Record<string, string>) => Promise<void>;
    onConfirmResetPrompts: () => Promise<void>;
}

export default function IATemplate({
    providerTitle,
    providerDesc,
    providerFields,
    providerFormRef,
    onConfirmProvider,

    titleSection1,
    descSection1,
    apiKeyFields,
    apiKeyFormRef,
    onConfirmApiKey,

    titleSection2,
    descSection2,
    modelFormRef,
    modelFields,
    onConfirmModel,

    titleSection3,
    descSection3,
    promptsFields,
    promptsFormRef,
    initialValuesPrompts,
    onConfirmUpdatePrompts,
    onConfirmResetPrompts,
}: IATemplateProps) {
    const [openProvider, setOpenProvider] = useState(false)
    const [openApiKey, setOpenApiKey] = useState(false);
    const [openModel, setOpenModel] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openReset, setOpenReset] = useState(false);
    const [confirmValue, setConfirmValue] = useState("");

    const dynamicKey = Object.keys(initialValuesPrompts).join("|");

    return (

        <div className="flex flex-col w-full">
            <ContentSection title={providerTitle} desc={providerDesc}>
                <div className=' space-y-4'>
                    <DynamicForm
                        ref={providerFormRef}
                        formDataConfig={providerFields}
                        initialData={{}}
                        containerClassName='flex flex-col gap-4'
                    />
                    <Button onClick={() => setOpenProvider(true)}>Seleccionar proveedor</Button>
                </div>

                <ConfirmDialog
                    open={openProvider}
                    onOpenChange={setOpenProvider}
                    handleConfirm={() =>
                        providerFormRef.current?.handleSubmit(async ({ provider }) => {
                            await onConfirmProvider(provider)
                            setOpenProvider(false)
                        })()
                    }
                    title='¿Cambiar proveedor de IA?'
                    description='Esto actualizará el proveedor por defecto de la plataforma.'
                    confirmText='Cambiar'
                />
            </ContentSection>

            <div className="flex flex-row gap-8 mb-8">
                <ContentSection title={titleSection1} desc={descSection1}>
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
                        handleConfirm={() =>
                            apiKeyFormRef.current?.handleSubmit(async ({ apiKey }) => {
                                await onConfirmApiKey(apiKey)
                                setOpenApiKey(false)
                                setConfirmValue("")
                            })()
                        }
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
                        confirmText="Cambiar API Key"
                    />
                </ContentSection>

                <ContentSection title={titleSection2} desc={descSection2}>
                    <div className="lg:max-w-xl space-y-4">
                        <DynamicForm
                            key={modelFields.map(f => f.key).join("|")}
                            ref={modelFormRef}
                            formDataConfig={modelFields}
                            initialData={{}}
                            containerClassName="flex flex-col gap-4"
                        />
                        <Button onClick={() => setOpenModel(true)}>Cambiar Modelo de IA</Button>
                    </div>

                    <ConfirmDialog
                        open={openModel}
                        onOpenChange={setOpenModel}
                        handleConfirm={() =>
                            modelFormRef.current?.handleSubmit(async (data) => {
                                await onConfirmModel(data);
                                setOpenModel(false);
                            })()
                        }
                        title="¿Estas seguro de cambiar el modelo?"
                        description="Esto cambiara el modelo de IA de la plataforma."
                        confirmText="Sí, actualizar"
                    />

                </ContentSection>
            </div>

            <ContentSection title={titleSection3} desc={descSection3}>
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
