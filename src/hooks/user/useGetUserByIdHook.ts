import { useQuery } from '@tanstack/react-query';
import { userApi } from '../../lib/api';
import { User } from '../../types';

const fetchUserById = async (id: string): Promise<User> => {
  const { data } = await userApi.get<User>(`/user/${id}`);
  return data;
};

export function useGetUserById(id: string) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUserById(id),
    enabled: !!id,
  });
}
