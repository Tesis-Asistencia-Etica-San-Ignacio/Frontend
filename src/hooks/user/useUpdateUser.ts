// src/hooks/user/useUpdateUser.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUser } from '@/services/userService'
import { useNotify } from '@/hooks/useNotify'
import type { UpdateUserInput, User } from '@/types/userType'

export function useUpdateUser() {
  const qc = useQueryClient()
  const { notifySuccess, notifyError } = useNotify()

  return useMutation<User, unknown, UpdateUserInput>({
    mutationFn: updateUser,
    onSuccess: () => {
      // 1) invalidas tus queries
      qc.invalidateQueries()
      // 2) disparas el toast de éxito
      notifySuccess({
        title: 'Cuenta actualizada',
        description: 'Se guardaron los cambios de tu cuenta.',
        icon: '✅',
        closeButton: true,
      })
    },
    onError: (err: any) => {
      // disparas el toast de error
      notifyError({
        title: 'Error al actualizar cuenta',
        description:
          err?.response?.data?.message ??
          'No se pudieron guardar los cambios.',
        icon: '🚫',
        closeButton: true,
      })
    },
  })
}
