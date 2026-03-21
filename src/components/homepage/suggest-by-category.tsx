"use client";

import Image from "next/image";
import { ShoppingCart, Heart, Star } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "2022 Kia Seltos GTX+",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
    oldPrice: 1999000,
    newPrice: 1825000,
    rating: 4.8,
    reviews: 320,
  },
  {
    id: 2,
    name: "2021 Honda City ZX CVT",
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80",
    oldPrice: 1499000,
    newPrice: 1285000,
    rating: 4.9,
    reviews: 210,
  },
  {
    id: 3,
    name: "2020 Tata Nexon EV",
    image: "https://images.unsplash.com/photo-1518552781628-df835fcf7729?auto=format&fit=crop&w=900&q=80",
    oldPrice: 1650000,
    newPrice: 1520000,
    rating: 4.7,
    reviews: 150,
  },
  {
    id: 4,
    name: "2019 Maruti Swift AMT",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80",
    oldPrice: 725000,
    newPrice: 615000,
    rating: 4.5,
    reviews: 180,
  },
  {
    id: 5,
    name: "2020 Jeep Compass 4x4",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=80",
    oldPrice: 2450000,
    newPrice: 2249000,
    rating: 4.6,
    reviews: 95,
  },
  {
    id: 6,
    name: "2018 Hyundai Elite i20",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    oldPrice: 650000,
    newPrice: 545000,
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
