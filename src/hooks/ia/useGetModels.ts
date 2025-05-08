import { useQuery } from '@tanstack/react-query';
import { getModels as getModelsService } from '@/services/iaService';

export default function useGetModels() {

    return useQuery<string[], Error>({
        queryKey: ['ia', 'models'],
        queryFn: async () => {
            /* const remote = await getModelsService(); */
            const remote = await getModelsService();
            return remote;
        },
        
        staleTime: Infinity,
    });
}
