'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { MarketingTabs } from '@/components/admin/marketing/marketing-tabs'
import { MarketingStatsCards } from '@/components/admin/marketing/campaigns-card-stars'
import { discountData, emailCampaignData } from '@/data/marketing-dummy-data'
import { campaignColumns } from '@/components/admin/marketing/campaign-columns'
import { discountColumns } from '@/components/admin/marketing/discount-columns'


export interface Discount {
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

export interface EmailCampaign {
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

export interface Notification {
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

const notificationData: Notification[] = [
  {
    id: '1',
    title: 'Order Confirmation',
    message: 'Your order has been confirmed and is being processed',
    type: 'EMAIL',
    targetAudience: 'All Customers',
    recipientCount: 2456,
    deliveredCount: 2398,
    isActive: true,
    createdAt: '2024-09-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'New Product Launch',
    message: 'Check out our latest products now available!',
    type: 'PUSH',
    targetAudience: 'Premium Customers',
    recipientCount: 567,
    deliveredCount: 543,
    isActive: true,
    createdAt: '2024-09-05T00:00:00Z'
  },
  {
    id: '3',
    title: 'Payment Reminder',
    message: 'Your payment is pending. Please complete to avoid cancellation.',
    type: 'SMS',
    targetAudience: 'Pending Orders',
    recipientCount: 123,
    deliveredCount: 120,
    isActive: true,
    createdAt: '2024-09-08T00:00:00Z'
  }
]

export default function MarketingPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const activeDiscounts = discountData.filter(d => d.isActive).length
  const totalUsage = discountData.reduce((sum, d) => sum + d.usedCount, 0)
  const avgOpenRate = emailCampaignData.reduce((sum, c) => sum + c.openRate, 0) / emailCampaignData.length
  const totalRecipients = emailCampaignData.reduce((sum, c) => sum + c.recipientCount, 0)

  return (
    <div className="space-y-6 min-h-screen py-4 px-2 md:px-10">
      {/* Header */}
      <div className=" flex items-center justify-between">
        <div>
         <h1 className='font-bold text-2xl'>Marketing Management</h1>
          <Breadcrumb className="">
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Campaigns</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Button onClick={() => router.push('/admin/marketing/campaigns/create')} className='rounded-full bg-secondary text-white hover:bg-secondary/90'>
          <PlusCircle className="h-4 w-4 mr-2" />
          Create Campaign
        </Button>
      </div>
      <Separator className="" />

      {/* Stats Cards */}
      <div className="pt-5">
        <MarketingStatsCards
          activeDiscounts={activeDiscounts}
          totalUsage={totalUsage}
          emailCampaignCount={emailCampaignData.length}
          totalRecipients={totalRecipients}
          avgOpenRate={avgOpenRate}
          notificationCount={notificationData.length}
        />
      </div>

<Separator className="" />
      {/* Marketing Tabs */}
      <MarketingTabs
        discountData={discountData}
        discountColumns={discountColumns}
        emailCampaignData={emailCampaignData}
        campaignColumns={campaignColumns}
        notificationData={notificationData}
      />
    </div>
  )
}