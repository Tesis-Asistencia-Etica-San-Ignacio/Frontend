import { Car, GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "../organisms/Login-form";
import { CarouselPlugin } from "../molecules/Carousel";
import FileInput from "@/components/organisms/File-input";
import { Toaster } from "../atoms/ui/sonner";
import { FormField } from "@/components/molecules/Dynamic-form"

interface LoginTemplateProps {
  fields: FormField[]
}

export default function LoginTemplate({ fields }: LoginTemplateProps) {
  console.log("fields", fields)
  return (
    <div>
      {/* <div>
        <div className="flex flex-1  items-center justify-center">
          <Toaster />
          <div className="min-h-screen min-w-screen  p-8">
            <h1 className="text-xl font-bold mb-4">Ejemplo: Drag & Drop</h1>
            <div className="">
              <FileInput />
            </div>
          </div>
        </div>
      </div> */}
      <div className="grid min-h-svh lg:grid-cols-2 h-screen w-screen">
        <div className="flex items-center justify-center h-full overflow-hidden">
          <CarouselPlugin />
        </div>
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <LoginForm fields={fields} />
        </div>
      </div>
    </div>
  );
}
