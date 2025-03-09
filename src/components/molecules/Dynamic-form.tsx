import React, { useState, useEffect, useRef, JSX } from "react"
import { Input } from "@/components/atoms/ui/input"
import { cn } from "@/lib/utils"

export interface FormField {
    type:
    | "email"
    | "date"
    | "select"
    | "custom"
    | "password"
    | "extension-phone"
    | "phone"
    | "document"
    | "address"
    | "user"
    key: string
    placeholder?: string
    options?: { value: string; label: string }[]
    component?: JSX.Element
}

interface DynamicFormProps {
    formDataConfig: FormField[]
    onChange?: (data: { [key: string]: any }) => void
    containerClassName?: string
    editable?: boolean
    initialData?: { [key: string]: any }
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
    formDataConfig = [],
    onChange,
    containerClassName,
    editable = true,
    initialData = {},
}) => {
    const [formData, setFormData] = useState<{ [key: string]: any }>(initialData)
    const [formErrors, setFormErrors] = useState<{ [key: string]: string | undefined }>({})
    const isUserEditing = useRef(false)
    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        if (isUserEditing.current) {
            onChange?.(formData)
        }
    }, [formData, onChange])

    const handleInputChange = (fieldKey: string, value: string, errorMsg?: string) => {
        isUserEditing.current = true
        setFormData((prev) => ({ ...prev, [fieldKey]: value }))
        setFormErrors((prev) => ({ ...prev, [fieldKey]: errorMsg }))
    }

    const renderField = (field: FormField, index: number) => {
        // Custom
        if (field.type === "custom" && field.component) {
            return (
                <div className="mb-4" key={field.key + index}>
                    {field.component}
                </div>
            )
        }

        // Select
        if (field.type === "select") {
            return (
                <div className="mb-4" key={field.key + index}>
                    <label className="block mb-1">{field.placeholder}</label>
                    <select
                        className="block w-full rounded-md border p-2 text-sm"
                        disabled={!editable}
                        value={formData[field.key] || ""}
                        onChange={(e) => handleInputChange(field.key, e.target.value, undefined)}
                    >
                        <option value="">Seleccione una opción</option>
                        {field.options?.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            )
        }

        // Date
        if (field.type === "date") {
            return (
                <div className="mb-4" key={field.key + index}>
                    <label className="block mb-1">{field.placeholder}</label>

                </div>
            )
        }

        // Para email, password, phone, user, etc.
        return (
            <div className="mb-4" key={field.key + index}>
                <label className="block mb-1">{field.placeholder}</label>
                <Input
                    inputType={field.type !== "custom" ? field.type : undefined}
                    disabled={!editable}
                    placeholder={field.placeholder}
                    value={formData[field.key] || ""}
                    onChange={(event) => handleInputChange(field.key, event.target.value)}
                />

                {formErrors[field.key] && (
                    <p className="mt-1 text-xs text-red-600">{formErrors[field.key]}</p>
                )}
            </div>
        )
    }

    return (
        <div className={cn("space-y-2", containerClassName)}>
            {formDataConfig.map((field, idx) => renderField(field, idx))}
        </div>
    )
}
