// src/types/statsTypes.ts
export interface CardMetric {
    title: string
    value: number
    previousValue: number
}

export type LinePoint = { date: string; evaluadas: number }
export type PieSlice = { label: string; value: number }
export interface CardStats {
    title: string
    value: string | number
    description: string
    icon?: React.ReactNode
}

export interface EvaluationStatsDto {
    cards: {
        total: CardMetric
        aprobados: CardMetric
        rechazados: CardMetric
        tasaDevolucion: CardMetric   // usamos el mismo shape
    }
    lineSeries: LinePoint[]
    pieSeries: PieSlice[]
}
