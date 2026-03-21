'use client'

import { Shield, Lock, Eye, Database, Bell, Users, Mail, CheckCircle } from 'lucide-react'

const sections = [
  {
    icon: Database,
    title: 'Information We Collect',
    content: `We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This includes:
    
• Personal identification information (name, email address, phone number)
• Payment and billing information
• Vehicle preferences and search history
• Communication preferences
• Any other information you choose to provide`,
    iconBg: 'bg-cyan-500',
  },
  {
    icon: Eye,
    title: 'How We Use Your Information',
    content: `We use the information we collect to:
    
• Process transactions and send related information
• Send you technical notices, updates, and support messages
• Respond to your comments, questions, and customer service requests
• Communicate about promotions, upcoming events, and news about vehicles
• Monitor and analyze trends, usage, and activities
• Detect, investigate, and prevent fraudulent transactions
• Personalize and improve your experience`,
    iconBg: 'bg-violet-500',
  },
  {
    icon: Users,
    title: 'Information Sharing',
    content: `We may share your information in the following situations:
    
• With vendors and service providers who need access to perform services on our behalf
• In response to a legal request if we believe disclosure is required by law
• To protect the rights, property, and safety of Velaire House, our users, or others
• In connection with a merger, acquisition, or sale of assets
• With your consent or at your direction`,
    iconBg: 'bg-teal-500',
  },
  {
    icon: Lock,
    title: 'Data Security',
    content: `We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. These measures include:
    
• Encryption of sensitive data in transit and at rest
• Regular security assessments and penetration testing
• Access controls and authentication requirements
• Employee training on data protection
• Incident response procedures`,
    iconBg: 'bg-amber-500',
  },
  {
    icon: Bell,
    title: 'Your Rights and Choices',
    content: `You have several rights regarding your personal information:
    
• Access: You can request a copy of your personal data
• Correction: You can ask us to correct inaccurate information
• Deletion: You can request deletion of your personal data
• Opt-out: You can opt out of marketing communications
• Data Portability: You can request your data in a portable format
    
To exercise these rights, contact us at privacy@velairehouse.com`,
    iconBg: 'bg-rose-500',
  },
  {
    icon: Mail,
    title: 'Contact Us',
    content: `If you have any questions about this Privacy Policy or our practices, please contact us at:
    
Velaire House Privacy Team
Email: privacy@velairehouse.com
Phone: +91 22 1234 5678
Address: 123 Luxury Avenue, Worli, Mumbai - 400018, India
    
We will respond to your inquiry within 30 days.`,
    iconBg: 'bg-indigo-500',
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Header */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-muted/50 dark:bg-muted" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-teal-500/10 dark:bg-teal-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-violet-500/10 dark:bg-violet-500/15 rounded-full blur-3xl" />
        
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 rounded-xl bg-teal-500 flex items-center justify-center mx-auto mb-8 shadow-lg">
            <Shield className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">
            Privacy{' '}
            <span className="text-teal-600 dark:text-teal-400">Policy</span>
          </h1>
          
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-6">
            At Velaire House, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information.
          </p>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
            <CheckCircle className="w-4 h-4 text-teal-600 dark:text-teal-400" />
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
          
          {/* Footer Note */}
          <div className="mt-12 p-6 rounded-xl bg-teal-500/10 dark:bg-teal-500/15 border border-teal-500/30 text-center">
            <p className="text-foreground/80">
              By using our services, you acknowledge that you have read and understood this Privacy Policy.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
