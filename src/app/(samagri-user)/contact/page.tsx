'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, CheckCircle, Building, HeadphonesIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: ['Velaire House Showroom', '123 Luxury Avenue, Worli', 'Mumbai - 400018, India'],
    iconBg: 'bg-teal-500',
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+91 98765 43210', '+91 22 1234 5678', 'Toll Free: 1800-123-CARS'],
    iconBg: 'bg-violet-500',
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['hello@velairehouse.com', 'sales@velairehouse.com', 'support@velairehouse.com'],
    iconBg: 'bg-amber-500',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    details: ['Monday - Saturday: 10 AM - 8 PM', 'Sunday: 11 AM - 6 PM', 'Appointments Recommended'],
    iconBg: 'bg-rose-500',
  },
]

const inquiryTypes = [
  'Vehicle Inquiry',
  'Book Test Drive',
  'Sell Your Car',
  'Finance Options',
  'General Question',
  'Complaint',
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', phone: '', inquiryType: '', message: '' })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2000&q=80"
            alt="Contact background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
        </div>
        
        {/* Subtle Background Accents */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-teal-500/10 dark:bg-teal-500/15 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 border border-cyan-500/30 mb-8 backdrop-blur-sm">
              <MessageSquare className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span className="text-sm font-medium text-cyan-700 dark:text-cyan-300">Get in Touch</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Let's Start a{' '}
              <span className="text-cyan-600 dark:text-cyan-400">Conversation</span>
            </h1>
            
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Have questions about a vehicle or our services? Our team of experts is here to help you find your perfect luxury ride.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info) => {
              const IconComponent = info.icon
              return (
                <Card 
                  key={info.title} 
                  className="group border-border hover:border-border/80 transition-all duration-300 hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 rounded-xl ${info.iconBg} flex items-center justify-center mb-5 shadow-md`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-bold text-foreground mb-3 text-lg">{info.title}</h3>
                    <div className="space-y-1.5">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-sm text-foreground/70">{detail}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div className="p-8 lg:p-10 rounded-2xl bg-card border border-border">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 dark:bg-teal-500/20 border border-teal-500/30 mb-4">
                  <Send className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span className="text-sm font-medium text-teal-700 dark:text-teal-300">Send Message</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Send Us a Message</h2>
                <p className="text-foreground/70">Fill out the form below and we'll get back to you within 24 hours.</p>
              </div>

              {isSubmitted ? (
                <div className="p-8 rounded-xl bg-teal-500/10 dark:bg-teal-500/20 border border-teal-500/30 text-center">
                  <div className="w-20 h-20 rounded-full bg-teal-500 flex items-center justify-center mx-auto mb-6 shadow-md">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-foreground/70">Thank you for reaching out. Our team will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Name *</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                        className="bg-muted/50 border-border"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="bg-muted/50 border-border"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                      <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="bg-muted/50 border-border"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Inquiry Type</label>
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        className="w-full h-10 px-3 rounded-md bg-muted/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
                      >
                        <option value="">Select type</option>
                        {inquiryTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message *</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      required
                      rows={5}
                      className="bg-muted/50 border-border resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full gap-2 bg-teal-600 hover:bg-teal-700 text-white shadow-md"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 dark:bg-violet-500/20 border border-violet-500/30 mb-4">
                  <Building className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                  <span className="text-sm font-medium text-violet-700 dark:text-violet-300">Our Location</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Visit Our Showroom</h2>
                <p className="text-foreground/70">Experience our collection in person at our state-of-the-art showroom.</p>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-border h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.0368509768626!2d72.81714147499756!3d18.99631048221508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce6a17e57f3b%3A0x37b6a7c3c6c2f4a5!2sWorli%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1699000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>

              <div className="p-6 rounded-xl bg-violet-500/10 dark:bg-violet-500/15 border border-violet-500/30">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-violet-500 flex items-center justify-center flex-shrink-0 shadow-md">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Pro Tip</h3>
                    <p className="text-sm text-foreground/80">
                      Book an appointment for a personalized tour of our collection with complimentary refreshments and a dedicated consultant.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Quick Contact */}
              <div className="p-6 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-teal-500 flex items-center justify-center shadow-md">
                    <HeadphonesIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Need Immediate Help?</h3>
                    <p className="text-sm text-foreground/70">Our team is available 24/7</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full gap-2 border-teal-500/40 hover:bg-teal-500/10 hover:border-teal-500/60 text-teal-700 dark:text-teal-400">
                  <Phone className="w-4 h-4" />
                  Call Now: +91 98765 43210
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
