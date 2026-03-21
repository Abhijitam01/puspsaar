'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { DataTable } from '@/components/ui/data-table/data-table'
import { ColumnDef } from '@tanstack/react-table'
import { CreditCard, DollarSign, Receipt, RefreshCw, TrendingUp } from 'lucide-react'
import { ReportCards } from './finance-report-card'


interface FinanceTabsProps<TPayment, TInvoice, TRefund> {
    paymentColumns: ColumnDef<TPayment>[]
    invoiceColumns: ColumnDef<TInvoice>[]
    refundColumns: ColumnDef<TRefund>[]
    paymentData: TPayment[]
    invoiceData: TInvoice[]
    refundData: TRefund[]
}

export function FinanceTabs<TPayment, TInvoice, TRefund>({
    paymentColumns,
    invoiceColumns,
    refundColumns,
    paymentData,
    invoiceData,
    refundData,
}: FinanceTabsProps<TPayment, TInvoice, TRefund>) {
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <Tabs defaultValue="payments" className="space-y-6">
            <Card className='dark:bg-muted-foreground/10 bg-white py-4 border-none px-4'>
                <TabsList className="grid gap-5 grid-cols-4 bg-transprent ">
                    <TabsTrigger
                        value="payments"
                        className="flex items-center  gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-full"
                    >
                        <CreditCard className="h-4 w-4" />
                        Payments
                    </TabsTrigger>

                    <TabsTrigger
                        value="invoices"
                        className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm  rounded-full"
                    >
                        <Receipt className="h-4 w-4" />
                        Invoices
                    </TabsTrigger>

                    <TabsTrigger
                        value="refunds"
                        className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm  rounded-full"
                    >
                        <RefreshCw className="h-4 w-4" />
                        Refunds
                    </TabsTrigger>

                    <TabsTrigger
                        value="reports"
                        className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm  rounded-full"
                    >
                        <TrendingUp className="h-4 w-4" />
                        Reports
                    </TabsTrigger>
                </TabsList>
            </Card>

            {/* Payments */}
            <TabsContent value="payments" className="space-y-4">
              
                    <Card className="border shadow-sm  ">
                        <CardHeader className='pt-2'>
                            <CardTitle>Payment Transactions</CardTitle>
                            <CardDescription>
                                Monitor all payment transactions and gateway responses
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-5">
                            <div className="mb-4">
                                <Input
                                    placeholder="Search payments..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="max-w-sm rounded-md"
                                />
                            </div>
                            <DataTable columns={paymentColumns} data={paymentData} />
                        </CardContent>
                    </Card>
               
            </TabsContent>

            {/* Invoices */}
            <TabsContent value="invoices" className="space-y-4">
                    <Card className="border shadow-sm ">
                        <CardHeader className='pt-2'>
                            <CardTitle>Invoice Management</CardTitle>
                            <CardDescription>
                                Generate and manage customer invoices
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-5">
                            <DataTable
                                columns={invoiceColumns}
                                data={invoiceData}
                            />
                        </CardContent>
                    </Card>
            </TabsContent>

            {/* Refunds */}
            <TabsContent value="refunds" className="space-y-4">
                    <Card className="border shadow-sm">
                        <CardHeader className='pt-2'>
                            <CardTitle>Refund Management</CardTitle>
                            <CardDescription>
                                Process and track customer refunds
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-5">
                            <DataTable
                                columns={refundColumns}
                                data={refundData}
                            />
                        </CardContent>
                    </Card>
            </TabsContent>

            {/* Reports */}
            <TabsContent value="reports" className="space-y-4">
                <Card className='border-none dark:bg-muted-foreground/3'>
                    <CardHeader className='pt-2'>
                    <CardTitle className="text-xl font-semibold">Financial Reports</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                        Overview of revenue, payment methods, and refunds
                    </CardDescription>
                </CardHeader>
                <CardContent className='pb-5'>
                    <ReportCards />
                </CardContent>
            </Card>

        </TabsContent>
        </Tabs >
    )
}