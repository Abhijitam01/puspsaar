'use client'

import { useState } from 'react'
import {  Download, LampDeskIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ColumnDef } from '@tanstack/react-table'
import { Tabs } from '@/components/ui/tabs'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import SystemStars from '@/components/admin/system/system-stars'
import SystemDetailsTabs from '@/components/admin/system/system-details-content'
import { emailTemplateColumns } from '@/components/admin/system/system-EmailTemplate-columns'
import { auditColumns } from '@/components/admin/system/system-auditlog-columns'

export interface IAuditLog {
  id: string
  userId?: string
  userEmail?: string
  action: string
  entityType: string
  entityId?: string
  ipAddress?: string
  userAgent?: string
  createdAt: string
  details?: string
}

export interface SystemSetting {
  id: string
  key: string
  value: any
  description?: string
  category: string
  type: 'string' | 'number' | 'boolean' | 'json'
}

export interface EmailTemplate {
  id: string
  code: string
  name: string
  subject: string
  variables: string[]
  isActive: boolean
  lastModified: string
}

 const auditLogData: IAuditLog[] = [
  {
    id: '1',
    userId: 'user_123',
    userEmail: 'admin@dpbazaar.com',
    action: 'UPDATE',
    entityType: 'Product',
    entityId: 'prod_456',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Chrome)',
    createdAt: '2024-09-09T10:30:00Z',
    details: 'Updated product price from ₹1000 to ₹1200'
  },
  {
    id: '2',
    userId: 'user_456',
    userEmail: 'manager@dpbazaar.com',
    action: 'CREATE',
    entityType: 'Order',
    entityId: 'ord_789',
    ipAddress: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (Safari)',
    createdAt: '2024-09-09T09:15:00Z',
    details: 'Created new order for customer ID: cust_123'
  },
  {
    id: '3',
    userId: 'user_123',
    userEmail: 'admin@dpbazaar.com',
    action: 'DELETE',
    entityType: 'User',
    entityId: 'user_999',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Chrome)',
    createdAt: '2024-09-09T08:45:00Z',
    details: 'Deleted inactive user account'
  }
]

 const systemSettings: SystemSetting[] = [
  {
    id: '1',
    key: 'site_name',
    value: 'DpBazaar',
    description: 'Name of the website displayed to users',
    category: 'General',
    type: 'string'
  },
  {
    id: '2',
    key: 'maintenance_mode',
    value: false,
    description: 'Enable maintenance mode to temporarily disable the site',
    category: 'General',
    type: 'boolean'
  },
  {
    id: '3',
    key: 'max_upload_size',
    value: 10,
    description: 'Maximum file upload size in MB',
    category: 'System',
    type: 'number'
  },
  {
    id: '4',
    key: 'email_notifications',
    value: true,
    description: 'Enable email notifications for orders and updates',
    category: 'Notifications',
    type: 'boolean'
  },
  {
    id: '5',
    key: 'default_currency',
    value: 'INR',
    description: 'Default currency for the platform',
    category: 'Commerce',
    type: 'string'
  },
  {
    id: '6',
    key: 'session_timeout',
    value: 3600,
    description: 'User session timeout in seconds',
    category: 'Security',
    type: 'number'
  }
]

 const emailTemplates: EmailTemplate[] = [
  {
    id: '1',
    code: 'ORDER_CONFIRMATION',
    name: 'Order Confirmation',
    subject: 'Order Confirmed - {{orderNumber}}',
    variables: ['customerName', 'orderNumber', 'orderTotal', 'orderItems'],
    isActive: true,
    lastModified: '2024-09-01T00:00:00Z'
  },
  {
    id: '2',
    code: 'SHIPPING_UPDATE',
    name: 'Shipping Update',
    subject: 'Your order is on the way! - {{trackingNumber}}',
    variables: ['customerName', 'orderNumber', 'trackingNumber', 'estimatedDelivery'],
    isActive: true,
    lastModified: '2024-08-28T00:00:00Z'
  },
  {
    id: '3',
    code: 'PASSWORD_RESET',
    name: 'Password Reset',
    subject: 'Reset your password',
    variables: ['customerName', 'resetLink', 'expiryTime'],
    isActive: true,
    lastModified: '2024-08-25T00:00:00Z'
  },
  {
    id: '4',
    code: 'WELCOME_EMAIL',
    name: 'Welcome Email',
    subject: 'Welcome to DpBazaar, {{customerName}}!',
    variables: ['customerName', 'welcomeDiscount', 'supportEmail'],
    isActive: false,
    lastModified: '2024-08-20T00:00:00Z'
  }
]

export default function SystemPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [settingsCategory, setSettingsCategory] = useState('all')

  const categories = [...new Set(systemSettings.map(s => s.category))]
  const filteredSettings = systemSettings.filter(setting =>
    settingsCategory === 'all' || setting.category === settingsCategory
  )

  return (
    <div className="space-y-6 min-h-screen py-4 px-2 md:px-10">
      {/* Header */}
      <div className=" flex items-center justify-between">
        <div>
         <h1 className='font-bold text-2xl'>System Managemen</h1>
          <Breadcrumb className="">
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>system settings </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex gap-2">
          <Button className='bg-secondary' variant={'default'}>
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
        </div>

      </div>
      <Separator className="" />

      {/* System Status Cards */}
      <div className="space-y-5">
        <div className="p-0.5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-zinc-700 dark:to-zinc-800  rounded-xl">
          <Card className="border shadow-sm ">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <LampDeskIcon className="h-5 w-5 text-orange-600" />
                System Overview
              </CardTitle>
              <CardDescription>Key statistics and metrics</CardDescription>
            </CardHeader>
            <CardContent className='pb-4'>
              <SystemStars />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* System Management Tabs */}
      <Tabs defaultValue="settings" className="space-y-4">
        <SystemDetailsTabs
          auditLogs={auditLogData}
          systemSettings={systemSettings}
          emailTemplates={emailTemplates}
          auditColumns={auditColumns}
          templateColumns={emailTemplateColumns}
        />
      </Tabs>
    </div>
  )
}