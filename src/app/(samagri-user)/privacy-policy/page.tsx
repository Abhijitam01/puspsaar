import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
        </div>

        <div className="max-w-none text-[#6B6B6B] space-y-6 text-sm leading-relaxed">
          <p>
            At Puspsaar, we respect your privacy and are committed to protecting the personal information you share with us.
            This Privacy Policy explains how we collect, use, and protect your data when you visit our luxury perfume e-commerce store.
          </p>

          <h2 className="text-xl font-bold text-[#1C1C1C] mt-8 mb-4">Information We Collect</h2>
          <p>
            When you purchase a fragrance or register on our site, we may collect:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Name and contact details (email, phone number, shipping address).</li>
            <li>Order history and fragrance preferences (e.g., favorite scent notes).</li>
            <li>Payment information (processed securely through our third-party payment gateways).</li>
            <li>Device and browsing data.</li>
          </ul>

          <h2 className="text-xl font-bold text-[#1C1C1C] mt-8 mb-4">How We Use Your Information</h2>
          <p>
            Puspsaar uses your personal data to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Process and deliver your perfume orders securely.</li>
            <li>Provide personalized scent recommendations.</li>
            <li>Communicate updates on luxury launches or exclusive promotions.</li>
            <li>Improve our website performance and user experience.</li>
          </ul>

          <h2 className="text-xl font-bold text-[#1C1C1C] mt-8 mb-4">Sharing Your Information</h2>
          <p>
            We only share your information with trusted third parties necessary to fulfill your orders (such as couriers)
            or to manage our business operations. We never sell your personal information to third-party marketers.
          </p>

          <h2 className="text-xl font-bold text-[#1C1C1C] mt-8 mb-4">Data Security</h2>
          <p>
            We implement industry-standard encryption and security protocols to protect your personal and payment details from unauthorized access.
          </p>

          <div className="border-t border-[#E0E0E0] pt-6 mt-8">
            <p className="text-xs text-[#ABABAB]">
              Last updated: March 2026 &nbsp;·&nbsp; Contact us at privacy@puspsaar.com for any questions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
