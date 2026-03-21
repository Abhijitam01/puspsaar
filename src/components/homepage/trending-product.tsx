"use client";

import { motion } from "framer-motion";
import { Heart, Star, TrendingUp, Award, Timer, Sparkles } from "lucide-react";
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
    icon: typeof TrendingUp;
  };
}

// Sample trending products
const trendingProducts: ProductCard[] = [
  {
    id: 1,
    title: "2024 Lucid Air Sapphire",
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80",
    rating: 4.9,
    reviews: 1200,
    originalPrice: 5200000,
    discountedPrice: 4980000,
    tag: { text: "Trending", type: "trending", icon: TrendingUp },
  },
  {
    id: 2,
    title: "2024 Porsche Cayenne Turbo GT",
    image: "https://images.unsplash.com/photo-1471479913433-1f86dd9c9580?auto=format&fit=crop&w=900&q=80",
    rating: 4.8,
    reviews: 850,
    originalPrice: 3800000,
    discountedPrice: 3550000,
    tag: { text: "Best Seller", type: "bestSeller", icon: Award },
  },
  {
    id: 3,
    title: "2023 Range Rover SV Bespoke",
    image: "https://images.unsplash.com/photo-1518552781628-df835fcf7729?auto=format&fit=crop&w=900&q=80",
    rating: 4.7,
    reviews: 650,
    originalPrice: 4500000,
    discountedPrice: 4300000,
    tag: { text: "Limited", type: "limited", icon: Timer },
  },
];

const tagStyles = {
  trending: {
    bg: "bg-gradient-to-r from-rose-500 to-pink-600",
    glow: "shadow-[0_4px_20px_rgba(244,63,94,0.4)]",
  },
  bestSeller: {
    bg: "bg-gradient-to-r from-emerald-400 to-teal-500",
    glow: "shadow-[0_4px_20px_rgba(52,211,153,0.4)]",
  },
  limited: {
    bg: "bg-gradient-to-r from-amber-400 to-orange-500",
    glow: "shadow-[0_4px_20px_rgba(251,146,60,0.4)]",
  },
};

export default function TrendingProductSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());

  const toggleWishlist = (id: number) => {
    setWishlist(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <main className="px-4 sm:px-6 lg:px-8">
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
            const TagIcon = item.tag?.icon;

            return (
              <motion.div
                key={item.id}
                className="relative rounded-3xl overflow-hidden bg-card dark:bg-gradient-to-b dark:from-white/[0.06] dark:to-white/[0.02] border border-border/50 dark:border-white/[0.08] hover:border-border dark:hover:border-white/15 transition-all duration-500"
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -8 }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredCard === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {item.tag && TagIcon && (
                    <span
                      className={`absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold text-white ${tagStyles[item.tag.type].bg} ${tagStyles[item.tag.type].glow} border border-white/20`}
                    >
                      <TagIcon className="w-3.5 h-3.5" />
                      {item.tag.text}
                    </span>
                  )}
                  
                  <button 
                    className={`absolute top-4 right-4 p-2.5 rounded-xl backdrop-blur-xl border transition-all duration-300 
                      ${wishlist.has(item.id) 
                        ? 'bg-rose-500/20 border-rose-400/30 shadow-[0_0_20px_rgba(244,63,94,0.3)]' 
                        : 'bg-white/[0.08] border-white/[0.12] hover:bg-white/15 hover:border-white/25'
                      }`}
                    onClick={() => toggleWishlist(item.id)}
                  >
                    <Heart className={`w-5 h-5 transition-all duration-300 ${wishlist.has(item.id) ? 'text-rose-400 fill-rose-400' : 'text-white/80'}`} />
                  </button>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted/50 dark:bg-white/[0.06] border border-border/30 dark:border-white/[0.08]">
                      <div className="w-4 h-4 rounded-md bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                        <Star className="w-2.5 h-2.5 text-white fill-white" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{item.rating}</span>
                      <span className="text-muted-foreground/70 text-sm">
                        ({item.reviews})
                      </span>
                    </div>
                  </div>

                  <h3 className="text-md text-left font-semibold mb-4 line-clamp-2 text-foreground">
                    {item.title}
                  </h3>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-primary">
                        ₹{item.discountedPrice.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground/50 line-through text-sm">
                        ₹{item.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-md bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                        <Sparkles className="w-2.5 h-2.5 text-white" />
                      </div>
                      <span className="text-emerald-500 dark:text-emerald-400 text-sm font-semibold">
                        {discountPercent}% OFF
                      </span>
                    </div>
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

