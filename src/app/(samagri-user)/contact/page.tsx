'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
        >
          {/* Left Column - Contact Info */}
          <div className="space-y-12">
            <div>
              <motion.h1 
                variants={itemVariants} 
                className="text-4xl sm:text-5xl font-bold text-foreground mb-4"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Get in Touch
              </motion.h1>
              <motion.p variants={itemVariants} className="text-muted-foreground text-lg max-w-md">
                Have questions about our luxury fragrances or need assistance with your order? Our concierge team is here to help.
              </motion.p>
            </div>

            <motion.div variants={itemVariants} className="space-y-8 pl-4 border-l border-[#C6A969]/30">
              <div className="flex gap-4">
                <div className="mt-1 p-3 rounded-full bg-[#C6A969]/10 text-[#C6A969] h-fit">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-foreground font-semibold mb-1">Phone</h3>
                  <p className="text-muted-foreground mb-1">+91 (800) 123-4567</p>
                  <p className="text-xs text-muted-foreground">Mon-Sat, 10:00 AM - 7:00 PM IST</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 p-3 rounded-full bg-[#C6A969]/10 text-[#C6A969] h-fit">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-foreground font-semibold mb-1">Email</h3>
                  <a href="mailto:concierge@puspsaar.com" className="text-muted-foreground hover:text-[#C6A969] transition-colors">
                    concierge@puspsaar.com
                  </a>
                  <p className="text-xs text-muted-foreground mt-1">We aim to reply within 24 hours</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 p-3 rounded-full bg-[#C6A969]/10 text-[#C6A969] h-fit">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-foreground font-semibold mb-1">Boutique</h3>
                  <p className="text-muted-foreground">
                    123 Luxury Avenue, <br />
                    Bandra West, Mumbai 400050<br />
                    India
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Contact Form */}
          <motion.div variants={itemVariants} className="glass-panel rounded-2xl p-8 sm:p-10 border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6" style={{ fontFamily: 'Georgia, serif' }}>Send a Message</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">First Name</label>
                  <input type="text" className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C6A969]/60 transition-colors" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Last Name</label>
                  <input type="text" className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C6A969]/60 transition-colors" placeholder="Doe" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <input type="email" className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C6A969]/60 transition-colors" placeholder="john@example.com" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Subject</label>
                <select className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C6A969]/60 transition-colors appearance-none">
                  <option>Order Inquiry</option>
                  <option>Fragrance Consultation</option>
                  <option>Returns & Exchanges</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Message</label>
                <textarea rows={4} className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C6A969]/60 transition-colors resize-none" placeholder="How can we help you?"></textarea>
              </div>

              <button type="submit" className="w-full bg-foreground text-background hover:bg-[#C6A969] hover:text-black transition-all rounded-xl py-4 font-semibold text-sm">
                Send Message
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
