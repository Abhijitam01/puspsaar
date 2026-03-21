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
    name: "Idols & Figurines",
    items: "356 Items",
    image: "https://m.media-amazon.com/images/I/61fPJIbZQsL._UF894,1000_QL80_.jpg"
  },
  {
    name: "Pooja Thali Sets",
    items: "356 Items",
    image: "https://5.imimg.com/data5/SELLER/Default/2023/5/304651762/UJ/BV/FD/4685668/silver-pooja-thali-500x500.png"
  },
  {
    name: "Kumkum, Haldi & Chandan",
    items: "356 Items",
    image: "https://m.media-amazon.com/images/I/614SE4+LcAL.jpg"
  },
  {
    name: "Wicks, Oil & Camphor",
    items: "356 Items",
    image: "https://cycle.in/cdn/shop/files/Gavi-Gomuthra-Camphor-LS-800x800.webp?v=1708680183&width=480"
  },
  {
    name: "Puja Décor",
    items: "356 Items",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAaHGE-L7Yj2jkn1YkI5sTylskP6P3lcL_TktpA_yg3JOcKQwLK52OLh524Z9H44ZMtDM&usqp=CAU"
  },
  {
    name: "Decorative Diyas & Bells",
    items: "356 Items",
    image: "https://m.media-amazon.com/images/I/61F13AhORFL.jpg"
  },
  {
    name: "Havan & Ritual Items",
    items: "356 Items",
    image: "https://d1msew97rp2nin.cloudfront.net/prodin/wownandi/blogimages/Untitled%20design%20(7)-f1137acb-4f27-47fc-81e8-de416fa877f3.webp"
  },
  {
    name: "Pooja Utensils",
    items: "356 Items",
    image: "https://brassglobe.com/cdn/shop/files/two-tone-polish-brass-pooja-set-velvet-box-910973.jpg?v=1727817408&width=2048"
  },
  {
    name: "Rudraksha & Yantra",
    items: "356 Items",
    image: "https://m.media-amazon.com/images/I/71XEtF3q78L._UF894,1000_QL80_.jpg"
  },
  {
    name: "Sacred Threads & Malas",
    items: "356 Items",
    image: "https://www.satvikworld.com/cdn/shop/files/100_Pure_Tulsi_Jap_Mala_7mm.jpg?v=1745319831"
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
