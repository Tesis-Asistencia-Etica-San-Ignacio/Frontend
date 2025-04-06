import React from "react"
import ContentSection from "@/components/molecules/ContentSection"
import { DynamicForm, DynamicFormHandles } from "@/components/molecules/Dynamic-form"
import { FormField } from "@/types/formTypes"
import { Button } from "@/components/atoms/ui/button"

interface AccountTemplateProps {
    title: string
    desc: string
    fields: FormField[]
    formRef: React.RefObject<DynamicFormHandles | null>
    onSubmit: () => void
}

/**
 * Template puramente de UI para la sección "Cuenta".
 * Muestra el DynamicForm con los campos en una sola columna, y un botón.
 */
export default function AccountTemplate({
    title,
    desc,
    fields,
    formRef,
    onSubmit,
}: AccountTemplateProps) {
    return (
        <ContentSection title={title} desc={desc}>
            <div className="lg:max-w-xl ">
                <DynamicForm
                    ref={formRef}
                    formDataConfig={fields}
                    containerClassName="flex flex-col gap-4"
                />

                {/* Botón para "Actualizar Cuenta" */}
                <div className="mt-4">
                    <Button onClick={onSubmit}>Actualizar Cuenta</Button>
                </div>
            </div>
        </ContentSection>
    )
}
