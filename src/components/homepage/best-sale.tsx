"use client";

import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";
import { useState } from "react";

interface ProductCard {
  id: number;
  title: string;
  image: string;
  rating: number;
  reviews: number;
  originalPrice: number;
  discountedPrice: number;
  tag?: {
    text: string;
    type: "top" | "sale" | "discount";
  };
}

const products: ProductCard[] = [
  {
    id: 1,
    title: "2022 Jeep Compass Limited 4x4",
    image: "https://images.unsplash.com/photo-1471479913433-1f86dd9c9580?auto=format&fit=crop&w=900&q=80",
    rating: 4.9,
    reviews: 1021,
    originalPrice: 2450000,
    discountedPrice: 2249000,
    tag: { text: "Best Sale", type: "sale" },
  },
  {
    id: 2,
    title: "2021 Skoda Octavia L&K",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    rating: 4.8,
    reviews: 743,
    originalPrice: 2750000,
    discountedPrice: 2550000,
    tag: { text: "Top Rated", type: "top" },
  },
  {
    id: 3,
    title: "2020 MG Hector Sharp DCT",
    image: "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
    rating: 4.7,
    reviews: 534,
    originalPrice: 1850000,
    discountedPrice: 1695000,
    tag: { text: "25% Off", type: "discount" },
  },
  {
    id: 4,
    title: "2022 Mercedes-Benz GLA 200",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
    rating: 4.85,
    reviews: 861,
    originalPrice: 4200000,
    discountedPrice: 3985000,
    tag: { text: "Limited Offer", type: "sale" },
  },
  {
    id: 5,
    title: "2019 Toyota Fortuner 4x4 AT",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=80",
    rating: 4.9,
    reviews: 987,
    originalPrice: 3600000,
    discountedPrice: 3299000,
    tag: { text: "Top Rated", type: "top" },
  },
  {
    id: 6,
    title: "2020 Tata Harrier XZA+ Dark",
    image: "https://images.unsplash.com/photo-1471479913433-1f86dd9c9580?auto=format&fit=crop&w=900&q=80",
    rating: 4.8,
    reviews: 610,
    originalPrice: 2300000,
    discountedPrice: 2140000,
    tag: { text: "Popular", type: "sale" },
  },
  {
    id: 7,
    title: "2023 BMW 330Li M Sport",
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80",
    rating: 4.7,
    reviews: 824,
    originalPrice: 5400000,
    discountedPrice: 5125000,
    tag: { text: "Executive Pick", type: "top" },
  },
  {
    id: 8,
    title: "2018 Maruti Suzuki Baleno Alpha CVT",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    rating: 4.9,
    reviews: 1123,
    originalPrice: 850000,
    discountedPrice: 745000,
    tag: { text: "25% Off", type: "discount" },
  },
];

const tagStyles = {
  top: "bg-rose-500",
  sale: "bg-emerald-400",
  discount: "bg-amber-500",
};

export default function RecommendedSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <main className="min-h-screen px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-8xl mx-auto"
      >
        <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((item, index) => {
            const discountPercent = Math.round(
              ((item.originalPrice - item.discountedPrice) / item.originalPrice) * 100
            );

            return (
              <motion.div
                key={item.id}
                className="relative rounded-3xl overflow-hidden bg-card border hover:shadow-xl"
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative aspect-[4/3]">
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredCard === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                  />
                  {item.tag && (
                    <span
                      className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium text-white ${tagStyles[item.tag.type]}`}
                    >
                      {item.tag.text}
                    </span>
                  )}
                  <button className="absolute top-4 right-4 p-2 rounded-full bg-black/10 hover:bg-rose-400 transition-colors">
                    <Heart className="w-5 h-5 text-white" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2 fill-blue-400">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm">{item.rating}</span>
                    <span className="text-gray-400 text-sm">
                      ({item.reviews} reviews)
                    </span>
                  </div>

                  <h3 className="text-md font-semibold mb-4 text-left line-clamp-2">
                    {item.title}
                  </h3>

                  <div className="flex flex-col gap-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-amber-700">
                        ₹{item.discountedPrice}
                      </span>
                      <span className="text-gray-400 line-through text-sm">
                        ₹{item.originalPrice}
                      </span>
                    </div>
                    <span className="text-green-600 text-left text-sm font-medium">
                      {discountPercent}% OFF
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </main>
  );
}
