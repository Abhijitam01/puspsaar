'use client'
import React from 'react'
import { Activity, Database, Clock, Shield } from "lucide-react"

export default function SystemStars() {
  // Card data array
  const cards = [
    {
      title: "System Status",
      value: "Online",
      description: "All services running",
      icon: Activity,
    },
    {
      title: "Database",
      value: "99.9%",
      description: "Uptime this month",
      icon: Database,
    },
    {
      title: "Last Backup",
      value: "2 hours ago",
      description: "Automatic backup completed",
      icon: Clock, 
    },
    {
      title: "Active Sessions",
      value: 234,
      description: "Users online",
      icon: Shield, 
    },
  ]

  const gradients = [
    "from-green-500 to-green-900",
    "from-blue-500 to-blue-900",
    "from-amber-500 to-amber-900",
    "from-purple-500 to-purple-900",
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon
        const bg = gradients[index % gradients.length] // Assign gradient dynamically
        return (
          <div
            key={index}
            className={`p-4 rounded-md shadow-lg text-white bg-gradient-to-br ${bg} hover:scale-105 transform transition`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">{card.title}</h3>
              <Icon className="h-8 w-8 text-white " />
            </div>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs opacity-80">{card.description}</p>
          </div>
        )
      })}
    </div>
  )
}