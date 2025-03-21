import AuthTemplate from "@/components/templates/AuthTemplate"
import { FormField } from "@/components/molecules/Dynamic-form"

//LOGIN
const loginFields: FormField[] = [
    { type: "email", key: "email", placeholder: "Enter your email" },
    { type: "password", key: "password", placeholder: "Enter your password" },
]

// REGISTRY
const registryFields: FormField[] = [
    { type: "user", key: "username", placeholder: "Enter your username" },
    { type: "email", key: "email", placeholder: "Enter your email" },
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
