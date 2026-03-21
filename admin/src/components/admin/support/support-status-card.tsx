'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Dice1 } from 'lucide-react'

interface ServiceStatus {
    service: string
    status: string
    uptime: string
}

interface SystemStatusProps {
    title?: string
    description?: string
    services: ServiceStatus[]
}

export const services = [
    { service: 'Website', status: 'Operational', uptime: '99.9%' },
    { service: 'Mobile App', status: 'Operational', uptime: '99.8%' },
    { service: 'Payment Gateway', status: 'Operational', uptime: '99.9%' },
    { service: 'Order Processing', status: 'Operational', uptime: '99.7%' },
    { service: 'Email Service', status: 'Operational', uptime: '99.6%' },
    { service: 'SMS Service', status: 'Minor Issues', uptime: '98.5%' }
]

export function SystemStatusPage({
    title = "System Status",
    description = "Current status of all system components",
    services
}: SystemStatusProps) {
    return (
        <div className="p-0.5 bg-gradient-to-r from-blue-50 to-indigo-50  dark:from-zinc-700 dark:to-zinc-800  rounded-xl">
            <Card className=" shadow-sm">
                <CardHeader className='pt-2'>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent className='pb-5'>
                    <div className="space-y-4">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-muted-foreground/10 border border-secondary rounded-lg"
                            >
                                <div className="flex items-center space-x-3">
                                    <div
                                        className={`w-3 h-3 rounded-full ${service.status === 'Operational'
                                            ? 'bg-green-500'
                                            : service.status === 'Minor Issues'
                                                ? 'bg-yellow-500'
                                                : 'bg-red-500'
                                            }`}
                                    />
                                    <div>
                                        <div className="font-medium">{service.service}</div>
                                        <div className="text-sm text-muted-foreground">{service.status}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-medium">{service.uptime}</div>
                                    <div className="text-sm text-muted-foreground">uptime</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>

    )
}