import React from 'react';

export default function CareersPage() {
  const roles = [
    {
      title: 'Fragrance Consultant',
      location: 'Mumbai, India',
      type: 'Full-time',
      description:
        'Guide our clients through our curated collection. Must have deep knowledge of fragrance notes, olfactory families, and a passion for luxury customer service.',
    },
    {
      title: 'E-commerce Operations',
      location: 'Remote / Hybrid',
      type: 'Full-time',
      description:
        'Manage the end-to-end fulfillment of our online orders. Ensure our luxury perfumes are packed with care, handling logistics and supply chain optimization.',
    },
    {
      title: 'Brand Marketer',
      location: 'Mumbai, India',
      type: 'Full-time',
      description:
        'Tell the story of Puspsaar to the world. Create compelling digital campaigns, collaborate with influencers, and shape the narrative of our luxury brand.',
    },
  ]

  return (
    <div className="min-h-screen bg-white pt-16 pb-16">
      {/* Header */}
      <div className="border-b border-[#E0E0E0] py-10 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#6B6B6B] mb-3">Puspsaar</p>
          <h1
            className="text-4xl sm:text-5xl font-bold text-[#1C1C1C] mb-4"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Careers
          </h1>
          <p className="text-[#6B6B6B] text-base max-w-xl mx-auto">
            Join the team redefining the luxury fragrance experience. We are always looking for passionate,
            detail-oriented individuals who appreciate the art of perfumery.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role) => (
            <div key={role.title} className="border border-[#E0E0E0] bg-white p-8 flex flex-col">
              <h3
                className="text-xl font-bold text-[#1C1C1C] mb-1"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                {role.title}
              </h3>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#6B6B6B] mb-4">
                {role.location} &nbsp;·&nbsp; {role.type}
              </p>
              <p className="text-sm text-[#6B6B6B] leading-relaxed flex-grow mb-6">
                {role.description}
              </p>
              <button className="w-full py-3 border border-[#1C1C1C] text-[#1C1C1C] text-xs font-bold uppercase tracking-[0.15em] hover:bg-black hover:text-white transition-colors">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
