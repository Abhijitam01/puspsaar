import React from 'react';
import { motion } from 'framer-motion';

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            Careers at Puspsaar
          </h1>
          <p className="text-muted-foreground text-lg">
            Join the team redefining the luxury fragrance experience. We are always looking for passionate, detail-oriented individuals who appreciate the art of perfumery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="glass-panel rounded-2xl p-8 border border-border">
            <h3 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: 'Georgia, serif' }}>Fragrance Consultant</h3>
            <p className="text-sm text-[#C6A969] mb-4">Mumbai, India • Full-time</p>
            <p className="text-sm text-muted-foreground mb-6">
              Guide our clients through our curated collection. Must have deep knowledge of fragrance notes, olfactory families, and a passion for luxury customer service.
            </p>
            <button className="w-full py-3 rounded-xl border border-[#C6A969]/30 text-foreground hover:bg-[#C6A969]/10 transition-colors text-sm font-semibold">
              Apply Now
            </button>
          </div>

          <div className="glass-panel rounded-2xl p-8 border border-border">
            <h3 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: 'Georgia, serif' }}>E-commerce Operations</h3>
            <p className="text-sm text-[#C6A969] mb-4">Remote / Hybrid • Full-time</p>
            <p className="text-sm text-muted-foreground mb-6">
              Manage the end-to-end fulfillment of our online orders. Ensure our luxury perfumes are packed with care, handling logistics and supply chain optimization.
            </p>
            <button className="w-full py-3 rounded-xl border border-[#C6A969]/30 text-foreground hover:bg-[#C6A969]/10 transition-colors text-sm font-semibold">
              Apply Now
            </button>
          </div>

          <div className="glass-panel rounded-2xl p-8 border border-border">
            <h3 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: 'Georgia, serif' }}>Brand Marketer</h3>
            <p className="text-sm text-[#C6A969] mb-4">Mumbai, India • Full-time</p>
            <p className="text-sm text-muted-foreground mb-6">
              Tell the story of Puspsaar to the world. Create compelling digital campaigns, collaborate with influencers, and shape the narrative of our luxury brand.
            </p>
            <button className="w-full py-3 rounded-xl border border-[#C6A969]/30 text-foreground hover:bg-[#C6A969]/10 transition-colors text-sm font-semibold">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
