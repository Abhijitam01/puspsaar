'use client'

import { Gauge, CheckCircle, AlertTriangle, Clock7 } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface TestDriveStatsProps {
  scheduledDrives: number
  completedToday: number
  cancelledDrives: number
  avgLeadTimeHours: number
  totalRequests: number
}

export default function DeliveryStatsCards({
  scheduledDrives,
  completedToday,
  cancelledDrives,
  avgLeadTimeHours,
  totalRequests,
}: TestDriveStatsProps) {
  // Stats data generated from props
  const stats = [
    {
      title: "Scheduled Drives",
      value: scheduledDrives,
      description: "Confirmed slots",
      icon: Gauge,
    },
    {
      title: "Completed Today",
      value: completedToday,
      description: `${totalRequests ? ((completedToday / totalRequests) * 100).toFixed(1) : "0"}% of requests`,
      icon: CheckCircle,
    },
    {
      title: "Cancelled",
      value: cancelledDrives,
      description: "Need attention",
      icon: AlertTriangle,
    },
    {
      title: "Avg Lead Time",
      value: `${avgLeadTimeHours.toFixed(1)} hrs`,
      description: "Request → slot",
      icon: Clock7,
    },
  ]

  // 🎨 Gradient sets (cards + icons)
  const cardGradients = [
    "bg-gradient-to-br from-orange-50 to-orange-100 dark:from-emerald-400 dark:to-emerald-950",
    "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-rose-400 dark:to-rose-950",
    "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-indigo-500 dark:to-indigo-950",
    "bg-gradient-to-br from-green-50 to-green-100 dark:from-pink-400 dark:to-pink-950",
  ]

  const iconBg = [
    "bg-orange-200/60 dark:bg-emerald-900/60",
    "bg-purple-200/60 dark:bg-rose-900/60",
    "bg-blue-200/60 dark:bg-indigo-900/60",
    "bg-green-200/60 dark:bg-pink-900/60",
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card
            key={index}
            className={`border-none hover:shadow-xl transition-colors py-3 ${cardGradients[index]}`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-md ${iconBg[index]}`}>
                <Icon className="h-6 w-6" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}