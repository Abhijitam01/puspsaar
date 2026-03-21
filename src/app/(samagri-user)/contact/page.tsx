'use client';

import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="border-b border-[#E0E0E0] py-10 px-4">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#6B6B6B] mb-2">Puspsaar</p>
          <h1 className="text-3xl sm:text-5xl font-bold text-[#1C1C1C]" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
            Get in Touch
          </h1>
          <p className="text-[#6B6B6B] mt-3 max-w-lg text-sm">
            Have questions about our fragrances or need help with your order? Our team is here to help.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left Column - Contact Info */}
        <div className="space-y-10">
          <div className="space-y-6 border-l-2 border-[#1C1C1C] pl-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 border border-[#E0E0E0] flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-[#1C1C1C]" />
              </div>
              <div>
                <h3 className="text-[#1C1C1C] font-semibold text-sm uppercase tracking-[0.1em] mb-1">Phone</h3>
                <p className="text-[#6B6B6B] text-sm">+91 (800) 123-4567</p>
                <p className="text-xs text-[#ABABAB] mt-0.5">Mon–Sat, 10:00 AM – 7:00 PM IST</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 border border-[#E0E0E0] flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-[#1C1C1C]" />
              </div>
              <div>
                <h3 className="text-[#1C1C1C] font-semibold text-sm uppercase tracking-[0.1em] mb-1">Email</h3>
                <a href="mailto:concierge@puspsaar.com" className="text-[#6B6B6B] text-sm hover:text-[#1C1C1C] transition-colors">
                  concierge@puspsaar.com
                </a>
                <p className="text-xs text-[#ABABAB] mt-0.5">We aim to reply within 24 hours</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 border border-[#E0E0E0] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-[#1C1C1C]" />
              </div>
              <div>
                <h3 className="text-[#1C1C1C] font-semibold text-sm uppercase tracking-[0.1em] mb-1">Boutique</h3>
                <p className="text-[#6B6B6B] text-sm">
                  123 Luxury Avenue,<br />
                  Bandra West, Mumbai 400050<br />
                  India
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="border border-[#E0E0E0] p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-[#1C1C1C] mb-6" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
            Send a Message
          </h2>
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1C1C1C]">First Name</label>
                <input
                  type="text"
                  className="w-full border border-[#E0E0E0] px-4 py-2.5 text-sm text-[#1C1C1C] placeholder:text-[#ABABAB] focus:outline-none focus:border-black transition-colors"
                  placeholder="John"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1C1C1C]">Last Name</label>
                <input
                  type="text"
                  className="w-full border border-[#E0E0E0] px-4 py-2.5 text-sm text-[#1C1C1C] placeholder:text-[#ABABAB] focus:outline-none focus:border-black transition-colors"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1C1C1C]">Email</label>
              <input
                type="email"
                className="w-full border border-[#E0E0E0] px-4 py-2.5 text-sm text-[#1C1C1C] placeholder:text-[#ABABAB] focus:outline-none focus:border-black transition-colors"
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1C1C1C]">Subject</label>
              <select className="w-full border border-[#E0E0E0] px-4 py-2.5 text-sm text-[#1C1C1C] focus:outline-none focus:border-black transition-colors bg-white appearance-none cursor-pointer">
                <option>Order Inquiry</option>
                <option>Fragrance Consultation</option>
                <option>Returns & Exchanges</option>
                <option>Other</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1C1C1C]">Message</label>
              <textarea
                rows={4}
                className="w-full border border-[#E0E0E0] px-4 py-2.5 text-sm text-[#1C1C1C] placeholder:text-[#ABABAB] focus:outline-none focus:border-black transition-colors resize-none"
                placeholder="How can we help you?"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-black text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#1C1C1C] transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
