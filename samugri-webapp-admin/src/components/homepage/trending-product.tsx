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
    type: "trending" | "bestSeller" | "limited";
  };
}

// Sample trending products
const trendingProducts: ProductCard[] = [
  {
    id: 1,
    title: "Premium Pooja Samugri Kit",
    image: "https://m.media-amazon.com/images/I/71B9g0-R5YL._SX679_.jpg",
    rating: 4.9,
    reviews: 1200,
    originalPrice: 899,
    discountedPrice: 599,
    tag: { text: "Trending", type: "trending" },
  },
  {
    id: 2,
    title: "Copper Pooja Thali Set",
    image: "https://5.imimg.com/data5/DM/LN/MY-4067460/pooja-thali-set-500x500.jpg",
    rating: 4.8,
    reviews: 850,
    originalPrice: 1299,
    discountedPrice: 899,
    tag: { text: "Best Seller", type: "bestSeller" },
  },
  {
    id: 3,
    title: "Sandalwood Dhoop & Incense",
    image: "https://ambicaagarbathies.com/cdn/shop/files/GOLDEN_SANDAL_DOOP-1.jpg?v=1736402622",
    rating: 4.7,
    reviews: 650,
    originalPrice: 299,
    discountedPrice: 179,
    tag: { text: "Limited", type: "limited" },
  },
];

const tagStyles = {
  trending: "bg-rose-500",
  bestSeller: "bg-emerald-400",
  limited: "bg-amber-500",
};

export default function TrendingProductSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <main className=" px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-8xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((item, index) => {
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
                  <button className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors">
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

                  <h3 className="text-md  text-left font-semibold mb-4 line-clamp-2">
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

