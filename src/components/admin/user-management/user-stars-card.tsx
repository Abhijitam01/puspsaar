'use client'
import { LucideIcon } from 'lucide-react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  icon: LucideIcon
  value: string
  change?: {
    value: string
    trend: 'up' | 'down'
  }
  subtext: string
  color: 'red' | 'green' | 'blue' | 'orange' | 'purple' | 'yellow' | 'indigo' | 'pink' | 'default'
}

export function StatCard({
  title,
  icon,
  value,
  subtext,
  color
}: StatCardProps) {
  const Icon = icon

  // Map color props to background and gradient combinations
  const colorMap: Record<string, { bg: string, gradient: string }> = {
    blue: {
      bg: 'bg-blue-50/80 dark:bg-blue-900/40',
      gradient: 'from-blue-100 to-blue-200 dark:from-indigo-500 dark:to-indigo-950',
    },
    green: {
      bg: 'bg-green-50/80 dark:bg-green-900/40',
      gradient: 'from-green-100 to-green-200 dark:from-emerald-400 dark:to-emerald-950',
    },
    red: {
      bg: 'bg-red-50/80 dark:bg-red-900/40',
      gradient: 'from-red-100 to-red-200 dark:from-rose-400 dark:to-rose-950',
    },
    yellow: {
      bg: 'bg-yellow-50/80 dark:bg-yellow-900/40',
      gradient: 'from-yellow-100 to-yellow-200 dark:from-yellow-700 dark:to-yellow-600',
    },
    default: {
      bg: 'bg-gray-50/80 dark:bg-gray-900/40',
      gradient: 'from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700',
    },
  }


  const colors = colorMap[color] || colorMap.default

  return (
    <Card className={cn(
      "border-none group relative overflow-hidden transition-all hover:shadow-lg",
      colors.bg
    )}>
      <div className={cn(
        "absolute inset-0 bg-gradient-to-r opacity-20 transition-opacity group-hover:opacity-30",
        colors.gradient
      )} />
      <CardHeader className="flex flex-row items-center justify-between space-y-0  relative z-10">
        <CardTitle className="text-sm font-medium tracking-wide">{title}</CardTitle>
        <div className="rounded-full bg-background/80 p-3 shadow-sm   transition-colors group-hover:bg-background">
          {Icon && <Icon className="h-4 w-4  " />}
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-bold tracking-tight">{value}</div>
        </div>
        <p className=" text-xs text-muted-foreground">
          {subtext}
        </p>
      </CardContent>
    </Card>
  )
}