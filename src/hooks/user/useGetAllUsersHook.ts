import { useQuery } from '@tanstack/react-query';
import { userApi, QUERY_KEYS } from '../../lib/api';
import { User } from '../../types';

const fetchUsers = async (): Promise<User[]> => {
  const { data } = await userApi.get<User[]>('/user');
  return data;
};

export function useGetAllUsers() {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: fetchUsers,
  });
}
