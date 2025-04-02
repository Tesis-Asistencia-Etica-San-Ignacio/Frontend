import React, { useEffect, forwardRef, useImperativeHandle } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import {
    FormControl,
    FormField as ShadcnFormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/atoms/ui/form"
import { Input } from "@/components/atoms/ui/input"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/atoms/ui/select"
import { Textarea } from "@/components/atoms/ui/textarea"
import type {
    FormField,
    SelectFormField,
    CustomFormField,
    TextAreaFormField,
    FieldType,
} from "@/types/formTypes"

function baseValidationForType(type: FieldType): z.ZodString {
    let schema = z.string().trim()
    switch (type) {
        case "email":
            schema = schema.email("El email no es válido").max(50, "Máximo 50 caracteres")
            break
        case "password":
            schema = schema.min(6, "Mínimo 6 caracteres").max(50, "Máximo 50 caracteres")
            break
        case "phone":
            schema = schema.regex(/^\d+$/, "Solo dígitos").max(10, "Máximo 10 dígitos")
            break
        case "extension-phone":
            schema = schema.regex(/^\d+$/, "Solo dígitos").max(2, "Máximo 2 dígitos")
            break
        case "document":
            schema = schema.regex(/^\d+$/, "Solo dígitos").max(10, "Máximo 10 dígitos")
            break
        case "user":
            schema = schema.max(40, "Máximo 40 caracteres")
            break
        case "address":
            schema = schema.max(100, "Máximo 100 caracteres")
            break
        default:
            break
    }
    return schema
}

function buildZodSchemaForField(field: FormField): z.ZodType<string, any, string> {
    let schema = baseValidationForType(field.type)
    if (field.required) {
        schema = schema.nonempty("Este campo es requerido")
    }
    if (typeof field.minLength !== "undefined") {
        schema = schema.min(field.minLength, `Mínimo ${field.minLength} caracteres`)
    }
    if (typeof field.maxLength !== "undefined") {
        schema = schema.max(field.maxLength, `Máximo ${field.maxLength} caracteres`)
    }
    return schema
}

/** Aplana si es un array de arrays */
function flattenFields(data: FormField[] | FormField[][]): FormField[] {
    if (!Array.isArray(data) || data.length === 0) return []
    if (Array.isArray(data[0])) return (data as FormField[][]).flat()
    return data as FormField[]
}

export interface DynamicFormHandles {
    handleSubmit: <T>(onValid: (data: { [key: string]: any }) => T) => (e?: React.BaseSyntheticEvent) => Promise<void>
}

export interface DynamicFormProps {
    formDataConfig: FormField[] | FormField[][]
    onSubmit?: (data: { [key: string]: any }) => void
    onChange?: (data: { [key: string]: any }) => void
    containerClassName?: string
    initialData?: { [key: string]: any }
}

export const DynamicForm = forwardRef<DynamicFormHandles, DynamicFormProps>(({
    formDataConfig,
    onChange,
    containerClassName,
    initialData = {},
}, ref) => {
    const flatFields = flattenFields(formDataConfig)
    const shape: Record<string, z.ZodType<string, any, string>> = {}

    flatFields.forEach((field) => {
        shape[field.key] = buildZodSchemaForField(field)
    })

    const finalSchema = z.object(shape)

    const form = useForm({
        resolver: zodResolver(finalSchema),
        defaultValues: initialData,
        mode: "onChange",
    })

    const {
        control,
        watch,
        formState: { errors },
        handleSubmit,
    } = form

    useImperativeHandle(ref, () => ({
        handleSubmit,
    }))

    useEffect(() => {
        const subscription = watch((values) => {
            onChange?.(values)
        })
        return () => subscription.unsubscribe()
    }, [watch, onChange])

    const renderField = (field: FormField) => (
        <ShadcnFormField
            key={field.key}
            control={control}
            name={field.key}
            render={({ field: controllerField }) => (
                <FormItem
                    // Múltiples items en una fila:
                    className={cn(field.width ? "max-w-full" : "flex-1", "flex flex-col")}
                    style={field.width ? { width: `${field.width}%` } : {}}
                >
                    {field.placeholder && <FormLabel>{field.placeholder}</FormLabel>}
                    <FormControl>
                        {(() => {
                            if (field.type === "custom") {
                                const customField = field as CustomFormField
                                return customField.component
                            }
                            if (field.type === "select") {
                                const selectField = field as SelectFormField
                                return (
                                    <Select
                                        value={controllerField.value || ""}
                                        onValueChange={controllerField.onChange}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder={selectField.selectPlaceholder || selectField.placeholder} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {selectField.options.map((opt) => (
                                                <SelectItem key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )
                            }
                            if (field.type === "textarea") {
                                const textareaField = field as TextAreaFormField
                                return (
                                    <Textarea
                                        autoAdjust={textareaField.autoAdjust}
                                        placeholder={textareaField.placeholder}
                                        value={controllerField.value || ""}
                                        onChange={controllerField.onChange}
                                    />
                                )
                            }
                            return (
                                <Input
                                    inputType={field.type}
                                    placeholder={field.placeholder}
                                    autoComplete={
                                        field.type === "email"
                                            ? "email"
                                            : field.type === "password"
                                                ? "current-password"
                                                : field.type === "user"
                                                    ? "username"
                                                    : "off"
                                    }
                                    value={controllerField.value || ""}
                                    onChange={controllerField.onChange}
                                />
                            )
                        })()}
                    </FormControl>
                    <FormMessage className="min-h-[1.25rem]">
                        {errors[field.key]?.message as string}
                    </FormMessage>
                </FormItem>
            )}
        />
    )

    const isMultipleRows =
        Array.isArray(formDataConfig) &&
        formDataConfig.length > 0 &&
        Array.isArray(formDataConfig[0])

    const renderRows = () => {
        if (isMultipleRows) {
            return (formDataConfig as FormField[][]).map((row, i) => (
                <div key={i} className="flex flex-wrap gap-4 mb-4">
                    {row.map((field) => renderField(field))}
                </div>
            ))
        }
        return (formDataConfig as FormField[]).map((field) => (
            <div key={field.key} className="mb-4">
                {renderField(field)}
            </div>
        ))
    }

    return (
        <FormProvider {...form}>
            <div className={cn(containerClassName)}>
                {renderRows()}
            </div>
        </FormProvider>
    )
})
