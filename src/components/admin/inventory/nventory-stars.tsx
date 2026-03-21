"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { LucideIcon } from "lucide-react"

export interface InventoryStat {
  title: string
  value: string | number
  icon: LucideIcon
  subtext: string
  subtextClass?: string
  isBadge?: boolean
}

const cardGradients = [
  "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-400 dark:to-purple-950",
  "bg-gradient-to-br from-red-50 to-red-100 dark:from-red-300 dark:to-red-950",
  "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-400 dark:to-green-950",
  "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-400 dark:to-blue-950",
]

const iconGradients = [
  "bg-gradient-to-br from-purple-500 to-pink-500 text-white",
  "bg-gradient-to-br from-red-400 to-orange-800 text-white",
  "bg-gradient-to-br from-green-500 to-emerald-600 text-white",
  "bg-gradient-to-br from-blue-500 to-indigo-600 text-white",
]

interface InventoryStatsProps {
  stats: InventoryStat[]
}

export default function InventoryStats({ stats }: InventoryStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const colorIndex = index % cardGradients.length
        const Icon = stat.icon

        return (
          <Card
            key={stat.title}
            className={`border-none hover:shadow-xl transition-colors py-3 ${cardGradients[colorIndex]}`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div
                className={`h-10 w-10 flex items-center justify-center rounded-full  ${iconGradients[colorIndex]}`}
              >
                <Icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>

              {stat.isBadge ? (
                <Badge variant="destructive" className={stat.subtextClass}>
                  {stat.subtext}
                </Badge>
              ) : (
                <p className={stat.subtextClass}>{stat.subtext}</p>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}