// src/services/authService.ts
import { authApi } from '../lib/api/authApi';
import { LoginInput, LoginResponse } from '../types';


export const login = async (credentials: LoginInput): Promise<{ userType: string }> => {
    const { data } = await authApi.post<LoginResponse>('/auth/login', credentials);
    return { userType: data.userType };
};

export const getSession = async (): Promise<{ userType: string }> => {
    const { data } = await authApi.get("/auth/me")
    return { userType: data.userType }
}

// Logout opcional si lo usas
export const logout = async () => {
    await authApi.post("/auth/logout")
}