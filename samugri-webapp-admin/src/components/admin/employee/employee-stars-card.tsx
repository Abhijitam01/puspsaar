'use client'
import { LucideIcon } from 'lucide-react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface DashboardStatCardProps {
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

export function EmployeeStatCard({
  title,
  icon,
  value,
  change,
  subtext,
  color
}: DashboardStatCardProps) {
  const Icon = icon
  
  // Map color props to background and gradient combinations
  const colorMap: Record<string, { bg: string, gradient: string }> = {
    'blue': {
      bg: 'bg-blue-50/80 dark:bg-blue-900/20',
      gradient: 'from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800'
    },
    'green': {
      bg: 'bg-green-50/80 dark:bg-green-900/20',
      gradient: 'from-green-100 to-green-200 dark:from-green-900 dark:to-green-800'
    },
    'red': {
      bg: 'bg-red-50/80 dark:bg-red-900/20',
      gradient: 'from-red-100 to-red-200 dark:from-red-900 dark:to-red-800'
    },
    'orange': {
      bg: 'bg-orange-50/80 dark:bg-orange-900/20',
      gradient: 'from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-800'
    },
    'purple': {
      bg: 'bg-purple-50/80 dark:bg-purple-900/20',
      gradient: 'from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800'
    },
    'yellow': {
      bg: 'bg-yellow-50/80 dark:bg-yellow-900/20',
      gradient: 'from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800'
    },
    'indigo': {
      bg: 'bg-indigo-50/80 dark:bg-indigo-900/20',
      gradient: 'from-indigo-100 to-indigo-200 dark:from-indigo-900 dark:to-indigo-800'
    },
    'pink': {
      bg: 'bg-pink-50/80 dark:bg-pink-900/20',
      gradient: 'from-pink-100 to-pink-200 dark:from-pink-900 dark:to-pink-800'
    },
    'default': {
      bg: 'bg-gray-50/80 dark:bg-gray-800/20',
      gradient: 'from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700'
    }
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
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-sm font-medium tracking-wide">{title}</CardTitle>
        <div className="rounded-full bg-background/80 p-2 transition-colors group-hover:bg-background">
          {Icon && <Icon className="h-4 w-4 text-foreground" />}
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="flex items-baseline justify-item  space-x-25 ">
          <div className="text-2xl font-bold tracking-tight ">{value}</div>
          {change && (
            <span 
              className={cn(
                "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium " ,
                change.trend === 'up'
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              )}
            >
              {change.trend === 'up' 
                ? <ArrowUpRight className="mr-1 h-3 w-3" />
                : <ArrowDownRight className="mr-1 h-3 w-3" />
              }
              {change.value}
            </span>
          )}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {subtext}
        </p>
      </CardContent>
    </Card>
  )
}