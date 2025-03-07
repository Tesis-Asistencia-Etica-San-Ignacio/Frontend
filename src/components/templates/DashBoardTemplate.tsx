import React from "react"
import { StatsGrid } from "@/components/organisms/StatsGrid"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../atoms/ui/tabs"
import { DatePickerWithRange } from "../molecules/date-range-picker"
import { MainNav } from "./components/main-nav"
import { Overview } from "./components/overview"
import { UserNav } from "./components/user-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../atoms/ui/card"

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
        <>
            <div className="md:hidden">
                <img
                    src="/examples/dashboard-light.png"
                    width="1280"
                    height="866"
                    alt="Dashboard"
                    className="block dark:hidden"
                />
                <img
                    src="/examples/dashboard-dark.png"
                    width="1280"
                    height="866"
                    alt="Dashboard"
                    className="hidden dark:block"
                />
            </div>
            <div className="hidden flex-col md:flex">
                <div className="border-b">
                    <div className="flex h-16 items-center px-4">
                        <MainNav className="mx-6" />
                        <div className="ml-auto flex items-center space-x-4">
                            <UserNav />
                        </div>
                    </div>
                </div>
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
                                        <Overview />
                                    </CardContent>
                                </Card>
                                
                            </div>
                        </TabsContent>
                        <TabsContent value="analytics" className="bg-amber-500 space-y-4">
                            <div>Analytics content here</div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    )
}