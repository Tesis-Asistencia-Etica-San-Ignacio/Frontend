import React, { useRef, useState, useEffect } from "react"
import { toast } from "sonner"
import { DynamicFormHandles } from "@/components/molecules/Dynamic-form"
import PromptsTemplate from "@/components/templates/settings/PromptsTemplate"

import useGetPromptsByEvaluator from "@/hooks/prompts/useGetPromptsByEvaluatorHook"
import useUpdatePromptText from "@/hooks/prompts/useUpdatePromptHook"
import useRefreshPrompts from "@/hooks/prompts/useRefreshPromptsHook"
import { useAuthContext } from "@/context/AuthContext"
import type { FormField } from "@/types/formTypes"

export default function PromptsScreen() {
    const { user } = useAuthContext()
    const evaluatorId = user?._id ?? ""

    const formRef = useRef<DynamicFormHandles>(null)
    const { prompts, fetchPrompts, loading: loadingFetch } =
        useGetPromptsByEvaluator(evaluatorId)
    const { updatePromptText, loading: loadingUpdate } = useUpdatePromptText()
    const { refreshPrompts, loading: loadingRefresh } = useRefreshPrompts()

    const [fields, setFields] = useState<FormField[][]>([])
    const [initialValues, setInitialValues] = useState<Record<string, string>>({})
    const [updateOpen, setUpdateOpen] = useState(false)
    const [resetOpen, setResetOpen] = useState(false)
    const [confirmValue, setConfirmValue] = useState("")

    useEffect(() => {
        if (evaluatorId) fetchPrompts()
    }, [evaluatorId])

    useEffect(() => {
        const init: Record<string, string> = {}
        prompts.forEach((p) => (init[p.id] = p.texto))
        setInitialValues(init)

        const rows: FormField[][] = []
        for (let i = 0; i < prompts.length; i += 2) {
            rows.push(
                prompts.slice(i, i + 2).map((p) => ({
                    type: "textarea",
                    key: p.id,
                    placeholder: "",
                    required: false,
                    defaultValue: p.texto,
                }))
            )
        }
        setFields(rows)
    }, [prompts])

    const onSubmit = () => {
        formRef.current?.handleSubmit(async (data) => {
            const changed = Object.entries(data).filter(
                ([id, txt]) => txt !== initialValues[id]
            ) as [string, string][]

            if (!changed.length) {
                toast.info("Sin cambios – nada que actualizar")
                return
            }

            try {
                for (const [id, txt] of changed) {
                    await updatePromptText(id, { texto: txt })
                }
                setUpdateOpen(false)
                fetchPrompts()
            } catch {
                // los hooks ya muestran toast.error
            }
        })()
    }

    const onConfirmReset = async () => {
        setResetOpen(false)
        try {
            await refreshPrompts(evaluatorId)
            fetchPrompts()
        } catch {
            // el hook ya hizo toast.error
        }
    }

    return (
        <PromptsTemplate
            title="Prompts"
            desc="Modifica los prompts de la plataforma."
            fields={fields}
            formRef={formRef}
            onSubmit={onSubmit}
            onUpdateOpen={setUpdateOpen}
            updateOpen={updateOpen}
            onResetOpen={setResetOpen}
            resetOpen={resetOpen}
            confirmValue={confirmValue}
            setConfirmValue={setConfirmValue}
            onConfirmReset={onConfirmReset}
            loading={{
                fetch: loadingFetch,
                update: loadingUpdate,
                reset: loadingRefresh,
            }}
        />
    )
}
