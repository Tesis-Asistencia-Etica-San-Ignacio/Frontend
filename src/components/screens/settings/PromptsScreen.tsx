import React, { useRef } from "react"
import { toast } from "@/hooks/use-toast"
import { DynamicFormHandles } from "@/components/molecules/Dynamic-form"
import PromptsTemplate from "@/components/templates/settings/PromptsTemplate"
import { FormField } from "@/types/formTypes"

/**
 * Varios textareas para los prompts en una sola columna.
 * Si desearas dejarlos "solo lectura", podrías ajustar la lógica en el DynamicForm.
 */
const promptsFields: FormField[][] = [
    [
        {
            type: "textarea",
            key: "prompt1",
            placeholder: "Prompt #1",
            required: false,
        },
        {
            type: "textarea",
            key: "prompt2",
            placeholder: "Prompt #2",
            required: false,
        },
    ],
    [
        {
            type: "textarea",
            key: "prompt3",
            placeholder: "Prompt #3",
            required: false,
        },
        {
            type: "textarea",
            key: "prompt4",
            placeholder: "Prompt #4",
            required: false,
        },
    ],
    [
        {
            type: "textarea",
            key: "prompt5",
            placeholder: "Prompt #5",
            required: false,
        },
        {
            type: "textarea",
            key: "prompt6",
            placeholder: "Prompt #6",
            required: false,
        },
    ]
]

export default function PromptsScreen() {
    const formRef = useRef<DynamicFormHandles>(null)

    function onSubmit() {
        if (formRef.current) {
            formRef.current.handleSubmit((data) => {
                // Lógica para actualizar prompts
                console.log("Prompts data =>", data)
                toast({
                    title: "Prompts actualizados",
                    description: "Se han guardado los cambios en los prompts.",
                })
            })()
        }
    }

    return (
        <PromptsTemplate
            title="Prompts"
            desc="Modifica los prompts que se utilizarán en la plataforma."
            fields={promptsFields}
            formRef={formRef}
            onSubmit={onSubmit}
        />
    )
}
