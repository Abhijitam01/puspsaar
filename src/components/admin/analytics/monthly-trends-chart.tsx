'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const salesData = [
  { month: 'Jan', sales: 12000, orders: 145, customers: 89 },
  { month: 'Feb', sales: 19000, orders: 178, customers: 112 },
  { month: 'Mar', sales: 15000, orders: 156, customers: 98 },
  { month: 'Apr', sales: 25000, orders: 234, customers: 145 },
  { month: 'May', sales: 22000, orders: 198, customers: 134 },
  { month: 'Jun', sales: 31000, orders: 267, customers: 189 },
  { month: 'Jul', sales: 28000, orders: 245, customers: 167 },
  { month: 'Aug', sales: 35000, orders: 289, customers: 201 },
  { month: 'Sep', sales: 32000, orders: 276, customers: 189 }
]

export default function MonthlyTrendsChart() {
  return (
    <div>
        <Card>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="sales"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    name="Sales (₹)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="orders"
                    stroke="#ef4444"
                    strokeWidth={2}
                    name="Orders"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="customers"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="New Customers"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
    </div>
  )
}