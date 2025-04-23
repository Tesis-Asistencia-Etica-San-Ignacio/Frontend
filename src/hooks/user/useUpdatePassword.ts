import { useMutation } from '@tanstack/react-query';
import { updatePassword } from '@/services/userService';

export function useUpdatePassword() {
    return useMutation({
        mutationFn: updatePassword,
    });
}