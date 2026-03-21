'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const categoryData = [
  { name: 'Electronics', value: 35, color: '#3b82f6' },
  { name: 'Fashion', value: 25, color: '#ef4444' },
  { name: 'Home & Garden', value: 20, color: '#10b981' },
  { name: 'Sports', value: 12, color: '#f59e0b' },
  { name: 'Books', value: 8, color: '#8b5cf6' }
]

export default function CategoryDistributionChart() {
  return (
    <div>
      <Card>

        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}