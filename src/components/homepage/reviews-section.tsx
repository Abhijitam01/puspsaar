'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const reviews = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    text: 'The attar collection is absolutely divine. The Oud fragrance lasted all day and I received so many compliments. Definitely buying again!',
    product: 'Royal Oud Attar',
  },
  {
    id: 2,
    name: 'Arun Mehta',
    location: 'Delhi',
    rating: 5,
    text: 'Ordered the gifting set for my wife\'s birthday and she loved it. Packaging was premium and the fragrances are long-lasting. Worth every rupee.',
    product: 'Gifting Collection',
  },
  {
    id: 3,
    name: 'Fatima Khan',
    location: 'Hyderabad',
    rating: 5,
    text: 'I\'ve been searching for a good attar shop and Puspsaar is the best I\'ve found. Authentic Middle Eastern quality at unbeatable prices.',
    product: 'Women\'s Signature Blend',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="w-3.5 h-3.5"
          fill={i < rating ? '#FFAF00' : 'none'}
          stroke={i < rating ? '#FFAF00' : '#ABABAB'}
        />
      ))}
    </div>
  )
}

export default function ReviewsSection() {
  return (
    <section className="w-full">
      <div className="text-center mb-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#6B6B6B] mb-3">
          What Our Customers Say
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold text-[#1C1C1C]"
          style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
        >
          Customer Reviews
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review, i) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="border border-[#E0E0E0] p-6 bg-white"
          >
            <StarRating rating={review.rating} />
            <p className="text-[#1C1C1C] text-sm leading-relaxed mt-4 mb-5">
              &ldquo;{review.text}&rdquo;
            </p>
            <div className="border-t border-[#E0E0E0] pt-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#1C1C1C]">{review.name}</p>
                <p className="text-xs text-[#6B6B6B]">{review.location}</p>
              </div>
              <p className="text-[10px] text-[#6B6B6B] uppercase tracking-wider">{review.product}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
