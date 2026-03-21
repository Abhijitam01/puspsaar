'use client'

import { useState } from 'react'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { CreditCard, DollarSign, Receipt, RefreshCw, TrendingUp, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import FinanceStatsGrid from '@/components/admin/finance/finance-stars';
import { FinanceTabs } from '@/components/admin/finance/FinanceTabs';
import { paymentColumns } from '@/components/admin/finance/payment-columns';
import { Invoice, invoiceColumns } from '@/components/admin/finance/invoice-columns';
import { Refund, refundColumns } from '@/components/admin/finance/refund-columns';



export interface Payment {
  id: string
  orderId: string
  amount: number
  currency: string
  method: 'CREDIT_CARD' | 'DEBIT_CARD' | 'UPI' | 'NET_BANKING' | 'COD' | 'WALLET'
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED'
  gatewayName: string
  gatewayPaymentId?: string
  cardLast4?: string
  customerName: string
  date: string
}

const paymentData: Payment[] = [
  {
    id: '1',
    orderId: 'ORD-2024-001',
    amount: 1299.99,
    currency: 'INR',
    method: 'UPI',
    status: 'SUCCESS',
    gatewayName: 'Razorpay',
    gatewayPaymentId: 'pay_123456789',
    customerName: 'John Doe',
    date: '2024-09-09T10:30:00Z'
  },
  {
    id: '2',
    orderId: 'ORD-2024-002',
    amount: 859.50,
    currency: 'INR',
    method: 'CREDIT_CARD',
    status: 'SUCCESS',
    gatewayName: 'Stripe',
    gatewayPaymentId: 'pi_987654321',
    cardLast4: '4242',
    customerName: 'Jane Smith',
    date: '2024-09-09T09:15:00Z'
  },
  {
    id: '3',
    orderId: 'ORD-2024-003',
    amount: 2199.00,
    currency: 'INR',
    method: 'NET_BANKING',
    status: 'PENDING',
    gatewayName: 'Razorpay',
    customerName: 'Bob Johnson',
    date: '2024-09-09T08:45:00Z'
  }
]

const invoiceData: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    orderId: 'ORD-2024-001',
    customerName: 'John Doe',
    subtotal: 1099.99,
    taxAmount: 200.00,
    totalAmount: 1299.99,
    status: 'PAID',
    issuedAt: '2024-09-09T10:30:00Z',
    paidAt: '2024-09-09T10:35:00Z'
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    orderId: 'ORD-2024-002',
    customerName: 'Jane Smith',
    subtotal: 729.50,
    taxAmount: 130.00,
    totalAmount: 859.50,
    status: 'ISSUED',
    issuedAt: '2024-09-09T09:15:00Z',
    dueDate: '2024-09-16T09:15:00Z'
  }
]

const refundData: Refund[] = [
  {
    id: '1',
    orderId: 'ORD-2024-004',
    paymentId: 'pay_456789123',
    amount: 649.99,
    reason: 'Product defective',
    status: 'SUCCESS',
    customerName: 'Alice Wilson',
    requestedAt: '2024-09-08T16:20:00Z',
    processedAt: '2024-09-08T18:30:00Z'
  },
  {
    id: '2',
    orderId: 'ORD-2024-005',
    paymentId: 'pay_789123456', 
    amount: 299.99,
    reason: 'Order cancelled',
    status: 'PROCESSING',
    customerName: 'Mike Brown',
    requestedAt: '2024-09-08T14:10:00Z'
  }
]

export default function FinancePage() {
  const [searchQuery, setSearchQuery] = useState('')

  const totalRevenue = paymentData
    .filter(p => p.status === 'SUCCESS')
    .reduce((sum, p) => sum + p.amount, 0)

  const pendingPayments = paymentData.filter(p => p.status === 'PENDING').length
  const totalRefunds = refundData.reduce((sum, r) => sum + r.amount, 0)
  const processingRefunds = refundData.filter(r => r.status === 'PROCESSING').length

  return (
    <div className="space-y-6 min-h-screen py-4 px-2 md:px-10">
      {/* Header */}
      <div className=" flex items-center justify-between">
        <div>
          <h1 className='font-bold text-2xl'>Financing & Payments</h1>
          <Breadcrumb className="">
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Financing & Payments</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex space-x-6">
          <Button variant={'outline'} className='border cursor-pointer transition-all '>
            <Download className="h-4 w-4 mr-1" />
            Export Report
          </Button>
          <Button className='bg-secondary  hover:bg-secondary/80 text-white border cursor-pointer transition-all '>
            <Receipt className="h-4 w-4 mr-2" />
            Generate Invoice
          </Button>
        </div>
      </div>
      <Separator className="" />

      {/* Stats Cards */}
    <FinanceStatsGrid
      totalRevenue={totalRevenue}
      pendingPayments={pendingPayments}
      totalRefunds={totalRefunds}
      processingRefunds={processingRefunds}
      paymentData={paymentData}
    />  

      {/* Tabs for different sections */}
       <FinanceTabs
        paymentColumns={paymentColumns}
        invoiceColumns={invoiceColumns}
        refundColumns={refundColumns}
        paymentData={paymentData}
        invoiceData={invoiceData}
        refundData={refundData}
      />
    </div>
  )
}