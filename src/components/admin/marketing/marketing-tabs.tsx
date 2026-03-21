'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Users, Eye, Edit, Trash2, PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DataTable } from '@/components/ui/data-table/data-table'
import { ColumnDef } from '@tanstack/react-table'
import { Separator } from '@/components/ui/separator'

// Types
interface Discount {
    id: string
    code: string
    description: string
    type: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'BUY_X_GET_Y' | 'FREE_SHIPPING'
    value: number
    minOrderAmount?: number
    usageLimit?: number
    usedCount: number
    validFrom: string
    validUntil: string
    isActive: boolean
}

interface EmailCampaign {
    id: string
    name: string
    subject: string
    recipientCount: number
    sentCount: number
    openRate: number
    clickRate: number
    status: 'DRAFT' | 'SCHEDULED' | 'SENDING' | 'SENT' | 'CANCELLED'
    scheduledAt?: string
    sentAt?: string
}

interface Notification {
    id: string
    title: string
    message: string
    type: 'EMAIL' | 'SMS' | 'PUSH' | 'IN_APP'
    targetAudience: string
    recipientCount: number
    deliveredCount: number
    isActive: boolean
    createdAt: string
}

interface MarketingTabsProps {
    discountData: Discount[]
    discountColumns: ColumnDef<Discount>[]
    emailCampaignData: EmailCampaign[]
    campaignColumns: ColumnDef<EmailCampaign>[]
    notificationData: Notification[]
}

export function MarketingTabs({
    discountData,
    discountColumns,
    emailCampaignData,
    campaignColumns,
    notificationData,
}: MarketingTabsProps) {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <Tabs defaultValue="discounts" className="space-y-4">
            <Card className='border  p-3 shadow-none'>
                <TabsList className='flex space-x-6 border-b-0 pb-0 bg-transparent'>
                    <TabsTrigger value="discounts" className='rounded-full'>Discounts</TabsTrigger>
                    <TabsTrigger value="emails" className='rounded-full'>Email Campaigns</TabsTrigger>
                    <TabsTrigger value="notifications" className='rounded-full'>Notifications</TabsTrigger>
                    {/* <TabsTrigger value="segments" className='rounded-full'>Customer Segments</TabsTrigger> */}
                </TabsList>

            </Card>

            {/* Discounts */}
            <TabsContent value="discounts" className="space-y-4">
                <Card className='border shadow-none'>
                    <CardHeader>
                        <CardTitle>Discount List</CardTitle>
                        <CardDescription>Manage your discounts and promotions from this page.</CardDescription>
                    </CardHeader>

                    <div className="flex items-center justify-between mx-5 ">
                        <Input
                            placeholder="Search discounts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="max-w-sm rounded-full"
                        />
                        <Button onClick={() => router.push('/admin/marketing/coupon')} className='rounded-full bg-secondary text-white hover:bg-secondary/90'>
                            <PlusCircle className="h-4 w-4 mr-1" />
                            Manage Coupons
                        </Button>
                    </div>
                    <CardContent className='pb-4'>
                        <DataTable columns={discountColumns} data={discountData} />
                    </CardContent>
                </Card>
            </TabsContent>

            {/* Emails */}
            <TabsContent value="emails" className="space-y-4">
                <Card className='border shadow-sm  '>
                    <CardHeader className=" pt-4 ">
                        <CardTitle>Email Campaigns</CardTitle>
                        <CardDescription>Manage email marketing campaigns and newsletters</CardDescription>
                    </CardHeader>
                    <div className="flex items-center justify-between mx-5 ">
                        <Input
                            placeholder="Search campaigns..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="max-w-sm rounded-full"
                        />
                        <Button className='rounded-full bg-secondary text-white hover:bg-secondary/90' onClick={() => router.push('/admin/marketing/campaigns/create')}>
                            <Plus className="h-4 w-4 mr-2" />
                            Create Campaign
                        </Button>
                    </div>
                    <CardContent className='pb-4'>
                        <DataTable columns={campaignColumns} data={emailCampaignData} />
                    </CardContent>
                </Card>
            </TabsContent>

            {/* Notifications */}
            <TabsContent value="notifications" className="space-y-4">
                {/* */}
                <Card className='border shadow-none '>
                    <CardHeader className="">
                        <CardTitle>Notification List</CardTitle>
                        <p className='text-sm text-muted-foreground'>Manage your notifications from this page.</p>
                    </CardHeader>
                    <div className="flex items-center justify-between mx-6 pt-4">
                        <Input placeholder="Search notifications..." className="max-w-sm rounded-full" />
                        <Button className='rounded-full bg-secondary text-white hover:bg-secondary/90' onClick={() => router.push('/admin/marketing/notifications/create')}>
                            <PlusCircle className="h-4 w-4 " />
                            Create Notification
                        </Button>
                    </div>
                    <CardContent className='pb-4'>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {notificationData.map((notification) => (
                                <Card key={notification.id} className="border-0 hover:shadow-md transition-shadow  bg-gray-50 dark:bg-muted-foreground/5">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <Badge className=' text-yellow-600' variant="outline">{notification.type}</Badge>
                                            <Badge
                                                className={`text-xs font-medium px-2 py-1 rounded-full ${notification.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                    }`}
                                            >
                                                {notification.isActive ? 'Active' : 'Inactive'}
                                            </Badge>

                                        </div>
                                        <CardTitle className="text-lg">{notification.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className='pb-4'>
                                        <p className="text-sm text-muted-foreground mb-4">{notification.message}</p>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span>Target:</span>
                                                <span className="font-medium">{notification.targetAudience}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Recipients:</span>
                                                <span className="font-medium">{notification.recipientCount.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Delivered:</span>
                                                <span className="font-medium">{notification.deliveredCount.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </CardContent>
                </Card>

            </TabsContent>

            {/* Segments */}
            {/* <TabsContent value="segments" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardHeader className="text-center">
                            <Users className="h-8 w-8 mx-auto text-blue-500" />
                            <CardTitle className="text-lg">New Customers</CardTitle>
                            <CardDescription>First-time buyers</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <div className="text-2xl font-bold">1,234</div>
                            <p className="text-sm text-muted-foreground">customers</p>
                        </CardContent>
                    </Card>

                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardHeader className="text-center">
                            <Users className="h-8 w-8 mx-auto text-green-500" />
                            <CardTitle className="text-lg">Loyal Customers</CardTitle>
                            <CardDescription>5+ orders placed</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <div className="text-2xl font-bold">567</div>
                            <p className="text-sm text-muted-foreground">customers</p>
                        </CardContent>
                    </Card>

                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardHeader className="text-center">
                            <Users className="h-8 w-8 mx-auto text-purple-500" />
                            <CardTitle className="text-lg">VIP Customers</CardTitle>
                            <CardDescription>High-value shoppers</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <div className="text-2xl font-bold">89</div>
                            <p className="text-sm text-muted-foreground">customers</p>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent> */}
        </Tabs>
    )
}