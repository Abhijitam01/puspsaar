"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Truck, Clock, RefreshCw, Wallet, Headphones, Gift } from "lucide-react"

const features = [
  {
    icon: Truck,
    title: "Residency Delivery",
    gradient: "from-sky-400 to-blue-600",
    glow: "rgba(56, 189, 248, 0.3)",
  },
  {
    icon: Clock,
    title: "24Hr Capital Desk",
    gradient: "from-amber-400 to-orange-600",
    glow: "rgba(251, 191, 36, 0.3)",
  },
  {
    icon: RefreshCw,
    title: "7-Day Exchange",
    gradient: "from-emerald-400 to-teal-600",
    glow: "rgba(52, 211, 153, 0.3)",
  },
  {
    icon: Wallet,
    title: "Flexible Payments",
    gradient: "from-violet-400 to-purple-600",
    glow: "rgba(167, 139, 250, 0.3)",
  },
  {
    icon: Headphones,
    title: "Concierge Studio",
    gradient: "from-rose-400 to-pink-600",
    glow: "rgba(251, 113, 133, 0.3)",
  },
  {
    icon: Gift,
    title: "Exclusive Briefings",
    gradient: "from-[#7fe8d7] to-teal-500",
    glow: "rgba(127, 232, 215, 0.35)",
  },
]

export default function FeatureHighlights() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
      {features.map((feature, idx) => {
        const IconComponent = feature.icon
        return (
          <motion.div
            key={idx}
            className="group flex flex-col items-center text-center space-y-3 cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ scale: 1.08, y: -4 }}
          >
            {/* Elegant icon container */}
            <div className="relative">
              <motion.div
                className={`w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} transition-all duration-500`}
                style={{ boxShadow: `0 8px 32px ${feature.glow}` }}
                whileHover={{ rotate: 3, scale: 1.05 }}
              >
                <IconComponent className="w-8 h-8 text-white" strokeWidth={1.5} />
              </motion.div>
              
              {/* Floating glow effect */}
              <div 
                className={`absolute inset-0 w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} blur-xl opacity-30 -z-10 transition-opacity duration-500 group-hover:opacity-50`}
              />
              
              {/* Subtle ring on hover */}
              <div className="absolute -inset-1 rounded-2xl border border-white/0 group-hover:border-white/10 transition-all duration-300" />
            </div>
            
            <p className="font-medium text-white/80 text-sm tracking-wide group-hover:text-white transition-colors duration-300">
              {feature.title}
            </p>
          </motion.div>
        )
      })}
    </div>
  )
}