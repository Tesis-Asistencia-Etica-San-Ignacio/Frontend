"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/atoms/ui/button"
import { DynamicForm, FormField } from "@/components/molecules/Dynamic-form"
import { log } from "console"

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {
    fields: FormField[]
}

export function LoginForm({ fields, className, ...props }: LoginFormProps) {
    const [formData, setFormData] = React.useState<{ [key: string]: any }>({})
    

    const handleFormChange = (updatedData: { [key: string]: any }) => {
        setFormData(updatedData)
    }

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Login data:", formData)
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-sm text-muted-foreground">
                    Enter your email below to login to your account
                </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="grid gap-6">
                <DynamicForm
                    formDataConfig={fields}
                    onChange={handleFormChange}
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
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="mr-2"
                    >
                        <path d="M12 .297c-6.63 0-12 5.373-12 12..." />
                    </svg>
                    Login with GitHub
                </Button>

                <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <a href="#" className="underline underline-offset-4">
                        Sign up
                    </a>
                </div>

                <input type="hidden" name="remember" value="true" />
            </form>
        </div>
    )
}
