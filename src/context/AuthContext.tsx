import React, { createContext, useContext, useEffect, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import {
    login as loginService,
    logout as logoutService,
    getSession
} from "@/services/authService"
import { useCreateUser } from "@/hooks/user/useCreateUserHook"



interface IAuthContext {
    userType: string | null
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    createAccount: (userData: any) => Promise<void>
}

const AuthContext = createContext<IAuthContext | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userType, setUserType] = useState<string | null>(null)

    useEffect(() => {
        checkSession()
    }, [])

    const checkSession = async () => {
        try {
            const data = await getSession()
            setUserType(data.userType)
        } catch {
            setUserType(null)
        }
    }

    const loginMutation = useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) =>
            loginService({ email, password }),
        onSuccess: (data) => {
            setUserType(data.userType)
        },
    })

    const createUserMutation = useCreateUser()

    const login = async (email: string, password: string) => {
        await loginMutation.mutateAsync({ email, password })
        await checkSession()
    }

    const logout = async () => {
        await logoutService()
        setUserType(null)
    }

    const createAccount = async (userData: any) => {
        await createUserMutation.mutateAsync(userData);
    };

    const value: IAuthContext = {
        userType,
        login,
        logout,
        createAccount,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = (): IAuthContext => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider")
    }
    return context
}
