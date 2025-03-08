import React from "react"
import { StatsCard, StatsCardProps } from "@/components/molecules/Stats-card"

export interface StatsGridProps {
  cards: StatsCardProps[]
  gridClassName?: string
}

export function StatsGrid({
  cards,
  gridClassName = "grid gap-4 md:grid-cols-2 lg:grid-cols-4",
}: StatsGridProps) {
  return (
    <div className={gridClassName}>
      {cards.map((card, index) => (
        <StatsCard key={`${card.title}-${index}`} {...card} />
      ))}
    </div>
  )
}