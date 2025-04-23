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

export interface TitleConfig {
    text: string;
    align?: "left" | "center";
}

export interface ModalFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: TitleConfig;
    formDataConfig: FormField[] | FormField[][];
    onSubmit: (data: { [key: string]: any }) => Promise<void> | void;
    submitButtonText?: string;
    width?: string;
    height?: string;
    successToast: {
        title: string;
        description: string;
        icon: React.ReactNode;
        closeButton?: boolean;
    };
    errorToast: {
        title: string;
        description: string;
        icon: React.ReactNode;
        closeButton?: boolean;
    };
}

const ModalForm: React.FC<ModalFormProps> = ({
    open,
    onOpenChange,
    title,
    formDataConfig,
    onSubmit,
    submitButtonText = "Enviar",
    width = "50%",
    height = "50%",
    successToast,
    errorToast,
}) => {
    const [loading, setLoading] = useState(false);
    const formRef = useRef<DynamicFormHandles>(null);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formRef.current) {
            setLoading(true);
            formRef.current.handleSubmit(async (data: any) => {
                try {
                    await onSubmit(data);
                    toast.success(successToast.title, {
                        description: successToast.description,
                        icon: successToast.icon,
                        closeButton: successToast.closeButton,
                    });
                    setTimeout(() => onOpenChange(false), 500);
                } catch {
                    toast.error(errorToast.title, {
                        description: errorToast.description,
                        icon: errorToast.icon,
                        closeButton: errorToast.closeButton,
                    });
                } finally {
                    setLoading(false);
                }
            })();
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="p-6"
                style={{ width, maxWidth: "90vw", height, maxHeight: "90vh", overflow: "auto" }}
            >
                <div className="flex flex-col h-full">
                    <div className={`mb-4 ${title.align === "center" ? "text-center" : "text-left"}`}>
                        <ShadcnDialogTitle>{title.text}</ShadcnDialogTitle>
                    </div>
                    <form onSubmit={handleFormSubmit} className="flex flex-col flex-1 min-h-0">
                        <DynamicForm ref={formRef} formDataConfig={formDataConfig} />
                        <div className="mt-4 flex">
                            <Button type="submit" disabled={loading} className="ml-auto">
                                {loading ? "Enviando..." : submitButtonText}
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ModalForm;
