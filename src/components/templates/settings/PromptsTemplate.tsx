import React from "react"
import ContentSection from "@/components/molecules/ContentSection"
import { DynamicForm, DynamicFormHandles } from "@/components/molecules/Dynamic-form"
import { Button } from "@/components/atoms/ui/button"
import ConfirmDialog from "@/components/organisms/dialogs/ConfirmDialog"
import { Input } from "@/components/atoms/ui/input"
import { Label } from "@/components/atoms/ui/label"
import { Alert, AlertTitle, AlertDescription } from "@/components/atoms/ui/alert"
import { TriangleAlert } from "lucide-react"
import type { FormField } from "@/types/formTypes"

interface PromptsTemplateProps {
    title: string
    desc: string
    fields: FormField[][]
    formRef: React.RefObject<DynamicFormHandles | null>
    /* acciones */
    onSubmit: () => void
    onUpdateOpen: (o: boolean) => void
    updateOpen: boolean
    onResetOpen: (o: boolean) => void
    resetOpen: boolean
    onConfirmReset: () => void
    /* confirmación reset */
    confirmValue: string
    setConfirmValue: (v: string) => void
    /* loading */
    loading: { fetch: boolean; update: boolean; reset: boolean }
}

export default function PromptsTemplate({
    title,
    desc,
    fields,
    formRef,
    onSubmit,
    onUpdateOpen,
    updateOpen,
    onResetOpen,
    resetOpen,
    confirmValue,
    setConfirmValue,
    onConfirmReset,
    loading,
}: PromptsTemplateProps) {
    return (
        <ContentSection title={title} desc={desc}>
            <>
                <DynamicForm
                    ref={formRef}
                    formDataConfig={fields}
                    containerClassName="flex flex-col gap-4"
                />

                <div className="flex gap-2 mt-4">
                    <Button onClick={() => onUpdateOpen(true)} disabled={loading.update}>
                        Actualizar Prompts
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => onResetOpen(true)}
                        disabled={loading.reset}
                    >
                        Reiniciar Prompts
                    </Button>
                </div>

                {/* confirmación de actualización */}
                <ConfirmDialog
                    open={updateOpen}
                    onOpenChange={onUpdateOpen}
                    handleConfirm={onSubmit}
                    title="¿Actualizar prompts?"
                    description="Se guardarán los cambios hechos en los campos."
                    confirmText="Sí, actualizar"
                />

                {/* confirmación de reseteo */}
                <ConfirmDialog
                    open={resetOpen}
                    onOpenChange={onResetOpen}
                    handleConfirm={onConfirmReset}
                    disabled={confirmValue.trim() !== "REINICIAR"}
                    title={
                        <span className="text-destructive">
                            <TriangleAlert className="mr-1 inline-block stroke-destructive" size={18} />
                            Reiniciar Prompts
                        </span>
                    }
                    description={
                        <div className="space-y-4">
                            <p>
                                Esto borrará y restaurará <strong>todos</strong> los prompts al estado base.
                            </p>
                            <Label>
                                Escribe <code>REINICIAR</code> para confirmar:
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
                    destructive
                />
            </>
        </ContentSection>
    )
}
