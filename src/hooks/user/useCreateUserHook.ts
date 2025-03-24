import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../lib/api';
import { CreateUserInput, User } from '../../types';
import { createUser } from '../../services/userService';



export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation<User, Error, CreateUserInput>({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
    },
  });
}
