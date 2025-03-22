import AuthForm from "@/components/organisms/Auth-form"
import { FormField } from "@/components/molecules/Dynamic-form"
import { CarouselPlugin } from "../molecules/Carousel"

interface AuthTemplateProps {
  loginFields: FormField[]
  registryFields: FormField[]
}

export default function AuthTemplate({ loginFields, registryFields }: AuthTemplateProps) {
  return (
    <main className="grid min-h-svh lg:grid-cols-2 h-screen w-screen p-8 gap-8">
      <section className="flex items-center justify-center h-full overflow-hidden rounded-xl">
        <CarouselPlugin />
      </section>
      <section className="flex flex-col gap-4 ">
        <AuthForm
          loginFields={loginFields}
          registryFields={registryFields}
        />
      </section>
    </main>
    )
}
