import React from "react"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts"
import type { LinePoint } from "@/types/statsTypes"

export const LineChartComponent: React.FC<{
    data: LinePoint[]
    loading?: boolean
}> = ({ data, loading }) => {
    const [chartData, setChartData] = React.useState<LinePoint[]>(data)

    React.useEffect(() => {
        if (!loading) setChartData(data)
    }, [data, loading])

    return (
        <div className="relative">
            <ResponsiveContainer width="100%" height={350}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="evaluadas"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>

            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
                    <span className="animate-pulse text-sm">Cargando…</span>
                </div>
            )}
        </div>
    )
}
