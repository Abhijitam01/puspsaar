import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-[#C6A969] transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-8" style={{ fontFamily: 'Georgia, serif' }}>
          Privacy Policy
        </h1>
        
        <div className="prose prose-invert max-w-none text-muted-foreground space-y-6 text-sm leading-relaxed">
          <p>
            At Puspsaar, we respect your privacy and are committed to protecting the personal information you share with us.
            This Privacy Policy explains how we collect, use, and protect your data when you visit our luxury perfume e-commerce store.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-4">Information We Collect</h2>
          <p>
            When you purchase a fragrance or register on our site, we may collect:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Name and contact details (email, phone number, shipping address).</li>
            <li>Order history and fragrance preferences (e.g., favorite scent notes).</li>
            <li>Payment information (processed securely through our third-party payment gateways).</li>
            <li>Device and browsing data.</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-4">How We Use Your Information</h2>
          <p>
            Puspsaar uses your personal data to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Process and deliver your perfume orders securely.</li>
            <li>Provide personalized scent recommendations.</li>
            <li>Communicate updates on luxury launches or exclusive promotions.</li>
            <li>Improve our website performance and user experience.</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-4">Sharing Your Information</h2>
          <p>
            We only share your information with trusted third parties necessary to fulfill your orders (such as couriers) 
            or to manage our business operations. We never sell your personal information to third-party marketers.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-4">Data Security</h2>
          <p>
            We implement industry-standard encryption and security protocols to protect your personal and payment details from unauthorized access.
          </p>

          <p className="mt-8 text-xs">
            Last updated: March 2026<br/>
            Contact us at privacy@puspsaar.com for any questions.
          </p>
        </div>
      </div>
    </div>
  );
}
