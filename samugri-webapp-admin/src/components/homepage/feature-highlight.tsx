"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const features = [
  {
    image: "delivery.png",
    title: "Free Delivery*",
    bgColor: "bg-stone-100",
  },
  {
    image: "/clock.png",
    title: "6Hr Shipping*",
   bgColor: "bg-stone-100",
  },
  {
    image: "/refresh_1.png",
    title: "Easy Returns",
    bgColor: "bg-stone-100",
  },
  {
    image: "/wallet.png", // fixed spelling
    title: "All Payment Modes",
   bgColor: "bg-stone-100",
  },
  {
    image: "/headphone.png",
    title: "Customer Support",
   bgColor: "bg-stone-100",
  },
  {
    image: "/offer.png",
    title: "Special Offers",
    bgColor: "bg-stone-100",
  },
]

export default function FeatureHighlights() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
      {features.map((feature, idx) => (
        <motion.div
          key={idx}
          className="flex flex-col items-center text-center space-y-2 cursor-pointer"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          whileHover={{ scale: 1.08 }}
        >
          {/* Circle with image inside */}
          <div
            className={`w-20 h-20 flex items-center justify-center rounded-full  transition-all duration-300 ${feature.bgColor}`}
          >
            <img
              src={feature.image}
              alt={feature.title}
              width={50}
              height={50}
              className="object-contain rounded-full"
            />
          </div>
          {/* Title */}
          <p className="font-semibold text-gray-900 text-sm">
            {feature.title}
          </p>
        </motion.div>
      ))}
    </div>
  )
}