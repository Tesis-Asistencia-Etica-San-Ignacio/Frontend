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
      qc.invalidateQueries()
      notifySuccess({
        title: 'Cuenta actualizada',
        description: 'Se guardaron los cambios de tu cuenta.',
        icon: '✅',
        closeButton: true,
      })
    },
    onError: (err: any) => {
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
