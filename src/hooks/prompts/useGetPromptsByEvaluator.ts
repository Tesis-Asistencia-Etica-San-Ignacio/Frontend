import { useQuery } from '@tanstack/react-query'
import { getMyPrompts } from '@/services/promptService'
import { QUERY_KEYS, DEFAULT_QUERY_OPTIONS } from '@/lib/api/constants'
import type { Prompt } from '@/types/promptType'
import { useNotify } from '@/hooks/useNotify'
import { useEffect } from 'react'

export default function useGetMyPrompts() {
  const { notifyError } = useNotify()

  const {
    data: prompts = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Prompt[], Error>({
    queryKey: QUERY_KEYS.PROMPTS,
    queryFn: getMyPrompts,
    ...DEFAULT_QUERY_OPTIONS,
  })

  useEffect(() => {
    if (isError && error instanceof Error) {
      notifyError({
        title: 'Error al obtener prompts',
        description: error.message,
        icon: '🚫',
        closeButton: true,
      })
    }
  }, [isError, error, notifyError])

  return { prompts, isLoading, refetch }
}
