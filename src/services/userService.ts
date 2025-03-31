// src/services/userService.ts
import { userApi } from '../lib/api';
import { CreateUserInput, UpdateUserInput, User } from '../types';


export const createUser = async (newUser: CreateUserInput): Promise<User> => {
    const { data } = await userApi.post<User>('/user/investigador', newUser);
    return data;
};

export const getAllUsers = async (): Promise<User[]> => {
    const { data } = await userApi.get<User[]>('/user');
    return data;
};

export const deleteUser = async (id: string): Promise<void> => {
    await userApi.delete(`/user/${id}`);
};

export const getUserById = async (id: string): Promise<User> => {
    const { data } = await userApi.get<User>(`/user/${id}`);
    return data;
};

export const updateUser = async ({ id, ...updates }: { id: string } & UpdateUserInput): Promise<User> => {
    const { data } = await userApi.patch<User>(`/user/${id}`, updates);
    return data;
};