import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi, QUERY_KEYS } from '../../lib/api';

const deleteUser = async (id: string): Promise<void> => {
  await userApi.delete(`/user/${id}`);
};

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
    },
  });
}
