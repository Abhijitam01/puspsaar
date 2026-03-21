"use client";

import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { type CarouselApi } from "@/components/ui/carousel";

const destinations = [
  {
    name: "SUV Essentials",
    items: "42 Vehicles",
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Luxury Sedans",
    items: "18 Vehicles",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Electric Drives",
    items: "21 Vehicles",
    image: "https://images.unsplash.com/photo-1518552781628-df835fcf7729?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "City Hatchbacks",
    items: "30 Vehicles",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Performance Garage",
    items: "9 Vehicles",
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Adventure 4x4s",
    items: "12 Vehicles",
    image: "https://images.unsplash.com/photo-1471479913433-1f86dd9c9580?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Executive Fleet",
    items: "15 Vehicles",
    image: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Certified Pre-Owned",
    items: "65 Vehicles",
    image: "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Accessories & Care",
    items: "120 Products",
    image: "https://images.unsplash.com/photo-1419019750364-0c623066013b?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Commercial Vans",
    items: "11 Vehicles",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=800&q=80"
  },
];

export default function ShopByCategory() {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;
    const autoplay = () => api.scrollNext();
    const interval = setInterval(autoplay, 3000);
    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="h-max py-2">
      <div className="container mx-auto px-4">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
            skipSnaps: true,
          }}
          className="w-full border-none shadow-none"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {destinations.map((destination, index) => (
              <CarouselItem
                key={index}
                className={cn(
                  "pl-2 md:pl-4",
                  "basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/5"
                )}
              >
                <div className="relative group">
                  <Card className="overflow-hidden border-none bg-transparent shadow-none">
                    <div className="relative w-full h-48 sm:h-52 md:h-56 lg:h-60">
                      <div className="absolute inset-0 rounded-2xl overflow-hidden">
                        <img
                          src={destination.image}
                          alt={destination.name}
                          className={cn(
                            "object-cover w-full h-full transition-transform duration-300",
                            "group-hover:scale-110"
                          )}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 text-white text-center">
                        <h3 className="text-sm sm:text-base font-semibold mb-0.5">
                          {destination.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-300">
                          {destination.items}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 md:left-4 bg-white/20 hover:bg-white/30 border-0" />
          <CarouselNext className="right-2 md:right-4 bg-white/20 hover:bg-white/30 border-0" />
        </Carousel>
      </div>
    </div>
  );
}
