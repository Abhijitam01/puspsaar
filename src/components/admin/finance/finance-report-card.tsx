'use client'

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { DollarSign, CreditCard, RefreshCw } from 'lucide-react'

interface ReportCardItem {
  title: string
  description: string
  icon: React.ReactNode
  iconColor: string
  iconBg: string
}

const reportItems: ReportCardItem[] = [
  {
    title: "Revenue Report",
    description: "Daily, weekly & monthly revenue",
    icon: <DollarSign className="h-5 w-5 text-green-600" />,
    iconColor: "text-green-600",
    iconBg: "bg-green-100"
  },
  {
    title: "Payment Methods",
    description: "Payment gateway analytics",
    icon: <CreditCard className="h-5 w-5 text-blue-600" />,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100"
  },
  {
    title: "Refund Analysis",
    description: "Refund trends and reasons",
    icon: <RefreshCw className="h-5 w-5 text-orange-600" />,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100"
  }
]

export function ReportCards() {
  return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {reportItems.map((item, idx) => (
        <Card
          key={idx}
          className="flex items-center justify-between p-5 shadow-sm hover:shadow-md transition rounded-xl border-none bg-gray-50 dark:bg-muted-foreground/9"
        >
          {/* Icon inside circle */}
          <div className={`h-12 w-12 flex items-center justify-center rounded-full ${item.iconBg}`}>
            {item.icon}
          </div>

          {/* Text Section */}
          <div className="text-center">
            <div className="text-lg font-semibold">{item.title}</div>
            <div className="text-sm text-muted-foreground">{item.description}</div>
          </div>
        </Card>
      ))}
    </div>
  )
}