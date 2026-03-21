'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { salesData } from "./monthly-sale-chart";

export default function OrderSaleChart() {
    return (
        <div>
            <Card>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="orders" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}