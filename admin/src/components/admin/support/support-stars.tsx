
'use client'
import React from 'react'
import { TicketCheck, Clock1Icon, CheckCircle, ActivityIcon } from "lucide-react"

export default function SupportStars() {
  const cards = [
    {
      title: "Total Tickets",
      value: "120",
      description: "All time tickets",
      icon: TicketCheck,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Open Tickets",
      value: "45",
      description: "25 in progress",
      icon: Clock1Icon,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Resolved Today",
      value: "30",
      description: "Great job team!",
      icon: CheckCircle,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Avg Response Time",
      value: "2.5h",
      description: "-15 min from yesterday",
      icon: ActivityIcon,
      color: "bg-pink-100 text-pink-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <div 
            key={index} 
            className="p-5 rounded-lg shadow-md dark:bg-muted-foreground/15 hover:shadow-lg transition"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-3 rounded-full ${card.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-sm text-gray-600">{card.title}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">{card.description}</p>
          </div>
        )
      })}
    </div>
  )
}