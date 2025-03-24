import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../lib/api';
import { deleteUser } from '../../services/userService';

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
    },
  });
}
