import { userApi, noCredsInstance } from '../lib/api/userApi';
import {
    CreateUserInput,
    UpdateUserInput,
    UpdatePasswordInput,
    User,
} from '../types';

export const createUser = async (
    newUser: CreateUserInput,
): Promise<User> => {
    const { data } = await noCredsInstance.post<User>(
        '/user/investigador',
        newUser,
    );
    return data;
};

// --- update profile (name / last_name / email) ---
export const updateUser = async (
    updates: UpdateUserInput,
): Promise<User> => {
    const { data } = await userApi.patch<User>('/user/', updates);
    return data;
};
// --- update profile (password) ---
export const updatePassword = async (
    payload: UpdatePasswordInput,
): Promise<User> => {
    const { data } = await userApi.post<User>('/user/update-password', payload);
    return data;
};
