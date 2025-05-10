import { useState, useCallback } from 'react'
import { updateModel as updateModelService } from '@/services/iaService'
import { useNotify } from '@/hooks/useNotify'

export default function useUpdateModel() {
    const [loading, setLoading] = useState(false)
    const { notifySuccess, notifyError } = useNotify()

    const updateModel = useCallback(async (model: string) => {
        setLoading(true)
        try {
            await updateModelService({ model })
            notifySuccess({ title: 'Modelo IA actualizado', icon: '✅', closeButton: true })
        } catch (err: any) {
            notifyError({
                title: 'Error al actualizar modelo',
                description: err?.response?.data?.message ?? 'No se pudo actualizar el modelo.',
                icon: '🚫',
                closeButton: true,
            })
        } finally {
            setLoading(false)
        }
    }, [notifySuccess, notifyError])

    return { updateModel, loading }
}
