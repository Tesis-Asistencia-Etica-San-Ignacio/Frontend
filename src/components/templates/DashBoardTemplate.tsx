import React from "react"
import { StatsGrid } from "@/components/organisms/Stats-grid"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../atoms/ui/tabs"
import { DatePickerWithRange } from "../molecules/Date-range-picker"
import { BarChartComponent } from "../molecules/graphics/Bar-Chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../atoms/ui/card"
import { LineChartComponent } from "../molecules/graphics/Line-Chart"
import { PieChartComponent } from "../molecules/graphics/Pie-Chart"


export interface DashboardTemplateProps {
    cardsData: {
        title: string
        value: string | number
        description: string
        icon?: React.ReactNode
    }[]
}

export default function DashboardTemplate({ cardsData }: DashboardTemplateProps) {
    return (
        <div className="flex-col md:flex">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <div className="flex items-center justify-between space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                        <div className="flex items-center space-x-2">
                            <DatePickerWithRange />
                        </div>
                    </div>
                    <Tabs defaultValue="overview" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="analytics">Analytics</TabsTrigger>
                            <TabsTrigger value="reports" disabled>
                                Reports
                            </TabsTrigger>
                            <TabsTrigger value="notifications" disabled>
                                Notifications
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview" className="space-y-4">
                            <StatsGrid cards={cardsData} />
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                                <Card className="col-span-4">
                                    <CardHeader>
                                        <CardTitle>Overview</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pl-2">
                                        <LineChartComponent />
                                    </CardContent>
                                </Card>
                                <Card className="col-span-4 lg:col-span-3">
                                    <CardHeader>
                                        <CardTitle>Overview</CardTitle>
                                    </CardHeader>
                                    <CardContent >
                                        <PieChartComponent />
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                        <TabsContent value="analytics" className="space-y-4">
                            <BarChartComponent />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
    )
}