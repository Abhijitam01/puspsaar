import React from 'react'
import { Card, CardContent} from "@/components/ui/card";
import {  Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


const customerAcquisitionData = [
  { month: 'Jan', organic: 45, paid: 23, referral: 12, social: 8 },
  { month: 'Feb', organic: 52, paid: 28, referral: 15, social: 11 },
  { month: 'Mar', organic: 48, paid: 25, referral: 18, social: 9 },
  { month: 'Apr', organic: 61, paid: 32, referral: 22, social: 14 },
  { month: 'May', organic: 58, paid: 35, referral: 19, social: 16 },
  { month: 'Jun', organic: 67, paid: 41, referral: 25, social: 18 }
]

export default function CustomerAcquistionChart() {
  return (
    <div>
        <Card>
           
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={customerAcquisitionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="organic" stackId="a" fill="#3b82f6" name="Organic" />
                  <Bar dataKey="paid" stackId="a" fill="#ef4444" name="Paid Ads" />
                  <Bar dataKey="referral" stackId="a" fill="#10b981" name="Referral" />
                  <Bar dataKey="social" stackId="a" fill="#f59e0b" name="Social Media" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
    </div>
  )
}