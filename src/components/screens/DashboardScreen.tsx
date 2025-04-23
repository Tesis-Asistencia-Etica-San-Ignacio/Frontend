import { useState, useEffect, useMemo } from "react"
import { formatISO, subMonths, startOfDay } from "date-fns"
import { ArrowUpRight, CheckCircle, XCircle, CalendarSync } from "lucide-react"

import DashboardTemplate from "@/components/templates/DashBoardTemplate"
import { useGetEvaluationStats } from "../../hooks/stats/useGetEvaluationStatsHook"
import type { CardMetric, LinePoint, PieSlice } from "@/types/statsTypes"
import type { StatsCardProps } from "@/components/molecules/Stats-card"

export default function DashboardScreen() {
    const [range, setRange] = useState({
        from: startOfDay(subMonths(new Date(), 1)),
        to: startOfDay(new Date()),
    })

    const { data, isLoading } = useGetEvaluationStats(
        formatISO(range.from, { representation: "date" }),
        formatISO(range.to, { representation: "date" })
    )

    // Guarda la última respuesta válida
    const [cachedData, setCachedData] = useState<{
        cards: CardMetric[]
        lineSeries: LinePoint[]
        pieSeries: PieSlice[]
    } | null>(null)

    useEffect(() => {
        if (!isLoading && data) {
            setCachedData({
                cards: [
                    data.cards.total,
                    data.cards.aprobados,
                    data.cards.rechazados,
                    {
                        title: "Tasa de devolución",
                        value: data.cards.tasaDevolucion.value * 100,
                        previousValue: data.cards.tasaDevolucion.previousValue * 100,
                    },
                ],
                lineSeries: data.lineSeries,
                pieSeries: data.pieSeries,
            })
        }
    }, [isLoading, data])

    const formatDelta = (now: number, prev: number) => {
        const diff = now - prev
        const pct = prev ? (diff / prev) * 100 : 0
        const sign = diff >= 0 ? "+" : ""
        return `${sign}${pct.toFixed(1)}% vs mes anterior`
    }

    const cardsData: StatsCardProps[] = useMemo(() => {
        if (!cachedData) return []

        return cachedData.cards.map((c, i) => {
            let value: string | number
            if (i === 3) {
                value = `${c.value.toFixed(1)} %`
            } else {
                value = c.value.toLocaleString()
            }

            const icons = [
                <CalendarSync className="h-4 w-4 text-muted-foreground" />,
                <CheckCircle className="h-4 w-4 text-green-500" />,
                <XCircle className="h-4 w-4 text-red-500" />,
                <ArrowUpRight className="h-4 w-4 text-blue-500" />,
            ] as const

            return {
                title: c.title,
                value,
                description: formatDelta(c.value, c.previousValue),
                icon: icons[i],
            }
        })
    }, [cachedData])

    return (
        <DashboardTemplate
            cardsData={cardsData}
            lineSeries={cachedData?.lineSeries ?? []}
            pieSeries={cachedData?.pieSeries ?? []}
            range={range}
            onRangeChange={setRange}
            loading={isLoading}
        />
    )
}
