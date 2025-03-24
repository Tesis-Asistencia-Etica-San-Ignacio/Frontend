// src/components/templates/AuthTemplate.tsx
import AuthForm from "@/components/organisms/Auth-form"
import { FormField } from "@/components/molecules/Dynamic-form"
import { CarouselPlugin } from "../molecules/Carousel"
import { LoginInput,User } from "../../types"

interface AuthTemplateProps {
  loginFields: FormField[]
  registryFields: FormField[]
  onLogin: (values: LoginInput) => void
  onRegister: (values: User) => void
}

export default function AuthTemplate({
  loginFields,
  registryFields,
  onLogin,
  onRegister,
}: AuthTemplateProps) {
  return (
    <main className="grid h-screen w-screen p-8 gap-8 overflow-x-hidden grid-cols-1 xl:grid-cols-2">
      {/* Oculto en moviles/tablets, visible en xl en adelante */}
      <section className="hidden xl:flex items-center justify-center h-full overflow-hidden rounded-xl">
        <CarouselPlugin />
      </section>

      <section className="flex flex-col h-full min-h-0">
        <AuthForm
          loginFields={loginFields}
          registryFields={registryFields}
          onLogin={onLogin}
          onRegister={onRegister}
        />
      </section>
    </main>
  )
}
