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
        <div className={cn("flex flex-col", className)}>
            <img
                src="src/assets/LogoHUSI.png"
                alt="Imagen del slide"
                className="h-auto w-auto max-h-[300px] max-w-[300px] flex self-center dark:brightness-[0.2] dark:grayscale rounded-xl"
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
                    <h1 className="text-2xl font-bold text-center">Login to your account</h1>
                    <form onSubmit={handleLoginSubmit} className="grid gap-6">
                        <DynamicForm
                            formDataConfig={loginFields}
                            onChange={handleLoginChange}
                            initialData={{}}
                        />
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                            <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                        <Button variant="outline" className="w-full">
                            GitHub
                        </Button>
                    </form>
                </TabsContent>

                {/* Registry */}
                <TabsContent value="registry" className="space-y-4">
                    <h1 className="text-2xl font-bold text-center">Create your account</h1>
                    <form onSubmit={handleRegistrySubmit} className="grid gap-6">
                        <DynamicForm
                            formDataConfig={registryFields}
                            onChange={handleRegistryChange}
                            initialData={{}}
                        />
                        <Button type="submit" className="w-full">
                            Register
                        </Button>
                    </form>
                </TabsContent>
            </Tabs>
        </div>
    )
}
