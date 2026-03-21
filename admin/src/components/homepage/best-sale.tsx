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
    title: "Premium Pooja Samugri Combo (All-in-One)",
    image: "https://m.media-amazon.com/images/I/71B9g0-R5YL._SX679_.jpg",
    rating: 4.9,
    reviews: 1021,
    originalPrice: 999,
    discountedPrice: 599,
    tag: { text: "Best Sale", type: "sale" },
  },
  {
    id: 2,
    title: "Diya Set with Ghee Wicks & Cotton Batti",
    image: "https://www.swahaproducts.com/cdn/shop/files/617-R7hjK5L.jpg?v=1704276464&width=1080",
    rating: 4.8,
    reviews: 743,
    originalPrice: 449,
    discountedPrice: 249,
    tag: { text: "Top Rated", type: "top" },
  },
  {
    id: 3,
    title: "Pure Brass Kalash for Pooja Rituals",
    image: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/09b3e3e8-4dc9-4227-bb53-273eb0e58cbf.__CR0,0,2400,2400_PT0_SX300_V1___.jpg",
    rating: 4.7,
    reviews: 534,
    originalPrice: 799,
    discountedPrice: 429,
    tag: { text: "25% Off", type: "discount" },
  },
  {
    id: 4,
    title: "Sandalwood Dhoop & Incense Sticks Set",
    image: "https://ambicaagarbathies.com/cdn/shop/files/GOLDEN_SANDAL_DOOP-1.jpg?v=1736402622",
    rating: 4.85,
    reviews: 861,
    originalPrice: 299,
    discountedPrice: 179,
    tag: { text: "Limited Offer", type: "sale" },
  },
  {
    id: 5,
    title: "Copper Pooja Thali Set with Bell & Kalash",
    image: "https://5.imimg.com/data5/DM/LN/MY-4067460/pooja-thali-set-500x500.jpg",
    rating: 4.9,
    reviews: 987,
    originalPrice: 1299,
    discountedPrice: 899,
    tag: { text: "Top Rated", type: "top" },
  },
  {
    id: 6,
    title: "Ganga Jal Bottle – 100% Pure and Sacred",
    image: "https://servdharm.com/cdn/shop/files/GangaJal_100ml_800x.jpg?v=1750319619",
    rating: 4.8,
    reviews: 610,
    originalPrice: 149,
    discountedPrice: 99,
    tag: { text: "Popular", type: "sale" },
  },
  {
    id: 7,
    title: "Tulsi Mala & Rudraksha Bead Set",
    image: "https://m.media-amazon.com/images/I/51CkUmVpsFL._UF894,1000_QL80_.jpg",
    rating: 4.7,
    reviews: 824,
    originalPrice: 499,
    discountedPrice: 349,
    tag: { text: "Divine Pick", type: "top" },
  },
  {
    id: 8,
    title: "Havan Kund & Samidha Set (Copper Finish)",
    image: "https://ashtok.com/cdn/shop/products/CopperHavanKundTraditionalPoojaIndian7.jpg?v=1663305758",
    rating: 4.9,
    reviews: 1123,
    originalPrice: 899,
    discountedPrice: 649,
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
