import { useMemo, useState } from 'react'
import { formatISO, subMonths, startOfDay } from 'date-fns'
import { ArrowUpRight, CheckCircle, XCircle, CalendarSync } from 'lucide-react'

import DashboardTemplate from '@/components/templates/DashBoardTemplate'
import { useGetEvaluationStats } from '@/hooks/stats/useGetEvaluationStats'
import type { CardMetric, LinePoint, PieSlice } from '@/types/statsTypes'
import type { StatsCardProps } from '@/components/molecules/Stats-card'

export default function DashboardScreen() {
    // rango inicial: último mes
    const [range, setRange] = useState({
        from: startOfDay(subMonths(new Date(), 1)),
        to: startOfDay(new Date()),
    })

    const { data, isLoading } = useGetEvaluationStats(
        formatISO(range.from, { representation: 'date' }),
        formatISO(range.to, { representation: 'date' })
    )

    // --- Transformaciones derivadas -------------------------------
    const cardsData: StatsCardProps[] = useMemo(() => {
        if (!data) return []

        const { cards } = data
        const rawCards: CardMetric[] = [
            cards.total,
            cards.aprobados,
            cards.rechazados,
            {
                title: 'Tasa de devolución',
                value: cards.tasaDevolucion.value * 100,
                previousValue: cards.tasaDevolucion.previousValue * 100,
            },
            cards.tasaDevolucion,
        ]

        const icons = [
            <CalendarSync className="h-4 w-4 text-muted-foreground" />,
            <CheckCircle className="h-4 w-4 text-green-500" />,
            <XCircle className="h-4 w-4 text-red-500" />,
            <ArrowUpRight className="h-4 w-4 text-blue-500" />,
        ] as const

        const formatDelta = (now: number, prev: number) => {
            const diff = now - prev
            const pct = prev ? (diff / prev) * 100 : 0
            const sign = diff >= 0 ? '+' : ''
            return `${sign}${pct.toFixed(1)}% vs mes anterior`
        }

        return rawCards.map((c, i) => ({
            title: c.title,
            value:
                i === 3 ? `${c.value.toFixed(1)} %` : c.value.toLocaleString(),
            description: formatDelta(c.value, c.previousValue),
            icon: icons[i],
        }))
    }, [data])

    const lineSeries: LinePoint[] = data?.lineSeries ?? []
    const pieSeries: PieSlice[] = data?.pieSeries ?? []

    // --- Render -----------------------------------------------------
    return (
        <DashboardTemplate
            cardsData={cardsData}
            lineSeries={lineSeries}
            pieSeries={pieSeries}
            range={range}
            onRangeChange={setRange}
            loading={isLoading}
        />
    )
}
