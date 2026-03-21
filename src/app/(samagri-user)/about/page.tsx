'use client'

import { Award, Car, Heart, Shield, Users, Clock, Sparkles, ArrowRight, Star, Zap, Target, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const stats = [
  { value: '500+', label: 'Premium Vehicles', icon: Car, color: 'text-teal-600 dark:text-teal-400', bgColor: 'bg-teal-500' },
  { value: '10K+', label: 'Happy Customers', icon: Users, color: 'text-violet-600 dark:text-violet-400', bgColor: 'bg-violet-500' },
  { value: '50+', label: 'Luxury Brands', icon: Award, color: 'text-amber-600 dark:text-amber-400', bgColor: 'bg-amber-500' },
  { value: '99%', label: 'Satisfaction Rate', icon: Heart, color: 'text-rose-600 dark:text-rose-400', bgColor: 'bg-rose-500' },
]

const values = [
  {
    icon: Shield,
    title: 'Trust & Transparency',
    description: 'Every vehicle in our collection undergoes a rigorous 210-point inspection. We believe in complete transparency - no hidden fees, no surprises.',
    iconBg: 'bg-cyan-500',
  },
  {
    icon: Award,
    title: 'Excellence in Quality',
    description: 'We curate only the finest pre-owned luxury vehicles. Each car is meticulously vetted to ensure it meets our exceptional standards.',
    iconBg: 'bg-amber-500',
  },
  {
    icon: Heart,
    title: 'Customer First',
    description: 'Your satisfaction is our priority. From browsing to delivery, we provide a seamless, white-glove experience tailored to your needs.',
    iconBg: 'bg-rose-500',
  },
  {
    icon: Clock,
    title: 'Timeless Experience',
    description: 'We don\'t just sell cars; we deliver an experience. Our concierge service ensures every interaction feels premium and personalized.',
    iconBg: 'bg-violet-500',
  },
]

const team = [
  {
    name: 'Arjun Mehta',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Automotive enthusiast with 15+ years in luxury car industry',
    roleColor: 'text-teal-600 dark:text-teal-400',
    iconBg: 'bg-teal-500',
  },
  {
    name: 'Priya Sharma',
    role: 'Head of Operations',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    bio: 'Expert in streamlining customer experiences and logistics',
    roleColor: 'text-violet-600 dark:text-violet-400',
    iconBg: 'bg-violet-500',
  },
  {
    name: 'Vikram Singh',
    role: 'Chief Curator',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    bio: 'Passionate about finding the perfect vehicle for every client',
    roleColor: 'text-amber-600 dark:text-amber-400',
    iconBg: 'bg-amber-500',
  },
]

const milestones = [
  { year: '2019', title: 'Founded', description: 'Started with a vision to transform luxury car buying' },
  { year: '2020', title: '1000 Sales', description: 'Reached our first thousand happy customers' },
  { year: '2022', title: 'Expansion', description: 'Opened showrooms in 5 major cities' },
  { year: '2024', title: 'Industry Leader', description: 'Recognized as India\'s top luxury pre-owned platform' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=80"
            alt="Luxury car"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
        </div>
        
        {/* Subtle Background Accents */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-teal-500/10 dark:bg-teal-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-violet-500/10 dark:bg-violet-500/15 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal-500/10 dark:bg-teal-500/20 border border-teal-500/30 mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span className="text-sm font-medium text-teal-700 dark:text-teal-300">Our Story</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight text-foreground">
              Redefining{' '}
              <span className="text-teal-600 dark:text-teal-400">Luxury</span>
              <br />
              Pre-Owned{' '}
              <span className="text-amber-600 dark:text-amber-400">Vehicles</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Velaire House is India's premier destination for curated pre-owned luxury vehicles. 
              We bring together exceptional automobiles and discerning buyers through an unmatched 
              experience of trust, quality, and sophistication.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Link href="/product">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white gap-2 shadow-lg transition-all duration-300">
                  Explore Collection
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-2 border-foreground/30 hover:border-foreground/50 hover:bg-foreground/5 gap-2">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-muted/50 dark:bg-muted" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat) => {
              const IconComponent = stat.icon
              return (
                <div 
                  key={stat.label} 
                  className="group relative p-6 lg:p-8 rounded-2xl bg-card border border-border hover:border-border/80 transition-all duration-300 hover:shadow-lg"
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${stat.bgColor} mb-5 shadow-md`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  
                  <p className={`text-4xl lg:text-5xl font-bold ${stat.color} mb-2`}>
                    {stat.value}
                  </p>
                  <p className="text-sm lg:text-base text-foreground/70 font-medium">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 dark:bg-violet-500/20 border border-violet-500/30 mb-6">
                <Target className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                <span className="text-sm font-medium text-violet-700 dark:text-violet-300">Our Mission</span>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Transforming How India Buys{' '}
                <span className="text-violet-600 dark:text-violet-400">Luxury Cars</span>
              </h2>
              
              <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
                We believe that buying a pre-owned luxury vehicle should be as exciting and trustworthy 
                as buying a new one. Our mission is to create a seamless, transparent marketplace where 
                quality meets affordability.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: Zap, text: '210+ point quality inspection on every vehicle' },
                  { icon: Globe, text: 'Nationwide delivery with doorstep service' },
                  { icon: Star, text: 'Industry-leading warranty programs' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 dark:bg-violet-500/20 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                    </div>
                    <span className="text-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-border">
                <img
                  src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80"
                  alt="Luxury car showroom"
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white/90 text-sm mb-2">Velaire House Showroom</p>
                  <p className="text-white text-xl font-semibold">Mumbai, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-muted/50 dark:bg-muted" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 border border-cyan-500/30 mb-6">
              <Heart className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span className="text-sm font-medium text-cyan-700 dark:text-cyan-300">Our Values</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              The Principles That{' '}
              <span className="text-cyan-600 dark:text-cyan-400">Guide Us</span>
            </h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              These core values shape every interaction and decision at Velaire House
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const IconComponent = value.icon
              return (
                <div
                  key={value.title}
                  className="group relative p-6 lg:p-8 rounded-2xl bg-card border border-border hover:border-border/80 transition-all duration-300 hover:shadow-lg"
                >
                  <div className={`w-14 h-14 rounded-xl ${value.iconBg} flex items-center justify-center mb-6 shadow-md`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-3">{value.title}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline/Milestones */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 mb-6">
              <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span className="text-sm font-medium text-amber-700 dark:text-amber-300">Our Journey</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Milestones That{' '}
              <span className="text-amber-600 dark:text-amber-400">Define Us</span>
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden lg:block" />
            
            <div className="space-y-8 lg:space-y-0">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className={`relative lg:flex items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:text-left lg:pl-12'}`}>
                    <div className="inline-block p-6 rounded-2xl bg-card border border-border hover:border-amber-500/30 transition-all duration-300 hover:shadow-lg">
                      <span className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                        {milestone.year}
                      </span>
                      <h3 className="text-xl font-semibold text-foreground mt-2 mb-1">{milestone.title}</h3>
                      <p className="text-foreground/70">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-amber-500 shadow-md" />
                  
                  <div className="lg:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-muted/50 dark:bg-muted" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 dark:bg-rose-500/20 border border-rose-500/30 mb-6">
              <Users className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              <span className="text-sm font-medium text-rose-700 dark:text-rose-300">Leadership</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Meet Our{' '}
              <span className="text-rose-600 dark:text-rose-400">Team</span>
            </h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Passionate individuals dedicated to delivering excellence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="group relative p-6 rounded-2xl bg-card border border-border hover:border-border/80 transition-all duration-300 hover:shadow-lg"
              >
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-xl overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                <div className="text-center">
                  <h3 className="font-bold text-lg text-foreground mb-1">{member.name}</h3>
                  <p className={`text-sm font-medium ${member.roleColor} mb-3`}>
                    {member.role}
                  </p>
                  <p className="text-sm text-foreground/70">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=2000&q=80"
                alt="Luxury car"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70" />
            </div>
            
            <div className="relative z-10 py-20 lg:py-28 px-8 lg:px-16 text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Find Your{' '}
                <span className="text-teal-400">Dream Car</span>?
              </h2>
              <p className="text-white/80 text-lg max-w-xl mx-auto mb-10">
                Explore our curated collection of premium pre-owned vehicles and experience the Velaire difference
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/product">
                  <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white gap-2 shadow-lg transition-all duration-300 px-8">
                    Browse Collection
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-2 border-white/40 text-white hover:bg-white/10 hover:border-white/60 gap-2 px-8">
                    Schedule a Visit
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
