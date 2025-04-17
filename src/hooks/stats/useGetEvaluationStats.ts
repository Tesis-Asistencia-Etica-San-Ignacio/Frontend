import { useQuery } from '@tanstack/react-query'
import { getEvaluationStats } from '@/services/statsService'
import { QUERY_KEYS } from '@/lib/api'
import type { EvaluationStatsDto } from '@/types/statsTypes'

export const useGetEvaluationStats = (
    from: string,
    to: string
) =>
    useQuery<EvaluationStatsDto, Error>({
        queryKey: [QUERY_KEYS.STATS, from, to],
        queryFn: () => getEvaluationStats(from, to),
    })
