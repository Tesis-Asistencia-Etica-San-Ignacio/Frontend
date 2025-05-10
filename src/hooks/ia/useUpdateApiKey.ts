import { useState, useCallback } from 'react'
import { updateApiKey } from '@/services/iaService'
import { useNotify } from '@/hooks/useNotify'

const useUpdateApiKey = () => {
    const [loading, setLoading] = useState(false)
    const { notifySuccess, notifyError } = useNotify()

    const mutate = useCallback(
        async (data: { provider: string; apiKey: string }) => {
            setLoading(true)
            try {
                await updateApiKey(data)
                notifySuccess({ title: 'API Key actualizada', icon: '✅', closeButton: true })
            } catch (err: any) {
                notifyError({
                    title: 'Error al actualizar API Key',
                    description: err?.response?.data?.message ?? 'No se pudo actualizar la API Key.',
                    icon: '🚫',
                    closeButton: true,
                })
            } finally {
                setLoading(false)
            }
        },
        [notifySuccess, notifyError],
    )

    return { updateApiKey: mutate, loading }
}

export default useUpdateApiKey
