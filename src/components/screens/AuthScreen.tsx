import AuthTemplate from "@/components/templates/AuthTemplate"
import { FormField } from "@/components/molecules/Dynamic-form"

//LOGIN
const loginFields: FormField[] = [
    { type: "email", key: "email", placeholder: "Ingresa tu correo institucional" },
    { type: "password", key: "password", placeholder: "Ingresa tu contraseña" },
]

// REGISTRY
const registryFields: FormField[] = [
    { type: "user", key: "last name", placeholder: "Enter your last name" },
    { type: "email", key: "email", placeholder: "Enter your email" },
    { type: "password", key: "password", placeholder: "Choose a strong password" },
    { type: "password", key: "password", placeholder: "Choose a strong password" },
    
]


export default function AuthScreen() {
    return (
        <AuthTemplate
            loginFields={loginFields}
            registryFields={registryFields}
        />
    )
}
