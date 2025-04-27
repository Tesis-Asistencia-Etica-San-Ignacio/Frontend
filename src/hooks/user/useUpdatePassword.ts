// src/hooks/user/useUpdatePassword.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updatePassword } from '@/services/userService'
import { useNotify } from '@/hooks/useNotify'
import type { UpdatePasswordInput, User } from '@/types/userType'

export function useUpdatePassword() {
  const qc = useQueryClient()
  const { notifySuccess, notifyError } = useNotify()

  return useMutation<User, unknown, UpdatePasswordInput>({
    mutationFn: updatePassword,           // ahora espera Promise<User>
    onSuccess: () => {
      qc.invalidateQueries()
      notifySuccess({
        title: 'Contraseña actualizada',
        description: 'Tu nueva contraseña ha sido guardada.',
        icon: '✅',
        closeButton: true,
      })
    },
    onError: (err: any) => {
      notifyError({
        title: 'Error al actualizar contraseña',
        description:
          err?.response?.data?.message ??
          'No se pudo actualizar tu contraseña.',
        icon: '🚫',
        closeButton: true,
      })
    },
  })
}
