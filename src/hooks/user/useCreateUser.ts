import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from '@/services/userService';
import { QUERY_KEYS, DEFAULT_QUERY_OPTIONS } from '@/lib/api/constants';
import { useNotify } from '@/hooks/useNotify';
import type { CreateUserInput, User } from '@/types/userType';

export function useCreateUser() {
  const qc = useQueryClient();
  const { notifySuccess, notifyError } = useNotify();

  const mutation = useMutation<User, Error, CreateUserInput>({
    mutationFn: createUser,
    ...DEFAULT_QUERY_OPTIONS,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
      notifySuccess({
        title: 'Usuario creado',
        description: 'El nuevo usuario se creó correctamente.',
        icon: '✅',
        closeButton: true,
      });
    },
    onError: err => {
      notifyError({
        title: 'Error al crear usuario',
        description: err.message,
        closeButton: true,
      });
    },
  });

  return {
    createUser: (data: CreateUserInput) => mutation.mutateAsync(data),
    loading: mutation.isPending,
    error: mutation.error,
  };
}
