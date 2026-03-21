'use client'

import { FileText, CheckCircle, AlertTriangle, Scale, ShoppingCart, Ban, RefreshCw, Gavel, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const sections = [
  {
    icon: CheckCircle,
    title: 'Acceptance of Terms',
    content: `By accessing or using the Velaire House website and services, you agree to be bound by these Terms and Conditions. If you do not agree to all the terms, you may not access or use our services.

These terms apply to all visitors, users, and others who access or use our services. We reserve the right to update or modify these terms at any time without prior notice.`,
    iconBg: 'bg-teal-500',
  },
  {
    icon: ShoppingCart,
    title: 'Vehicle Purchases',
    content: `All vehicle listings on Velaire House are subject to availability. Prices displayed are indicative and may vary based on final inspection and documentation.

• Vehicle prices do not include registration, insurance, or other statutory charges unless explicitly stated
• A booking amount is required to reserve a vehicle
• Full payment must be completed before vehicle delivery
• All vehicles undergo a 210-point inspection before sale
• Vehicle specifications, features, and conditions are described to the best of our knowledge
• Minor variations in color, accessories, or features may occur`,
    iconBg: 'bg-cyan-500',
  },
  {
    icon: Ban,
    title: 'Prohibited Activities',
    content: `You agree not to engage in any of the following prohibited activities:

• Using the service for any illegal purpose or in violation of any laws
• Providing false or misleading information
• Attempting to interfere with or disrupt the service
• Impersonating another person or entity
• Collecting or storing personal data about other users
• Using automated scripts to collect information
• Attempting to circumvent security measures
• Transmitting viruses or other malicious code`,
    iconBg: 'bg-rose-500',
  },
  {
    icon: Scale,
    title: 'Intellectual Property',
    content: `The Velaire House name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of Velaire House or its affiliates.

• You may not use these marks without prior written permission
• All content on the website is protected by copyright
• Unauthorized use may result in legal action
• You may not reproduce, distribute, or create derivative works without permission`,
    iconBg: 'bg-violet-500',
  },
  {
    icon: RefreshCw,
    title: 'Returns and Exchanges',
    content: `Velaire House offers a 7-day exchange guarantee on all vehicle purchases, subject to the following conditions:

• The vehicle must be returned in the same condition as delivered
• Maximum of 500 km can be driven during the exchange period
• Original documentation must be intact
• Exchange is subject to availability of comparable vehicles
• Return/exchange requests must be submitted in writing
• Refunds are processed within 14 business days after vehicle inspection`,
    iconBg: 'bg-amber-500',
  },
  {
    icon: AlertTriangle,
    title: 'Limitation of Liability',
    content: `To the fullest extent permitted by law, Velaire House shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including:

• Loss of profits, data, or other intangible losses
• Damages resulting from unauthorized access to your account
• Any bugs, viruses, or other harmful code transmitted through the service
• Any interruption or cessation of the service
• Vehicle performance after sale
• Third-party actions or services`,
    iconBg: 'bg-red-500',
  },
  {
    icon: Gavel,
    title: 'Governing Law',
    content: `These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.

• Any disputes shall be subject to the exclusive jurisdiction of courts in Mumbai, India
• We encourage users to contact us directly for resolution of any disputes
• Arbitration may be required before court proceedings
• Class action lawsuits are waived to the extent permitted by law`,
    iconBg: 'bg-indigo-500',
  },
]

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Header */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-muted/50 dark:bg-muted" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-violet-500/10 dark:bg-violet-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl" />
        
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 rounded-xl bg-violet-500 flex items-center justify-center mx-auto mb-8 shadow-lg">
            <FileText className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">
            Terms &{' '}
            <span className="text-violet-600 dark:text-violet-400">Conditions</span>
          </h1>
          
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-6">
            Please read these terms and conditions carefully before using our services.
          </p>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
            <CheckCircle className="w-4 h-4 text-violet-600 dark:text-violet-400" />
            <span className="text-sm text-foreground/70">Last updated: January 1, 2024</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {sections.map((section) => {
              const IconComponent = section.icon
              return (
                <div 
                  key={section.title} 
                  className="p-6 lg:p-8 rounded-xl bg-card border border-border hover:border-border/80 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex gap-6">
                    <div className={`flex-shrink-0 w-14 h-14 rounded-xl ${section.iconBg} flex items-center justify-center shadow-md`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">{section.title}</h2>
                      <div className="prose prose-gray dark:prose-invert max-w-none">
                        <p className="text-foreground/80 whitespace-pre-line leading-relaxed">{section.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Contact Section */}
          <div className="mt-12 p-8 rounded-xl bg-violet-500/10 dark:bg-violet-500/15 border border-violet-500/30">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="w-16 h-16 rounded-xl bg-violet-500 flex items-center justify-center flex-shrink-0 shadow-md">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground mb-2">Have Questions?</h3>
                <p className="text-foreground/80 mb-4">
                  If you have any questions about these Terms & Conditions, please contact us.
                </p>
                <p className="text-sm text-foreground/70">
                  Email: <span className="text-violet-700 dark:text-violet-400 font-medium">legal@velairehouse.com</span> | Phone: <span className="text-violet-700 dark:text-violet-400 font-medium">+91 22 1234 5678</span>
                </p>
              </div>
              <Link href="/contact">
                <Button className="bg-violet-600 hover:bg-violet-700 text-white shadow-md">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
