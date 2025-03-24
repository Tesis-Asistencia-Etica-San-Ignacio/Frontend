import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../lib/api';
import { UpdateUserInput, User } from '../../types';
import { updateUser } from '../../services/userService';



export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation<User, Error, { id: string } & UpdateUserInput>({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
    },
  });
}
