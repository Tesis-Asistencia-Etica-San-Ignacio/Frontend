import AuthForm from "@/components/organisms/Auth-form"
import { FormField } from "@/components/molecules/Dynamic-form"
import { CarouselPlugin } from "../molecules/Carousel"

interface AuthTemplateProps {
  loginFields: FormField[]
  registryFields: FormField[]
}

export default function AuthTemplate({ loginFields, registryFields }: AuthTemplateProps) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 h-screen w-screen  p-8 gap-8">
      <div className="flex items-center justify-center h-full overflow-hidden rounded-xl">
        <CarouselPlugin />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <AuthForm
          loginFields={loginFields}
          registryFields={registryFields}
        />
      </div>
    </div>
  )
}
