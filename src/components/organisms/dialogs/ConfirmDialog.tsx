import React from "react"
import { z, ZodSchema } from "zod"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
} from "@/components/atoms/ui/dialog"
import { Button } from "@/components/atoms/ui/button"

import {
    Form,
    FormDescription,
} from "@/components/atoms/ui/form"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

export interface ConfirmDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    handleConfirm: () => Promise<void> | void
    disabled?: boolean
    title: React.ReactNode
    description: React.ReactNode
    confirmText: string
    destructive?: boolean
    /**  
     * Si proporcionas un esquema Zod, el diálogo funcionará como  
     * formulario validable. Si no, se usa un esquema vacío.  
     */
    schema?: ZodSchema<any>
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
    schema = z.object({}), // esquema vacío por defecto
}: ConfirmDialogProps) {
    /* ------------------ react‑hook‑form + Zod ------------------ */
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {},
        mode: "onSubmit",
    })

    const onSubmit = async () => {
        await handleConfirm()
    }

    /* --------------------------- UI ---------------------------- */
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent style={{maxWidth: "30vw", overflow: "auto" }}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <DialogHeader>
                            <DialogTitle>{title}</DialogTitle>
                        </DialogHeader>

                        {/* Puedes poner inputs dentro de `description` */}
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
    )
}

export default ConfirmDialog
