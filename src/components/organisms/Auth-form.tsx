import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/ui/button";
import { DynamicForm, DynamicFormHandles } from "@/components/molecules/Dynamic-form";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/atoms/ui/tabs";
import type { FormField } from "@/types/formTypes";
import { LoginInput, User } from "../../types";

// Importa las imágenes
import logoLight from "@/assets/LogoHUSI.png";
import logoDark from "@/assets/Logo_HUSI_Blanco.png";

interface AuthFormProps {
    loginFields: FormField[];
    registryFields: FormField[];
    onLogin: (values: LoginInput) => void;
    onRegister: (values: User) => void;
    className?: string;
}

export default function AuthForm({
    loginFields,
    registryFields,
    onLogin,
    onRegister,
    className,
}: AuthFormProps) {

    const loginFormRef = useRef<DynamicFormHandles>(null);
    const registryFormRef = useRef<DynamicFormHandles>(null);

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (loginFormRef.current) {
            loginFormRef.current.handleSubmit((data) => {
                onLogin(data as LoginInput);
            })();
        }
    };

    const handleRegistrySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (registryFormRef.current) {
            registryFormRef.current.handleSubmit((data) => {
                onRegister(data as User);
            })();
        }
    };

    return (
        <div className={cn("flex flex-col h-full min-h-0", className)}>
            <div className="self-center">
                <img
                    src={logoLight}
                    alt="Imagen del slide"
                    className="block dark:hidden h-auto w-auto max-h-[300px] max-w-[300px] rounded-xl"
                />
                <img
                    src={logoDark}
                    alt="Imagen del slide"
                    className="hidden dark:block h-auto w-auto max-h-[300px] max-w-[300px] rounded-xl m-5"
                />
            </div>


            <Tabs defaultValue="login" className="flex flex-col flex-1 min-h-0">
                <TabsList className="flex items-center justify-center gap-2 rounded-full self-center px-3 py-7">
                    <TabsTrigger value="login" className="px-4 py-2 text-sm font-medium rounded-full">
                        Iniciar Sesión
                    </TabsTrigger>
                    <TabsTrigger value="registry" className="px-4 py-2 text-sm font-medium rounded-full">
                        Registro
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="flex flex-col flex-1 min-h-0 space-y-4">
                    <h1 className="text-2xl font-bold text-center">Iniciar Sesión</h1>
                    <form onSubmit={handleLoginSubmit} className="flex flex-col flex-1 min-h-0">
                        <div className="flex flex-col flex-1 min-h-0 overflow-y-auto gap-4">
                            <DynamicForm
                                ref={loginFormRef}
                                formDataConfig={loginFields}
                            />
                            <Button type="submit" className="w-full mb-4">
                                Iniciar Sesión
                            </Button>
                        </div>
                    </form>
                </TabsContent>

                <TabsContent value="registry" className="flex flex-col flex-1 min-h-0 space-y-4">
                    <h1 className="text-2xl font-bold text-center">Crea una Cuenta</h1>
                    <form onSubmit={handleRegistrySubmit} className="flex flex-col flex-1 min-h-0">
                        <div className="flex-1 min-h-0 overflow-y-auto">
                            <DynamicForm
                                ref={registryFormRef}
                                formDataConfig={registryFields}
                            />
                        </div>
                        <Button type="submit" className="w-full mb-4">
                            Registrarse
                        </Button>
                    </form>
                </TabsContent>
            </Tabs>
        </div>
    );
}
