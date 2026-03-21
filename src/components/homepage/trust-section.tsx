'use client'

import { Shield, Truck, RefreshCw, Headphones, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    icon: Shield,
    title: 'Certified Quality',
    description: 'Every car undergoes 200+ point inspection',
    color: 'bg-primary',
  },
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'Doorstep delivery across India',
    color: 'bg-secondary',
  },
  {
    icon: RefreshCw,
    title: '7-Day Returns',
    description: 'Not satisfied? Return within 7 days',
    color: 'bg-tertiary',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Expert assistance anytime you need',
    color: 'bg-chart-4',
  },
]

export default function TrustSection() {
  return (
    <section className="w-full py-8">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-3">Why Choose Us</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We make buying your dream car simple, safe, and satisfying
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group p-6 rounded-2xl bg-card border border-border hover:bg-accent hover:border-primary/20 transition-all duration-300 dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 dark:hover:border-white/20"
          >
            <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-5`}>
              <feature.icon className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* CTA Banner */}
      <div className="relative rounded-3xl overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2000&q=80"
            alt="Luxury car"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent dark:from-blue-900/90 dark:via-blue-900/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Find Your Dream Car?
            </h3>
            <p className="text-white/70 mb-6">
              Browse our collection of 500+ premium vehicles. Financing available with easy EMI options.
            </p>
            <div className="flex flex-wrap gap-4">
              {['Verified Sellers', 'Easy Financing', 'Warranty Included'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-white/80 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/product"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-primary font-semibold hover:bg-gray-100 transition-colors dark:text-blue-900"
            >
              Browse Cars
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/contact"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 border border-white/30 text-white font-semibold hover:bg-white/20 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
