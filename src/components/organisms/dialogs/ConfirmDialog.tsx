import React from "react";
import { z, ZodSchema } from "zod";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
} from "@/components/atoms/ui/dialog";
import { Button } from "@/components/atoms/ui/button";
import {
    Form,
    FormDescription,
} from "@/components/atoms/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

export interface ConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    handleConfirm: () => Promise<void> | void;
    disabled?: boolean;
    title: React.ReactNode;
    description: React.ReactNode;
    confirmText: string;
    destructive?: boolean;
    schema?: ZodSchema<any>;
    successToast: {
        title: string;
        description: string;
        icon: React.ReactNode;
        closeButton: boolean;
    };
    errorToast: {
        title: string;
        description: string;
        icon: React.ReactNode;
        closeButton: boolean;
    };
}

export function ConfirmDialog({
    open,
    onOpenChange,
    handleConfirm,
    disabled = false,
    title,
    description,
    confirmText,
    destructive = false,
    schema = z.object({}),
    successToast,
    errorToast,
}: ConfirmDialogProps) {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {},
        mode: "onSubmit",
    });

    const onSubmit = async () => {
        try {
            await handleConfirm();
            toast.success(successToast.title, {
                description: successToast.description,
                icon: successToast.icon,
                closeButton: successToast.closeButton,
            });
            onOpenChange(false);
        } catch {
            toast.error(errorToast.title, {
                description: errorToast.description,
                icon: errorToast.icon,
                closeButton: errorToast.closeButton,
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent style={{ minWidth: "25vw", maxWidth: "35vw", overflow: "auto" }}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <DialogHeader>
                            <DialogTitle>{title}</DialogTitle>
                        </DialogHeader>
                        <FormDescription>{description}</FormDescription>
                        <DialogFooter>
                            <Button
                                type="submit"
                                variant={destructive ? "destructive" : "default"}
                                disabled={disabled || form.formState.isSubmitting}
                            >
                                {confirmText}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default ConfirmDialog;
