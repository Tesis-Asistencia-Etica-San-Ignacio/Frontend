// src/components/organisms/Auth-form.tsx
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
import { LoginInput,User } from "../../types"


interface AuthFormProps {
    loginFields: FormField[]
    registryFields: FormField[]
    onLogin: (values: LoginInput) => void
    onRegister: (values: User) => void
    className?: string
}

export default function AuthForm({
    loginFields,
    registryFields,
    onLogin,
    onRegister,
    className,
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
        onLogin(loginData as LoginInput)
    }

    const handleRegistrySubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onRegister(registryData as User)
    }

    return (
        <div className={cn("flex flex-col h-full min-h-0", className)}>
            <img
                src="src/assets/LogoHUSI.png"
                alt="Imagen del slide"
                className="h-auto w-auto max-h-[300px] max-w-[300px] flex self-center dark:brightness-[0.2] dark:grayscale rounded-xl"
            />

            <Tabs defaultValue="login" className="flex flex-col flex-1 min-h-0">
                <TabsList className="flex items-center justify-center gap-2 rounded-full self-center px-3 py-7">
                    <TabsTrigger value="login" className={cn("px-4 py-2 text-sm font-medium rounded-full")}>
                        Iniciar Sesión
                    </TabsTrigger>
                    <TabsTrigger value="registry" className={cn("px-4 py-2 text-sm font-medium rounded-full")}>
                        Registro
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="flex flex-col flex-1 min-h-0 space-y-4">
                    <h1 className="text-2xl font-bold text-center">Iniciar Sesion</h1>
                    <form onSubmit={handleLoginSubmit} className="flex flex-col flex-1 min-h-0">
                        <div className="flex flex-col flex-1 min-h-0 overflow-y-auto gap-4">
                            <DynamicForm
                                formDataConfig={loginFields}
                                onChange={handleLoginChange}
                                initialData={{}}
                            />
                            <Button type="submit" className="w-full mb-4">
                                Iniciar Sesion
                            </Button>
                        </div>
                    </form>
                </TabsContent>

                <TabsContent value="registry" className="flex flex-col flex-1 min-h-0 space-y-4">
                    <h1 className="text-2xl font-bold text-center">Create your account</h1>
                    <form onSubmit={handleRegistrySubmit} className="flex flex-col flex-1 min-h-0">
                        <div className="flex-1 min-h-0 overflow-y-auto">
                            <DynamicForm
                                formDataConfig={registryFields}
                                onChange={handleRegistryChange}
                                initialData={{}}
                            />
                        </div>
                        <Button type="submit" className="w-full mb-4">
                            Register
                        </Button>
                    </form>
                </TabsContent>
            </Tabs>
        </div>
    )
}
