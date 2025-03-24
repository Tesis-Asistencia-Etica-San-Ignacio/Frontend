import { useQuery } from '@tanstack/react-query';
import { getUserById } from '../../services/userService';
import { QUERY_KEYS } from '../../lib/api';


export function useGetUserById(id: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS, id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
}
