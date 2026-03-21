'use client'

import { Button } from '@/components/ui/button'
import { Calculator, Headphones, LineChart, ShieldCheck } from 'lucide-react'

const financeOptions = [
  {
    title: 'Shield Finance Prime',
    apr: '8.25%',
    details: '0 down payment for salaried profiles, approvals in 30 mins.',
    badge: 'Most Popular',
  },
  {
    title: 'Performance Lease',
    apr: '11.00%',
    details: '24-month lease with guaranteed buyback and concierge servicing.',
    badge: 'Business',
  },
  {
    title: 'Signature Cash+',
    apr: '6.90%',
    details: 'Top-up loans against existing garage with 5-minute approvals.',
    badge: 'VIP Garage',
  },
]

export default function FinanceCTA() {
  return (
    <section className="w-full rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0b0d18] via-[#05060b] to-[#111634] p-6 sm:p-10 text-white">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">Financing & concierge</p>
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">Finance, insure, and choreograph drives in one tap</h2>
          <p className="text-white/70">
            Dedicated advisors, instant eligibility, and white-glove support — from booking your immersion to the final reveal ritual.
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="rounded-full bg-secondary px-6 py-5 text-secondary-foreground shadow-lg shadow-secondary/30">
            Talk to Advisor
          </Button>
          <Button variant="outline" className="rounded-full border-white/30 px-6 py-5 text-white hover:bg-white/10">
            Schedule Test Drive
          </Button>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {financeOptions.map((option) => (
          <article key={option.title} className="glass-panel rounded-3xl border border-white/10 p-5">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.4em] text-white/50">
              <span>{option.badge}</span>
              <LineChart className="h-4 w-4 text-secondary" />
            </div>
            <h3 className="mt-3 text-xl font-semibold">{option.title}</h3>
            <p className="text-sm text-white/60">{option.details}</p>
            <p className="mt-6 text-4xl font-semibold text-secondary">{option.apr}</p>
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">apr</p>
            <div className="mt-6 flex gap-3 text-sm text-white/70">
              <Button className="flex-1 rounded-full bg-primary text-primary-foreground">Apply</Button>
              <Button variant="outline" className="flex-1 rounded-full border-white/30 text-white hover:bg-white/10">
                Details
              </Button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/80 sm:grid-cols-3">
        {[
          { icon: Calculator, label: 'Capital architect', value: 'Live eligibility with bureau soft checks' },
          { icon: ShieldCheck, label: 'Vault insurance', value: 'Agreed value + EV battery & art transit cover' },
          { icon: Headphones, label: 'Concierge', value: '24x7 hotline & WhatsApp support' },
        ].map((item) => (
          <div key={item.label} className="flex items-start gap-3">
            <item.icon className="mt-0.5 h-5 w-5 text-secondary" />
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/50">{item.label}</p>
              <p>{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

