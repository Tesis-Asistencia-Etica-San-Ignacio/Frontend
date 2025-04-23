import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '@/services/userService';

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      qc.invalidateQueries();
    },
  });
}