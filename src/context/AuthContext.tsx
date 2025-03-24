// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { login as loginService, getSession, logout as logoutService } from "@/services/authService"
import { useCreateUser } from "@/hooks/user/useCreateUserHook"

interface IAuthContext {
    userType: string | null
    isAuthLoading: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    createAccount: (userData: any) => Promise<void>
}

const AuthContext = createContext<IAuthContext | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userType, setUserType] = useState<string | null>(null)
    const [isAuthLoading, setIsAuthLoading] = useState(true)

    const { data, isError, refetch: refetchSession } = useQuery<{ userType: string }, Error>({
        queryKey: ["me"],
        queryFn: getSession,
        enabled: true, // se ejecuta automáticamente
        retry: false,
    })

    // Cuando la query se actualice (exitoso o error), ajustamos estados
    useEffect(() => {
        if (data) {
            setUserType(data.userType)
            setIsAuthLoading(false)
        } else if (isError) {
            setUserType(null)
            setIsAuthLoading(false)
        }
    }, [data, isError])

    // Mutación de login
    const loginMutation = useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) =>
            loginService({ email, password }),
        onSuccess: (data) => {
            setUserType(data.userType)
            // Re-fetch para asegurar que /auth/me coincide
            refetchSession()
        },
    })

    const createUserMutation = useCreateUser()

    const login = async (email: string, password: string) => {
        await loginMutation.mutateAsync({ email, password })
    }

    const logout = async () => {
        await logoutService()
        setUserType(null)
    }

    const createAccount = async (userData: any) => {
        await createUserMutation.mutateAsync({ ...userData, type: "INVESTIGADOR" })
    }

    const value: IAuthContext = {
        userType,
        isAuthLoading,
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
