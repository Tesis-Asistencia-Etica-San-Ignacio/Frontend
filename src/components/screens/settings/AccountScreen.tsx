import React, { useRef } from "react"
import { toast } from "@/hooks/use-toast"
import { DynamicFormHandles } from "@/components/molecules/Dynamic-form"
import AccountTemplate from "@/components/templates/settings/AccountTemplate"
import { FormField } from "@/types/formTypes"

/** Campos en una sola columna: Nombre, Apellido, Contraseña */
const accountFields: FormField[] = [
    {
        type: "user",
        key: "name",
        placeholder: "Nombre",
        required: true,
    },
    {
        type: "user",
        key: "last_name",
        placeholder: "Apellido",
        required: true,
    },
    {
        type: "password",
        key: "password",
        placeholder: "Contraseña",
        required: true,
        minLength: 6,
        maxLength: 50,
    },
]

export default function AccountScreen() {
    const formRef = useRef<DynamicFormHandles>(null)

    const handleUpdate = () => {
        // Al hacer clic, se llama a handleSubmit del DynamicForm
        if (formRef.current) {
            formRef.current.handleSubmit((data) => {
                // Aquí puedes hacer tu lógica: API, estado global, etc.
                console.log("Account data submitted => ", data)
                toast({
                    title: "Cuenta actualizada",
                    description: "Se han guardado los cambios en tu cuenta.",
                })
            })()
        }
    }

    return (
        <AccountTemplate
            title="Mi Cuenta"
            desc="Actualiza la información de tu cuenta."
            fields={accountFields}
            formRef={formRef}
            onSubmit={handleUpdate}
        />
    )
}
