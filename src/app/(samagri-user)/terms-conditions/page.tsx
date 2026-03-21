import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-white pt-16 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center text-sm text-[#6B6B6B] hover:text-[#1C1C1C] transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="border-b border-[#E0E0E0] pb-6 mb-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#6B6B6B] mb-2">Puspsaar</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C]" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
            Terms & Conditions
          </h1>
        </div>

        <div className="max-w-none text-[#6B6B6B] space-y-6 text-sm leading-relaxed">
          <p>
            Welcome to Puspsaar. These Terms & Conditions outline the rules and regulations for the use of our website, located at www.puspsaar.com.
            By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use Puspsaar if you do not agree to all of the terms and conditions stated on this page.
          </p>

          <h2 className="text-xl font-bold text-[#1C1C1C] mt-8 mb-4">1. Product Information</h2>
          <p>
            All fragrances and products displayed on Puspsaar are subject to availability.
            We strive to display our products, including packaging and descriptions, as accurately as possible.
            However, we do not warrant that the product descriptions or other content is 100% accurate, complete, or error-free.
          </p>

          <h2 className="text-xl font-bold text-[#1C1C1C] mt-8 mb-4">2. Pricing and Payments</h2>
          <p>
            Prices for our luxury perfumes are subject to change without notice. We reserve the right at any time to modify or discontinue
            products without liability to you or any third party.
          </p>

          <h2 className="text-xl font-bold text-[#1C1C1C] mt-8 mb-4">3. Shipping and Delivery</h2>
          <p>
            Puspsaar will deliver products to the delivery address you specify when making an order.
            Shipping estimates provided at checkout are an estimate only and not a guarantee.
            Title and risk of loss for all products ordered by you shall pass on to you upon delivery to the shipping carrier.
          </p>

          <h2 className="text-xl font-bold text-[#1C1C1C] mt-8 mb-4">4. Returns and Refunds</h2>
          <p>
            Returns and refunds will be processed in accordance with our Return Policy. Due to the delicate nature of luxury fragrances,
            opened items cannot be returned unless proven defective or damaged in transit.
          </p>

          <h2 className="text-xl font-bold text-[#1C1C1C] mt-8 mb-4">5. Intellectual Property Rights</h2>
          <p>
            Unless otherwise stated, Puspsaar and/or its licensors own the intellectual property rights for all material on the site,
            including images, text, code, and overall design.
          </p>

          <div className="border-t border-[#E0E0E0] pt-6 mt-8">
            <p className="text-xs text-[#ABABAB]">
              Last updated: March 2026 &nbsp;·&nbsp; Contact us at legal@puspsaar.com for any questions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
