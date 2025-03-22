import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/atoms/ui/button"
import { DynamicForm, FormField } from "@/components/molecules/Dynamic-form"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/atoms/ui/tabs"

interface AuthFormProps {
    loginFields: FormField[]
    registryFields: FormField[]
    className?: string
}

export default function AuthForm({
    loginFields,
    registryFields,
    className
}: AuthFormProps) {
    const [loginData, setLoginData] = useState<{ [key: string]: any }>({})
    const [registryData, setRegistryData] = useState<{ [key: string]: any }>({})

    const handleLoginChange = (updatedData: { [key: string]: any }) => {
        setLoginData(updatedData)
    }

    const handleRegistryChange = (updatedData: { [key: string]: any }) => {
        setRegistryData(updatedData)
    }

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Login data:", loginData)
    }

    const handleRegistrySubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Registry data:", registryData)
    }

    return (
        <div className={cn("flex flex-col", className)} >
            <img
                src="src/assets/LogoHUSI.png"
                alt="Imagen del slide"
                className=" h-auto w-auto max-h-[300px] max-w-[300px] flex self-center dark:brightness-[0.2] dark:grayscale rounded-xl"
            />

            <Tabs defaultValue="login" className="space-y-4">
                <TabsList className="flex items-center justify-center gap-2  rounded-full  self-center px-3 py-7">
                    <TabsTrigger
                        value="login"
                        className={cn(
                            "px-4 py-2 text-sm font-medium rounded-full"
                        )}
                    >
                        Iniciar Sesión
                    </TabsTrigger>
                    <TabsTrigger
                        value="registry"
                        className={cn(
                            "px-4 py-2 text-sm font-medium rounded-full"

                        )}
                    >
                        Registro
                    </TabsTrigger>
                </TabsList>


                {/* Login */}
                <TabsContent value="login" className="space-y-4">
                    <h1 className="text-2xl font-bold text-center">Iniciar Sesion</h1>
                    <form onSubmit={handleLoginSubmit} className="grid gap-6">
                        <DynamicForm
                            formDataConfig={loginFields}
                            onChange={handleLoginChange}
                            initialData={{}}
                        />
                        <Button type="submit" className="w-full">
                            Iniciar Sesion
                        </Button>

                    </form>
                </TabsContent>

                {/* Registry */}
                <TabsContent value="registry" className="space-y-4 ">
                    <h1 className="text-2xl font-bold text-center ">Create your account</h1>
                    <form
                        onSubmit={handleRegistrySubmit}
                        className="flex flex-col "
                    >
                        {/* <div className="overflow-y-scroll max-h-90"> */}
                        <DynamicForm
                            formDataConfig={registryFields}
                            onChange={handleRegistryChange}
                            initialData={{}}
                        />
                        {/* </div> */}
                        <Button type="submit" className="w-full">
                            Register
                        </Button>
                    </form>

                </TabsContent>
            </Tabs>
        </div>
    )
}