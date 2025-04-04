import React, { useState, useRef } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle as ShadcnDialogTitle,
} from "@/components/atoms/ui/dialog";
import { Button } from "@/components/atoms/ui/button";
import { toast } from "sonner";
import { DynamicForm, DynamicFormHandles } from "@/components/molecules/Dynamic-form";
import type { FormField } from "@/types/formTypes";

/** Configuración del título (texto y alineación). */
export interface TitleConfig {
    text: string;
    align?: "left" | "center";
}

export interface ModalFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** Configuración del título del modal. */
    title: TitleConfig;
    /** Configuración del formulario dinámico. */
    formDataConfig: FormField[] | FormField[][];
    /**
     * Función a ejecutar al enviar el formulario.
     * Recibe los datos del formulario.
     */
    onSubmit: (data: { [key: string]: any }) => Promise<void> | void;
    /** Texto del botón de submit. */
    submitButtonText?: string;
    /** Ancho del modal (ejemplo: "800px" o "50%"). */
    width?: string;
    /**
     * Contenido opcional que se muestra en lugar del formulario
     * cuando el envío es exitoso.
     */
    successContent?: React.ReactElement;
}

const ModalForm: React.FC<ModalFormProps> = ({
    open,
    onOpenChange,
    title,
    formDataConfig,
    onSubmit,
    submitButtonText = "Enviar",
    width = "50%",
    successContent,
}) => {
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const formRef = useRef<DynamicFormHandles>(null);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formRef.current) {
            setLoading(true);
            formRef.current.handleSubmit(async (data: any) => {
                try {
                    await onSubmit(data);
                    toast("Operación exitosa", {
                        description: "El formulario se envió correctamente",
                    });
                    setShowSuccess(true);
                    // Se cierra la modal inmediatamente después del envío exitoso.
                    setTimeout(() => {
                        onOpenChange(false);
                        setShowSuccess(false);
                    }, 0);
                } catch (error) {
                    toast("Error en el envío", {
                        description: "Ocurrió un error al enviar el formulario",
                        icon: "🚫",
                        closeButton: true,
                    });
                } finally {
                    setLoading(false);
                }
            })();
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="p-6" style={{ width, maxWidth: "90vw" }}>
                <div className="flex flex-col h-full">
                    {/* Título con alineación configurable */}
                    <div className={`mb-4 ${title.align === "center" ? "text-center" : "text-left"}`}>
                        <ShadcnDialogTitle>{title.text}</ShadcnDialogTitle>
                    </div>
                    {/* Área del formulario con scroll interno */}
                    <form onSubmit={handleFormSubmit} className="flex flex-col flex-1 min-h-0 overflow-y-auto">
                        {showSuccess && successContent ? (
                            successContent
                        ) : (
                            <>
                                <DynamicForm ref={formRef} formDataConfig={formDataConfig} />
                                <div className="mt-4 flex">
                                    <Button type="submit" disabled={loading} className="ml-auto">
                                        {loading ? "Enviando..." : submitButtonText}
                                    </Button>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ModalForm;
