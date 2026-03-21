'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, Mail, Eye, Bell, ArrowUpRight } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

interface MarketingStatsCardsProps {
  activeDiscounts: number
  totalUsage: number
  emailCampaignCount: number
  totalRecipients: number
  avgOpenRate: number
  notificationCount: number
}

interface StatItem {
  title: string
  value: string | number
  description: string
  icon: LucideIcon
  highlight?: boolean
  iconColor: string
  arrowBg: string
  arrowColor: string
}

export function MarketingStatsCards({
  activeDiscounts,
  totalUsage,
  emailCampaignCount,
  totalRecipients,
  avgOpenRate,
  notificationCount,
}: MarketingStatsCardsProps) {
  const stats: StatItem[] = [
    {
      title: 'Active Discounts',
      value: activeDiscounts,
      description: `${totalUsage.toLocaleString()} total uses`,
      icon: DollarSign,
      highlight: true,
      iconColor: 'text-green-200',
      arrowBg: 'bg-green-600',
      arrowColor: 'text-white',
    },
    {
      title: 'Email Campaigns',
      value: emailCampaignCount,
      description: `${totalRecipients.toLocaleString()} total recipients`,
      icon: Mail,
      iconColor: 'text-blue-500',
      arrowBg: 'bg-blue-100',
      arrowColor: 'text-blue-600',
    },
    {
      title: 'Avg Open Rate',
      value: `${avgOpenRate.toFixed(1)}%`,
      description: 'Across all campaigns',
      icon: Eye,
      iconColor: 'text-yellow-500',
      arrowBg: 'bg-yellow-100',
      arrowColor: 'text-yellow-600',
    },
    {
      title: 'Notifications',
      value: notificationCount,
      description: 'Active notification types',
      icon: Bell,
      iconColor: 'text-purple-500',
      arrowBg: 'bg-purple-100',
      arrowColor: 'text-purple-600',
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card
            key={stat.title}
            className={`relative overflow-hidden border-0 rounded-2xl transition-all hover:shadow-lg ${
              stat.highlight
                ? 'bg-gradient-to-br from-green-400 to-green-950  text-white'
                : 'bg-white dark:bg-muted-foreground/10'
            }`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle
                className={`text-sm font-medium ${
                  stat.highlight ? 'text-white/90' : 'text-muted-foreground'
                }`}
              >
                {stat.title}
              </CardTitle>

              {/* Arrow with dynamic bg + text color */}
              <ArrowUpRight
                className={`h-7 w-7 rounded-full p-1 ${stat.arrowBg} ${stat.arrowColor}`}
              />
            </CardHeader>

            <CardContent>
              <div
                className={`text-3xl font-bold ${
                  stat.highlight ? 'text-white' : 'text-foreground'
                }`}
              >
                {stat.value}
              </div>
              <p
                className={`text-xs ${
                  stat.highlight ? 'text-white/80' : 'text-muted-foreground'
                }`}
              >
                {stat.description}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}