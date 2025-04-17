import { statsApi } from '@/lib/api/statsApi'
import type { EvaluationStatsDto } from '@/types/statsTypes'

export const getEvaluationStats = async (
    from: string,
    to: string
): Promise<EvaluationStatsDto> => {
    const { data } = await statsApi.get<EvaluationStatsDto>('/stats/evaluations', {
        params: { from, to }
    })
    return data
}