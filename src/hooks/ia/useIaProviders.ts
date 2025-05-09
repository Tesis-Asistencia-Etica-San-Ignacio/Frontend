import { useQuery } from '@tanstack/react-query'
import { getIaProviders, staticIaProviders, IaProvider } from '@/services/iaService'
import { useNotify } from '@/hooks/useNotify'

export const useIaProviders = () => {
    const { notifyError } = useNotify()

    return useQuery<IaProvider[], Error>({
        queryKey: ['iaProviders'],
        queryFn: async () => {
            try {
                return await getIaProviders()
            } catch (err) {
                console.error('Error cargando proveedores IA:', err)
                notifyError({
                    title: 'No se pudieron cargar los proveedores de IA',
                    description: 'Se usará la lista local por defecto.',
                    icon: '🚫',
                    closeButton: true,
                })
                return staticIaProviders
            }
        },
        staleTime: 1000 * 60 * 30,
    })
}
