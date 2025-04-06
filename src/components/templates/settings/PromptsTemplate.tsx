import React from "react"
import ContentSection from "@/components/molecules/ContentSection"
import { DynamicForm, DynamicFormHandles } from "@/components/molecules/Dynamic-form"
import { FormField } from "@/types/formTypes"
import { Button } from "@/components/atoms/ui/button"

interface PromptsTemplateProps {
    title: string
    desc: string
    fields: FormField[][]
    formRef: React.RefObject<DynamicFormHandles | null>
    onSubmit: () => void
}

/**
 * Template de UI para la sección de "Prompts".
 * Solo renderiza el DynamicForm en una columna dentro de un ContentSection.
 */
export default function PromptsTemplate({
    title,
    desc,
    fields,
    formRef,
    onSubmit
}: PromptsTemplateProps) {
    return (
        <ContentSection title={title} desc={desc}>
            <>
                <DynamicForm
                    ref={formRef}
                    formDataConfig={fields}
                    containerClassName="flex flex-col gap-4"
                />
                <Button onClick={onSubmit}>Actualizar Prompts</Button>
            </>
        </ContentSection>
    )
}
