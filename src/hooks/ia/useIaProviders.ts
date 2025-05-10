import { useQuery } from '@tanstack/react-query'
import { getIaProviders, IaProvider } from '@/services/iaService'
import { useNotify } from '@/hooks/useNotify'

interface IaProvidersResponse {
    success: boolean
    models: IaProvider[]
}

export const useIaProviders = () => {
    const { notifyError } = useNotify()

    return useQuery<IaProvider[], Error>({
        queryKey: ['iaProviders'],
        queryFn: async () => {
            try {
                const response = await getIaProviders() as unknown as IaProvidersResponse
                return response.models
            } catch (err) {
                console.error('Error cargando proveedores IA:', err)
                notifyError({
                    title: 'No se pudieron cargar los proveedores de IA',
                    description: 'Se usará la lista local por defecto.',
                    icon: '🚫',
                    closeButton: true,
                })
                return []
            }
        },
        staleTime: 1000 * 60 * 30,
    })
}
