'use client'

import { RefreshCw, Clock, CheckCircle, XCircle, CreditCard, AlertCircle, HelpCircle, Phone, ArrowRight, Shield } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const refundSteps = [
  {
    step: 1,
    title: 'Submit Request',
    description: 'Contact our support team within 7 days of vehicle delivery to initiate a return or exchange request.',
    iconBg: 'bg-cyan-500',
  },
  {
    step: 2,
    title: 'Vehicle Inspection',
    description: 'Our team will schedule an inspection within 48 hours to assess the vehicle condition.',
    iconBg: 'bg-violet-500',
  },
  {
    step: 3,
    title: 'Approval',
    description: 'Once approved, we will arrange for vehicle pickup at your convenience.',
    iconBg: 'bg-teal-500',
  },
  {
    step: 4,
    title: 'Refund Processing',
    description: 'Refund will be processed within 14 business days after vehicle collection.',
    iconBg: 'bg-amber-500',
  },
]

const eligibleReasons = [
  'Major undisclosed mechanical issues discovered within 7 days',
  'Significant discrepancy from listed specifications',
  'Hidden accident history not disclosed at the time of sale',
  'Odometer tampering discovered',
  'Legal encumbrances on the vehicle',
]

const nonEligibleReasons = [
  'Minor cosmetic wear consistent with vehicle age',
  'Buyer\'s remorse or change of preference',
  'Damage caused after delivery',
  'More than 500 km driven during the return period',
  'Request made after 7-day return window',
  'Missing or damaged original documentation',
]

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Header */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-muted/50 dark:bg-muted" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-amber-500/10 dark:bg-amber-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-500/10 dark:bg-teal-500/15 rounded-full blur-3xl" />
        
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 rounded-xl bg-amber-500 flex items-center justify-center mx-auto mb-8 shadow-lg">
            <RefreshCw className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">
            Refund{' '}
            <span className="text-amber-600 dark:text-amber-400">Policy</span>
          </h1>
          
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            We stand behind every vehicle we sell. Learn about our 7-day return guarantee and refund process.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* 7-Day Guarantee Banner */}
          <div className="mb-16 p-8 lg:p-10 rounded-xl bg-teal-600 dark:bg-teal-700">
            <div className="flex flex-col md:flex-row items-center gap-6 text-white">
              <div className="w-20 h-20 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl lg:text-3xl font-bold mb-2">7-Day / 500 km Exchange Guarantee</h2>
                <p className="text-white/90 max-w-2xl">
                  Every vehicle purchased from Velaire House comes with our 7-day exchange guarantee. 
                  If you're not completely satisfied, you can return or exchange your vehicle within 
                  7 days of delivery, subject to a maximum of 500 km driven.
                </p>
              </div>
            </div>
          </div>

          {/* Refund Process Steps */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 border border-cyan-500/30 mb-4">
                <Clock className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span className="text-sm font-medium text-cyan-700 dark:text-cyan-300">Simple Process</span>
              </div>
              <h2 className="text-3xl font-bold text-foreground">
                Refund{' '}
                <span className="text-cyan-600 dark:text-cyan-400">Process</span>
              </h2>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {refundSteps.map((item) => (
                <Card key={item.step} className="group border-border hover:border-border/80 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="absolute top-4 right-4 text-5xl font-bold text-foreground/5 group-hover:text-foreground/10 transition-colors">
                      {item.step}
                    </div>
                    <div className={`w-12 h-12 rounded-lg ${item.iconBg} flex items-center justify-center mb-4 shadow-md`}>
                      <span className="text-xl font-bold text-white">{item.step}</span>
                    </div>
                    <h3 className="font-bold text-foreground mb-2 text-lg">{item.title}</h3>
                    <p className="text-sm text-foreground/70">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Eligibility Criteria */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Eligible */}
            <Card className="border-teal-500/30 hover:border-teal-500/50 transition-all duration-300">
              <CardContent className="p-6 lg:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-teal-500 flex items-center justify-center shadow-md">
                    <CheckCircle className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Eligible for Refund</h3>
                </div>
                <ul className="space-y-3">
                  {eligibleReasons.map((reason, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-teal-600 dark:text-teal-400 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/80">{reason}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Not Eligible */}
            <Card className="border-rose-500/30 hover:border-rose-500/50 transition-all duration-300">
              <CardContent className="p-6 lg:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-rose-500 flex items-center justify-center shadow-md">
                    <XCircle className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Not Eligible for Refund</h3>
                </div>
                <ul className="space-y-3">
                  {nonEligibleReasons.map((reason, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/80">{reason}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Refund Methods */}
          <div className="mb-16">
            <Card className="border-border hover:border-border/80 transition-all duration-300">
              <CardContent className="p-6 lg:p-8">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="w-16 h-16 rounded-xl bg-violet-500 flex items-center justify-center flex-shrink-0 shadow-md">
                    <CreditCard className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">Payment Method Based Refund</h3>
                    <p className="text-foreground/80 mb-6">
                      Refunds will be processed to the original payment method used during purchase:
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { method: 'Bank Transfer', time: '7-10 business days' },
                        { method: 'Credit/Debit Card', time: '5-7 business days' },
                        { method: 'EMI/Finance', time: 'Loan cancellation processed' },
                        { method: 'Cheque', time: '14 business days' },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 dark:bg-muted">
                          <div className="w-2 h-2 rounded-full bg-violet-500" />
                          <div>
                            <span className="font-medium text-foreground">{item.method}:</span>
                            <span className="text-foreground/70 text-sm ml-2">{item.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Important Notes */}
          <div className="mb-16 p-6 lg:p-8 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-14 h-14 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0 shadow-md">
                <AlertCircle className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">Important Notes</h3>
                <ul className="space-y-3">
                  {[
                    'Booking amounts are non-refundable if you cancel before delivery',
                    'Documentation charges (up to ₹25,000) may be deducted from refunds',
                    'Insurance premium refunds are subject to the insurer\'s policy',
                    'Exchange vehicles must be of equal or higher value',
                    'Only one exchange is permitted per purchase',
                  ].map((note, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-white">{index + 1}</span>
                      </div>
                      <span className="text-foreground/80">{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <Card className="border-border">
            <CardContent className="p-8 lg:p-12 text-center">
              <div className="w-20 h-20 rounded-xl bg-teal-500 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <HelpCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Need Help with a Refund?</h3>
              <p className="text-foreground/80 mb-8 max-w-md mx-auto">
                Our customer support team is available to assist you with any refund-related queries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button variant="outline" className="gap-2 border-2 border-teal-500/40 hover:border-teal-500/60 hover:bg-teal-500/10 text-teal-700 dark:text-teal-400">
                    <Phone className="w-4 h-4" />
                    Contact Support
                  </Button>
                </Link>
                <Button className="gap-2 bg-teal-600 hover:bg-teal-700 text-white shadow-md">
                  Request Refund
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
