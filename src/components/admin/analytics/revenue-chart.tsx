'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import React from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const revenueData = [
  { day: 'Mon', revenue: 4500, orders: 23 },
  { day: 'Tue', revenue: 5200, orders: 28 },
  { day: 'Wed', revenue: 4800, orders: 25 },
  { day: 'Thu', revenue: 6100, orders: 32 },
  { day: 'Fri', revenue: 7200, orders: 38 },
  { day: 'Sat', revenue: 8900, orders: 45 },
  { day: 'Sun', revenue: 6800, orders: 35 }
]
export default function RevenueChart() {
  return (
    <div>
      <Card className=''>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}