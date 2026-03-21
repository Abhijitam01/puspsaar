'use client'

import { useState } from 'react'
import { TagsIcon} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DataTable } from '@/components/ui/data-table/data-table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import SupportStars from '@/components/admin/support/support-stars'
import { ticketColumns } from '@/components/admin/support/support-ticket-columns'
import KnowledgeCategoryPage from '@/components/admin/support/knowledge-card'
import { services, SystemStatusPage } from '@/components/admin/support/support-status-card'

interface SupportTicket {
  id: string
  ticketNumber: string
  customerName: string
  customerEmail: string
  subject: string
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'
  category: string
  assignedTo?: string
  createdAt: string
  lastUpdated: string
}

const supportTicketData: SupportTicket[] = [
  {
    id: '1',
    ticketNumber: 'TKT-001',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    subject: 'Order not delivered',
    priority: 'HIGH',
    status: 'OPEN',
    category: 'Delivery',
    assignedTo: 'Support Agent 1',
    createdAt: '2024-09-09T10:30:00Z',
    lastUpdated: '2024-09-09T10:30:00Z'
  },
  {
    id: '2',
    ticketNumber: 'TKT-002',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    subject: 'Product quality issue',
    priority: 'MEDIUM',
    status: 'IN_PROGRESS',
    category: 'Product',
    assignedTo: 'Support Agent 2',
    createdAt: '2024-09-09T09:15:00Z',
    lastUpdated: '2024-09-09T11:20:00Z'
  },
  {
    id: '3',
    ticketNumber: 'TKT-003',
    customerName: 'Bob Johnson',
    customerEmail: 'bob@example.com',
    subject: 'Refund not processed',
    priority: 'URGENT',
    status: 'OPEN',
    category: 'Payment',
    createdAt: '2024-09-09T08:45:00Z',
    lastUpdated: '2024-09-09T08:45:00Z'
  },
  {
    id: '4',
    ticketNumber: 'TKT-004',
    customerName: 'Alice Wilson',
    customerEmail: 'alice@example.com',
    subject: 'Account login issue',
    priority: 'LOW',
    status: 'RESOLVED',
    category: 'Account',
    assignedTo: 'Support Agent 1',
    createdAt: '2024-09-08T16:20:00Z',
    lastUpdated: '2024-09-09T09:30:00Z'
  }
]

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredData = supportTicketData.filter(ticket => {
    const matchesSearch =
      ticket.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6 min-h-screen py-4 px-2 md:px-10">
      {/* Header */}
      <div className=" flex items-center justify-between">
        <div>
         <h1 className='font-bold text-2xl'>Support Center</h1>
          <Breadcrumb className="">
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage> Support</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/support/add">
            <Button className="bg-secondary text-white" variant={'default'}>
              <TagsIcon className="h-4 w-4" />
              Create Ticket
            </Button>
          </Link>
        </div>
      </div>
      <Separator className="" />

      {/* Stats Cards */}
      <SupportStars />

      {/* Support Center Tabs */}
      <Tabs defaultValue="tickets" className="space-y-4">
        <Card className="border-none bg-muted-foreground/9 p-5 flex justify-between">
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-transprent  rounded-lg">
            <TabsTrigger
              value="tickets"
              className="flex items-center gap-2 px-4 py-2 rounded-full 
                 data-[state=active]:bg-secondary data-[state=active]:text-white
                 transition"
            >
              Support Tickets
            </TabsTrigger>
            <TabsTrigger
              value="knowledge"
              className="flex items-center gap-2 px-4 py-2 rounded-full 
                 data-[state=active]:bg-secondary data-[state=active]:text-white
                 transition" >
              Knowledge Base
            </TabsTrigger>

            <TabsTrigger
              value="status"
              className="flex items-center gap-2 px-4 py-2 rounded-full 
                 data-[state=active]:bg-secondary data-[state=active]:text-white
                transition"   >
             System Status
            </TabsTrigger>
          </TabsList>
        </Card>

        <TabsContent value="tickets" className="space-y-4">
         
          <div className="p-0.5 bg-gradient-to-r from-blue-50 to-indigo-50  dark:from-zinc-700 dark:to-zinc-800 rounded-xl">
            <Card className='border-0 shadow-sm  '>
            <CardHeader className='pt-4'>
              <CardTitle>Support Tickets</CardTitle>
              <CardDescription>
                Manage and track customer support requests
              </CardDescription>
            </CardHeader>
             {/* Search and Filters */}
            <div className="flex items-center justify-between space-x-4 mx-6">
            <Input
              placeholder="Search tickets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm w-[300px]"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="max-w-sm w-[150px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="OPEN">Open</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="RESOLVED">Resolved</SelectItem>
                <SelectItem value="CLOSED">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
            <CardContent className='pb-5'>
              {/* data table */}
              <DataTable
                columns={ticketColumns}
                data={filteredData}
              />
            </CardContent>
          </Card>
          </div>
        </TabsContent>

        <TabsContent value="knowledge" className="space-y-4">
          < KnowledgeCategoryPage />
        </TabsContent>

        <TabsContent value="status" className="space-y-4">
         <SystemStatusPage services={services} />
        </TabsContent>
      </Tabs>
    </div>
  )
}