import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function RefundPolicyPage() {
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
            Returns & Exchanges
          </h1>
        </div>

        <div className="max-w-none text-[#6B6B6B] space-y-6 text-sm leading-relaxed">
          <p>
            At Puspsaar, we curate only the finest luxury fragrances. We want you to be completely satisfied with your purchase.
            If you are not perfectly happy with your order, we offer a straightforward return and exchange policy.
          </p>

          <h2 className="text-xl font-bold text-[#1C1C1C] mt-8 mb-4">7-Day Return Policy</h2>
          <p>
            We accept returns within 7 days of delivery for unopened, unused items in their original sealed packaging.
            For health and hygiene reasons, we cannot accept returns on fragrances that have been opened, sprayed, or unsealed,
            unless the item is defective or damaged upon arrival.
          </p>

          <h2 className="text-xl font-bold text-[#1C1C1C] mt-8 mb-4">How to Initiate a Return</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Contact our concierge team at concierge@puspsaar.com with your order number and reason for return.</li>
            <li>Once approved, you will receive a Return Authorization (RA) number and a return shipping label.</li>
            <li>Securely pack the item in its original box, print and attach the return label.</li>
            <li>Drop off the package at the designated courier location within 3 days of receiving the label.</li>
          </ol>

          <h2 className="text-xl font-bold text-[#1C1C1C] mt-8 mb-4">Damaged or Defective Items</h2>
          <p>
            In the rare event that your perfume arrives damaged (e.g., leaking, broken bottle), please notify us within 48 hours of delivery
            with photographic evidence. We will arrange a replacement or full refund immediately at no extra cost to you.
          </p>

          <h2 className="text-xl font-bold text-[#1C1C1C] mt-8 mb-4">Refund Process</h2>
          <p>
            Once we receive and inspect your returned item, we will notify you of the approval or rejection of your refund.
            If approved, the refund will be processed and automatically applied to your original method of payment within 5-7 business days.
            Please note that original shipping costs (if any) are non-refundable.
          </p>
        </div>
      </div>
    </div>
  );
}
