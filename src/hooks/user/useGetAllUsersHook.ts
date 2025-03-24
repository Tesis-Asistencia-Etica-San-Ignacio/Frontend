import { useQuery } from '@tanstack/react-query';
import {QUERY_KEYS } from '../../lib/api';
import { getAllUsers } from '../../services/userService';

export function useGetAllUsers() {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: getAllUsers,
  });
}
