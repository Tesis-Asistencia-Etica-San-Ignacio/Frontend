// src/components/screens/AuthScreen.tsx
import AuthTemplate from "@/components/templates/AuthTemplate"
import { FormField } from "@/components/molecules/Dynamic-form"
import { useAuthContext } from "@/context/AuthContext"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const loginFields: FormField[] = [
  { type: "email", key: "email", placeholder: "Ingresa tu correo institucional" },
  { type: "password", key: "password", placeholder: "Ingresa tu contraseña" },
]

const registryFields: FormField[] = [
  { type: "user", key: "name", placeholder: "Tu nombre" },
  { type: "user", key: "last_name", placeholder: "Tu apellido" },
  { type: "email", key: "email", placeholder: "Tu correo" },
  { type: "password", key: "password", placeholder: "Contraseña" },
]

export default function AuthScreen() {
  const { userType, login, createAccount } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (userType === "EVALUADOR") {
      navigate("/estadisticas")
    } else if (userType === "INVESTIGADOR") {
      navigate("/evaluacion")
    }
  }, [userType, navigate])

  const handleLogin = async (credentials: { email: string; password: string }) => {
    await login(credentials.email, credentials.password)
    if (userType === "EVALUADOR") {
      navigate("/estadisticas")
    } else if (userType === "INVESTIGADOR") {
      navigate("/evaluacion")
    }
  }

  const handleRegister = async (data: {
    name: string
    last_name: string
    email: string
    password: string
  }) => {
    await createAccount(data)
    await login(data.email, data.password)
    navigate("/evaluacion")
  }

  return (
    <AuthTemplate
      loginFields={loginFields}
      registryFields={registryFields}
      onLogin={handleLogin}
      onRegister={handleRegister}
    />
  )
}
