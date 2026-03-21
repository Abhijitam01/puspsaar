'use client'

import { Discount, EmailCampaign } from "@/app/admin/marketing/page"

export const discountData: Discount[] = [
  {
    id: '1',
    code: 'WELCOME10',
    description: 'Welcome discount for new customers',
    type: 'PERCENTAGE',
    value: 10,
    minOrderAmount: 500,
    usageLimit: 1000,
    usedCount: 234,
    validFrom: '2024-09-01T00:00:00Z',
    validUntil: '2024-12-31T23:59:59Z',
    isActive: true
  },
  {
    id: '2',
    code: 'FLAT500',
    description: 'Flat ₹500 off on orders above ₹2000',
    type: 'FIXED_AMOUNT',
    value: 500,
    minOrderAmount: 2000,
    usageLimit: 500,
    usedCount: 89,
    validFrom: '2024-09-01T00:00:00Z',
    validUntil: '2024-10-31T23:59:59Z',
    isActive: true
  },
  {
    id: '3',
    code: 'FREESHIP',
    description: 'Free shipping on all orders',
    type: 'FREE_SHIPPING',
    value: 0,
    usageLimit: undefined,
    usedCount: 567,
    validFrom: '2024-08-01T00:00:00Z',
    validUntil: '2024-11-30T23:59:59Z',
    isActive: false
  }
]

export const emailCampaignData: EmailCampaign[] = [
  {
    id: '1',
    name: 'Welcome Series - New Customers',
    subject: 'Welcome to DpBazaar! Here\'s your special discount',
    recipientCount: 1250,
    sentCount: 1250,
    openRate: 45.6,
    clickRate: 12.3,
    status: 'SENT',
    sentAt: '2024-09-08T10:00:00Z'
  },
  {
    id: '2',
    name: 'Flash Sale Announcement',
    subject: '⚡ 24-Hour Flash Sale - Up to 70% Off!',
    recipientCount: 5670,
    sentCount: 5670,
    openRate: 38.2,
    clickRate: 8.9,
    status: 'SENT',
    sentAt: '2024-09-07T09:00:00Z'
  },
  {
    id: '3',
    name: 'Cart Abandonment - Reminder',
    subject: 'You left something in your cart',
    recipientCount: 890,
    sentCount: 0,
    openRate: 0,
    clickRate: 0,
    status: 'SCHEDULED',
    scheduledAt: '2024-09-10T14:00:00Z'
  }
]