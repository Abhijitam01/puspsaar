"use client";

import Image from "next/image";
import { ShoppingCart, Heart, Star } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Diya & Candles",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc2OmbRCNE0tdaZNma6xOTpr5fw8U76c5KMA&s",
    oldPrice: 299,
    newPrice: 199,
    rating: 4.8,
    reviews: 320,
  },
  {
    id: 2,
    name: "Pooja Thali Set",
    image: "https://www.zupppy.com/wp-content/uploads/2021/09/WhatsApp-Image-2021-09-25-at-2.33.14-PM-1.jpeg",
    oldPrice: 999,
    newPrice: 699,
    rating: 4.9,
    reviews: 210,
  },
  {
    id: 3,
    name: "Incense & Dhoop",
    image: "https://m.media-amazon.com/images/I/71HV7kADyTL.jpg",
    oldPrice: 149,
    newPrice: 99,
    rating: 4.7,
    reviews: 150,
  },
  {
    id: 4,
    name: "Tulsi & Rudraksha",
    image: "https://images.meesho.com/images/products/553823762/7pvul_512.webp?width=256",
    oldPrice: 499,
    newPrice: 349,
    rating: 4.5,
    reviews: 180,
  },
  {
    id: 5,
    name: "Decorative Items",
    image: "https://rukminim2.flixcart.com/image/300/300/xif0q/wall-decoration/p/k/h/metal-wall-hanging-for-home-decoration-wall-decor-items-for-original-imah3bgs2d5s3u8b.jpeg",
    oldPrice: 399,
    newPrice: 249,
    rating: 4.6,
    reviews: 95,
  },
  {
    id: 6,
    name: "Holy Water & Ganga Jal",
    image: "https://5.imimg.com/data5/ANDROID/Default/2021/9/QJ/BD/GC/57788916/product-jpeg-500x500.png",
    oldPrice: 149,
    newPrice: 99,
    rating: 4.8,
    reviews: 120,
  },
];

export default function SuggestCategory() {
  return (
    <div className="px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9">
        {categories.map((item) => (
          <div
            key={item.id}
            className="rounded-xl shadow-sm p-4 hover:shadow-lg transition group"
          >
            {/* Image container with gradient */}
          <div className="relative flex justify-center items-center h-48 rounded-xl bg-gradient-to-b from-gray-200 to-red-300 overflow-hidden">
  {/* Image fully covering parent */}
  <img
    src={item.image}
    alt={item.name}
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Hover action buttons */}
  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
    <button className="p-3 rounded-full bg-white shadow-md hover:bg-gray-100 transition">
      <ShoppingCart size={20} className="text-gray-800" />
    </button>
    <button className="p-3 rounded-full bg-white shadow-md hover:bg-gray-100 transition">
      <Heart size={20} className="text-red-500" />
    </button>
  </div>
</div>


            {/* Product Title */}
            <h3 className="mt-3 text-md text-left !text-gray-800">{item.name}</h3>

            <div className="mt-1 flex items-center gap-2">
              <span className="font-bold dark:text-gray-800">₹{item.newPrice}</span>
              <span className="!text-gray-400 line-through text-sm">₹{item.oldPrice}</span>
            </div>

            {/* Rating with badge */}
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-0.5 bg-green-600 text-white text-xs font-semibold rounded-md flex items-center gap-1">
                {item.rating}
                <Star size={12} className="fill-white text-white" />
              </span>
              <span className="text-xs text-gray-500">({item.reviews}) reviews</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
